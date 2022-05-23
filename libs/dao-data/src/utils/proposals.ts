import { PROPOSAL_STATUSES } from '@daohaus/common-utilities';
import { Proposal } from '../types';

export const getProposalStatus = (proposal: Partial<Proposal>): string => {
  if (!proposal.sponsored) {
    return PROPOSAL_STATUSES.unsponsored;
  }
  if (proposal.cancelled) {
    return PROPOSAL_STATUSES.cancelled;
  }
  if (proposal.passed) {
    return PROPOSAL_STATUSES.passed;
  }
  if (proposal.actionFailed) {
    return PROPOSAL_STATUSES.actionFailed;
  }

  const now = new Date().getTime() / 1000;
  if (
    Number(proposal.votingStarts) < now &&
    Number(proposal.votingEnds) < now
  ) {
    return PROPOSAL_STATUSES.voting;
  }
  if (Number(proposal.votingEnds) < now && Number(proposal.graceEnds) < now) {
    return PROPOSAL_STATUSES.grace;
  }

  if (
    Number(proposal.expiration) > 0 &&
    Number(proposal.expiration) >
      Number(proposal.votingEnds) + Number(proposal.graceEnds) + now
  ) {
    return PROPOSAL_STATUSES.expired;
  }

  if (
    now > Number(proposal.graceEnds) &&
    Number(proposal.yesBalance) > Number(proposal.noBalance) &&
    !proposal.processed
  ) {
    return PROPOSAL_STATUSES.needsProcessing;
  }

  if (
    now > Number(proposal.graceEnds) &&
    Number(proposal.yesBalance) < Number(proposal.noBalance)
  ) {
    return PROPOSAL_STATUSES.failed;
  }

  return PROPOSAL_STATUSES.unknown;
};
