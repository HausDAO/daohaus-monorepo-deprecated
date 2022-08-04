import { ethers, providers } from 'ethers';
import {
  ArbitraryState,
  ArgAggrageteType,
  ReactSetter,
  TXLego,
  ValidNetwork,
} from '@daohaus/common-utilities';
import { FindTxQuery, Haus, IFindQueryResult } from '@daohaus/dao-data';
import { TXLifeCycleFns } from '../TXBuilder';

export type TxRecord = Record<string, TXLego>;

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
    return;
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
        return;
      } catch (error) {
        onPollError?.(error);
        clearInterval(pollId);
        return;
      }
    } else {
      const error = new Error(
        'Transcaction Poll ran out of tries. There could be issues with the subgraph.'
      );
      onPollTimeout?.(error);
      return;
    }
  }, interval);
};

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
    return;
  }
};

const handleContractLego = ({ tx }: { tx: TXLego }) => {
  if (tx.contract.type === 'local') {
    return tx.contract;
  }

  // This is a placeholder for when we implemnt the arbitary
  // contract call and cache utilities
  // https://github.com/HausDAO/daohaus-monorepo/issues/403
  throw new Error('ABI not found. Remote fetching not implemented');
};

const handleRealArgs = ({ args }: { args: ArgAggrageteType }) => {
  if (Array.isArray(args)) {
    return args;
  }

  // This is a placeholder for when we implemnt the gatherArgs utils
  // https://github.com/HausDAO/daohaus-monorepo/issues/403
  throw new Error('ArgType not found. Searching not yet implemented');
};

export async function handleFireTx({
  tx,
  chainId,
  provider,
  ...rest
}: {
  tx: TXLego;
  chainId: ValidNetwork;
  provider: providers.Web3Provider;
  setTransactions: ReactSetter<TxRecord>;
  appState: ArbitraryState;
  lifeCycleFns: TXLifeCycleFns;
}) {
  const contractLego = handleContractLego({ tx });

  const { abi, keychain } = contractLego;
  const { args, method } = tx;

  const realArgs = handleRealArgs({ args });

  const networkAddress = keychain[chainId];
  if (!networkAddress) return;
  const contract = new ethers.Contract(
    networkAddress,
    abi,
    provider.getSigner().connectUnchecked()
  );

  const ethersTx = await contract.functions[method](...realArgs);

  executeTx({ tx, ethersTx, chainId, ...rest });
}
