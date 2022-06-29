import { nowInSeconds, PROPOSAL_STATUS } from '@daohaus/common-utilities';
import { Proposal_Filter } from '../types';

export const statusFilter = (
  status: string,
  votingPlusGraceDuration?: string
): Proposal_Filter | undefined => {
  const now = `${nowInSeconds()}`;

  switch (status) {
    case PROPOSAL_STATUS['unsponsored']: {
      return { sponsored: false };
    }
    case PROPOSAL_STATUS['cancelled']: {
      return { cancelled: true };
    }
    case PROPOSAL_STATUS['passed']: {
      return { passed: true };
    }
    case PROPOSAL_STATUS['actionFailed']: {
      return { actionFailed: true };
    }
    case PROPOSAL_STATUS['voting']: {
      return { votingStarts_lte: now, votingEnds_lte: now };
    }
    case PROPOSAL_STATUS['grace']: {
      return { votingEnds_gt: now, graceEnds_lte: now };
    }
    case PROPOSAL_STATUS['expired']: {
      if (!votingPlusGraceDuration) {
        return;
      }
      const expirationTime = (
        Number(now) + Number(votingPlusGraceDuration)
      ).toFixed();
      return {
        processed: false,
        cancelled: false,
        expiration_gt: '0',
        expiration_lt: `${expirationTime}`,
      };
    }
    case PROPOSAL_STATUS['needsProcessing']: {
      return { processed: false, currentlyPassing: true, graceEnds_gt: now };
    }
    case PROPOSAL_STATUS['failed']: {
      return { currentlyPassing: false, graceEnds_lte: now };
    }
    default: {
      return;
    }
  }
};
