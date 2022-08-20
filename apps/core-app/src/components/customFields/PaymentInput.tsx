import { Buildable, WrappedInputSelect } from '@daohaus/ui';
import React, { useMemo } from 'react';
import { useDao } from '../../contexts/DaoContext';

export const PaymentInput = (
  props: Buildable<{ amtId?: string; addressId?: string }>
) => {
  const { amtId = 'paymentAmt', addressId = 'paymentAddress' } = props;
  const { dao } = useDao();

  const daoTokens = useMemo(() => {
    console.log('dao', dao);
  }, [dao]);

  return <WrappedInputSelect {...props} selectId={addressId} options={[]} />;
};
