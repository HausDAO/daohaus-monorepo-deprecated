import {
  Baal,
  BaalFactory,
  Loot,
  LootFactory,
  Shares,
  SharesFactory,
} from '@daohaus/baal-contracts';
import { ethers } from 'ethers';
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
   * @param proposalActions array of action parameters -
   * @param expiration epoch time in seconds for when the proposal will expire, 0 for no expiration
   * @param baalGas esitmated gas limit for executing the above actions
   * @param details Context for proposal.
   */
  public async submitProposal(args: SubmitProposalArgs) {
    // will take a series of actions, encode each, then multical encode the whole thing

    // encode each action with abi, functionname, args
    //return the obj for multicall - with to address, value (default 0) and operation (default 0)
    //txActionToMetaTx

    // return {
    //   to: address,
    //   data: encodedData,
    //   value,
    //   operation,
    // };

    // return encodeFunction(LOCAL_ABI.GNOSIS_MULTISEND, 'multiSend', [
    //   encodeMultiSend(rawMulti),
    // ]);

    // should this calc the baalGas or do we ask the client to do that?
    // function returns ethers.Bytes or ethers.BytesLike
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
  public async processProposal(args: ProcessProposalArgs) {
    const proposal = await this.molochV3.proposals(args.id);
    const overrides = args.overrides || {};
    if (proposal[6] !== ethers.BigNumber.from('0')) {
      overrides.gasLimit = proposal[6];
    }
    return await this.molochV3.processProposal(
      args.id,
      args.proposalData,
      overrides
    );
  }
}

export default MolochV3Contract;
