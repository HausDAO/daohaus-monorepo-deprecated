import {
  ENDPOINTS,
  isValidNetwork,
  ReactSetter,
} from '@daohaus/common-utilities';
import { Haus } from '@daohaus/dao-data';
import { SafeAppWeb3Modal } from '@gnosis.pm/safe-apps-web3modal';
import { providers } from 'ethers';
import { TEMPORARY_RPC, truncateAddress } from './common';

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
  setWalletState,
}: {
  provider: any;
  setWalletState: ReactSetter<WalletStateType>;
}) => {
  console.log('provider', provider);
  const ethersProvider = new providers.Web3Provider(provider);

  const signerAddress = await ethersProvider.getSigner().getAddress();
  setWalletState({
    provider: ethersProvider,
    chainId: provider.chainId,
    address: signerAddress,
  });
};

export const handleConnectWallet = async ({
  setConnecting,
  handleModalEvents,
  // setWalletProvider,
  // networks,
  disconnect,
  setWalletState,
}: {
  setConnecting: ReactSetter<boolean>;
  handleModalEvents?: ModalEvents;
  // networks: NetworkConfigs;
  // setWalletProvider: ReactSetter<WalletStateType>;
  disconnect: () => Promise<void>;
  setWalletState: ReactSetter<WalletStateType>;
}) => {
  try {
    setConnecting(true);

    const modal = getModal();
    const modalProvider = await modal.requestProvider();
    console.log('modalProvider', modalProvider);
    const _isGnosisSafe = await modal.isSafeApp();

    if (!_isGnosisSafe) {
      modalProvider.on('accountsChanged', (account: string) => {
        handleSetProvider({ provider: modalProvider, setWalletState });
        // handleModalEvents && handleModalEvents('accountsChanged');
      });
      modalProvider.on('chainChanged', () => {
        console.log('CHAIN_CHANGED');
        // handleModalEvents && handleModalEvents('chainChanged');
        // if (!isValidNetwork(modalProvider.chainId)) {
        //   handleModalEvents &&
        //     handleModalEvents('error', {
        //       code: 'UNSUPPORTED_NETWORK',
        //       message: `You have switched to an unsupported chain, Disconnecting from Metamask...`,
        //     });
        // }
        // setWalletProvider(modalProvider);
      });
    }

    handleSetProvider({ provider: modalProvider, setWalletState });
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
    console.log('address', address);
    const haus = Haus.create(TEMPORARY_RPC);
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
