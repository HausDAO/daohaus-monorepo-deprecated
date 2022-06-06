import {
  nowInSeconds,
  ProposalStatus,
  PROPOSAL_STATUS,
} from '@daohaus/common-utilities';
import { QueryProposal } from '../types';

export const isProposalUnsponsored = (proposal: QueryProposal): boolean =>
  !proposal.sponsored;

export const isProposalCancelled = (proposal: QueryProposal): boolean =>
  proposal.cancelled;

export const isProposalPassed = (proposal: QueryProposal): boolean =>
  proposal.passed;

export const isProposalActionFailed = (proposal: QueryProposal): boolean =>
  proposal.actionFailed;

export const isProposalInVoting = (proposal: QueryProposal): boolean => {
  const now = nowInSeconds();
  return (
    Number(proposal.votingStarts) < now && Number(proposal.votingEnds) > now
  );
};

export const isProposalInGrace = (proposal: QueryProposal): boolean => {
  const now = nowInSeconds();
  return Number(proposal.votingEnds) < now && Number(proposal.graceEnds) > now;
};

// TODO - more testing here and in filters. likely need some checkes on unsponsored/cancelled
export const isProposalExpired = (proposal: QueryProposal): boolean =>
  Number(proposal.expiration) > 0 &&
  !proposal.processed &&
  !proposal.cancelled &&
  Number(proposal.expiration) <
    Number(proposal.votingPeriod) +
      Number(proposal.gracePeriod) +
      nowInSeconds();

export const proposalNeedsProcessing = (proposal: QueryProposal): boolean =>
  nowInSeconds() > Number(proposal.graceEnds) &&
  Number(proposal.yesBalance) > Number(proposal.noBalance) &&
  !proposal.processed;

export const isProposalFailed = (proposal: QueryProposal): boolean =>
  nowInSeconds() > Number(proposal.graceEnds) &&
  Number(proposal.yesBalance) < Number(proposal.noBalance);

export const getProposalStatus = (proposal: QueryProposal): ProposalStatus => {
  if (isProposalUnsponsored(proposal)) {
    return PROPOSAL_STATUS['unsponsored'];
  }
  if (isProposalCancelled(proposal)) {
    return PROPOSAL_STATUS['cancelled'];
  }
  if (isProposalPassed(proposal)) {
    return PROPOSAL_STATUS['passed'];
  }
  if (isProposalActionFailed(proposal)) {
    return PROPOSAL_STATUS['actionFailed'];
  }
  if (isProposalInVoting(proposal)) {
    return PROPOSAL_STATUS['voting'];
  }
  if (isProposalInGrace(proposal)) {
    return PROPOSAL_STATUS['grace'];
  }
  if (isProposalExpired(proposal)) {
    return PROPOSAL_STATUS['expired'];
  }
  if (proposalNeedsProcessing(proposal)) {
    return PROPOSAL_STATUS['needsProcessing'];
  }
  if (isProposalFailed(proposal)) {
    return PROPOSAL_STATUS['failed'];
  }
  return PROPOSAL_STATUS['unknown'];
};
