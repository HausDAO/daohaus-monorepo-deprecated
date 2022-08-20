import {
  isValidNetwork,
  NetworkType,
  NETWORK_DATA,
  ValidNetwork,
} from '@daohaus/common-utilities';
import { DaoWithTokenData, TokenBalance } from '@daohaus/dao-data';
import { Buildable, WrappedInputSelect } from '@daohaus/ui';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDao } from '../../contexts/DaoContext';

const isNetworkToken = (tokenData: TokenBalance) => {
  return !tokenData.token;
};

const processDaoTokenData = (
  tokenData: DaoWithTokenData,
  daochain: ValidNetwork
) => {
  return tokenData.tokenBalances.map((tokenData) => {
    if (isNetworkToken(tokenData)) {
      const tokenDecimals = NETWORK_DATA[daochain];
      // const decimals = network.decimals;

      return {
        daoBalance: tokenData.balance,
        // decimals:
      };
    }

    return {
      daoBalance: tokenData.balance,
      decimals: tokenData.token?.decimals,
      address: tokenData.tokenAddress,
      name: tokenData.token?.name,
    };
  });
};

export const PaymentInput = (
  props: Buildable<{ amtId?: string; addressId?: string }>
) => {
  const { daochain } = useParams();
  const { amtId = 'paymentAmt', addressId = 'paymentAddress' } = props;
  const { dao } = useDao();

  const daoTokens = useMemo(() => {
    console.log('dao', dao);
  }, [dao]);

  return (
    <WrappedInputSelect
      {...props}
      id={amtId}
      selectId={addressId}
      options={[]}
    />
  );
};
