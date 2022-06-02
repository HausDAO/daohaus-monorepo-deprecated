import {
  nowInSeconds,
  ProposalStatus,
  PROPOSAL_STATUS,
} from '@daohaus/common-utilities';
import { ListProposalsQuery } from '../types';

type ProposalForStatusCheck = ListProposalsQuery['proposals'][number];

export const isProposalUnsponsored = (
  proposal: ProposalForStatusCheck
): boolean => !proposal.sponsored;

export const isProposalCancelled = (
  proposal: ProposalForStatusCheck
): boolean => proposal.cancelled;

export const isProposalPassed = (proposal: ProposalForStatusCheck): boolean =>
  proposal.passed;

export const isProposalActionFailed = (
  proposal: ProposalForStatusCheck
): boolean => proposal.actionFailed;

export const isProposalInVoting = (
  proposal: ProposalForStatusCheck
): boolean => {
  const now = nowInSeconds();
  return (
    Number(proposal.votingStarts) < now && Number(proposal.votingEnds) > now
  );
};

export const isProposalInGrace = (
  proposal: ProposalForStatusCheck
): boolean => {
  const now = nowInSeconds();
  return Number(proposal.votingEnds) < now && Number(proposal.graceEnds) > now;
};

export const isProposalExpired = (proposal: ProposalForStatusCheck): boolean =>
  Number(proposal.expiration) > 0 &&
  Number(proposal.expiration) <
    Number(proposal.votingEnds) + Number(proposal.graceEnds) + nowInSeconds();

export const proposalNeedsProcessing = (
  proposal: ProposalForStatusCheck
): boolean =>
  nowInSeconds() > Number(proposal.graceEnds) &&
  Number(proposal.yesBalance) > Number(proposal.noBalance) &&
  !proposal.processed;

export const isProposalFailed = (proposal: ProposalForStatusCheck): boolean =>
  nowInSeconds() > Number(proposal.graceEnds) &&
  Number(proposal.yesBalance) < Number(proposal.noBalance);

type QueryProposal = ListProposalsQuery['proposals'][number];

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
