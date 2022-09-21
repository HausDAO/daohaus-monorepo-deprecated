import { ethers } from 'ethers';
import { BaalSummoner, BaalSummonerFactory } from '@daohaus/baal-contracts';
import {
  ContractConfig,
  ContractNetworkConfig,
  SummonArgs,
  SummonMolochV3Args,
} from './types';
import {
  encodeFunction,
  encodeValues,
  POSTER_TAGS,
} from '@daohaus/common-utilities';
import { getContractAbi, getContractAddressesForChain } from './contract-meta';

class MolochV3SummonerContract {
  summoner: BaalSummoner;
  private constructor(contractConfig: ContractNetworkConfig) {
    const summonerAddress =
      getContractAddressesForChain('V3_FACTORY', contractConfig.networkId) ||
      ZERO_ADDRESS;

    this.summoner = BaalSummonerFactory.connect(
      summonerAddress,
      contractConfig.provider
    );
  }

  static create({
    networkId,
    provider,
  }: ContractNetworkConfig): MolochV3SummonerContract {
    return new MolochV3SummonerContract({ networkId, provider });
  }

  // TODO: encode this data for us

  /**
   * Deploy dao and safe contracts
   * @param initializationParams encoded share token name and symbol (string, string)
   * @param initializationActions encoded functions with args called in summoning
   * * setAdminConfig(bool pauseShares, bool pauseLoot)
   * * setGovernanceConfig (
            uint32 voting,
            uint32 grace,
            uint256 newOffering,
            uint256 quorum,
            uint256 sponsor,
            uint256 minRetention
        )
   * * setShamans(
        address[] calldata _shamans,
        uint256[] calldata _permissions
    )
   * * mintShares(address[] calldata to, uint256[] calldata amount)
   * * minLoot(address[] calldata to, uint256[] calldata amount)
   * * metadata: post(string content, string tag)
   * @param _saltNonce any uint256
   */
  public async summonBaalAndSafe(
    args: SummonArgs
  ): Promise<ethers.ContractTransaction> {
    //

    return await this.summoner.summonBaalAndSafe(
      args.initializationParams,
      args.initializationActions,
      args._saltNonce
    );
  }

  public async summonMolochV3AndSafe(
    args: SummonMolochV3Args
  ): Promise<ethers.ContractTransaction | undefined> {
    const baalAbi = getContractAbi('BAAL');
    const posterAbi = getContractAbi('POSTER');

    if (!baalAbi || !posterAbi) return;

    const initializationParams = encodeValues(
      ['string', 'string'],
      [args.sharesTokenName, args.sharesTokenSymbol]
    );

    const encodedTokenConfig = encodeFunction(baalAbi, 'setAdminConfig', [
      args.tokenConfig.pauseShares,
      args.tokenConfig.pauseLoot,
    ]);

    const encodedGovernanceValues = encodeValues(
      ['uint32', 'uint32', 'uint256', 'uint256', 'uint256', 'uint256'],
      [
        args.governanceConfig.voting,
        args.governanceConfig.grace,
        args.governanceConfig.newOffering,
        args.governanceConfig.quorum,
        args.governanceConfig.sponsor,
        args.governanceConfig.minRetention,
      ]
    );
    const encodedGovernanceConfig = encodeFunction(
      baalAbi,
      'setGovernanceConfig',
      [encodedGovernanceValues]
    );

    const encodedShamanConfig = encodeFunction(baalAbi, 'setShamans', [
      args.shamanConfig.shamans,
      args.shamanConfig.permissions,
    ]);

    const encodedSharesConfig = encodeFunction(baalAbi, 'mintShares', [
      args.sharesConfig.to,
      args.sharesConfig.amount,
    ]);

    const encodedLootConfig = encodeFunction(baalAbi, 'lootShares', [
      args.lootConfig.to,
      args.lootConfig.amount,
    ]);

    const METADATA = encodeFunction(posterAbi, 'post', [
      JSON.stringify({ name: args.daoName }),
      POSTER_TAGS.summoner,
    ]);

    const encodedMetadataConfig = encodeFunction(baalAbi, 'executeAsBaal', [
      posterAddress,
      0,
      METADATA,
    ]);
    //
    // return await this.summoner.summonBaalAndSafe(
    //   args.initializationParams,
    //   args.initializationActions,
    //   args._saltNonce
    // );
  }

  /**
   * Deploy dao with existing safe contracts
   * params the same as above with one extra in initializationParams
   * @param initializationParams encoded share token name and symbol and safe address (string, string, address)
   * @param _saltNonce any uint256
   */
  public async summonBaal(
    args: SummonArgs
  ): Promise<ethers.ContractTransaction> {
    return await this.summoner.summonBaalAndSafe(
      args.initializationParams,
      args.initializationActions,
      args._saltNonce
    );
  }
}

export default MolochV3SummonerContract;
