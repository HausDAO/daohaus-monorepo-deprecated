import { ethers } from 'ethers';
import { Baal, BaalFactory } from '@daohaus/baal-contracts';
import { ContractConfig } from './types';

export type SponsorArgs = {
  id: ethers.BigNumberish;
};

class BaalContract {
  baal: Baal;
  private constructor(contractConfig: ContractConfig) {
    this.baal = BaalFactory.connect(
      contractConfig.address,
      contractConfig.provider
    );
  }

  static create({ address, provider }: ContractConfig): BaalContract {
    return new BaalContract({ address, provider });
  }

  public async sponsorProposal(args: SponsorArgs) {
    return await this.baal.sponsorProposal(args.id);
  }
}

export default BaalContract;
