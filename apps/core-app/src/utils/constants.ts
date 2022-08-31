import { Ordering, Proposal_OrderBy } from '@daohaus/dao-data';

export const PROPOSAL_FILTERS: { [key: string]: string } = {
  unsponsored: 'Unsponsored',
  voting: 'In Voting',
  grace: 'In Grace',
  needsProcessing: 'Ready to Process',
  passed: 'Passed',
  actionFailed: 'Action Failed',
  failed: 'Defeated',
  expired: 'Expired',
};

export const DEFAULT_PROPOSAL_PAGE_SIZE = 10;
export const DEFAULT_MEMBERS_PAGE_SIZE = 25;
export const DEFAULT_PROPOSAL_SORT: Ordering<Proposal_OrderBy> = {
  orderBy: 'proposalId',
  orderDirection: 'desc',
};

export enum ProposalTypeIds {
  Signal = 'SIGNAL',
  IssueSharesLoot = 'ISSUE',
  addShaman = 'ADD_SHAMAN',
  updateShaman = 'UPDATE_SHAMAN',
  transferErc20 = 'TRANSFER_ERC20',
}

export enum ProposalTypeWarnings {}
