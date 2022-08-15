import { ethers } from 'ethers';
import { BaalSummoner, BaalSummonerFactory } from '@daohaus/baal-contracts';
import { ContractConfig } from './types';

export type SummonArgs = {
  initializationParams: ethers.BytesLike;
  initializationActions: ethers.BytesLike[];
  _saltNonce: ethers.BigNumberish;
};

class BaalSummonerContract {
  baalSummoner: BaalSummoner;
  private constructor(contractConfig: ContractConfig) {
    this.baalSummoner = BaalSummonerFactory.connect(
      contractConfig.address,
      contractConfig.provider
    );
  }

  static create({ address, provider }: ContractConfig): BaalSummonerContract {
    return new BaalSummonerContract({ address, provider });
  }

  public async summonBaalAndSafe(
    args: SummonArgs
  ): Promise<ethers.ContractTransaction> {
    return await this.baalSummoner.summonBaalAndSafe(
      args.initializationParams,
      args.initializationActions,
      args._saltNonce
    );
  }
}

export default BaalSummonerContract;
