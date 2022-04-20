export type WhereQueryVariables = {
  [field: string]: string;
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
