import {
  ABI,
  ArgType,
  CONTRACTS,
  encodeFunction,
  ENDPOINTS,
  EstmimateGas,
  MulticallArg,
  ValidNetwork,
} from '@daohaus/common-utilities';
import { GNOSIS_MULTISEND_ABI } from '@daohaus/contract-utilities';
import { encodeMultiSend, MetaTransaction } from '@gnosis.pm/safe-contracts';
import { getAddress } from 'ethers/lib/utils';
import { processArg } from './args';
import { processContractLego } from './contractHelpers';

export const estimateGas = async ({
  chainId,
  safeId,
  data,
}: {
  chainId: ValidNetwork;
  safeId: string;
  data: string;
}) => {
  const rawUri = ENDPOINTS['GAS_ESTIMATE'][chainId];
  if (!rawUri)
    throw new Error(
      `Gnosis Gas Estimation API not found for chainID: ${chainId}`
    );

  const gnosisMultisendAddress = CONTRACTS['GNOSIS_MULTISEND'][chainId];

  if (!gnosisMultisendAddress)
    throw new Error(
      `Gnosis Multisend Contract not found for chainID: ${chainId}`
    );
  const gasEstimateUri = rawUri.replace('<<safeId>>', getAddress(safeId));
  try {
    const response = await fetch(gasEstimateUri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: getAddress(gnosisMultisendAddress),
        value: 0,
        data,
        operation: 1,
      }),
    });

    return response.json();
  } catch (error) {
    throw new Error(`Failed to estimate gas: ${error}`);
  }
};

export const txActionToMetaTx = ({
  abi,
  method,
  address,
  args,
  value = 0,
  operation = 0,
}: {
  abi: ABI;
  address: string;
  method: string;
  args: ReadonlyArray<ArgType>;
  value?: string | number;
  operation?: number;
}): MetaTransaction => {
  const encodedData = encodeFunction(abi, method, args);

  if (typeof encodedData !== 'string') {
    throw new Error(encodedData.message);
  }

  return {
    to: address,
    data: encodedData,
    value,
    operation,
  };
};

export const handleMulticallArg = async ({
  arg,
  chainId,
}: {
  arg: MulticallArg;
  chainId: ValidNetwork;
}) => {
  const encodedActions = await Promise.all(
    arg.actions.map(async (action) => {
      const { contract, method, args } = action;

      const processedContract = await processContractLego({
        contract,
        chainId,
      });
      const processedArgs = await Promise.all(
        args.map(async (arg) => await processArg({ arg, chainId }))
      );

      return txActionToMetaTx({
        abi: processedContract.abi,
        method,
        address: processedContract.address,
        args: processedArgs,
      });
    })
  );

  const result = encodeMultiAction(encodedActions);

  if (typeof result !== 'string') {
    throw new Error(result.message);
  }
  return result;
};

export const handleGasEstimate = async ({
  safeId,
  chainId,
  arg,
}: {
  safeId?: string;
  chainId: ValidNetwork;
  arg: EstmimateGas;
}) => {
  if (!safeId) throw new Error('Safe ID is required to estimate gas');

  const proposalData = await handleMulticallArg({
    chainId,
    arg: {
      type: 'multicall',
      actions: arg.actions,
    },
  });
  const estimate = await estimateGas({
    chainId,
    safeId,
    data: proposalData,
  });
  if (estimate.safeTxGas) {
    return Number(estimate.safeTxGas);
  } else {
    throw new Error(`Failed to estimate gas: `);
  }
};
export const encodeMultiAction = (rawMulti: MetaTransaction[]) => {
  return encodeFunction(GNOSIS_MULTISEND_ABI, 'multiSend', [
    encodeMultiSend(rawMulti),
  ]);
};
