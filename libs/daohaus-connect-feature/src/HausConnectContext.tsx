import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  getModal,
  handleConnectWallet,
  handleSetProvider,
  handleSwitchNetwork,
  isMetamaskProvider,
  loadProfile,
  loadWallet,
} from './utils/contextHelpers';
import {
  defaultWalletValues,
  MAINNET_ID,
  supportedNetworks,
  web3modalDefaults,
} from './utils/defaults';
import {
  ModalEvents,
  ModalOptions,
  NetworkConfig,
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
  networks: NetworkConfig;
  switchNetwork: (chainId: string) => void;
  isProfileLoading: boolean;
};

export const HausConnectContext =
  createContext<UserConnectType>(defaultWalletValues);

type ConnectProviderProps = {
  web3modalOptions?: ModalOptions;
  networks?: NetworkConfig;
  defaultChainId?: string;
  children: ReactNode;
  handleModalEvents?: ModalEvents;
};

export const HausConnectProvider = ({
  web3modalOptions = web3modalDefaults,
  children,
  networks = supportedNetworks,
  defaultChainId = MAINNET_ID,
  handleModalEvents,
}: ConnectProviderProps) => {
  const [isConnecting, setConnecting] = useState(false);
  const [{ provider, chainId, address }, setWalletState] =
    useState<WalletStateType>({});
  const [profile, setProfile] = useState<UserProfile>(null);
  const [isProfileLoading, setProfileLoading] = useState(false);
  const isConnected = useMemo(
    () => !!provider && !!address && !!chainId,
    [provider, address, chainId]
  );
  const isMetamask = useMemo(() => isMetamaskProvider(provider), [provider]);

  const setWalletProvider = useCallback(
    async (provider) => {
      handleSetProvider({
        provider,
        networks,
        defaultChainId,
        handleModalEvents,
        setWalletState,
      });
    },
    [handleModalEvents, defaultChainId, networks]
  );

  const disconnect = async () => {
    const modal = getModal();
    modal.clearCachedProvider();
    setWalletState({});
  };

  const connectWallet = useCallback(async () => {
    handleConnectWallet({
      setConnecting,
      handleModalEvents,
      setWalletProvider,
      networks,
      disconnect,
    });
  }, [handleModalEvents, networks, setWalletProvider]);

  const switchNetwork = async (_chainId: string | number) => {
    handleSwitchNetwork(_chainId, networks);
  };

  useEffect(() => {
    loadWallet({ setConnecting, connectWallet, web3modalOptions });
  }, [web3modalOptions, connectWallet]);

  useEffect(() => {
    let shouldUpdate = true;
    if (address) {
      loadProfile({ address, setProfile, setProfileLoading, shouldUpdate });
    }
    return () => {
      shouldUpdate = false;
    };
  }, [address]);

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
      }}
    >
      {children}
    </HausConnectContext.Provider>
  );
};
export const useHausConnect = (): UserConnectType =>
  useContext(HausConnectContext);
