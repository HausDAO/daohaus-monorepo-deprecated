import {
  NetworkType,
  NETWORK_DATA,
  ReactSetter,
  ValidNetwork,
} from '@daohaus/common-utilities';
import { DaoWithTokenData, TokenBalance } from '@daohaus/dao-data';

const isNetworkToken = (tokenData: TokenBalance) => {
  return !tokenData.token;
};

type TokenData = {
  decimals: number;
  name: string;
  symbol: string;
  daoBalance: string;
  address: string;
};

export const getErc20s = (daoData: DaoWithTokenData) => {
  return daoData.tokenBalances.reduce(
    (acc: TokenData[], tokenData: TokenBalance) => {
      if (!isNetworkToken(tokenData)) {
        return [
          ...acc,
          {
            daoBalance: tokenData.balance,
            decimals: tokenData.token?.decimals || 18,
            address: tokenData.tokenAddress || 'Error: Data Missing',
            name: tokenData.token?.name || 'Error: Data Missing',
            symbol: tokenData.token?.symbol || 'Error: Data Missing',
          },
        ];
      }
      return acc;
    },
    []
  );
};

export const getNetworkToken = (
  daoData: DaoWithTokenData,
  daochain: ValidNetwork
) => {
  const networkData = NETWORK_DATA[daochain];
  const networkToken = daoData.tokenBalances.find(isNetworkToken);

  if (networkToken && networkData) {
    return {
      daoBalance: networkToken.balance,
      decimals: networkData.tokenDecimals,
      symbol: networkData.symbol,
      name:
        daochain === '0x1'
          ? 'ETH'
          : `${networkData.symbol} on ${networkData.name}`,
    };
  }
  return null;
};
