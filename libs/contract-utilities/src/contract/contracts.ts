import {
  PosterFactory,
  BaalFactory,
  BaalSummonerFactory,
  LootFactory,
  SharesFactory,
  TributeMinionFactory,
  MultiSendFactory,
} from '@daohaus/baal-contracts';

import type { Signer } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import { Contracts } from './types';

import {
  ValidNetwork,
  CONTRACTS,
  ContractKey,
} from '@daohaus/common-utilities';

/**
 * Get addresses of contracts that have been deployed to the
 * Ethereum mainnet or a supported testnet. Throws if there are
 * no known contracts deployed on the corresponding chain.
 * @param contractKey The desired Contract
 * @param chainId The desired chainId
 */
export const getContractAddressesForChainOrThrow = (
  contractKey: ContractKey,
  chainId: ValidNetwork
): string => {
  if (!CONTRACTS?.[contractKey]?.[chainId]) {
    throw new Error(
      `Unknown (${contractKey}) for chain id (${chainId}). No known contracts have been deployed on this chain for this contract.`
    );
  }
  return CONTRACTS[contractKey][chainId] as string;
};

/**
 * Get contract instances that target the Ethereum mainnet
 * or a supported testnet. Throws if there are no known contracts
 * deployed on the corresponding chain.
 * @param chainId The desired chain id
 * @param signerOrProvider The ethers v5 signer or provider
 */
export const getContractsForChainOrThrow = (
  chainId: ValidNetwork,
  signerOrProvider?: Signer | Provider
): Contracts => {
  return {
    baalContract: BaalFactory.connect(
      getContractAddressesForChainOrThrow('BAAL_SINGLETON', chainId),
      signerOrProvider as Signer | Provider
    ),
    baalSummonerContract: BaalSummonerFactory.connect(
      getContractAddressesForChainOrThrow('V3_FACTORY', chainId),
      signerOrProvider as Signer | Provider
    ),
    lootContract: LootFactory.connect(
      getContractAddressesForChainOrThrow('LOOT_SINGLETON', chainId),
      signerOrProvider as Signer | Provider
    ),
    sharesContract: SharesFactory.connect(
      getContractAddressesForChainOrThrow('SHARES_SINGLETON', chainId),
      signerOrProvider as Signer | Provider
    ),
    tributeMinionContract: TributeMinionFactory.connect(
      getContractAddressesForChainOrThrow('TRIBUTE_MINION', chainId),
      signerOrProvider as Signer | Provider
    ),
    posterContract: PosterFactory.connect(
      getContractAddressesForChainOrThrow('POSTER', chainId),
      signerOrProvider as Signer | Provider
    ),
    gnosisMultisendContract: MultiSendFactory.connect(
      getContractAddressesForChainOrThrow('GNOSIS_MULTISEND', chainId),
      signerOrProvider as Signer | Provider
    ),
  };
};
