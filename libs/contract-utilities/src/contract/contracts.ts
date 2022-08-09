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
import { Contracts, ContractsAndFactories } from './types';

import {
  ValidNetwork,
  CONTRACTS,
  ContractKey,
} from '@daohaus/common-utilities';

import BaalContract from './BaalContract';
import BaalSummonerContract from './BaalSummoner';

/**
 * Get addresses of contracts that have been deployed to the
 * Ethereum mainnet or a supported testnet. Throws if there are
 * no known contracts deployed on the corresponding chain.
 * @param contractKey The desired Contract
 * @param chainId The desired chainId
 */
export const getContractAddressesForChain = (
  contractKey: ContractKey,
  chainId: ValidNetwork
): string | null => {
  if (!CONTRACTS?.[contractKey]?.[chainId]) {
    return null;
    // throw new Error(
    //   `Unknown (${contractKey}) for chain id (${chainId}). No known contracts have been deployed on this chain for this contract.`
    // );
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
export const getContractsForChain = (
  chainId: ValidNetwork,
  signerOrProvider: Signer | Provider,
  onlyContracts = false
): Contracts | ContractsAndFactories => {
  /* prettier-ignore */
  const addresses = {
    baal: getContractAddressesForChain('BAAL_SINGLETON', chainId) as string,
    baalSummoner: getContractAddressesForChain('V3_FACTORY', chainId) as string,
    loot: getContractAddressesForChain('LOOT_SINGLETON', chainId),
    shares: getContractAddressesForChain('SHARES_SINGLETON', chainId),
    tributeMinion: getContractAddressesForChain('TRIBUTE_MINION', chainId),
    poster: getContractAddressesForChain('POSTER', chainId),
    gnosisMultisend: getContractAddressesForChain('GNOSIS_MULTISEND', chainId)
  };

  /* prettier-ignore */
  const contracts: Contracts = {
    baalContract: BaalContract.create({address: addresses.baal, provider: signerOrProvider}),
    baalSummonerContract: BaalSummonerContract.create({address: addresses.baalSummoner, provider: signerOrProvider}),
  };

  if (onlyContracts) {
    return contracts;
  }

  /* prettier-ignore */
  return {
    ...contracts,
    baalFactory: BaalFactory.connect(addresses.baal, signerOrProvider),
    baalSummonerFactory: BaalSummonerFactory.connect(addresses.baalSummoner, signerOrProvider),
    lootFactory: addresses.loot ? LootFactory.connect(addresses.loot, signerOrProvider) : null,
    sharesFactory: addresses.shares ? SharesFactory.connect(addresses.shares, signerOrProvider) : null,
    tributeMinionFactory: addresses.tributeMinion ? TributeMinionFactory.connect(addresses.tributeMinion, signerOrProvider) : null,
    posterFactory: addresses.poster ? PosterFactory.connect(addresses.poster, signerOrProvider) : null,
    gnosisMultisendFactory: addresses.gnosisMultisend ? MultiSendFactory.connect(addresses.gnosisMultisend,  signerOrProvider) : null,
  } as ContractsAndFactories;
};
