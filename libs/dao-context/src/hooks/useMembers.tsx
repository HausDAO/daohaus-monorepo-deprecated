import { useContext } from 'react';
import { DaoContext } from '../DaoContext';
import { DaoConnectMembersType } from '../utils/types';

export const useMembers = (): DaoConnectMembersType => {
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
  };
};
