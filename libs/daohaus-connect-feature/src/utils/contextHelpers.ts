import { ReactSetter } from '@daohaus/common-utilities';
import { SafeAppWeb3Modal } from '@gnosis.pm/safe-apps-web3modal';
import { providers } from 'ethers';
import { NetworkConfig } from '../HausConnectContext';
import { switchChainOnMetaMask } from './metamask';
import { ModalEvents, WalletStateType } from './types';

export const numberToHex = (number: number) => {
  return `0x${number.toString(16)}`;
};
export const getModal = () => {
  const modal = new SafeAppWeb3Modal();
  return modal;
};
export const isMetamaskProvider = (
  provider: providers.Web3Provider | undefined | null
) => provider?.connection?.url === 'metamask';
export const defaultWalletValues = {
  provider: null,
  chainId: null,
  address: null,
  connectWallet: async () => undefined,
  disconnect: () => undefined,
  isConnecting: true,
  isConnected: false,
  isMetamask: false,
  networks: {},
  switchNetwork: () => undefined,
};
export const handleSetProvider = async ({
  provider,
  networks,
  defaultChainId,
  handleModalEvents,
  setWalletState,
}: {
  provider: any;
  networks: NetworkConfig;
  defaultChainId: string;
  handleModalEvents?: ModalEvents;
  setWalletState: ReactSetter<WalletStateType>;
}) => {
  const ethersProvider = new providers.Web3Provider(provider);
  let chainId: string =
    typeof provider.chainId === 'number'
      ? numberToHex(provider.chainId)
      : provider.chainId;

  if (!networks[chainId]) {
    if (!defaultChainId) {
      handleModalEvents &&
        handleModalEvents('error', {
          code: 'UNSUPPORTED_NETWORK',
          message: `Network not supported, please switch to one of the supported networks`,
        });
      return;
    }
    const success =
      isMetamaskProvider(ethersProvider) &&
      (await switchChainOnMetaMask(networks, defaultChainId));
    if (!success) {
      handleModalEvents &&
        handleModalEvents('error', {
          code: 'UNSUPPORTED_NETWORK',
          message: `Network not supported, please switch to ${networks[defaultChainId].name}`,
        });
      return;
    }
    chainId = defaultChainId;
  }

  const signerAddress = await ethersProvider.getSigner().getAddress();
  setWalletState({
    provider: ethersProvider,
    chainId,
    address: signerAddress,
  });
};
