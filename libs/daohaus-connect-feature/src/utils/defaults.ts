import { IProviderOptions } from 'web3modal';
// import WalletConnectProvider from '@walletconnect/ethereum-provider';
import { addKeychain, ENDPOINTS } from '@daohaus/common-utilities';
import { TEMPORARY_RPC } from './common';

// export const SUPPORTED_NETWORKS: NetworkConfig = {
//   '0x1': {
//     chainId: '0x1',
//     name: 'Mainnet',
//     symbol: 'ETH',
//     explorer: 'https://etherscan.io',
//     rpc: `https://${import.meta.env.VITE_RIVET_KEY}.eth.rpc.rivet.cloud/`,
//   },
//   '0x4': {
//     chainId: '0x4',
//     name: 'Rinkeby',
//     symbol: 'ETH',
//     explorer: 'https://rinkeby.etherscan.io',
//     rpc: `https://${import.meta.env.VITE_RIVET_KEY}.rinkeby.rpc.rivet.cloud/`,
//   },
//   '0x89': {
//     chainId: '0x89',
//     name: 'Polygon',
//     symbol: 'MATIC',
//     explorer: 'https://polygonscan.com',
//     rpc: 'https://polygon-rpc.com/',
//   },
// };
export const supportedNetworks = addKeychain(
  ENDPOINTS.EXPLORER,
  'explorer',
  addKeychain(TEMPORARY_RPC, 'rpc')
);

const providerOptions: IProviderOptions = {
  // authereum: {
  //   package: Authereum,
  // },
  // frame: {
  //   package: ethProvider,
  // },
  // portis: {
  //   package: Portis,
  //   options: {
  //     // Get the DAPP ID at https://dashboard.portis.io/
  //     id: 'YOUR-PORTIS-DAPP-ID',
  //   },
  // },
  // walletconnect: {
  //   package: WalletConnectProvider,
  //   options: {
  //     rpc: {
  //       // 1: networks['0x1'].rpc,
  //       // 4: networks['0x4'].rpc,
  //       // 1337: networks['0x539'].rpc,
  //     },
  //   },
  // },
};

export const web3modalDefaults = {
  cacheProvider: true,
  providerOptions,
  theme: 'dark',
};

export const MAINNET_ID = '0x1';

export const defaultWalletValues = {
  provider: null,
  chainId: null,
  address: null,
  profile: null,
  connectWallet: async () => undefined,
  disconnect: () => undefined,
  isConnecting: true,
  isConnected: false,
  isMetamask: false,
  networks: {},
  switchNetwork: () => undefined,
  isProfileLoading: false,
};
