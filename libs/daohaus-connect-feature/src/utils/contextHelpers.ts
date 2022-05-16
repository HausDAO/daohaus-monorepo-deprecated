import {
  ENDPOINTS,
  isValidNetwork,
  ReactSetter,
} from '@daohaus/common-utilities';
import { Haus } from '@daohaus/dao-data';
import { SafeAppWeb3Modal } from '@gnosis.pm/safe-apps-web3modal';
import { providers } from 'ethers';
import { truncateAddress } from './common';

import { switchChainOnMetaMask } from './metamask';
import {
  ModalEvents,
  ModalOptions,
  WalletStateType,
  UserProfile,
  NetworkConfigs,
} from './types';

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

export const handleSetProvider = async ({
  provider,
  networks,
  defaultChainId,
  handleModalEvents,
  setWalletState,
}: {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  provider: any;
  networks: NetworkConfigs;
  defaultChainId: string;
  handleModalEvents?: ModalEvents;
  setWalletState: ReactSetter<WalletStateType>;
}) => {
  const ethersProvider = new providers.Web3Provider(provider);
  let chainId: string =
    typeof provider.chainId === 'number'
      ? numberToHex(provider.chainId)
      : provider.chainId;

  if (!isValidNetwork(chainId)) {
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
          message: `Network not supported`,
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

export const handleConnectWallet = async ({
  setConnecting,
  handleModalEvents,
  setWalletProvider,
  networks,
  disconnect,
}: {
  setConnecting: ReactSetter<boolean>;
  handleModalEvents?: ModalEvents;
  networks: NetworkConfigs;
  setWalletProvider: ReactSetter<WalletStateType>;
  disconnect: () => Promise<void>;
}) => {
  try {
    setConnecting(true);
    const modal = getModal();
    const modalProvider = await modal.requestProvider();
    setWalletProvider(modalProvider);

    const _isGnosisSafe = await modal.isSafeApp();

    if (!_isGnosisSafe) {
      modalProvider.on('accountsChanged', () => {
        disconnect();
        handleModalEvents && handleModalEvents('accountsChanged');
      });
      modalProvider.on('chainChanged', () => {
        handleModalEvents && handleModalEvents('chainChanged');
        if (!isValidNetwork(modalProvider.chainId)) {
          disconnect();
          handleModalEvents &&
            handleModalEvents('error', {
              code: 'UNSUPPORTED_NETWORK',
              message: `You have switched to an unsupported chain, Disconnecting from Metamask...`,
            });
        }
        setWalletProvider(modalProvider);
      });
    }
  } catch (web3Error) {
    console.error(web3Error);
    disconnect();
  } finally {
    setConnecting(false);
  }
};

export const loadWallet = async ({
  connectWallet,
  setConnecting,
  web3modalOptions,
}: {
  connectWallet: () => Promise<void>;
  setConnecting: ReactSetter<boolean>;
  web3modalOptions: ModalOptions;
}) => {
  const isMetamaskUnlocked =
    (await window.ethereum?._metamask?.isUnlocked?.()) ?? false;
  const modal = getModal();
  const _isGnosisSafe = await modal.isSafeApp();

  if (isMetamaskUnlocked && (_isGnosisSafe || web3modalOptions.cacheProvider)) {
    await connectWallet();
  } else {
    setConnecting(false);
  }
};

export const loadProfile = async ({
  address,
  setProfile,
  setProfileLoading,
  shouldUpdate,
}: {
  address: string;
  setProfile: ReactSetter<UserProfile>;
  setProfileLoading: ReactSetter<boolean>;
  shouldUpdate: boolean;
}) => {
  try {
    setProfileLoading(true);
    const TEMPORARY_VITE_CONFIG = {
      '0x1': `https://${import.meta.env.VITE_RIVET_KEY}.eth.rpc.rivet.cloud/`,
      '0x4': `https://${
        import.meta.env.VITE_RIVET_KEY
      }.rinkeby.rpc.rivet.cloud/`,
      '0x2a': `https://kovan.infura.io/v3/${
        import.meta.env.VITE_INFURA_PROJECT_ID
      }`,
    };
    const haus = Haus.create({ ...ENDPOINTS.RPC, ...TEMPORARY_VITE_CONFIG });
    const profile = await haus.profile.get(address);

    if (profile && shouldUpdate) {
      const displayName =
        profile.name || profile.ens || truncateAddress(address);
      setProfile({ ...profile, displayName });
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (shouldUpdate) {
      setProfileLoading(false);
    }
  }
  // typecasting here. If this function is called, then address is string
};
export const handleSwitchNetwork = async (
  _chainId: string | number,
  networks: NetworkConfigs
) => {
  const chainId: string =
    typeof _chainId === 'number' ? numberToHex(_chainId) : _chainId;
  if (!isValidNetwork) {
    throw new Error(`No network configuration for chainId: ${chainId}`);
  }
  if (!window.ethereum?.isMetaMask) {
    throw new Error('Switching chain is only supported in Metamask');
  }
  await switchChainOnMetaMask(networks, chainId);
};
