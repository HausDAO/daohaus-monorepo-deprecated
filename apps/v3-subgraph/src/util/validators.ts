import { Address, dataSource, log } from '@graphprotocol/graph-ts';
import { Member } from '../../generated/schema';
import { constants } from './constants';

export namespace validators {
  export function isShareholder(
    senderAddress: Address,
    daoId: string
  ): boolean {
    const memberId = daoId
      .concat('-member-')
      .concat(senderAddress.toHexString());

    log.info('validating memberId, {}', [memberId]);

    // 0x24357654d64da97a55fb2f73c5b66d1927ab1e4c-member-0x83ab8e31df35aa3281d630529c6f4bf5ac7f7abf

    const member = Member.load(memberId);
    if (!member || member.shares == constants.BIGINT_ZERO) {
      log.info('no member or shares', []);

      return false;
    }

    log.info('found member with shares', []);
    return true;
  }
}
