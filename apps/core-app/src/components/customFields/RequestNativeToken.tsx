import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import {
  isValidNetwork,
  toWholeUnits,
  handleBaseUnits,
} from '@daohaus/common-utilities';
import { Buildable, Button, WrappedInput } from '@daohaus/ui';

import { useDao } from '@daohaus/dao-context';
import { getNetworkToken } from '../../utils/tokenData';

// enum InputStates {
//   Loading,
//   InvalidNetwork = 'Invalid Network',
//   CorruptTokenData = 'Corrupt Token Data',
// }

export const RequestNativeToken = (
  props: Buildable<{ amtId?: string; addressId?: string }>
) => {
  const { id = 'valueRequested' } = props;
  const { daochain } = useParams();
  const { setValue } = useFormContext();
  const { dao } = useDao();

  // const [inputState, setInputState] = useState(InputStates.Loading);

  const networkTokenData = useMemo(() => {
    if (!dao || !isValidNetwork(daochain)) return null;
    return getNetworkToken(dao, daochain);
  }, [dao, daochain]);

  const label = networkTokenData?.name
    ? `Request ${networkTokenData.name}`
    : `Request Network Token`;

  const setMax = () => {
    setValue(
      id,
      toWholeUnits(
        networkTokenData?.daoBalance || '0',
        networkTokenData?.decimals
      )
    );
  };

  const newRules: RegisterOptions = {
    setValueAs: (value) => handleBaseUnits(value, 18),
    ...props.rules,
  };

  return (
    <WrappedInput
      {...props}
      id={id}
      label={label}
      defaultValue="0"
      rightAddon={
        <Button secondary sm onClick={setMax} type="button">
          Max:{' '}
          {toWholeUnits(
            networkTokenData?.daoBalance || '0',
            networkTokenData?.decimals
          )}
        </Button>
      }
      rules={newRules}
    />
  );
};
