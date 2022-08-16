import {
  ABI,
  ArbitraryState,
  ArgType,
  CONTRACTS,
  encodeFunction,
  ENDPOINTS,
  EstmimateGas,
  EthAddress,
  JSONDetailsSearch,
  Keychain,
  MulticallAction,
  MulticallArg,
  StringSearch,
  toSeconds,
  TXLego,
  ValidNetwork,
} from '@daohaus/common-utilities';
import { LOCAL_ABI } from '@daohaus/abi-utilities';
import { encodeMultiSend, MetaTransaction } from '@gnosis.pm/safe-contracts';
import { getAddress } from 'ethers/lib/utils';
import { processArg } from './args';
import {
  BaalContractBase,
  basicDetails,
  CURRENT_DAO,
  EXPIRY,
  FORM,
} from './constants';
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
  localABIs,
  appState,
}: {
  arg: MulticallArg;
  chainId: ValidNetwork;
  localABIs: Record<string, ABI>;
  appState: ArbitraryState;
}) => {
  const encodedActions = await Promise.all(
    arg.actions.map(async (action) => {
      const { contract, method, args } = action;
      const processedContract = await processContractLego({
        contract,
        chainId,
        localABIs,
        appState,
      });
      const processedArgs = await Promise.all(
        args.map(
          async (arg) => await processArg({ arg, chainId, localABIs, appState })
        )
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
  localABIs = {},
  appState,
  arg,
}: {
  safeId?: string;
  chainId: ValidNetwork;
  arg: EstmimateGas;
  appState: ArbitraryState;
  localABIs?: Record<string, ABI>;
}) => {
  if (!safeId) throw new Error('Safe ID is required to estimate gas');

  const proposalData = await handleMulticallArg({
    localABIs,
    chainId,
    appState,
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
    const buffer = arg.bufferPercentage ? `1.${arg.bufferPercentage}` : 1.3;
    return Math.round(Number(estimate.safeTxGas) * Number(buffer));
  } else {
    throw new Error(`Failed to estimate gas: `);
  }
};
export const encodeMultiAction = (rawMulti: MetaTransaction[]) => {
  return encodeFunction(LOCAL_ABI.GNOSIS_MULTISEND, 'multiSend', [
    encodeMultiSend(rawMulti),
  ]);
};

export const buildMultiCallTX = ({
  id,
  baalAddress = CURRENT_DAO,
  actions,
  JSONDetails = basicDetails,
}: {
  id: string;
  baalAddress?: StringSearch | Keychain | EthAddress;
  JSONDetails?: JSONDetailsSearch;
  actions: MulticallAction[];
}): TXLego => {
  return {
    id,
    method: 'submitProposal',
    contract: {
      ...BaalContractBase,
      type: 'static',
      targetAddress: baalAddress,
    },
    args: [
      {
        type: 'multicall',
        actions,
      },
      {
        type: 'proposalExpiry',
        search: `${FORM}${EXPIRY}`,
        fallback: toSeconds(14, 'days'),
      },
      {
        type: 'estimateGas',
        actions,
      },
      JSONDetails,
    ],
  };
};
