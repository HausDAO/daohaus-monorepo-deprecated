import { ethers } from 'ethers';
import { Baal, Baal__factory } from './generated';

export type ContractConfig = {
  address: string;
  chainId: number;
  provider: ethers.providers.Provider;
};

export type SponsorArgs = {
  id: ethers.BigNumberish;
};

class BaalContract {
  baal: Baal;
  private constructor(contractConfig: ContractConfig) {
    this.baal = Baal__factory.connect(
      contractConfig.address,
      contractConfig.provider
    );
  }

  static create(contractConfig: ContractConfig): BaalContract {
    return new BaalContract(contractConfig);
  }

  public async sponsorProposal(args: SponsorArgs) {
    return await this.baal.sponsorProposal(args.id);
  }
}

export default BaalContract;
