import { ethers, providers } from 'ethers';

import {
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
}: {
  tx: TXLego;
  ethersTx: { hash: string; wait: () => Promise<string> };
  setTransactions: ReactSetter<TxRecord>;
  chainId: ValidNetwork;
  lifeCycleFns?: TXLifeCycleFns;
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
  ...rest
}: {
  tx: TXLego;
  chainId: ValidNetwork;
  safeId?: string;
  provider: providers.Web3Provider;
  setTransactions: ReactSetter<TxRecord>;
  appState: ArbitraryState;
  lifeCycleFns: TXLifeCycleFns;
}) {
  console.log('safeId', safeId);
  const processedContract = await processContractLego({
    contract: tx.contract,
    chainId,
  });
  console.log('processedContract', processedContract);

  const { abi, address } = processedContract;
  const { method } = tx;

  const processedArgs = await processArgs({
    tx: { ...tx, contract: processedContract },
    chainId,
    safeId,
    ...rest,
  });
  console.log('processedArgs', processedArgs);
  if (!address) return;
  const contract = new ethers.Contract(
    address,
    abi,
    provider.getSigner().connectUnchecked()
  );
  console.log('ethers contract', contract);
  const ethersTx = await contract.functions[method](...processedArgs);

  executeTx({ tx, ethersTx, chainId, ...rest });
}
