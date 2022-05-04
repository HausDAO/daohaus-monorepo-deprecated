import { ENDPOINTS, Keychain, KeychainList } from '@daohaus/common-utilities';

import {
  ListQueryArguments,
  QueryResult,
  GenericQueryArguments,
  CrossNetworkQueryArguments,
  Ordering,
  QueryWithNetwork,
} from './types';
import { INVALID_NETWORK_ERROR } from './utils';
import { graphFetch, urqlFetch } from './utils/requests';
import {
  FindMemberDocument,
  FindMemberQuery,
  FindMemberQueryVariables,
  ListMembersDocument,
  ListMembersQuery,
  ListMembersQueryVariables,
} from './subgraph/queries/members.generated';
import {
  Dao_Filter,
  Dao_OrderBy,
  Member_Filter,
  Member_OrderBy,
  Proposal_Filter,
  Proposal_OrderBy,
} from './subgraph/schema.generated';
import {
  FindDaoDocument,
  FindDaoQuery,
  FindDaoQueryVariables,
  ListDaosDocument,
  ListDaosQuery,
  ListDaosQueryVariables,
} from './subgraph/queries/daos.generated';
import {
  FindProposalDocument,
  FindProposalQuery,
  FindProposalQueryVariables,
  ListProposalsDocument,
  ListProposalsQuery,
  ListProposalsQueryVariables,
} from './subgraph/queries/proposals.generated';
import {
  FindLatestTxDocument,
  FindLatestTxQuery,
  FindLatestTxQueryVariables,
} from './subgraph/queries/transactions.generated';

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
    filter,
  }: ListQueryArguments<Dao_OrderBy, Dao_Filter>): Promise<
    QueryResult<ListDaosQuery>
  > {
    const url = this._endpoints['V3_SUBGRAPH'][networkId];
    if (!url) {
      // TODO: Should these throw? will need to switch return type so it can be null
      // throw new HausError({
      //   type: 'UNSUPPORTED_NETWORK',
      // });
      return { error: INVALID_NETWORK_ERROR };
    }

    // const res = await graphFetch<ListDaosQuery, ListDaosQueryVariables>(
    return await graphFetch<ListDaosQuery, ListDaosQueryVariables>(
      ListDaosDocument,
      url,
      networkId,
      {
        where: filter,
        orderBy: ordering.orderBy,
        orderDirection: ordering.orderDirection,
      }
    );
  }

  public async listProposals({
    networkId,
    ordering = {
      orderBy: 'createdAt',
      orderDirection: 'desc',
    },
    filter,
  }: ListQueryArguments<Proposal_OrderBy, Proposal_Filter>): Promise<
    QueryResult<ListProposalsQuery>
  > {
    const url = this._endpoints['V3_SUBGRAPH'][networkId];
    if (!url) {
      return { error: INVALID_NETWORK_ERROR };
    }

    return await graphFetch<ListProposalsQuery, ListProposalsQueryVariables>(
      ListProposalsDocument,
      url,
      networkId,
      {
        where: filter,
        orderBy: ordering.orderBy,
        orderDirection: ordering.orderDirection,
      }
    );
  }

  public async listMembers({
    networkId,
    ordering = {
      orderBy: 'createdAt',
      orderDirection: 'desc',
    },
    filter,
  }: ListQueryArguments<Member_OrderBy, Member_Filter>): Promise<
    QueryResult<ListMembersQuery>
  > {
    const url = this._endpoints['V3_SUBGRAPH'][networkId];
    if (!url) {
      return { error: INVALID_NETWORK_ERROR };
    }

    return await graphFetch<ListMembersQuery, ListMembersQueryVariables>(
      ListMembersDocument,
      url,
      networkId,
      {
        where: filter,
        orderBy: ordering.orderBy,
        orderDirection: ordering.orderDirection,
      }
    );
  }

  /*
  Find queries
*/
  public async findDao({
    networkId,
    dao,
  }: {
    networkId: keyof Keychain;
    dao: string;
  }): Promise<QueryResult<FindDaoQuery>> {
    const url = this._endpoints['V3_SUBGRAPH'][networkId];
    if (!url) {
      return { error: INVALID_NETWORK_ERROR };
    }

    return await graphFetch<FindDaoQuery, FindDaoQueryVariables>(
      FindDaoDocument,
      url,
      networkId,
      {
        id: dao,
      }
    );
  }

  public async findMember({
    networkId,
    dao,
    memberAddress,
  }: {
    networkId: keyof Keychain;
    dao: string;
    memberAddress: string;
  }): Promise<QueryResult<FindMemberQuery>> {
    const url = this._endpoints['V3_SUBGRAPH'][networkId];
    if (!url) {
      return { error: INVALID_NETWORK_ERROR };
    }

    return await graphFetch<FindMemberQuery, FindMemberQueryVariables>(
      FindMemberDocument,
      url,
      networkId,
      {
        id: `${dao}-member-${memberAddress}`,
      }
    );
  }

  public async findProposal({
    networkId,
    dao,
    proposalId,
  }: {
    networkId: keyof Keychain;
    dao: string;
    proposalId: string;
  }): Promise<QueryResult<FindProposalQuery>> {
    const url = this._endpoints['V3_SUBGRAPH'][networkId];
    if (!url) {
      return { error: INVALID_NETWORK_ERROR };
    }

    return await graphFetch<FindProposalQuery, FindProposalQueryVariables>(
      FindProposalDocument,
      url,
      networkId,
      {
        id: `${dao}-proposal-${proposalId}`,
      }
    );
  }

  public async findLatestTransaction({
    networkId,
    dao,
  }: {
    networkId: keyof Keychain;
    dao: string;
  }): Promise<QueryResult<FindLatestTxQuery>> {
    const url = this._endpoints['V3_SUBGRAPH'][networkId];
    if (!url) {
      return { error: INVALID_NETWORK_ERROR };
    }

    return await graphFetch<FindLatestTxQuery, FindLatestTxQueryVariables>(
      FindLatestTxDocument,
      url,
      networkId,
      {
        where: { dao },
      }
    );
  }

  public async querySubgraph({
    networkId,
    entityName,
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
        entityName,
        query,
        variables: filter,
      });
    }
  }

  /**
   * Queries scoped to user address
   */

  // TODO: special query here - see al fields in design
  // some better error handling when doing the url check
  public async listDaosByMember({
    memberAddress,
    networkIds,
  }: CrossNetworkQueryArguments): Promise<QueryResult<ListMembersQuery>[]> {
    const promises: Promise<QueryResult<ListMembersQuery>>[] = [];
    const filter = { memberAddress: memberAddress };
    const ordering: Ordering<Member_OrderBy> = {
      orderBy: 'createdAt',
      orderDirection: 'desc',
    };

    networkIds.forEach((networkId) => {
      const url = this._endpoints['V3_SUBGRAPH'][networkId];

      if (url) {
        promises.push(
          graphFetch<ListMembersQuery, ListMembersQueryVariables>(
            ListMembersDocument,
            url,
            networkId,
            {
              where: filter,
              orderBy: ordering.orderBy,
              orderDirection: ordering.orderDirection,
            }
          )
        );
      }
    });

    return Promise.all(promises);
  }
}
