// TODO
// Investigate and see if there's a better way to get this typing in rather than
// importing the same code twice.
// Also worth noting that web3Modal declares window.ethereum as 'any' for us
// See about taking the time to reconstruct ICoreOptions and Window.Ethereum typings

import { addKeychain, ENDPOINTS } from '@daohaus/common-utilities';
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
const TEMPORARY_RPC = {
  '0x1': `https://${import.meta.env.NX_RIVET_KEY}.eth.rpc.rivet.cloud/`,
  '0x4': `https://${import.meta.env.NX_RIVET_KEY}.rinkeby.rpc.rivet.cloud/`,
  '0x2a': `https://kovan.infura.io/v3/${import.meta.env.NX_INFURA_PROJECT_ID}`,
  '0x64': 'https://rpc.gnosischain.com/',
  '0xa': 'https://mainnet.optimism.io',
  '0x89': 'https://polygon-rpc.com/',
  '0xa4b1': 'https://arb1.arbitrum.io/rpc',
  '0xa4ec': 'https://forno.celo.org',
};
const supportedNetworks = addKeychain(
  ENDPOINTS.EXPLORER,
  'explorer',
  addKeychain(TEMPORARY_RPC, 'rpc')
);

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
    if (address) {
      loadProfile({ address, setProfile });
    }
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
      }}
    >
      {children}
    </HausConnectContext.Provider>
  );
};
export const useHausConnect = (): UserConnectType =>
  useContext(HausConnectContext);
