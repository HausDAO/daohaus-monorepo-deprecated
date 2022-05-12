type AvaialbleNetwork = '0x1' | '0x4' | '0x2a' | '0x64';
type NetworkType = {
  id: AvaialbleNetwork;
  name: string;
};

export const networkData: Record<AvaialbleNetwork, NetworkType> = {
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
