import { isValidNetwork } from '@daohaus/common-utilities';
import { Buildable, WrappedInput } from '@daohaus/ui';
import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useDao } from '../../contexts/DaoContext';
import { getNetworkToken } from '../../utils/tokenData';

enum InputStates {
  Loading,
  InvalidNetwork = 'Invalid Network',
  CorruptTokenData = 'Corrupt Token Data',
}

export const PaymentInput = (
  props: Buildable<{ amtId?: string; addressId?: string }>
) => {
  const { daochain } = useParams();

  const { dao } = useDao();
  const { watch } = useFormContext();

  const [inputState, setInputState] = useState(InputStates.Loading);

  const networkTokenData = useMemo(() => {
    if (!dao || !isValidNetwork(daochain)) return null;
    return getNetworkToken(dao, daochain);
  }, [dao, daochain]);

  const label = networkTokenData?.name
    ? `Request ${networkTokenData.name}`
    : `Request Network Token`;

  const setmax = () => {
    return 0;
  };
  return (
    <WrappedInput
      {...props}
      id={'valueRequested'}
      label={label}
      defaultValue="0"
    />
  );
};
