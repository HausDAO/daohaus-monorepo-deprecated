import { Keychain, NetworkType, ValidNetwork } from '../types';
import { isString } from '../utils';

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
  str: unknown,
  networks?: Keychain<unknown>
): str is ValidNetwork =>
  isString(str) && networks
    ? networks[str as ValidNetwork] !== undefined
    : VALID_NETWORKS[str as ValidNetwork] !== undefined;

export const networkData: Keychain<NetworkType> = {
  '0x5': {
    chainId: '0x5',
    networkId: 5,
    name: 'Goerli',
    symbol: 'ETH',
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
