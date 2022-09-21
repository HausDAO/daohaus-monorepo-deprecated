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

  public async summonBaalAndSafe(
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
