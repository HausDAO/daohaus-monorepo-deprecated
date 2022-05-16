import { Keychain, ValidNetwork } from '../types';

type ValidKey = string | number | symbol;

type NetworkType = {
  chainId: string;
  networkId: number;
  name: string;
  symbol: string;
  [index: string]: ValidKey | Record<ValidKey, unknown>;
};

export const VALID_NETWORKS = {
  '0x1': true,
  '0x4': true,
  '0x2a': true,
  '0x64': true,
  '0xa': true,
  '0x89': true,
  '0xa4b1': true,
  '0xa4ec': true,
};

export const isValidNetwork = (string: string): string is ValidNetwork =>
  VALID_NETWORKS[string as ValidNetwork] !== undefined;

export const networkData: Keychain<NetworkType> = {
  '0x1': {
    chainId: '0x1',
    networkId: 1,
    name: 'Mainnet',
    symbol: 'ETH',
  },
  '0x4': {
    chainId: '0x4',
    networkId: 4,
    name: 'Rinkeby',
    symbol: 'ETH',
  },
  '0x2a': {
    chainId: '0x2a',
    networkId: 42,
    name: 'Kovan',
    symbol: 'ETH',
  },
  '0x64': {
    chainId: '0x64',
    networkId: 100,
    name: 'Gnosis Chain',
    symbol: 'xDAI',
  },
  '0xa': {
    chainId: '0x64',
    networkId: 10,
    name: 'Optimism Mainnet',
    symbol: 'ETH',
  },
  '0x89': {
    chainId: '0x89',
    networkId: 137,
    name: 'Polygon',
    symbol: 'MATIC',
  },
  '0xa4b1': {
    chainId: '0xa4b1',
    networkId: 42161,
    name: 'Arbitrum',
    symbol: 'ETH',
  },
  '0xa4ec': {
    chainId: '0xa4ec',
    networkId: 42220,
    name: 'Celo',
    symbol: 'CELO',
  },
};

export const getNetwork = (chainId: string) => {
  if (!isValidNetwork(chainId)) {
    return null;
  }
  return networkData[chainId];
};

export const getNetworkName = (chainId: string) => getNetwork(chainId)?.name;

export const addKeychain = (
  keychain: Keychain<unknown>,
  property: string,
  networkList: Keychain<NetworkType> = networkData
) => {
  return Object.values(networkList).reduce((acc, networkObj) => {
    const { chainId } = networkObj;
    if (!isValidNetwork(chainId)) {
      console.warn(`Invalid network: ${chainId}`);
      return acc;
    }
    return {
      ...acc,
      [chainId]: {
        ...networkObj,
        [property]: keychain[chainId],
      },
    };
  }, {});
};
