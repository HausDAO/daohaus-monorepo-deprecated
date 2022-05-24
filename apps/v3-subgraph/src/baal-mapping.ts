import { BigInt, Bytes, log } from "@graphprotocol/graph-ts";
import {
  Dao,
  Member,
  Proposal,
  RageQuit,
  Shaman,
  Vote,
} from "../generated/schema";

import {
  CancelProposal,
  DelegateChanged,
  DelegateVotesChanged,
  GovernanceConfigSet,
  LootPaused,
  ProcessingFailed,
  ProcessProposal,
  Ragequit,
  SetupComplete,
  ShamanSet,
  SharesPaused,
  SponsorProposal,
  SubmitProposal,
  SubmitVote,
  Transfer,
  TransferLoot,
} from "../generated/templates/BaalTemplate/Baal";
import { constants } from "./util/constants";
import { parser } from "./util/parser";
import { addTransaction } from "./util/transactions";

function burnShares(dao: Dao, memberId: string, amount: BigInt): void {
  let member = Member.load(memberId);

  if (member === null) {
    log.info("burn member not found", []);
  } else {
    member.shares = member.shares.minus(amount);
    dao.totalShares = dao.totalShares.minus(amount);

    member.save();

    if (member.shares.plus(member.loot) == constants.BIGINT_ZERO) {
      dao.activeMemberCount = dao.activeMemberCount.minus(constants.BIGINT_ONE);
    }

    dao.save();
  }
}

function mintShares(event: Transfer, dao: Dao, memberId: string): void {
  let member = Member.load(memberId);

  if (member === null) {
    member = new Member(memberId);
    member.createdAt = event.block.timestamp.toString();
    member.dao = event.address.toHexString();
    member.memberAddress = event.params.to;
    member.delegatingTo = event.params.to;
    member.shares = constants.BIGINT_ZERO;
    member.loot = constants.BIGINT_ZERO;
  }
  let memberInitialSharesAndLoot = member.shares.plus(member.loot);

  member.shares = member.shares.plus(event.params.amount);
  dao.totalShares = dao.totalShares.plus(event.params.amount);

  log.info("memberInitialSharesAndLoot: {}, ", [
    memberInitialSharesAndLoot.toString(),
  ]);

  if (memberInitialSharesAndLoot == constants.BIGINT_ZERO) {
    dao.activeMemberCount = dao.activeMemberCount.plus(constants.BIGINT_ONE);
  }

  member.save();
  dao.save();
}

function burnLoot(dao: Dao, memberId: string, amount: BigInt): void {
  let member = Member.load(memberId);

  if (member === null) {
    log.info("burn member not found, {}", [memberId]);
  } else {
    member.loot = member.loot.minus(amount);
    dao.totalLoot = dao.totalLoot.minus(amount);

    member.save();

    if (member.shares.plus(member.loot) == constants.BIGINT_ZERO) {
      dao.activeMemberCount = dao.activeMemberCount.minus(constants.BIGINT_ONE);
    }

    dao.save();
  }
}

function mintLoot(event: TransferLoot, dao: Dao, memberId: string): void {
  let member = Member.load(memberId);

  if (member === null) {
    member = new Member(memberId);
    member.createdAt = event.block.timestamp.toString();
    member.dao = event.address.toHexString();
    member.memberAddress = event.params.to;
    member.delegatingTo = event.params.to;
    member.shares = constants.BIGINT_ZERO;
    member.loot = constants.BIGINT_ZERO;
  }
  let memberInitialSharesAndLoot = member.shares.plus(member.loot);

  member.loot = member.loot.plus(event.params.amount);
  dao.totalLoot = dao.totalLoot.plus(event.params.amount);

  if (memberInitialSharesAndLoot == constants.BIGINT_ZERO) {
    dao.activeMemberCount = dao.activeMemberCount.plus(constants.BIGINT_ONE);
  }

  member.save();
  dao.save();
}

export function handleSetupComplete(event: SetupComplete): void {
  let daoId = event.address.toHexString();

  let dao = Dao.load(daoId);
  if (dao === null) {
    log.info("---no dao entity, {}", [daoId]);
    return;
  }

  dao.lootPaused = event.params.lootPaused;
  dao.sharesPaused = event.params.sharesPaused;
  dao.gracePeriod = event.params.gracePeriod;
  dao.votingPeriod = event.params.votingPeriod;
  dao.proposalOffering = event.params.proposalOffering;
  dao.quorumPercent = event.params.quorumPercent;
  dao.sponsorThreshold = event.params.sponsorThreshold;
  dao.minRetentionPercent = event.params.minRetentionPercent;
  dao.shareTokenName = event.params.name;
  dao.shareTokenSymbol = event.params.symbol;
  dao.totalShares = event.params.totalShares;
  dao.totalLoot = event.params.totalLoot;

  dao.save();
}

// Transfer (index_topic_1 address from, index_topic_2 address to, uint256 value)
export function handleTransfer(event: Transfer): void {
  log.info("handleTransfer, to: {}, from: {}, address: {}", [
    event.params.to.toHexString(),
    event.params.from.toHexString(),
    event.address.toHexString(),
  ]);

  let dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  //if from zero address it mints to a member
  if (event.params.from.toHexString() === constants.ADDRESS_ZERO) {
    let memberId = event.address
      .toHexString()
      .concat("-member-")
      // .concat(event.params.from.toHexString());
      .concat(event.params.to.toHexString());

    mintShares(event, dao, memberId);
    return;
  }

  //if to baal it burns from member
  if (event.params.to === event.address) {
    let memberId = event.address
      .toHexString()
      .concat("-member-")
      .concat(event.params.from.toHexString());

    burnShares(dao, memberId, event.params.amount);
    return;
  }

  //if member to member it transfers (add/subtract)
  let burnMemberId = event.address
    .toHexString()
    .concat("-member-")
    .concat(event.params.from.toHexString());

  let mintMemberId = event.address
    .toHexString()
    .concat("-member-")
    .concat(event.params.to.toHexString());

  burnShares(dao, burnMemberId, event.params.amount);
  mintShares(event, dao, mintMemberId);

  addTransaction(event.block, event.transaction, event.address);
}

// TransferLoot (index_topic_1 address from, index_topic_2 address to, uint256 amount)
export function handleTransferLoot(event: TransferLoot): void {
  log.info("handleTransfer, to: {}, from: {}, address: {}", [
    event.params.to.toHexString(),
    event.params.from.toHexString(),
    event.address.toHexString(),
  ]);

  let dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  //if from zero address it mints to a member
  if (event.params.from.toHexString() === constants.ADDRESS_ZERO) {
    let memberId = event.address
      .toHexString()
      .concat("-member-")
      .concat(event.params.to.toHexString());

    mintLoot(event, dao, memberId);
    return;
  }

  //if to baal it burns from member
  if (event.params.to === event.address) {
    let memberId = event.address
      .toHexString()
      .concat("-member-")
      .concat(event.params.from.toHexString());

    burnLoot(dao, memberId, event.params.amount);
    return;
  }

  //if member to member it transfers (add/subtract)
  let burnMemberId = event.address
    .toHexString()
    .concat("-member-")
    .concat(event.params.from.toHexString());

  let mintMemberId = event.address
    .toHexString()
    .concat("-member-")
    .concat(event.params.to.toHexString());

  burnLoot(dao, burnMemberId, event.params.amount);
  mintLoot(event, dao, mintMemberId);

  addTransaction(event.block, event.transaction, event.address);
}

// GovernanceConfigSet (uint32 voting, uint32 grace, uint256 newOffering, uint256 quorum, uint256 sponsor, uint256 minRetention)
export function handleGovernanceConfigSet(event: GovernanceConfigSet): void {
  let dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  dao.votingPeriod = event.params.voting;
  dao.gracePeriod = event.params.grace;
  dao.proposalOffering = event.params.newOffering;
  dao.quorumPercent = event.params.quorum;
  dao.sponsorThreshold = event.params.sponsor;
  dao.minRetentionPercent = event.params.minRetention;

  dao.save();

  addTransaction(event.block, event.transaction, event.address);
}

// ShamanSet (index_topic_1 address shaman, uint256 permission)
export function handleShamanSet(event: ShamanSet): void {
  let dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  let shamanId = event.address
    .toHexString()
    .concat("-shaman-")
    .concat(event.params.shaman.toHexString());

  let shaman = Shaman.load(shamanId);
  if (shaman === null) {
    shaman = new Shaman(shamanId);
    shaman.createdAt = event.block.timestamp.toString();
    shaman.dao = event.address.toHexString();
    shaman.shamanAddress = event.params.shaman;
  }

  shaman.permissions = event.params.permission;

  shaman.save();

  addTransaction(event.block, event.transaction, event.address);
}

export function handleSharesPaused(event: SharesPaused): void {
  let dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  dao.sharesPaused = event.params.paused;

  dao.save();

  addTransaction(event.block, event.transaction, event.address);
}

export function handleLootPaused(event: LootPaused): void {
  let dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  dao.lootPaused = event.params.paused;

  dao.save();

  addTransaction(event.block, event.transaction, event.address);
}

export function handleSubmitProposal(event: SubmitProposal): void {
  let dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  let proposalId = event.address
    .toHexString()
    .concat("-proposal-")
    .concat(event.params.proposal.toString());

  let proposal = new Proposal(proposalId);
  proposal.createdAt = event.block.timestamp.toString();
  proposal.createdBy = event.transaction.from;
  proposal.dao = event.address.toHexString();
  proposal.proposalId = event.params.proposal;
  proposal.proposalDataHash = event.params.proposalDataHash;
  proposal.proposalData = event.params.proposalData;
  proposal.votingPeriod = event.params.votingPeriod;
  proposal.expiration = event.params.expiration;
  proposal.sponsored = event.params.selfSponsor;
  proposal.cancelled = false;
  proposal.processed = false;
  proposal.actionFailed = false;
  proposal.passed = false;
  proposal.proposalOffering = event.transaction.value;
  proposal.maxTotalSharesAndLootAtYesVote = constants.BIGINT_ZERO;
  proposal.selfSponsor = event.params.selfSponsor;
  proposal.prevProposalId = event.params.selfSponsor
    ? dao.latestSponsoredProposalId
    : constants.BIGINT_ZERO;
  proposal.prevProposalId = constants.BIGINT_ZERO;
  proposal.votingStarts = event.params.selfSponsor
    ? event.block.timestamp
    : constants.BIGINT_ZERO;
  proposal.votingEnds = event.params.selfSponsor
    ? event.block.timestamp.plus(event.params.votingPeriod)
    : constants.BIGINT_ZERO;
  proposal.graceEnds = event.params.selfSponsor
    ? event.block.timestamp
        .plus(event.params.votingPeriod)
        .plus(dao.gracePeriod)
    : constants.BIGINT_ZERO;

  let result = parser.getResultFromJson(event.params.details);
  if (result.error != "none") {
    log.error("details parse error prop: {}", [proposalId]);
    proposal.details = event.params.details;
  } else {
    let object = result.object;

    let title = parser.getStringFromJson(object, "title");
    if (title.error == "none") {
      proposal.title = title.data;
    }

    let description = parser.getStringFromJson(object, "description");
    if (description.error == "none") {
      proposal.description = description.data;
    }

    let proposalType = parser.getStringFromJson(object, "proposalType");
    if (proposalType.error == "none") {
      proposal.proposalType = proposalType.data;
    } else {
      proposal.proposalType = "unknown";
    }

    let contentURI = parser.getStringFromJson(object, "contentURI");
    if (contentURI.error == "none") {
      proposal.contentURI = contentURI.data;
    }

    let contentURIType = parser.getStringFromJson(object, "contentURIType");
    if (contentURIType.error == "none") {
      proposal.contentURIType = contentURIType.data;
    }
  }

  proposal.save();

  if (event.params.selfSponsor) {
    dao.latestSponsoredProposalId = event.params.proposal;
  }
  dao.proposalCount = dao.proposalCount.plus(constants.BIGINT_ONE);
  dao.save();

  addTransaction(event.block, event.transaction, event.address);
}

export function handleSponsorProposal(event: SponsorProposal): void {
  let dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  let proposalId = event.address
    .toHexString()
    .concat("-proposal-")
    .concat(event.params.proposal.toString());

  let proposal = Proposal.load(proposalId);
  if (proposal === null) {
    return;
  }

  proposal.sponsor = event.params.member;
  proposal.sponsored = true;
  proposal.votingStarts = event.block.timestamp;
  proposal.votingEnds = event.block.timestamp.plus(dao.votingPeriod);
  proposal.graceEnds = event.block.timestamp
    .plus(dao.votingPeriod)
    .plus(dao.gracePeriod);
  proposal.prevProposalId = dao.latestSponsoredProposalId;

  dao.latestSponsoredProposalId = event.params.proposal;

  proposal.save();
  dao.save();

  addTransaction(event.block, event.transaction, event.address);
}

export function handleProcessProposal(event: ProcessProposal): void {
  let proposalId = event.address
    .toHexString()
    .concat("-proposal-")
    .concat(event.params.proposal.toString());

  let proposal = Proposal.load(proposalId);
  if (proposal === null) {
    return;
  }

  proposal.processed = true;
  proposal.passed = event.params.passed;
  proposal.actionFailed = event.params.actionFailed;

  proposal.save();

  addTransaction(event.block, event.transaction, event.address);
}

// why do we need this when the above event emit it too?
export function handleProcessingFailed(event: ProcessingFailed): void {
  let proposalId = event.address
    .toHexString()
    .concat("-proposal-")
    .concat(event.params.proposal.toString());

  let proposal = Proposal.load(proposalId);
  if (proposal === null) {
    return;
  }

  proposal.actionFailed = true;

  proposal.save();

  addTransaction(event.block, event.transaction, event.address);
}

export function handleCancelProposal(event: CancelProposal): void {
  let proposalId = event.address
    .toHexString()
    .concat("-proposal-")
    .concat(event.params.proposal.toString());

  let proposal = Proposal.load(proposalId);
  if (proposal === null) {
    return;
  }

  proposal.cancelled = true;

  proposal.save();

  addTransaction(event.block, event.transaction, event.address);
}

export function handleSubmitVote(event: SubmitVote): void {
  let dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  let proposalId = event.address
    .toHexString()
    .concat("-proposal-")
    .concat(event.params.proposal.toString());

  let proposal = Proposal.load(proposalId);
  if (proposal === null) {
    return;
  }

  let voteId = event.address
    .toHexString()
    .concat("-proposal-")
    .concat(event.params.proposal.toHexString())
    .concat("-vote-")
    .concat(event.params.member.toHexString());

  let vote = new Vote(voteId);

  vote.createdAt = event.block.timestamp.toString();
  vote.daoAddress = event.address;
  vote.approved = event.params.approved;
  vote.balance = event.params.balance;

  let memberId = event.address
    .toHexString()
    .concat("-member-")
    .concat(event.params.member.toHexString());
  vote.member = memberId;
  vote.proposal = proposalId;

  if (event.params.approved) {
    proposal.yesVotes = proposal.yesVotes.plus(constants.BIGINT_ONE);
    proposal.yesBalance = proposal.yesBalance.plus(event.params.balance);
    proposal.maxTotalSharesAndLootAtYesVote = dao.totalShares.plus(
      dao.totalLoot
    );
  } else {
    proposal.noVotes = proposal.noVotes.plus(constants.BIGINT_ONE);
    proposal.noBalance = proposal.noBalance.plus(event.params.balance);
  }

  vote.save();
  proposal.save();

  addTransaction(event.block, event.transaction, event.address);
}

export function handleRageQuit(event: Ragequit): void {
  let dao = Dao.load(event.address.toHexString());
  if (dao === null) {
    return;
  }

  let memberId = event.address
    .toHexString()
    .concat("-member-")
    .concat(event.params.member.toHexString());

  if (event.params.lootToBurn !== constants.BIGINT_ZERO) {
    burnLoot(dao, memberId, event.params.lootToBurn);
  }

  if (event.params.sharesToBurn !== constants.BIGINT_ZERO) {
    burnShares(dao, memberId, event.params.sharesToBurn);
  }

  let rageId = memberId
    .concat("-")
    .concat("rage-")
    .concat(event.transaction.hash.toHexString());

  let rage = new RageQuit(rageId);

  rage.createdAt = event.block.timestamp.toString();
  rage.dao = dao.id;
  rage.member = memberId;
  rage.to = event.params.to;
  rage.shares = event.params.sharesToBurn;
  rage.loot = event.params.lootToBurn;
  rage.tokens = event.params.tokens.map<Bytes>((a) => a as Bytes);

  rage.save();

  addTransaction(event.block, event.transaction, event.address);
}

export function handleDelegateChanged(event: DelegateChanged): void {
  let memberId = event.address
    .toHexString()
    .concat("-member-")
    .concat(event.params.delegator.toHexString());

  let member = Member.load(memberId);

  if (member === null) {
    log.info("handleDelegateChanged no delegator member: {}", [memberId]);
    return;
  }

  member.delegatingTo = event.params.toDelegate;

  member.save();

  addTransaction(event.block, event.transaction, event.address);
}

export function handleDelegateVotesChanged(event: DelegateVotesChanged): void {
  let memberId = event.address
    .toHexString()
    .concat("-member-")
    .concat(event.params.delegate.toHexString());
  let member = Member.load(memberId);

  if (member === null) {
    member = new Member(memberId);
    member.createdAt = event.block.timestamp.toString();
    member.dao = event.address.toHexString();
    member.memberAddress = event.params.delegate;
    member.delegatingTo = event.params.delegate;
    member.shares = constants.BIGINT_ZERO;
    member.loot = constants.BIGINT_ZERO;
  }

  member.delegateShares = event.params.newBalance;

  member.save();

  addTransaction(event.block, event.transaction, event.address);
}

// gnosis events
// - AvatarSet(indexed address,indexed address)
// - ChangedGuard(address)
// - OwnershipTransferred(indexed address,indexed address)
// - TargetSet(indexed address,indexed address)

// erc20 event - no current need to map
// - Approval(indexed address,indexed address,uint256)
