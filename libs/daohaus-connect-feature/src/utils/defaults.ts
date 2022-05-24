import { IProviderOptions } from 'web3modal';
// import WalletConnectProvider from '@walletconnect/ethereum-provider';
import { addKeychain, ENDPOINTS } from '@daohaus/common-utilities';
import { TEMPORARY_RPC } from './common';

export const supportedNetworks = addKeychain(
  ENDPOINTS.EXPLORER,
  'explorer',
  addKeychain(TEMPORARY_RPC, 'rpc')
);

const providerOptions: IProviderOptions = {
  // TODO
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
  isDaoScope: false,
  validNetwork: false,
};
