import { DaoWithTokenData, TokenBalance } from '@daohaus/dao-data';
import {
  Buildable,
  InputSelectProps,
  OptionType,
  WrappedInputSelect,
} from '@daohaus/ui';
import { useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useDao } from '../../contexts/DaoContext';

type TributeInputProps = Omit<InputSelectProps, 'options'>;

const detectEth = (tokenData: TokenBalance) => {
  return (
    tokenData.ethValue === '1.0' && !tokenData.tokenAddress && !tokenData.token
  );
};

const tokenArrayFromDaoContext = (dao: DaoWithTokenData) => {
  return dao.tokenBalances.map((token) => {
    if (detectEth(token)) {
      return {
        name: 'ETH',
        value: token.tokenAddress || 'Data Missing',
      };
    }
    return {
      name: token?.token?.name || 'Error',
      value: token.tokenAddress || 'Data Missing',
    };
  });
};

export const TributeInput = (props: Buildable<TributeInputProps>) => {
  const { id } = props;
  const selectId = `tokenAddress`;
  const { dao } = useDao();
  const { control } = useFormContext();
  const [tokenInputAmt, tokenAddress] = useWatch({
    name: [id, selectId],
    control,
  });

  const [userTokenData, setUserTokenData] = useState({});
  const daoTokens = useMemo(() => {
    if (dao) return tokenArrayFromDaoContext(dao);
  }, [dao]);

  useEffect(() => {}, [tokenAddress]);

  return <WrappedInputSelect {...props} options={daoTokens || []} />;
};
