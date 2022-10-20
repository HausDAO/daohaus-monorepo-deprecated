import { IProviderOptions } from 'web3modal';
import WalletConnectProvider from '@walletconnect/ethereum-provider';
import { addKeychain, ENDPOINTS } from '@daohaus/common-utilities';
import { TEMPORARY_RPC } from './common';

export const supportedNetworks = addKeychain(
  ENDPOINTS.EXPLORER,
  'explorer',
  addKeychain(TEMPORARY_RPC, 'rpc')
);

const providerOptions: IProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: TEMPORARY_RPC['0x1'],
        4: TEMPORARY_RPC['0x4'],
      },
    },
  },
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
  profile: {
    address: '',
    ens: undefined,
  },
  connectWallet: async () => undefined,
  disconnect: () => undefined,
  isConnecting: true,
  isConnected: false,
  isMetamask: false,
  networks: {},
  switchNetwork: () => undefined,
  isProfileLoading: false,
  daoChainId: null,
  validNetwork: false,
};
