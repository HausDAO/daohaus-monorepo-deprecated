export const PROPOSAL_STATUSES = {
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
} as const;
