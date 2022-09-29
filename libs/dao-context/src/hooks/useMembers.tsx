import { useContext } from 'react';
import { DaoContext } from '../DaoContext';
import { DaoConnectMembersType } from '../utils/types';

type MembersHookTypes = {
  loadMoreMembers: () => Promise<void>;
};

export const useMembers = (): DaoConnectMembersType & MembersHookTypes => {
  const {
    members,
    setMembers,
    isMembersLoading,
    refreshMembers,
    membersFilter,
    setMembersFilter,
    membersSort,
    setMembersSort,
    membersPaging,
    setMembersPaging,
    membersNextPaging,
    getNextPage,
  } = useContext(DaoContext);

  const loadMoreMembers = async () => {
    setMembersPaging(membersNextPaging);
  };

  return {
    members,
    setMembers,
    isMembersLoading,
    refreshMembers,
    membersFilter,
    setMembersFilter,
    membersSort,
    setMembersSort,
    membersPaging,
    setMembersPaging,
    membersNextPaging,
    getNextPage,
    loadMoreMembers,
  };
};
