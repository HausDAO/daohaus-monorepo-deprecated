// FOR DEMONSTRATIOn
export const limitedNetworkTest = {
  '0x1': {
    chainId: '0x1',
    networkId: 1,
    name: 'Mainnet',
    symbol: 'ETH',
    rpc: `https://${import.meta.env.VITE_RIVET_KEY}.eth.rpc.rivet.cloud/`,
    explorer: 'https://etherscan.io',
  },
  '0x4': {
    chainId: '0x4',
    networkId: 4,
    name: 'Rinkeby',
    symbol: 'ETH',
    rpc: `https://${import.meta.env.VITE_RIVET_KEY}.rinkeby.rpc.rivet.cloud/`,
    explorer: 'https://rinkeby.etherscan.io',
  },
  '0x2a': {
    chainId: '0x2a',
    networkId: 42,
    name: 'Kovan',
    symbol: 'ETH',
    rpc: `https://kovan.infura.io/v3/${import.meta.env.VITE_INFURA_PROJECT_ID}`,
    explorer: 'https://kovan.etherscan.io',
  },
};
