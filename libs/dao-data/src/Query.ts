import {
  Dao,
  Keychain,
  KeychainList,
  Proposal,
} from '@daohaus/common-utilities';

import {
  ListQueryArguments,
  QueryResult,
  FindQueryArguments,
  GenericQueryArguments,
  CrossNetworkQueryArguments,
} from './types';
import {
  DAOS_BY_MEMBER_QUERY,
  DEFAULT_DAOS_QUERY,
  DEFAULT_DAO_QUERY,
  DEFAULT_MEMBERS_BY_DAO_QUERY,
  DEFAULT_MEMBER_QUERY,
  DEFAULT_PROPOSALS_BY_DAO_QUERY,
  DEFAULT_PROPOSAL_QUERY,
  ENDPOINTS,
  INVALID_NETWORK_ERROR,
  LATEST_TX_BY_DAO,
} from './utils';
import { graphFetch, urqlFetch } from './utils/requests';

import {
  ListMembersDocument,
  ListMembersQuery,
  ListMembersQueryVariables,
} from './subgraph/queries/members.generated';
import { Member_Filter, Member_OrderBy } from './subgraph/schema.generated';

export default class Query {
  private _endpoints: KeychainList;

  constructor() {
    this._endpoints = ENDPOINTS;
  }

  /*
  List queries
*/
  public async listDaos({
    networkId,
    ordering = {
      orderBy: 'createdAt',
      orderDirection: 'desc',
    },
  }: ListQueryArguments): Promise<QueryResult<Dao[]>> {
    return await urqlFetch({
      endpointType: 'V3_SUBGRAPH',
      networkId: networkId,
      query: DEFAULT_DAOS_QUERY,
      variables: { ...ordering },
    });
  }

  public async listProposals({
    networkId,
    ordering = {
      orderBy: 'createdAt',
      orderDirection: 'desc',
    },
    filter,
  }: ListQueryArguments): Promise<QueryResult<Proposal[]>> {
    return await urqlFetch({
      endpointType: 'V3_SUBGRAPH',
      networkId: networkId,
      query: DEFAULT_PROPOSALS_BY_DAO_QUERY,
      variables: { ...filter, ...ordering },
    });
  }

  public async listMembers({
    networkId,
    ordering = {
      orderBy: 'createdAt',
      orderDirection: 'desc',
    },
    filter,
  }: ListQueryArguments): Promise<QueryResult<Proposal[]>> {
    return await urqlFetch({
      endpointType: 'V3_SUBGRAPH',
      networkId: networkId,
      query: DEFAULT_MEMBERS_BY_DAO_QUERY,
      variables: { ...filter, ...ordering },
    });
  }

  // public async listMembersGQL({
  //   networkId,
  //   ordering = {
  //     orderBy: 'createdAt',
  //     orderDirection: 'desc',
  //   },
  //   filter,
  // }: // }: ListQueryArguments): Promise<QueryResult<Proposal[]>> {
  // ListQueryArguments<Member_OrderBy, Member_Filter>): Promise<unknown> {
  //   const res = await graphFetch<ListMembersQuery, ListMembersQueryVariables>(
  //     ListMembersDocument,
  //     'V3_SUBGRAPH',
  //     networkId,
  //     {
  //       where: filter,
  //       orderBy: ordering.orderBy,
  //       orderDirection: ordering.orderDirection,
  //     }
  //   );

  //   console.log('res', res);

  //   return true;
  // }

  public async findDao({
    networkId,
    dao,
  }: Pick<FindQueryArguments, 'networkId' | 'dao'>): Promise<QueryResult<Dao>> {
    return await urqlFetch({
      endpointType: 'V3_SUBGRAPH',
      networkId: networkId,
      query: DEFAULT_DAO_QUERY,
      variables: { dao: dao },
    });
  }

  public async findMember({
    networkId,
    dao,
    memberAddress,
  }: Pick<FindQueryArguments, 'networkId' | 'dao' | 'memberAddress'>): Promise<
    QueryResult<Proposal>
  > {
    return await urqlFetch({
      endpointType: 'V3_SUBGRAPH',
      networkId: networkId,
      query: DEFAULT_MEMBER_QUERY,
      variables: { id: `${dao}-member-${memberAddress}` },
    });
  }

  public async findProposal({
    networkId,
    dao,
    proposalId,
  }: Pick<FindQueryArguments, 'networkId' | 'dao' | 'proposalId'>): Promise<
    QueryResult<Proposal>
  > {
    return await urqlFetch({
      endpointType: 'V3_SUBGRAPH',
      networkId: networkId,
      query: DEFAULT_PROPOSAL_QUERY,
      variables: { id: `${dao}-proposal-${proposalId}` },
    });
  }

  /*
  Helper queries
*/

  public async findLatestTransaction({
    networkId,
    dao,
  }: Pick<FindQueryArguments, 'networkId' | 'dao'>): Promise<
    QueryResult<Proposal[]>
  > {
    return await urqlFetch({
      endpointType: 'V3_SUBGRAPH',
      networkId: networkId,
      query: LATEST_TX_BY_DAO,
      variables: { dao: dao },
    });
  }

  public async graphFetch({
    networkId,
    query,
    filter,
  }: GenericQueryArguments): Promise<QueryResult> {
    const endpointType: keyof KeychainList = 'V3_SUBGRAPH';
    if (!this._endpoints[endpointType][networkId]) {
      return {
        error: INVALID_NETWORK_ERROR,
      };
    } else {
      return await urqlFetch({
        endpointType: 'V3_SUBGRAPH',
        networkId: networkId,
        query: query,
        variables: filter,
      });
    }
  }

  /**
   * Queries scoped to account
   */

  // TODO: should add network indicator to the res somewhere
  public async listDaosByAccount({
    account,
    networks,
  }: CrossNetworkQueryArguments): Promise<QueryResult<Dao[]>[]> {
    const promises: Promise<QueryResult<Dao[]>>[] = [];

    networks.forEach((networkId) => {
      promises.push(
        urqlFetch({
          endpointType: 'V3_SUBGRAPH',
          networkId: networkId as keyof Keychain,
          query: DAOS_BY_MEMBER_QUERY,
          variables: { memberAddress: account },
        })
      );
    });

    return Promise.all(promises);
  }
}
