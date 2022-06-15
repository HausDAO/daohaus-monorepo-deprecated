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
import { FindTxQuery, Haus, QueryResult } from '@daohaus/dao-data';

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
    onPollSuccess?: () => void;
  };
};

export type TxRecord = Record<string, TX>;

export const executeTx = async (
  tx: TX,
  // Review, does not appear that ethers returns a type for
  // tx.hash or tx.wait. Need to use any for now.
  ethersTx: any,
  setTransactions: ReactSetter<TxRecord>
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

type PollFetch<T> = (...args: any) => Promise<QueryResult<T> | undefined>;
type PollTest<T> = (result?: QueryResult<T>) => boolean;

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
  onPollSuccess?: () => void;
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
    // Review debating whether this query needs to be inside HAUS class
    // Sort of annoying that I have to initialize with network config
    // for every query. hardcoding to DH defaults for now.
    // let's discuss.
    const TEMPORARY_RPC = {
      '0x1': `https://${import.meta.env.VITE_RIVET_KEY}.eth.rpc.rivet.cloud/`,
      '0x4': `https://${
        import.meta.env.VITE_RIVET_KEY
      }.rinkeby.rpc.rivet.cloud/`,
      '0x2a': `https://kovan.infura.io/v3/${
        import.meta.env.VITE_INFURA_PROJECT_ID
      }`,
      '0x64': 'https://rpc.gnosischain.com/',
      '0xa': 'https://mainnet.optimism.io',
      '0x89': 'https://polygon-rpc.com/',
      '0xa4b1': 'https://arb1.arbitrum.io/rpc',
      '0xa4ec': 'https://forno.celo.org',
    };

    const temporarySupportedNetworks = addKeychain(
      ENDPOINTS.EXPLORER,
      'explorer',
      addKeychain(TEMPORARY_RPC, 'rpc')
    );

    const haus = Haus.create(temporarySupportedNetworks);
    const result = await haus.query.findTransaction({
      networkId: chainId,
      txHash,
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};

const testLastTx = (result: QueryResult<FindTxQuery> | undefined) => {
  console.log('test');
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
  console.log('Start Poll');
  let count = 0;
  const pollId = setInterval(async () => {
    if (count < maxTries) {
      try {
        const result = await poll(variables);
        console.log('fetch result', result);
        const testPassed = test(result);
        console.log('test result', testPassed);
        if (testPassed) {
          clearInterval(pollId);
          onPollSuccess?.();
          return result;
        }

        count += 1;
        console.log('count', count);
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

const testPoll = () => {
  standardGraphPoll({
    poll: pollLastTX,
    test: testLastTx,
    variables: {
      chainId: '0x5',
      txHash:
        '0x5e5e6a5405b19b3a49097603af778ba8e78c2daff4ecd770e30badd53142d9c0',
    },
  });
};

testPoll();

export const handleFireTx = async ({
  tx,
  chainId,
  provider,
  setTransactions,
}: {
  tx: TX;
  chainId: ValidNetwork;
  provider: providers.Web3Provider;
  setTransactions: ReactSetter<TxRecord>;
}) => {
  const { abi, keychain, args, txName } = tx;
  const networkAddress = keychain[chainId];
  if (!networkAddress) return;
  const contract = new ethers.Contract(
    networkAddress,
    abi,
    provider.getSigner().connectUnchecked()
  );
  const ethersTx = await contract.functions[txName](...args);
  executeTx(tx, ethersTx, setTransactions);
};
