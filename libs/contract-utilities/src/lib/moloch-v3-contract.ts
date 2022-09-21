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
  DelegateArgs,
  ProcessProposalArgs,
  ProposalIdArgs,
  RagequitArgs,
  SubmitProposalArgs,
  SubmitVoteArgs,
} from './types';

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
   * Sponsor proposal
   * @param id uint256 id of the proposal
   */
  public async sponsorProposal(args: ProposalIdArgs) {
    return await this.molochV3.sponsorProposal(args.id, args.overrides);
  }

  /**
   * Cancel proposal
   * @param id uint256 id of the proposal
   */
  public async cancelProposal(args: ProposalIdArgs) {
    return await this.molochV3.cancelProposal(args.id, args.overrides);
  }

  /**
   * Process/execute proposal
   * @param id uint256 id of the proposal
   * @param proposalData Multisend encoded transactions or proposal data
   */
  public async processProposal(args: ProcessProposalArgs) {
    return await this.molochV3.processProposal(
      args.id,
      args.proposalData,
      args.overrides
    );
  }

  /**
   * Submit vote
   * @param id uint256 id of the proposal
   * @param approved If 'true', member will cast `yesVotes` onto proposal - if 'false', `noVotes` will be counted.
   */
  public async submitVote(args: SubmitVoteArgs) {
    return await this.molochV3.submitVote(
      args.id,
      args.approved,
      args.overrides
    );
  }

  /**
   * Cancel proposal
   * @param to Account that receives 'fair share'.
   * @param lootToBurn Baal pure economic weight to burn.
   * @param sharesToBurn Baal voting weight to burn.
   * @param tokens Array of tokens to include in rage quit calculation
   */
  public async ragequit(args: RagequitArgs) {
    return await this.molochV3.ragequit(
      args.to,
      args.sharesToBurn,
      args.lootToBurn,
      args.tokens,
      args.overrides
    );
  }

  /**
   * transfer shares
   * @param id uint256 id of the proposal
   * @param delegatee The address to delegate votes to.
   */
  public async delegate(args: DelegateArgs) {
    return await this.shares.delegate(args.delegatee, args.overrides);
  }
}

export default MolochV3Contract;
