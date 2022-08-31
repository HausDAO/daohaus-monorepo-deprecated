import { TDao, TMembers } from '../contexts/DaoContext';
import { PROPOSAL_TYPE_LABELS } from './constants';

export const missingDaoProfileData = (dao: TDao): boolean => {
  if (!dao?.profile || !dao.profile.length) return true;
  return dao.description === '' && dao.avatarImg === '';
};

export const getMemberFromMemberList = (
  members: TMembers,
  memberAddress: string
): TMembers[number] | undefined => {
  const res = members.find(
    (member) =>
      member.memberAddress.toLowerCase() === memberAddress.toLowerCase()
  );

  console.log('res', res);

  return res;
};

export const getProposalTypeLabel = (proposalType: string | undefined) => {
  return (
    (proposalType && PROPOSAL_TYPE_LABELS[proposalType]) ||
    'Unknown Proposal Type'
  );
};
