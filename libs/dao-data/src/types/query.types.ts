import { Keychain } from '@daohaus/common-utilities';
import { HausError } from '../HausError';
import { ListDaosQuery } from '../subgraph/queries/daos.generated';
import { ListProposalsQuery } from '../subgraph/queries/proposals.generated';
import { OrderDirection } from '../subgraph/schema.generated';

/**
 * Query related types
 */
export interface IListQueryArguments<TOrderBy extends string, Variables> {
  networkId: keyof Keychain;
  filter?: Variables;
  ordering?: Ordering<TOrderBy>;
  paging?: Paging;
}

export interface ICrossNetworkMemberListArguments<
  TOrderBy extends string,
  DaoVariables,
  MemberVariables
> {
  networkIds: Array<keyof Keychain>;
  memberAddress: string;
  daoFilter?: DaoVariables;
  memberFilter?: MemberVariables;
  ordering?: Ordering<TOrderBy>;
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
  previousPageLastId?: string;
};

export interface IListQueryResults<
  TOrderBy extends string,
  Variables,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Data = any
> {
  items: Data;
  error?: HausError;
  networkId?: keyof Keychain;
  filter?: Variables;
  ordering?: Ordering<TOrderBy>;
  nextPaging?: Paging;
  previousPaging?: Paging;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IFindQueryResult<Data = any> {
  data?: Data;
  error?: HausError;
  networkId?: keyof Keychain;
}

export type QueryProposal = ListProposalsQuery['proposals'][number];
export interface ITransformedProposal extends QueryProposal {
  status?: string;
}
export interface ITransformedProposalQuery {
  proposal: ITransformedProposal | undefined;
}
export interface ITransformedProposalListQuery {
  proposals: ITransformedProposal[];
}

export interface ITransformedMembership {
  dao: string;
  name?: string;
  safeAddress: string;
  activeProposalCount: number;
  activeMemberCount: string;
  votingPower: number;
  networkId?: keyof Keychain;
  delegatingTo?: string;
  isDelegate: boolean;
  memberAddress: string;
  fiatTotal?: number;
  totalProposalCount: string;
  contractType: string;
  tokenBalances?: TokenBalance[];
}
export interface ITransformedMembershipsQuery {
  daos: ITransformedMembership[];
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
export type DaoTokenBalances = {
  safeAddress: string;
  fiatTotal: number;
  tokenBalances: TokenBalance[];
};

export type DaoProfile = {
  description?: string;
  longDescription?: string;
  avatarImg?: string;
  tags?: string[];
  links?: { [field: string]: string };
};

export type ITransformedDao = ListDaosQuery['daos'][number] & DaoProfile;

export interface ITransformedDaoQuery {
  dao: ITransformedDao | undefined;
}
export interface ITransformedDaoListQuery {
  daos: ITransformedDao[];
}
export type DaoWithTokenData = {
  fiatTotal: number;
  tokenBalances: TokenBalance[];
} & ITransformedDao;
export type DaoWithTokenDataQuery = {
  dao: DaoWithTokenData;
};
