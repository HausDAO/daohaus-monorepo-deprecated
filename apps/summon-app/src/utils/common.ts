import { isArray, isNumberString } from '@daohaus/common-utilities';
import { isAddress } from 'ethers/lib/utils';

const VAL_MSG = {
  formattingError:
    'Incorrect formatting. Check formatting rules in tooltip above.',
  LOOT_ERR:
    'Loot is required and must be a number. Check formatting rules in tooltip above.',
  SHARE_ERR:
    'Shares are required and must be a number. Check formatting rules in tooltip above',
  ADDRESS_ERR:
    'Member addresses are required and must be follow the "0x" pattern. Check formatting rules in tooltip above',
};

////////////////////Members Segment////////////////////////
export const validateMemberData = (memberData: Record<string, string[]>) => {
  const { memberAddresses, memberShares, memberLoot } = memberData;
  if (
    !isArray(memberAddresses) ||
    !isArray(memberShares) ||
    !isArray(memberLoot)
  )
    return VAL_MSG.formattingError;

  if (!memberAddresses.every((address) => isAddress(address)))
    return VAL_MSG.ADDRESS_ERR;
  if (!memberShares.every((address) => isNumberString(address)))
    return VAL_MSG.SHARE_ERR;
  if (!memberLoot.every((address) => isNumberString(address)))
    return VAL_MSG.LOOT_ERR;
  return true;
};
export const transformMemberData = (response: string) => {
  if (!response) return '';
  const memberEntities = response
    .split(/[\n|,]/)
    .map((str) => str.trim())
    .filter(Boolean);

  return memberEntities.reduce(
    (acc, member) => {
      const splitString = member.trim().split(' ');
      const newMemberAddress = splitString[0];
      const newMemberShares = splitString[1];
      const newMemberLoot = splitString[2];
      return {
        memberAddresses: [...acc.memberAddresses, newMemberAddress],
        memberShares: [...acc.memberShares, newMemberShares],
        memberLoot: [...acc.memberLoot, newMemberLoot],
      };
    },
    {
      memberAddresses: [] as string[],
      memberShares: [] as string[],
      memberLoot: [] as string[],
    }
  );
};
