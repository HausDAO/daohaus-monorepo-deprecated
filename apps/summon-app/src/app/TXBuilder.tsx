import { ethers, providers } from 'ethers';
import {
  createContext,
  useState,
  useMemo,
  useContext,
  ReactNode,
  Children,
} from 'react';
import {
  ABI,
  ArgType,
  isValidNetwork,
  Keychain,
  ValidNetwork,
} from '@daohaus/common-utilities';

type TxStates = 'idle' | 'submitting' | 'polling' | 'failed' | 'success';

type TX = {
  txName: string;
  status?: TxStates;
  abi: ABI;
  args: ArgType[];
  keychain: Keychain;
  lifeCycleFns?: {
    onTxHash?: (txHash: string) => void;
    onTxError?: (error: unknown) => void;
    onTxSuccess?: (txHash: string) => void;
    onPollFire?: () => void;
    onPollError?: (error: unknown) => void;
    onPollSuccess?: () => void;
  };
};

type TxRecord = Record<string, TX>;
type TxContext = {
  transactions: TxRecord;
  txAmt: number;
  fireTransaction: (tx: TX) => void;
};

export const TxBuilderContext = createContext<TxContext>({
  transactions: {},
  fireTransaction: () => undefined,
  txAmt: 0,
});

type BuilderProps = {
  chainId: string | undefined | null;
  provider: providers.Web3Provider | undefined | null;
  children: ReactNode;
};

export const TXBuilder = ({ chainId, provider, children }: BuilderProps) => {
  const [transactions, setTransactions] = useState<TxRecord>({});
  const txAmt = useMemo(() => {
    return Object.values(transactions).length;
  }, [transactions]);

  const _executeTx = async (
    tx: TX,
    // Review, does not appear that ethers returns a type for
    // tx.hash or tx.wait. Need to use any for now.
    ethersTx: any
  ) => {
    const { lifeCycleFns } = tx;
    try {
      lifeCycleFns?.onTxHash?.(ethersTx.hash);
      setTransactions((prevState) => ({
        ...prevState,
        [ethersTx.hash]: { ...tx, status: 'loading' },
      }));
      const reciept = await ethersTx.wait();
      setTransactions((prevState) => ({
        ...prevState,
        [ethersTx.hash]: { ...tx, status: 'success' },
      }));
      lifeCycleFns?.onTxSuccess?.(reciept);
      return {
        reciept,
        txHash: ethersTx.hash,
      };
    } catch (error) {
      console.error(error);
      lifeCycleFns?.onTxError?.(error);
      setTransactions((prevState) => ({
        ...prevState,
        [ethersTx?.hash]: { ...tx, status: 'error' },
      }));
    }
  };

  const fireTransaction = async (tx: TX) => {
    const { abi, keychain, args, lifeCycleFns, txName, status = 'idle' } = tx;

    if (!chainId || !isValidNetwork(chainId) || !provider) return;

    const networkAddress = keychain[chainId];

    //TODO handle Error

    if (!networkAddress) return;
    const contract = new ethers.Contract(
      networkAddress,
      abi,
      provider.getSigner().connectUnchecked()
    );
    const ethersTx = await contract.functions[txName](...args);
    _executeTx(tx, ethersTx);
  };

  return (
    <TxBuilderContext.Provider value={{ transactions, fireTransaction, txAmt }}>
      {children}
    </TxBuilderContext.Provider>
  );
};
export const useTxBuilder = () => useContext(TxBuilderContext);
