import { ethers } from 'ethers';
import { BaalSummoner, BaalSummonerFactory } from '@daohaus/baal-contracts';
import { ContractConfig } from './types';

export type SummonArgs = {
  initializationParams: ethers.BytesLike;
  initializationActions: ethers.BytesLike[];
  _saltNonce: ethers.BigNumberish;
};

export class MolochV3SummonerContract {
  summoner: BaalSummoner;
  private constructor(contractConfig: ContractConfig) {
    this.summoner = BaalSummonerFactory.connect(
      contractConfig.address,
      contractConfig.provider
    );
  }

  static create({
    address,
    provider,
  }: ContractConfig): MolochV3SummonerContract {
    return new MolochV3SummonerContract({ address, provider });
  }

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
    return await this.summoner.summonBaalAndSafe(
      args.initializationParams,
      args.initializationActions,
      args._saltNonce
    );
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
