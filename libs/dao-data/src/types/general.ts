import { Keychain } from '@daohaus/common-utilities';
import { OrderDirection } from '../subgraph/schema.generated';

/**
 * Query related types
 */
export interface ListQueryArguments<TOrderBy extends string, Variables> {
  networkId: keyof Keychain;
  filter: Variables;
  ordering?: Ordering<TOrderBy>;
}

export type FindQueryArguments = {
  networkId: keyof Keychain;
  dao: string;
  memberAddress: string;
  proposalId: string;
};

export interface GenericQueryArguments {
  networkId: keyof Keychain;
  query: string;
  filter?: FilterPairs;
}

export interface CrossNetworkQueryArguments {
  networks: string[];
  account: string;
}

// rework this and filter pairs with code gen
export type QueryVariables = {
  [field: string]: string;
};

export type FilterPairs = {
  [field: string]: string;
};

export type Ordering<TOrderBy extends string> = {
  orderBy: TOrderBy;
  orderDirection: OrderDirection;
};

// TODO: Stuck on result.result
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface QueryResult<Data = any> {
  /** The data returned from the Graphql server. */
  data?: Data;
  // result: Data;
  /** Any errors resulting from the operation. */
  error?: QueryError;
}

export interface QueryError {
  message: string;
}
