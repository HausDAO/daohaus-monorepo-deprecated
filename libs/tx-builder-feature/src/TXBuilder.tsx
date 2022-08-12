import { providers } from 'ethers';
import { createContext, useState, useMemo, useContext, ReactNode } from 'react';
import {
  ABI,
  ArbitraryState,
  ArgType,
  isValidNetwork,
  TXLego,
} from '@daohaus/common-utilities';
import { TxRecord, prepareTX } from './utils/txBuilderUtils';
import { FindTxQuery, IFindQueryResult } from '@daohaus/dao-data';
import { bundleLifeCycleFns } from './utils/lifeCycleFns';

export type TXLifeCycleFns = {
  onTxHash?: (txHash: string) => void;
  onTxError?: (error: unknown) => void;
  onTxSuccess?: (txHash: string) => void;
  onPollFire?: () => void;
  onPollError?: (error: unknown) => void;
  onPollSuccess?: (result: IFindQueryResult<FindTxQuery> | undefined) => void;
};

export type LifeCycleNames = keyof TXLifeCycleFns;

type FireTransaction<CallerStateModel extends ArbitraryState = ArbitraryState> =
  ({
    tx,
    callerState,
    lifeCycleFns,
    staticArgs,
  }: {
    tx: TXLego;
    callerState?: CallerStateModel;
    lifeCycleFns?: TXLifeCycleFns;
    staticArgs?: ArgType[];
  }) => Promise<void> | void;

type TxContext = {
  transactions: TxRecord;
  txAmt: number;
  fireTransaction: FireTransaction;
  appState?: ArbitraryState;
};

export const TxBuilderContext = createContext<TxContext>({
  transactions: {},
  fireTransaction: () => undefined,
  txAmt: 0,
  appState: undefined,
});

type BuilderProps<ApplicationState extends ArbitraryState = ArbitraryState> = {
  chainId: string | undefined | null;
  safeId?: string;
  daoId?: string;
  provider: providers.Web3Provider | undefined | null;
  children: ReactNode;
  appState: ApplicationState;
  txLifeCycleFns?: TXLifeCycleFns;
  localABIs?: Record<string, ABI>;
  argCallbacks?: Record<string, (args: ArbitraryState) => ArgType[]>;
};

export const TXBuilder = ({
  chainId,
  safeId,
  daoId,
  provider,
  appState,
  children,
  localABIs = {},
  txLifeCycleFns = {},
}: BuilderProps) => {
  const [transactions, setTransactions] = useState<TxRecord>({});
  const txAmt = useMemo(() => {
    return Object.values(transactions).length;
  }, [transactions]);

  const fireTransaction: FireTransaction = async ({
    tx,
    callerState,
    lifeCycleFns = {},
  }) => {
    if (!chainId || !isValidNetwork(chainId) || !provider) {
      lifeCycleFns?.onTxError?.(
        Error('Invalid Network or no Web3 Wallet detected')
      );
      return;
    }
    const wholeState = {
      ...appState,
      ...callerState,
      chainId,
      safeId,
      daoId,
      localABIs,
    };

    await prepareTX({
      tx,
      chainId,
      safeId,
      provider,
      setTransactions,
      appState: wholeState,
      lifeCycleFns: bundleLifeCycleFns({
        appEffects: txLifeCycleFns,
        componentEffects: lifeCycleFns,
      }),
      localABIs,
    });
  };

  return (
    <TxBuilderContext.Provider
      value={{ transactions, fireTransaction, txAmt, appState }}
    >
      {children}
    </TxBuilderContext.Provider>
  );
};
export const useTxBuilder = () => useContext(TxBuilderContext);
