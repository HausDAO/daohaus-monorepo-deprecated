import { isValidNetwork, toWholeUnits } from '@daohaus/common-utilities';
import { Buildable, Button, WrappedInputSelect } from '@daohaus/ui';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useDao } from '../../contexts/DaoContext';
import { getErc20s, TokenData } from '../../utils/tokenData';

export enum InputStates {
  Loading,
  InvalidNetwork = 'Invalid Network',
  CorruptTokenData = 'Corrupt Token Data',
}

const getTokenBalance = (
  erc20s: TokenData[] | null,
  paymentTokenAddr: string
) => {
  if (!Array.isArray(erc20s) || !paymentTokenAddr) {
    return '';
  }
  const token = erc20s.find(({ address }) => address === paymentTokenAddr);

  return toWholeUnits(token?.daoBalance || '0', token?.decimals);
};

export const RequestERC20 = (
  props: Buildable<{ amtId?: string; addressId?: string }>
) => {
  const { daochain } = useParams();
  const { amtId = 'paymentTokenAmt', addressId = 'paymentTokenAddress' } =
    props;
  const { dao } = useDao();
  const { watch } = useFormContext();

  const paymentTokenAddr = watch(addressId);

  const erc20s = useMemo(() => {
    if (dao && isValidNetwork(daochain)) {
      return getErc20s(dao);
    }
    return null;
  }, [dao, daochain]);

  const selectOptions = useMemo(() => {
    if (erc20s) {
      const options = erc20s.map((token) => ({
        name: token.symbol,
        value: token.address,
      }));

      return options;
    }
  }, [erc20s]);
  const tokenBalance = getTokenBalance(erc20s, paymentTokenAddr);

  return (
    <WrappedInputSelect
      {...props}
      id={amtId}
      label="Request ERC-20"
      defaultValue="0"
      selectId={addressId}
      selectPlaceholder="--"
      options={selectOptions || []}
      rightAddon={
        <Button secondary sm>
          Max: {tokenBalance}
        </Button>
      }
    />
  );
};
