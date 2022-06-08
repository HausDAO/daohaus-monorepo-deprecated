import { Keychain } from '@daohaus/common-utilities';
import { HausError } from '../HausError';
import { FindDaoQuery } from '../subgraph/queries/daos.generated';
import { ListProposalsQuery } from '../subgraph/queries/proposals.generated';
import { OrderDirection } from '../subgraph/schema.generated';

/**
 * Query related types
 */
export interface ListQueryArguments<TOrderBy extends string, Variables> {
  networkId: keyof Keychain;
  filter?: Variables;
  ordering?: Ordering<TOrderBy>;
  paging?: Paging;
}

export interface CrossNetworkQueryArguments {
  networkIds: Array<keyof Keychain>;
  memberAddress: string;
  includeTokens?: boolean;
}

export type QueryVariables = {
  [field: string]: string;
};

export type Ordering<TOrderBy extends string> = {
  orderBy: TOrderBy;
  orderDirection: OrderDirection;
};

export type Paging = {
  pageSize: number;
  offset?: number;
  lastId?: string;
};

export interface IListQueryResults<
  TOrderBy extends string,
  Variables,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Data = any
> {
  items?: Data;
  error?: HausError;
  networkId?: keyof Keychain;
  filter?: Variables;
  ordering?: Ordering<TOrderBy>;
  nextPaging?: Paging;
  previousPaging?: Paging;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface QueryResult<Data = any> {
  data?: Data;
  error?: HausError;
  networkId?: keyof Keychain;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // queryOptions: any;
  // nextPage: Function,
}

export type QueryProposal = ListProposalsQuery['proposals'][number];
export interface TransformedProposal extends QueryProposal {
  status?: string;
}
export interface TransformedProposalQuery {
  proposal: TransformedProposal | undefined;
}
export interface TransformedProposalListQuery {
  proposals: TransformedProposal[];
}

export type TransformedMembership = {
  dao: string;
  name?: string;
  safeAddress: string;
  activeProposalCount: number;
  activeMemberCount: string;
  votingPower: number;
  networkId?: keyof Keychain;
  delegate?: string;
  isDelegate: boolean;
  memberAddress: string;
  fiatTotal?: number;
  tokenBalances?: TokenBalance[];
};
export interface TransformedMembershipsQuery {
  daos: TransformedMembership[];
}
export type TokenInfo = {
  decimals: number;
  symbol: string;
  name: string;
  logoUri: string | null;
};
export type TokenBalance = {
  token: TokenInfo | null;
  tokenAddress: string | null;
  balance: string;
  ethValue: string;
  timestamp: string;
  fiatBalance: string;
  fiatConversion: string;
  fiatCode: string;
};
export interface DaoTokenBalances {
  safeAddress: string;
  fiatTotal: number;
  tokenBalances: TokenBalance[];
}

export type QueryDao = FindDaoQuery['dao'];
export type DaoWithTokenData = {
  fiatTotal: number;
  tokenBalances: TokenBalance[];
} & QueryDao;
export interface DaoWithTokenDataQuery {
  dao: DaoWithTokenData;
}
