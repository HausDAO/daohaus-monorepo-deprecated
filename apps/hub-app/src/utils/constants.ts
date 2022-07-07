import {
  ITransformedMembership,
  Member_OrderBy,
  Ordering,
} from '@daohaus/dao-data';

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
  // ordering: Ordering<Member_OrderBy>;
};

export const SORT_FIELDS: { [index: string]: HubSortOption } = {
  ACTIVE_PROPOSAL: {
    value: 'activeProposalCount',
    name: 'Active Proposals',
    // ordering: { orderDirection: 'desc', orderBy: dao_: },
  },
  VAULT: { value: 'fiatTotal', name: 'Vaults' },
  MEMBERS: { value: 'activeMemberCount', name: 'Members' },
  NAME: { value: 'name', name: 'Name' },
};

export const DEFAULT_SORT_KEY = 'ACTIVE_PROPOSAL';
