import { ethers, providers } from 'ethers';

import {
  ABI,
  ArbitraryState,
  ReactSetter,
  TXLego,
  ValidNetwork,
} from '@daohaus/common-utilities';

import { pollLastTX, standardGraphPoll, testLastTX } from './polling';
import { processArgs } from './args';
import { processContractLego } from './contractHelpers';
import { ArgCallback, TXLifeCycleFns } from '../TXBuilder';

export type TxRecord = Record<string, TXLego>;
export type MassState = {
  tx: TXLego;
  chainId: ValidNetwork;
  safeId?: string;
  daoid?: string;
  localABIs: Record<string, ABI>;
  appState: ArbitraryState;
};

// The console logs below are to help devs monitor and debug their txs.

export const executeTx = async (args: {
  tx: TXLego;
  ethersTx: { hash: string; wait: () => Promise<string> };
  setTransactions: ReactSetter<TxRecord>;
  chainId: ValidNetwork;
  lifeCycleFns?: TXLifeCycleFns;
}) => {
  const { tx, ethersTx, setTransactions, chainId, lifeCycleFns } = args;
  console.log('**Transaction Initatiated**');
  const txHash = ethersTx.hash;
  console.log('txHash', txHash);
  try {
    lifeCycleFns?.onTxHash?.(ethersTx.hash);
    setTransactions((prevState) => ({
      ...prevState,
      [txHash]: { ...tx, status: 'idle' },
    }));
    console.log('**Transaction Pending**');
    const reciept = await ethersTx.wait();

    setTransactions((prevState) => ({
      ...prevState,
      [txHash]: { ...tx, status: 'polling' },
    }));
    console.log('**Transaction Successful**');
    lifeCycleFns?.onTxSuccess?.(reciept);

    standardGraphPoll({
      poll: pollLastTX,
      test: testLastTX,
      variables: {
        chainId,
        txHash,
      },
      onPollStart() {
        lifeCycleFns?.onPollStart?.();
        console.log('**Polling**');
      },
      onPollSuccess(result) {
        lifeCycleFns?.onPollSuccess?.(result);
        console.log('**Poll Successful**');
        setTransactions((prevState) => ({
          ...prevState,
          [txHash]: { ...tx, status: 'success' },
        }));
      },
      onPollError(error) {
        lifeCycleFns?.onPollError?.(error);
        console.log('**Poll Error**');
        setTransactions((prevState) => ({
          ...prevState,
          [txHash]: { ...tx, status: 'pollFailed' },
        }));
      },
    });
    return {
      reciept,
      txHash,
    };
  } catch (error) {
    console.log('**TX Error**');
    console.error(error);
    lifeCycleFns?.onTxError?.(error);
    setTransactions((prevState) => ({
      ...prevState,
      [txHash]: { ...tx, status: 'failed' },
    }));
    return;
  }
};

export async function prepareTX(args: {
  tx: TXLego;
  chainId: ValidNetwork;
  safeId?: string;
  provider: providers.Web3Provider;
  setTransactions: ReactSetter<TxRecord>;
  appState: ArbitraryState;
  lifeCycleFns: TXLifeCycleFns;
  localABIs: Record<string, ABI>;
  argCallbackRecord: Record<string, ArgCallback>;
}) {
  const {
    argCallbackRecord,
    tx,
    chainId,
    safeId,
    provider,
    localABIs,
    lifeCycleFns,
    appState,
  } = args;
  console.log('**APPLICATION STATE**', appState);
  try {
    const processedContract = await processContractLego({
      localABIs,
      contract: tx.contract,
      chainId,
    });
    console.log('**PROCESSED CONTRACT**', processedContract);

    const { abi, address } = processedContract;
    const { method } = tx;

    const processedArgs = await processArgs({
      tx: { ...tx, contract: processedContract },
      localABIs,
      chainId,
      safeId,
      appState,
      argCallbackRecord,
    });
    console.log('**PROCESSED ARGS**', processedArgs);
    if (!address) return;
    const contract = new ethers.Contract(
      address,
      abi,
      provider.getSigner().connectUnchecked()
    );
    lifeCycleFns?.onRequestSign?.();
    const ethersTx = await contract.functions[method](...processedArgs);
    executeTx({ ...args, ethersTx });
  } catch (error) {
    console.log('**TX Error (Pre-Fire)**');
    console.error(error);
    lifeCycleFns?.onTxError?.(error);
  }
}
