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

export const ENCODED_0X0_DATA =
  '0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
