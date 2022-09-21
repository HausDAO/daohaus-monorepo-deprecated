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

class MolochV3Contract {
  public molochV3: Baal;
  public shares: Shares;
  public loot: Loot;

  private constructor(
    molochV3Contract: Baal,
    sharesContract: Shares,
    lootContract: Loot
  ) {
    this.molochV3 = molochV3Contract;
    this.shares = sharesContract;
    this.loot = lootContract;
  }

  static async create({
    address,
    provider,
  }: ContractConfig): Promise<MolochV3Contract> {
    const molochV3Contract = BaalFactory.connect(address, provider);
    const sharesAddress = await molochV3Contract.sharesToken();
    const lootAddress = await molochV3Contract.lootToken();
    const sharesContract = SharesFactory.connect(sharesAddress, provider);
    const lootContract = LootFactory.connect(lootAddress, provider);

    return new MolochV3Contract(molochV3Contract, sharesContract, lootContract);
  }

  // TODO: encode this data for us
  // will take a series of {abi, function, args} and target?
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
