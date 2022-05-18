import 'cross-fetch/polyfill';

import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { DocumentNode } from 'graphql';
import { Keychain } from '@daohaus/common-utilities';
import { request } from 'graphql-request';

import { QueryResult, QueryVariables } from '..';

type RequestDocument = string | DocumentNode;

export const graphFetch = async <T = unknown, V = QueryVariables>(
  document: RequestDocument | TypedDocumentNode<T, V>,
  url: string,
  networkId: keyof Keychain,
  variables?: V
): Promise<QueryResult<T>> => {
  const res = await request<T, V>(url, document, cleanVariables(variables));
  return { data: res, networkId };
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
