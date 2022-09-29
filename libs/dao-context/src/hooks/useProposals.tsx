import { useContext } from 'react';
import { DaoContext } from '../DaoContext';
import { DaoConnectProposalsType } from '../utils/types';

type ProposalsHookTypes = {
  loadMoreProposals: () => Promise<void>;
};

export const useProposals = (): DaoConnectProposalsType &
  ProposalsHookTypes => {
  const {
    proposals,
    setProposals,
    isProposalsLoading,
    refreshProposals,
    proposalsFilter,
    setProposalsFilter,
    proposalsSort,
    setProposalsSort,
    proposalsPaging,
    setProposalsPaging,
    proposalsNextPaging,
    getNextPage,
  } = useContext(DaoContext);

  const handleLoadMore = () => {
    setProposalsPaging(proposalsNextPaging);
  };

  return {
    proposals,
    setProposals,
    isProposalsLoading,
    refreshProposals,
    proposalsFilter,
    setProposalsFilter,
    proposalsSort,
    setProposalsSort,
    proposalsPaging,
    setProposalsPaging,
    proposalsNextPaging,
    getNextPage,
    handleLoadMore,
  };
};
