import { Keychain } from '@daohaus/common-utilities';

/**
 * Query related types
 */
export interface ListQueryArguments {
  networkId: keyof Keychain;
  filter?: FilterPairs;
  ordering?: Ordering;
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
  // orderBy?: string;
  // orderDirection?: string;
  [field: string]: string;
};

export type FilterPairs = {
  [field: string]: string;
};

export interface Ordering {
  orderBy: string;
  orderDirection: string;
}

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
