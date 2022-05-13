import { providers } from 'ethers';
// TODO
// Investigate and see if there's a better way to get this typing in rather than
// importing the same code twice.
// Also worth noting that web3Modal declares window.ethereum as 'any' for us
// See about taking the time to reconstruct ICoreOptions and Window.Ethereum typings
import { ICoreOptions } from 'web3modal';
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
  defaultWalletValues,
  getModal,
  handleSetProvider,
  isMetamaskProvider,
  numberToHex,
} from './utils/contextHelpers';
import { switchChainOnMetaMask } from './utils/metamask';
import {
  MAINNET_ID,
  SUPPORTED_NETWORKS,
  web3modalDefaults,
} from './utils/defaults';
import { ModalEvents, ProviderType, WalletStateType } from './utils/types';

export type WalletContextType = {
  provider: ProviderType | null | undefined;
  chainId: string | null | undefined;
  address: string | null | undefined;
  connectWallet: () => Promise<void>;
  disconnect: () => void;
  isConnecting: boolean;
  isConnected: boolean;
  isMetamask: boolean;
  networks: NetworkConfig;
  switchNetwork: (chainId: string) => void;
};

export type NetworkConfig = Record<
  string,
  {
    chainId: string;
    name: string;
    symbol: string;
    explorer: string;
    rpc: string;
  }
>;

export const HausConnectContext =
  createContext<WalletContextType>(defaultWalletValues);

type ConnectProviderProps = {
  web3modalOptions?: Partial<ICoreOptions>;
  networks?: NetworkConfig;
  defaultChainId?: string;
  children: ReactNode;
  handleModalEvents?: ModalEvents;
};

export const HausConnectProvider = ({
  web3modalOptions = web3modalDefaults,
  children,
  networks = SUPPORTED_NETWORKS,
  defaultChainId = MAINNET_ID,
  handleModalEvents,
}: ConnectProviderProps) => {
  // const [profile, setProfile] = useState(null);
  const [isConnecting, setConnecting] = useState(false);
  const [{ provider, chainId, address }, setWalletState] =
    useState<WalletStateType>({});
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
    try {
      setConnecting(true);
      const modal = getModal();
      const modalProvider = await modal.requestProvider();
      await setWalletProvider(modalProvider);

      const _isGnosisSafe = await modal.isSafeApp();

      if (!_isGnosisSafe) {
        modalProvider.on('accountsChanged', () => {
          disconnect();
          handleModalEvents && handleModalEvents('accountsChanged');
        });
        modalProvider.on('chainChanged', () => {
          handleModalEvents && handleModalEvents('chainChanged');
          if (!networks[modalProvider.chainId]) {
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
  }, [handleModalEvents, networks, setWalletProvider]);

  const switchNetwork = async (_chainId: string | number) => {
    const chainId: string =
      typeof _chainId === 'number' ? numberToHex(_chainId) : _chainId;
    if (!networks[chainId]) {
      throw new Error(`No network configuration for chainId: ${chainId}`);
    }
    if (!window.ethereum?.isMetaMask) {
      throw new Error('Switching chain is only supported in Metamask');
    }
    await switchChainOnMetaMask(networks, chainId);
  };

  useEffect(() => {
    const loadWallet = async () => {
      const isMetamaskUnlocked =
        (await window.ethereum?._metamask?.isUnlocked?.()) ?? false;
      const modal = getModal();
      const _isGnosisSafe = await modal.isSafeApp();

      if (
        isMetamaskUnlocked &&
        (_isGnosisSafe || web3modalOptions.cacheProvider)
      ) {
        await connectWallet();
      } else {
        setConnecting(false);
      }
    };

    loadWallet();
  }, [web3modalOptions, connectWallet]);

  useEffect(() => {
    const getProfile = async () => {
      // const haus = Haus.create(ENDPOINTS.RPC);
      // typecasting here. If this function is called, then address is string
      // const profile = await haus.profile.get(address as string);
    };
    if (address) {
      getProfile();
    }
  }, [address, provider]);

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
      }}
    >
      {children}
    </HausConnectContext.Provider>
  );
};
export const useHausConnect = (): WalletContextType =>
  useContext(HausConnectContext);
