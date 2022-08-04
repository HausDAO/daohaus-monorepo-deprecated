import { ethers } from 'ethers';
import { BaalSummoner, BaalSummoner__factory } from './generated';

export type ContractConfig = {
  address: string;
  chainId: number;
  provider: ethers.providers.Provider;
};

export type SummonArgs = {
  initializationParams: ethers.BytesLike;
  initializationActions: ethers.BytesLike[];
  _saltNonce: ethers.BigNumberish;
};

class BaalSummonerContract {
  baalSummoner: BaalSummoner;
  private constructor(contractConfig: ContractConfig) {
    this.baalSummoner = BaalSummoner__factory.connect(
      contractConfig.address,
      contractConfig.provider
    );
  }

  static create(contractConfig: ContractConfig): BaalSummonerContract {
    return new BaalSummonerContract(contractConfig);
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
