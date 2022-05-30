import { Keychain, NetworkType, ValidNetwork } from '../types';

export const VALID_NETWORKS = {
  '0x1': true,
  '0x5': true,
  '0x64': true,
  '0xa': true,
  '0x89': true,
  '0xa4b1': true,
  '0xa4ec': true,
};

export const isValidNetwork = (
  string: string,
  networks?: Keychain<unknown>
): string is ValidNetwork =>
  networks
    ? networks[string as ValidNetwork] !== undefined
    : VALID_NETWORKS[string as ValidNetwork] !== undefined;

export const networkData: Keychain<NetworkType> = {
  '0x1': {
    chainId: '0x1',
    networkId: 1,
    name: 'Mainnet',
    symbol: 'ETH',
  },
  '0x5': {
    chainId: '0x5',
    networkId: 5,
    name: 'Goerli',
    symbol: 'ETH',
  },
  '0x64': {
    chainId: '0x64',
    networkId: 100,
    name: 'Gnosis Chain',
    symbol: 'xDAI',
  },
  '0xa': {
    chainId: '0xa',
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

export const extractKeychain = (
  networkList: Keychain<NetworkType>,
  property: string
) => {
  return Object.values(networkList).reduce((acc, network) => {
    const { chainId } = network;
    return network[property]
      ? {
          ...acc,
          [chainId]: network[property],
        }
      : acc;
  }, {});
};
