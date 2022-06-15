import React, { createContext, useState, useMemo } from 'react';

enum TxStates {
  idle,
  submitting,
  polling,
  failed,
  success,
}

type TxRecord = Record<string, TxStates>;

export const TxBuilderContext = createContext({ transactions: {} });

export const TXBuilder = () => {
  const [transactions, setTransactions] = useState<TxRecord>({});
  const txAmt = useMemo(() => {
    return Object.values(transactions).length;
  }, [transactions]);
};
