export type QueryPair = {
  [field: string]: string;
};

export interface QueryError {
  name: string;
  message: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface QueryResult<Data = any> {
  /** The data returned from the Graphql server. */
  data?: {
    [field: string]: Data;
  };
  /** Any errors resulting from the operation. */
  error?: Error;
}

export type Keychain = {
  '0x1'?: string;
  '0x2a'?: string;
  '0x4'?: string;
  '0x64'?: string;
  '0x89'?: string;
  '0xa4b1'?: string;
  '0xa4ec'?: string;
};

export type KeychainList = { [index: string]: Keychain };
