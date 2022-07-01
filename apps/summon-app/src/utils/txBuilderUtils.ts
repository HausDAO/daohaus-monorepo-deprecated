import { ethers, providers } from 'ethers';
import {
  ABI,
  addKeychain,
  ArgType,
  ENDPOINTS,
  Keychain,
  ReactSetter,
  ValidNetwork,
} from '@daohaus/common-utilities';
import { FindTxQuery, Haus, IFindQueryResult } from '@daohaus/dao-data';

export type TxStates = 'idle' | 'submitting' | 'polling' | 'failed' | 'success';
export type TX = {
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
    onPollSuccess?: (result: IFindQueryResult<FindTxQuery> | undefined) => void;
  };
};

export type TxRecord = Record<string, TX>;

// TS Challenge

// Need to be able to have a generic poll
// that we can pass in any shape of argume
// eslint-disable-next-line
type PollFetch<T> = (...args: any) => Promise<IFindQueryResult<T> | undefined>;
type PollTest<T> = (result?: IFindQueryResult<T>) => boolean;

type Poll<T> = ({
  poll,
  test,
  interval,
  variables,
  maxTries,
}: {
  poll: PollFetch<T>;
  test: PollTest<T>;
  interval?: number;
  variables: Parameters<typeof poll>;
  onPollSuccess?: (result: IFindQueryResult<FindTxQuery> | undefined) => void;
  onPollError?: (error: unknown) => void;
  onPollTimeout?: (error: unknown) => void;
  maxTries?: number;
}) => void;

export const pollLastTX: PollFetch<FindTxQuery> = async ({
  chainId,
  txHash,
}: {
  chainId: ValidNetwork;
  txHash: string;
}) => {
  try {
    const haus = Haus.create();
    const result = await haus.query.findTransaction({
      networkId: chainId,
      txHash,
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};

const testLastTx = (result: IFindQueryResult<FindTxQuery> | undefined) => {
  if (result?.data?.transaction) {
    return true;
  }
  return false;
};

const standardGraphPoll: Poll<FindTxQuery> = async ({
  poll,
  test,
  interval = 5000,
  variables,
  onPollSuccess,
  onPollError,
  onPollTimeout,
  maxTries = 12,
}) => {
  let count = 0;
  const pollId = setInterval(async () => {
    if (count < maxTries) {
      try {
        const result = await poll(variables);
        console.log('result', result);
        const testPassed = test(result);
        if (testPassed) {
          console.log('TEST PASSED');
          console.log('result', result);
          onPollSuccess?.(result);
          clearInterval(pollId);
          return result;
        }
        count += 1;
      } catch (error) {
        onPollError?.(error);
        clearInterval(pollId);
      }
    } else {
      const error = new Error(
        'Transcaction Poll ran out of tries. There could be issues with the subgraph.'
      );
      onPollTimeout ? onPollTimeout?.(error) : onPollError?.(error);
    }
  }, interval);
};

export const executeTx = async (
  tx: TX,
  // TS Challenge

  // Could not find a reasonable solution to this.
  // Ethers return any. Could possibly pass a generic to
  // from a typechain generated Contract client
  // Leaving this for now as we're seeing dimishing returns here.
  ethersTx: { hash: string; wait: () => Promise<string> },
  setTransactions: ReactSetter<TxRecord>,
  chainId: ValidNetwork
) => {
  const { lifeCycleFns } = tx;
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
      test: testLastTx,
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
  }
};

export async function handleFireTx({
  tx,
  chainId,
  provider,
  setTransactions,
}: {
  tx: TX;
  chainId: ValidNetwork;
  provider: providers.Web3Provider;
  setTransactions: ReactSetter<TxRecord>;
}) {
  const { abi, keychain, args, txName } = tx;
  const networkAddress = keychain[chainId];
  if (!networkAddress) return;
  const contract = new ethers.Contract(
    networkAddress,
    abi,
    provider.getSigner().connectUnchecked()
  );

  const ethersTx = await contract.functions[txName](...args);
  return executeTx(tx, ethersTx, setTransactions, chainId);
}
