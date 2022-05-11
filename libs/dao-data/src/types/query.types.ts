import { Keychain } from '@daohaus/common-utilities';
import { OrderDirection } from '../subgraph/schema.generated';

/**
 * Query related types
 */
export interface ListQueryArguments<TOrderBy extends string, Variables> {
  networkId: keyof Keychain;
  filter?: Variables;
  ordering?: Ordering<TOrderBy>;
}

export interface GenericQueryArguments {
  networkId: keyof Keychain;
  entityName: string;
  query: string;
  filter?: QueryVariables;
}

export interface CrossNetworkQueryArguments {
  networkIds: Array<keyof Keychain>;
  memberAddress: string;
}

export type QueryVariables = {
  [field: string]: string;
};

export type Ordering<TOrderBy extends string> = {
  orderBy: TOrderBy;
  orderDirection: OrderDirection;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface QueryResult<Data = any> {
  /** The data returned from the Graphql server. */
  data?: Data;
  /** Any errors resulting from the operation. */
  error?: QueryError;
  networkId?: keyof Keychain;
}

export interface QueryError {
  message: string;
}

export type TransformedMembership = {
  dao: string;
  name?: string;
  activeProposalCount: number;
  activeMemberCount: string;
  votingPower: number;
  networkId?: keyof Keychain;
  delegate?: string;
  isDelegate: boolean;
  memberAddress: string;
};

export interface TransformedMembershipsQuery {
  daos: TransformedMembership[];
}
