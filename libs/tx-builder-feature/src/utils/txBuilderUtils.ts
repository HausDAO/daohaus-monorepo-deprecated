import { ethers, providers } from 'ethers';

import {
  ABI,
  ArbitraryState,
  ReactSetter,
  TXLego,
  ValidNetwork,
} from '@daohaus/common-utilities';

import { TXLifeCycleFns } from '../TXBuilder';
import { pollLastTX, standardGraphPoll, testLastTX } from './polling';
import { processArgs } from './args';
import { processContractLego } from './contractHelpers';

export type TxRecord = Record<string, TXLego>;

export const executeTx = async ({
  tx,
  ethersTx,
  setTransactions,
  chainId,
  lifeCycleFns,
  localABIs,
}: {
  tx: TXLego;
  ethersTx: { hash: string; wait: () => Promise<string> };
  setTransactions: ReactSetter<TxRecord>;
  chainId: ValidNetwork;
  lifeCycleFns?: TXLifeCycleFns;
  localABIs?: Record<string, ABI>;
}) => {
  const txHash = ethersTx.hash;

  try {
    lifeCycleFns?.onTxHash?.(ethersTx.hash);
    setTransactions((prevState) => ({
      ...prevState,
      [txHash]: { ...tx, status: 'idle' },
    }));
    const reciept = await ethersTx.wait();

    setTransactions((prevState) => ({
      ...prevState,
      [txHash]: { ...tx, status: 'polling' },
    }));
    lifeCycleFns?.onTxSuccess?.(reciept);

    standardGraphPoll({
      poll: pollLastTX,
      test: testLastTX,
      variables: {
        chainId,
        txHash,
      },
      onPollSuccess(result) {
        lifeCycleFns?.onPollSuccess?.(result);
        setTransactions((prevState) => ({
          ...prevState,
          [txHash]: { ...tx, status: 'success' },
        }));
      },
    });
    return {
      reciept,
      txHash,
    };
  } catch (error) {
    console.error(error);
    lifeCycleFns?.onTxError?.(error);
    setTransactions((prevState) => ({
      ...prevState,
      [txHash]: { ...tx, status: 'failed' },
    }));
    return;
  }
};

export async function prepareTX({
  tx,
  chainId,
  safeId,
  provider,
  localABIs,
  ...rest
}: {
  tx: TXLego;
  chainId: ValidNetwork;
  safeId?: string;
  provider: providers.Web3Provider;
  setTransactions: ReactSetter<TxRecord>;
  appState: ArbitraryState;
  lifeCycleFns: TXLifeCycleFns;
  localABIs?: Record<string, ABI>;
}) {
  const processedContract = await processContractLego({
    contract: tx.contract,
    chainId,
  });

  const { abi, address } = processedContract;
  const { method } = tx;

  const processedArgs = await processArgs({
    tx: { ...tx, contract: processedContract },
    chainId,
    safeId,
    ...rest,
  });
  if (!address) return;
  const contract = new ethers.Contract(
    address,
    abi,
    provider.getSigner().connectUnchecked()
  );
  const ethersTx = await contract.functions[method](...processedArgs);

  executeTx({ tx, ethersTx, chainId, ...rest });
}
