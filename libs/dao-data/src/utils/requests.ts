// required polyfill for node fetch not included in urql
// TODO: Better way to add these kinds of polyfill?
import 'isomorphic-unfetch';
import { Keychain, KeychainList } from '@daohaus/common-utilities';
import { createClient, OperationResult } from 'urql';
import { ENDPOINTS, INVALID_NETWORK_ERROR } from '.';

import { QueryResult, QueryPair } from '..';

export const urqlFetch = async (args: {
  endpointType: keyof KeychainList;
  networkId: keyof Keychain;
  query: string;
  variables?: QueryPair;
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
