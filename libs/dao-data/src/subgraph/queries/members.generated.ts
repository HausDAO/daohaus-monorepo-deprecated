import * as Types from '../schema.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ListMembersQueryVariables = Types.Exact<{
  where?: Types.Member_Filter;
  skip?: Types.Scalars['Int'];
  first?: Types.Scalars['Int'];
  orderBy?: Types.Member_OrderBy;
  orderDirection?: Types.OrderDirection;
}>;


export type ListMembersQuery = { members: Array<{ id: string, createdAt: string, memberAddress: string, shares: string, loot: string, delegatingTo: string, delegateShares: string, votes?: Array<{ createdAt: string, approved: boolean, balance: string }> | undefined }> };

export type FindMemberQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type FindMemberQuery = { member?: { id: string, createdAt: string, memberAddress: string, shares: string, loot: string, delegatingTo: string, delegateShares: string, votes?: Array<{ createdAt: string, approved: boolean, balance: string }> | undefined } | undefined };


export const ListMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Member_filter"}}},"defaultValue":{"kind":"ObjectValue","fields":[]}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"defaultValue":{"kind":"IntValue","value":"0"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"defaultValue":{"kind":"IntValue","value":"10"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Member_orderBy"}}},"defaultValue":{"kind":"EnumValue","value":"id"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}},"defaultValue":{"kind":"EnumValue","value":"asc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"memberAddress"}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"loot"}},{"kind":"Field","name":{"kind":"Name","value":"delegatingTo"}},{"kind":"Field","name":{"kind":"Name","value":"delegateShares"}},{"kind":"Field","name":{"kind":"Name","value":"votes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"approved"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]}}]}}]} as unknown as DocumentNode<ListMembersQuery, ListMembersQueryVariables>;
export const FindMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"member"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"memberAddress"}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"loot"}},{"kind":"Field","name":{"kind":"Name","value":"delegatingTo"}},{"kind":"Field","name":{"kind":"Name","value":"delegateShares"}},{"kind":"Field","name":{"kind":"Name","value":"votes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"approved"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]}}]}}]} as unknown as DocumentNode<FindMemberQuery, FindMemberQueryVariables>;