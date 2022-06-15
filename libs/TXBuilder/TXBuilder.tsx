import { ethers, providers } from 'ethers';
import { createContext, useState, useMemo } from 'react';
import {
  ABI,
  ArgType,
  isValidNetwork,
  Keychain,
  ValidNetwork,
} from '../common-utilities/src';

enum TxStates {
  idle,
  submitting,
  polling,
  failed,
  success,
}

type TxRecord = Record<string, TxStates>;
type TxContext = {
  transactions: TxRecord;
  txAmt: number;
  fireTransaction: (tx: TX) => void;
};

type TX = {
  txHash: string;
  abi: ABI;
  txName: string;
  args: ArgType[];
  keychain: Keychain;
  lifeCycleFns?: {
    onTxHash?: (txHash: string) => void;
    onTxError?: (error: Error) => void;
    onTxSuccess?: (txHash: string) => void;
    onPollFire?: () => void;
    onPollError?: (error: Error) => void;
    onPollSuccess?: () => void;
  };
};

export const TxBuilderContext = createContext<TxContext>({
  transactions: {},
  fireTransaction: () => undefined,
  txAmt: 0,
});

type BuilderProps = {
  chainId: ValidNetwork | undefined | null;
  provider: providers.Web3Provider;
};

export const TXBuilder = ({ chainId, provider }: BuilderProps) => {
  const [transactions, setTransactions] = useState<TxRecord>({});
  const txAmt = useMemo(() => {
    return Object.values(transactions).length;
  }, [transactions]);

  const fireTransaction = async ({
    abi,
    keychain,
    args,
    lifeCycleFns,
    txName,
  }: TX) => {
    // TODO: Handle this error
    if (!chainId || !isValidNetwork(chainId) || !provider) return;

    try {
      const networkAddress = keychain[chainId];
      const contract = new ethers.Contract(
        networkAddress,
        abi,
        provider.getSigner().connectUnchecked()
      );

      const tx = await contract.functions[txName](...args);
      lifeCycleFns?.onTxHash?.(tx.hash);
      const reciept = await tx.wait();
      lifeCycleFns?.onTxSuccess?.(reciept);
      return {
        reciept,
        txHash: tx.hash,
      };
    } catch (error) {
      console.error(error);
      lifeCycleFns?.onTxError?.(error);
    }
  };

  return (
    <TxBuilderContext.Provider
      value={{ transactions, fireTransaction, txAmt }}
    ></TxBuilderContext.Provider>
  );
};
