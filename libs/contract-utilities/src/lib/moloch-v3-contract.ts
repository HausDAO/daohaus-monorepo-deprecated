import {
  Baal,
  BaalFactory,
  Loot,
  LootFactory,
  Shares,
  SharesFactory,
} from '@daohaus/baal-contracts';
import {
  ContractConfig,
  ProcessProposalArgs,
  SubmitProposalArgs,
} from './types';

// /update to get shares and loot addresses from the baal
class MolochV3Contract {
  molochV3: Baal;
  shares: Shares;
  loot: Loot;
  private constructor(contractConfig: ContractConfig) {
    this.molochV3 = BaalFactory.connect(
      contractConfig.address,
      contractConfig.provider
    );
    this.shares = SharesFactory.connect(
      contractConfig.address,
      contractConfig.provider
    );
    this.loot = LootFactory.connect(
      contractConfig.address,
      contractConfig.provider
    );
  }

  static create({ address, provider }: ContractConfig): MolochV3Contract {
    return new MolochV3Contract({ address, provider });
  }

  // TODO: encode this data for us

  /**
   * Submit proposal
   * @param proposalData Multisend encoded transactions or proposal data
   * @param expiration epoch time in seconds for when the proposal will expire, 0 for no expiration
   * @param baalGas esitmated gas limit for executing the above actions
   * @param details Context for proposal.
   */
  public async submitProposal(args: SubmitProposalArgs) {
    return await this.molochV3.submitProposal(
      args.proposalData,
      args.expiration,
      args.baalGas,
      args.details,
      args.overrides
    );
  }

  /**
   * Process/execute proposal
   * @param id uint256 id of the proposal
   * @param proposalData Multisend encoded transactions or proposal data
   */
  // TODO: can we force the gas estimate - getBaalgas?
  public async processProposal(args: ProcessProposalArgs) {
    return await this.molochV3.processProposal(
      args.id,
      args.proposalData,
      args.overrides
    );
  }
}

export default MolochV3Contract;
