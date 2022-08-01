import {
  PosterFactory,
  BaalFactory,
  BaalSummonerFactory,
  LootFactory,
  SharesFactory,
  TributeMinionFactory,
} from '@daohaus/baal-contracts';
import type { Signer } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import { getContractAddressesForChainOrThrow } from './addresses';
import { Contracts } from './types';

/**
 * Get contract instances that target the Ethereum mainnet
 * or a supported testnet. Throws if there are no known contracts
 * deployed on the corresponding chain.
 * @param chainId The desired chain id
 * @param signerOrProvider The ethers v5 signer or provider
 */
export const getContractsForChainOrThrow = (
  chainId: number,
  signerOrProvider?: Signer | Provider
): Contracts => {
  const addresses = getContractAddressesForChainOrThrow(chainId);

  return {
    baalContract: BaalFactory.connect(
      addresses.baal,
      signerOrProvider as Signer | Provider
    ),
    baalSummonerContract: BaalSummonerFactory.connect(
      addresses.baalSummoner,
      signerOrProvider as Signer | Provider
    ),
    lootContract: LootFactory.connect(
      addresses.loot,
      signerOrProvider as Signer | Provider
    ),
    sharesContract: SharesFactory.connect(
      addresses.shares,
      signerOrProvider as Signer | Provider
    ),
    tributeMinionContract: TributeMinionFactory.connect(
      addresses.tributeMinion,
      signerOrProvider as Signer | Provider
    ),
    posterContract: PosterFactory.connect(
      addresses.poster,
      signerOrProvider as Signer | Provider
    ),
  };
};
