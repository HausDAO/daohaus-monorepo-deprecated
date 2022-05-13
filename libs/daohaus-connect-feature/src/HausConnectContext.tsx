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
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  defaultWalletValues,
  getModal,
  isMetamaskProvider,
  numberToHex,
} from './utils/contextHelpers';
import { switchChainOnMetaMask } from './utils/metamask';
import {
  MAINNET_ID,
  SUPPORTED_NETWORKS,
  web3modalDefaults,
} from './utils/defaults';
import { Haus } from '@daohaus/dao-data';
import { ENDPOINTS } from '@daohaus/common-utilities';

// declare global {
//   interface Window {
//     ethereum: providers.Web3Provider;
//   }
// }

type ProviderType = providers.Web3Provider;

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

export type WalletStateType = {
  provider?: providers.Web3Provider | null | undefined;
  chainId?: string | null | undefined;
  address?: string | null | undefined;
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
  // see about refactoring this to lifecycle methods once I full understand it
  handleModalEvents?: (
    eventName: 'error' | 'accountsChanged' | 'chainChanged',
    error?: { code: string; message: string }
  ) => void;
};

export const HausConnectProvider = ({
  web3modalOptions = web3modalDefaults,
  children,
  networks = SUPPORTED_NETWORKS,
  defaultChainId = MAINNET_ID,
  handleModalEvents,
}: ConnectProviderProps) => {
  const [profile, setProfile] = useState(null);
  const [isConnecting, setConnecting] = useState(false);
  const [{ provider, chainId, address }, setWalletState] =
    useState<WalletStateType>({});
  const isConnected = useMemo(
    () => !!provider && !!address && !!chainId,
    [provider, address, chainId]
  );
  const isMetamask = useMemo(() => isMetamaskProvider(provider), [provider]);

  const setWalletProvider = async (provider: any) => {
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

  const disconnect = async () => {
    const modal = getModal();
    modal.clearCachedProvider();
    setWalletState({});
  };

  const connectWallet = async () => {
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
          // update wallet provider once the chain is changed
          setWalletProvider(modalProvider);
        });
      }
    } catch (web3Error) {
      // eslint-disable-next-line no-console
      console.error(web3Error);
      disconnect();
    } finally {
      setConnecting(false);
    }
  };

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
      /**
       * Only try to connect when metamask is unlocked.
       * This prevents unnecessary popup on page load.
       */
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
  }, [web3modalOptions]);

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
