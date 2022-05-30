import * as Types from '../schema.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ListDaosQueryVariables = Types.Exact<{
  where?: Types.Dao_Filter;
  skip?: Types.Scalars['Int'];
  first?: Types.Scalars['Int'];
  orderBy?: Types.Dao_OrderBy;
  orderDirection?: Types.OrderDirection;
}>;

export type ListDaosQuery = {
  daos: Array<{
    id: string;
    createdAt: string;
    transactionHashSummon: string;
    lootAddress: string;
    safeAddress: string;
    lootPaused: boolean;
    sharesPaused: boolean;
    gracePeriod: string;
    votingPeriod: string;
    proposalOffering: string;
    quorumPercent: string;
    sponsorThreshold: string;
    minRetentionPercent: string;
    shareTokenName: string | undefined;
    shareTokenSymbol: string | undefined;
    totalShares: string;
    totalLoot: string;
    latestSponsoredProposalId: string;
    metaData: { name: string | undefined } | undefined;
  }>;
};

export type FindDaoQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type FindDaoQuery = {
  dao:
    | {
        id: string;
        createdAt: string;
        transactionHashSummon: string;
        lootAddress: string;
        safeAddress: string;
        lootPaused: boolean;
        sharesPaused: boolean;
        gracePeriod: string;
        votingPeriod: string;
        proposalOffering: string;
        quorumPercent: string;
        sponsorThreshold: string;
        minRetentionPercent: string;
        shareTokenName: string | undefined;
        shareTokenSymbol: string | undefined;
        totalShares: string;
        totalLoot: string;
        latestSponsoredProposalId: string;
        metaData: { name: string | undefined } | undefined;
      }
    | undefined;
};

export const ListDaosDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'listDaos' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'Dao_filter' },
            },
          },
          defaultValue: { kind: 'ObjectValue', fields: [] },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
          defaultValue: { kind: 'IntValue', value: '0' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
          defaultValue: { kind: 'IntValue', value: '100' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'Dao_orderBy' },
            },
          },
          defaultValue: { kind: 'EnumValue', value: 'id' },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderDirection' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'OrderDirection' },
            },
          },
          defaultValue: { kind: 'EnumValue', value: 'asc' },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'daos' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'skip' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'skip' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'first' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderBy' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderDirection' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderDirection' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'transactionHashSummon' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'lootAddress' } },
                { kind: 'Field', name: { kind: 'Name', value: 'safeAddress' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lootPaused' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sharesPaused' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'gracePeriod' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'votingPeriod' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'proposalOffering' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'quorumPercent' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sponsorThreshold' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'minRetentionPercent' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shareTokenName' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shareTokenSymbol' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalShares' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalLoot' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'latestSponsoredProposalId' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'metaData' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ListDaosQuery, ListDaosQueryVariables>;
export const FindDaoDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'findDao' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'dao' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'transactionHashSummon' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'lootAddress' } },
                { kind: 'Field', name: { kind: 'Name', value: 'safeAddress' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lootPaused' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sharesPaused' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'gracePeriod' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'votingPeriod' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'proposalOffering' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'quorumPercent' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sponsorThreshold' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'minRetentionPercent' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shareTokenName' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'shareTokenSymbol' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'totalShares' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalLoot' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'latestSponsoredProposalId' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'metaData' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FindDaoQuery, FindDaoQueryVariables>;
