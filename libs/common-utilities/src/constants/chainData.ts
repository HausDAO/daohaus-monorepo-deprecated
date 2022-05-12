type NetworkType = {
  id: string;
  name: string;
};

export const networkData: Record<string, NetworkType> = {
  '0x1': {
    id: '0x1',
    name: 'Ethereum',
  },
  '0x4': {
    id: '0x4',
    name: 'Rinkeby',
  },
  '0x2a': {
    id: '0x2a',
    name: 'Kovan',
  },
  '0x64': {
    id: '0x64',
    name: 'Gnosis Chain',
  },
};

export const getNetwork = (chainId: string) => {
  if (!networkData[chainId]) {
    return null;
  }
  return networkData[chainId];
};

export const getNetworkName = (chainId: string) => getNetwork(chainId)?.name;
