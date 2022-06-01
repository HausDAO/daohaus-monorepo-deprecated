import { ethers } from 'ethers';
import { BaalFactory, BaalFactory__factory } from './generated';

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

class BaalFactoryContract {
  baalFactory: BaalFactory;
  private constructor(contractConfig: ContractConfig) {
    this.baalFactory = BaalFactory__factory.connect(
      contractConfig.address,
      contractConfig.provider
    );
  }

  static create(contractConfig: ContractConfig): BaalFactoryContract {
    return new BaalFactoryContract(contractConfig);
  }

  public async summonBaalAndSafe(
    args: SummonArgs
  ): Promise<ethers.ContractTransaction> {
    return await this.baalFactory.summonBaalAndSafe(
      args.initializationParams,
      args.initializationActions,
      args._saltNonce
    );
  }
}

export default BaalFactoryContract;
