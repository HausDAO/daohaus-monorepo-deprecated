import { ITransformedMembership } from '@daohaus/dao-data';

export const FILTER_TYPE = {
  DELEGATING: 'delegating',
  DELEGATING_TO: 'delegatingTo',
};

// export const SORT_FIELDS: [string, string][] = [
//   ['Active Proposals', 'activeProposalCount'],
//   ['Vaults', 'memberCount'],
// ];

export type HubSortOption = {
  value: keyof ITransformedMembership;
  name: string;
};

export const SORT_FIELDS: { [index: string]: HubSortOption } = {
  ACTIVE_PROPOSAL: { value: 'activeProposalCount', name: 'Active Proposals' },
  VAULT: { value: 'fiatTotal', name: 'Vaults' },
  MEMBERS: { value: 'activeMemberCount', name: 'Members' },
  NAME: { value: 'name', name: 'Name' },
};

export const DEFAULT_SORT_KEY = 'ACTIVE_PROPOSAL';
