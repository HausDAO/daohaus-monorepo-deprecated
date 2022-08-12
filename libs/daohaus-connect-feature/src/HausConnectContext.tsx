import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { isValidNetwork } from '@daohaus/common-utilities';

import {
  getModal,
  handleConnectWallet,
  handleSwitchNetwork,
  isMetamaskProvider,
  loadProfile,
  loadWallet,
} from './utils/contextHelpers';

import {
  defaultWalletValues,
  supportedNetworks,
  web3modalDefaults,
} from './utils/defaults';

import {
  ModalEvents,
  ModalOptions,
  NetworkConfigs,
  ProviderType,
  UserProfile,
  WalletStateType,
} from './utils/types';

export type UserConnectType = {
  provider: ProviderType | null | undefined;
  chainId: string | null | undefined;
  address: string | null | undefined;
  profile: UserProfile;
  connectWallet: () => Promise<void>;
  disconnect: () => void;
  isConnecting: boolean;
  isConnected: boolean;
  isMetamask: boolean;
  networks: NetworkConfigs;
  switchNetwork: (chainId: string) => void;
  isProfileLoading: boolean;
  isDaoScope: boolean;
  validNetwork: boolean;
};

export const HausConnectContext =
  createContext<UserConnectType>(defaultWalletValues);

type ConnectProviderProps = {
  web3modalOptions?: ModalOptions;
  networks?: NetworkConfigs;
  children: ReactNode;
  handleModalEvents?: ModalEvents;
};

export const HausConnectProvider = ({
  web3modalOptions = web3modalDefaults,
  children,
  networks = supportedNetworks,
  handleModalEvents,
}: ConnectProviderProps) => {
  const [isConnecting, setConnecting] = useState(true);
  const [{ provider, chainId, address }, setWalletState] =
    useState<WalletStateType>({});
  const [profile, setProfile] = useState<UserProfile>({
    address: address || '',
    ens: undefined,
  });
  const [isProfileLoading, setProfileLoading] = useState(false);
  const isConnected = useMemo(
    () => !!provider && !!address && !!chainId,
    [provider, address, chainId]
  );
  const isMetamask = useMemo(() => isMetamaskProvider(provider), [provider]);
  const validNetwork = useMemo(
    () => !!chainId && isValidNetwork(chainId, networks),
    [chainId, networks]
  );
  // TODO, detect if we're in DAOscope by looking at the url.
  //  Or we could use DAOcontext to add to this state on context mount/unmount
  const isDaoScope = false;

  const connectWallet = useCallback(async () => {
    handleConnectWallet({
      setConnecting,
      handleModalEvents,
      disconnect,
      setWalletState,
    });
  }, [setConnecting, handleModalEvents]);

  useEffect(() => {
    loadWallet({ setConnecting, connectWallet, web3modalOptions });
  }, [web3modalOptions, connectWallet]);

  useEffect(() => {
    let shouldUpdate = true;
    if (address && isConnected) {
      loadProfile({
        address,
        setProfile,
        setProfileLoading,
        shouldUpdate,
        networks,
      });
    }
    return () => {
      shouldUpdate = false;
    };
  }, [address, isConnected, networks]);

  const switchNetwork = async (_chainId: string | number) => {
    handleSwitchNetwork(_chainId, networks);
  };

  const disconnect = async () => {
    const modal = getModal();
    modal.clearCachedProvider();
    setWalletState({});
  };

  return (
    <HausConnectContext.Provider
      value={{
        provider,
        address,
        chainId,
        connectWallet,
        isConnected,
        isConnecting,
        disconnect,
        isMetamask,
        networks,
        switchNetwork,
        profile,
        isProfileLoading,
        isDaoScope,
        validNetwork,
      }}
    >
      {children}
    </HausConnectContext.Provider>
  );
};
export const useHausConnect = (): UserConnectType =>
  useContext(HausConnectContext);
