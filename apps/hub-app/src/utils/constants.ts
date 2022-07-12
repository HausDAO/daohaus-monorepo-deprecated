import { Dao_OrderBy, Ordering } from '@daohaus/dao-data';

export const FILTER_TYPE = {
  DELEGATING: 'delegating',
  DELEGATING_TO: 'delegatingTo',
};

export type HubSortOption = {
  name: string;
  ordering: Ordering<Dao_OrderBy>;
};

export const SORT_FIELDS: { [index: string]: HubSortOption } = {
  PROPOSALS: {
    name: 'Proposals',
    ordering: { orderDirection: 'desc', orderBy: 'proposalCount' },
  },
  MEMBERS: {
    name: 'Members',
    ordering: { orderDirection: 'desc', orderBy: 'activeMemberCount' },
  },
  NEWEST: {
    name: 'Newest',
    ordering: { orderDirection: 'desc', orderBy: 'createdAt' },
  },
  OLDEST: {
    name: 'Oldest',
    ordering: { orderDirection: 'asc', orderBy: 'createdAt' },
  },
};

export const DEFAULT_SORT_KEY = 'PROPOSALS';
