export type ProposalStatus =
  | 'Unsponsored'
  | 'Voting'
  | 'Grace'
  | 'Expired'
  | 'Cancelled'
  | 'Ready for Processing'
  | 'Failed'
  | 'Passed'
  | 'Processing Failed'
  | 'Unknown';

export const PROPOSAL_STATUS: { [index: string]: ProposalStatus } = {
  unsponsored: 'Unsponsored',
  voting: 'Voting',
  grace: 'Grace',
  expired: 'Expired',
  cancelled: 'Cancelled',
  needsProcessing: 'Ready for Processing',
  failed: 'Failed',
  passed: 'Passed',
  actionFailed: 'Processing Failed',
  unknown: 'Unknown',
};

// unborn - not needed
// unsponsored
// cancelled
// voting
// grace
// defeated - after grace/no > yes - counts as processed
//
