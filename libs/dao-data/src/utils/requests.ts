// required polyfill for browser/node fetch not included in urql
import 'isomorphic-unfetch';

import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { DocumentNode } from 'graphql';
import { ENDPOINTS, Keychain, KeychainList } from '@daohaus/common-utilities';
import { createClient } from 'urql';
import { request } from 'graphql-request';

import { INVALID_NETWORK_ERROR } from '.';
import { QueryResult, QueryVariables } from '..';
import { HausError } from '../HausError';

type RequestDocument = string | DocumentNode;

export const graphFetch = async <T = unknown, V = QueryVariables>(
  document: RequestDocument | TypedDocumentNode<T, V>,
  url: string,
  networkId: keyof Keychain,
  variables?: V
): Promise<QueryResult<T>> => {
  try {
    // return request<T, V>(url, document, cleanVariables(variables));

    const res = await request<T, V>(url, document, cleanVariables(variables));
    return { data: res, networkId };
  } catch (err) {
    throw new HausError({ type: 'SUBGRAPH_ERROR', errorObject: err });
  }
};

const cleanVariables = <V = QueryVariables>(variables: V): V => {
  return Object.fromEntries(
    Object.entries(variables)
      .filter(
        ([, value]) => value !== '' && value !== null && value !== undefined
      )
      .map(([key, value]) => [
        key,
        value === Object(value) && !Array.isArray(value)
          ? cleanVariables(value)
          : value,
      ])
  ) as V;
};

export const urqlFetch = async (args: {
  endpointType: keyof KeychainList;
  networkId: keyof Keychain;
  entityName: string;
  query: string;
  variables?: QueryVariables;
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

    return {
      data: { result: res.data[args.entityName] },
      error: res.error,
    };
  }
};
