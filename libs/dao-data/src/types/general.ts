import { Keychain } from '@daohaus/common-utilities';
import { OrderDirection } from '../subgraph/schema.generated';

/**
 * Query related types
 */
export interface ListQueryArguments<TOrderBy extends string> {
  networkId: keyof Keychain;
  filter?: FilterPairs;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface QueryResult<Data = any> {
  /** The data returned from the Graphql server. */
  data?: {
    [field: string]: Data;
  };
  /** Any errors resulting from the operation. */
  error?: QueryError;
}

export interface QueryError {
  name: string;
  message: string;
}
