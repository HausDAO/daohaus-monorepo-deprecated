import { providers } from 'ethers';

export type ModalEvents = (
  eventName: 'error' | 'accountsChanged' | 'chainChanged',
  error?: { code: string; message: string }
) => void;
export type ProviderType = providers.Web3Provider;

export type WalletStateType = {
  provider?: providers.Web3Provider | null | undefined;
  chainId?: string | null | undefined;
  address?: string | null | undefined;
};
