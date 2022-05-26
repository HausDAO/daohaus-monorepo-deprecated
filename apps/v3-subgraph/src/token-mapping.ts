import { BigInt, log } from '@graphprotocol/graph-ts';

import { Dao, Member, TokenLookup } from '../generated/schema';
import {
  DelegateChanged,
  DelegateVotesChanged,
  Transfer,
} from '../generated/templates/SharesTemplate/Shares';
import { Transfer as LootTransfer } from '../generated/templates/LootTemplate/Loot';
import { constants } from './util/constants';
import { addTransaction } from './util/transactions';

function mintShares(event: Transfer, dao: Dao, memberId: string): void {
  let member = Member.load(memberId);

  if (member === null) {
    member = new Member(memberId);
    member.createdAt = event.block.timestamp.toString();
    member.dao = dao.id;
    member.memberAddress = event.params.to;
    member.delegatingTo = event.params.to;
    member.shares = constants.BIGINT_ZERO;
    member.loot = constants.BIGINT_ZERO;
  }
  let memberInitialSharesAndLoot = member.shares.plus(member.loot);

  member.shares = member.shares.plus(event.params.value);
  dao.totalShares = dao.totalShares.plus(event.params.value);

  if (memberInitialSharesAndLoot == constants.BIGINT_ZERO) {
    dao.activeMemberCount = dao.activeMemberCount.plus(constants.BIGINT_ONE);
  }

  member.save();
  dao.save();
}

export function burnShares(dao: Dao, memberId: string, amount: BigInt): void {
  let member = Member.load(memberId);

  if (member === null) {
    log.info('burn member not found', []);
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

function mintLoot(event: LootTransfer, dao: Dao, memberId: string): void {
  let member = Member.load(memberId);

  if (member === null) {
    member = new Member(memberId);
    member.createdAt = event.block.timestamp.toString();
    member.dao = dao.id;
    member.memberAddress = event.params.to;
    member.delegatingTo = event.params.to;
    member.shares = constants.BIGINT_ZERO;
    member.loot = constants.BIGINT_ZERO;
  }
  let memberInitialSharesAndLoot = member.shares.plus(member.loot);

  member.loot = member.loot.plus(event.params.value);
  dao.totalLoot = dao.totalLoot.plus(event.params.value);

  if (memberInitialSharesAndLoot == constants.BIGINT_ZERO) {
    dao.activeMemberCount = dao.activeMemberCount.plus(constants.BIGINT_ONE);
  }

  member.save();
  dao.save();
}

export function burnLoot(dao: Dao, memberId: string, amount: BigInt): void {
  let member = Member.load(memberId);

  if (member === null) {
    log.info('burn member not found, {}', [memberId]);
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

// Transfer (index_topic_1 address from, index_topic_2 address to, uint256 value)
export function handleSharesTransfer(event: Transfer): void {
  log.info('handleTransfer shares, to: {}, from: {}, address: {}, amount: {}', [
    event.params.to.toHexString(),
    event.params.from.toHexString(),
    event.address.toHexString(),
    event.params.value.toString(),
  ]);
  let tokenLookup = TokenLookup.load(event.address.toHexString());
  if (tokenLookup === null) {
    log.info('handleTransfer shares, no tokenlookup', []);
    return;
  }

  let dao = Dao.load(tokenLookup.dao.toHexString());
  if (dao === null) {
    log.info('handleTransfer shares, no dao', []);
    return;
  }
  log.info('handleTransfer shares, found dao {}', [dao.id]);
  // if from zero address it mints to a member
  if (event.params.from.toHexString() == constants.ADDRESS_ZERO) {
    let memberId = dao.id
      .concat('-member-')
      .concat(event.params.to.toHexString());
    log.info('handleTransfer, minting shares to: {}', [memberId]);
    mintShares(event, dao, memberId);
    return;
  }
  //if to baal it burns from member
  // 5/25: adjust event.address to look at baal we looked up tokenLookup.dao
  // but need to check - it could be the loot/share token
  if (event.params.to.toHexString() == constants.ADDRESS_ZERO) {
    let memberId = dao.id
      .concat('-member-')
      .concat(event.params.from.toHexString());
    log.info('handleTransfer, buring shares to: {}', [memberId]);
    burnShares(dao, memberId, event.params.value);
    return;
  }
  //if member to member it transfers (add/subtract)
  let burnMemberId = dao.id
    .concat('-member-')
    .concat(event.params.from.toHexString());
  let mintMemberId = dao.id
    .concat('-member-')
    .concat(event.params.to.toHexString());
  log.info(
    'handleTransfer all the way down, buring shares: {}, minting shares: {}',
    [burnMemberId, mintMemberId]
  );
  burnShares(dao, burnMemberId, event.params.value);
  mintShares(event, dao, mintMemberId);
  addTransaction(event.block, event.transaction, event.address);
}

// // TransferLoot (index_topic_1 address from, index_topic_2 address to, uint256 amount)
export function handleLootTransfer(event: LootTransfer): void {
  let tokenLookup = TokenLookup.load(event.address.toHexString());
  if (tokenLookup === null) {
    return;
  }

  let dao = Dao.load(tokenLookup.dao.toHexString());
  if (dao === null) {
    return;
  }

  if (event.params.from.toHexString() == constants.ADDRESS_ZERO) {
    let memberId = dao.id
      .concat('-member-')
      .concat(event.params.to.toHexString());

    mintLoot(event, dao, memberId);
    return;
  }

  //if to 0x0 it burns from member
  if (event.params.to.toHexString() == constants.ADDRESS_ZERO) {
    let memberId = dao.id
      .concat('-member-')
      .concat(event.params.from.toHexString());

    burnLoot(dao, memberId, event.params.value);
    return;
  }

  //if member to member it transfers (add/subtract)
  let burnMemberId = dao.id
    .concat('-member-')
    .concat(event.params.from.toHexString());

  let mintMemberId = dao.id
    .concat('-member-')
    .concat(event.params.to.toHexString());

  burnLoot(dao, burnMemberId, event.params.value);
  mintLoot(event, dao, mintMemberId);

  addTransaction(event.block, event.transaction, event.address);
}

export function handleDelegateChanged(event: DelegateChanged): void {
  let memberId = event.address
    .toHexString()
    .concat('-member-')
    .concat(event.params.delegator.toHexString());
  let member = Member.load(memberId);
  if (member === null) {
    log.info('handleDelegateChanged no delegator member: {}', [memberId]);
    return;
  }
  member.delegatingTo = event.params.toDelegate;
  member.save();
  addTransaction(event.block, event.transaction, event.address);
}

export function handleDelegateVotesChanged(event: DelegateVotesChanged): void {
  let memberId = event.address
    .toHexString()
    .concat('-member-')
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
