// required polyfill for browser/node fetch not included in urql
import 'isomorphic-unfetch';

import { Keychain, KeychainList } from '@daohaus/common-utilities';
import { createClient, OperationResult } from 'urql';
import { ENDPOINTS, INVALID_NETWORK_ERROR } from '.';

import { QueryResult, WhereQueryVariables } from '..';

export const urqlFetch = async (args: {
  endpointType: keyof KeychainList;
  networkId: keyof Keychain;
  query: string;
  variables?: WhereQueryVariables;
}): Promise<QueryResult> => {
  const url = ENDPOINTS[args.endpointType][args.networkId];
  if (!url) {
    return {
      error: INVALID_NETWORK_ERROR,
    };
  } else {
    const client = createClient({
      url,
      requestPolicy: 'network-only',
    });

    const res = await client.query(args.query, args.variables).toPromise();

    return formatQueryResponse(res);
  }
};

export const formatQueryResponse = (res: OperationResult): QueryResult => {
  return { data: res.data, error: res.error };
};
