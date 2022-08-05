import { ContractAddresses } from './types';
import * as addresses from './addresses.json';

/**
 * Get addresses of contracts that have been deployed to the
 * Ethereum mainnet or a supported testnet. Throws if there are
 * no known contracts deployed on the corresponding chain.
 * @param chainId The desired chainId
 */
export const getContractAddressesForChainOrThrow = (
  chainId: string
): ContractAddresses => {
  const _addresses: Record<string, ContractAddresses> = addresses;
  console.log(_addresses, chainId);
  if (!_addresses[chainId]) {
    throw new Error(
      `Unknown chain id (${chainId}). No known contracts have been deployed on this chain.`
    );
  }
  return _addresses[chainId];
};
