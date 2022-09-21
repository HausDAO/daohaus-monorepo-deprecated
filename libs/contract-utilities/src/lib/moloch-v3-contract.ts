import { ethers } from 'ethers';
import { Baal, BaalFactory } from '@daohaus/baal-contracts';
import { ContractConfig } from './types';

export type SponsorArgs = {
  id: ethers.BigNumberish;
};

class MolochV3Contract {
  molochV3: Baal;
  private constructor(contractConfig: ContractConfig) {
    this.molochV3 = BaalFactory.connect(
      contractConfig.address,
      contractConfig.provider
    );
  }

  static create({ address, provider }: ContractConfig): MolochV3Contract {
    return new MolochV3Contract({ address, provider });
  }

  public async sponsorProposal(args: SponsorArgs) {
    return await this.molochV3.sponsorProposal(args.id);
  }
}

export default MolochV3Contract;
