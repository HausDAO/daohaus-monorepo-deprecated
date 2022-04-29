import {
  Dao,
  ENDPOINTS,
  Keychain,
  KeychainList,
} from '@daohaus/common-utilities';

import {
  ListQueryArguments,
  QueryResult,
  GenericQueryArguments,
  CrossNetworkQueryArguments,
} from './types';
import { DAOS_BY_MEMBER_QUERY, INVALID_NETWORK_ERROR } from './utils';
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
  ListProposalsDocument,
  ListProposalsQuery,
  ListProposalsQueryVariables,
} from './subgraph/queries/listProposals.generated';
import {
  FindProposalDocument,
  FindProposalQuery,
  FindProposalQueryVariables,
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

    const res = await graphFetch<ListDaosQuery, ListDaosQueryVariables>(
      ListDaosDocument,
      url,
      {
        where: filter,
        orderBy: ordering.orderBy,
        orderDirection: ordering.orderDirection,
      }
    );

    return {
      data: res,
    };
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

    const res = await graphFetch<
      ListProposalsQuery,
      ListProposalsQueryVariables
    >(ListProposalsDocument, url, {
      where: filter,
      orderBy: ordering.orderBy,
      orderDirection: ordering.orderDirection,
    });

    return {
      data: res,
    };
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

    const res = await graphFetch<ListMembersQuery, ListMembersQueryVariables>(
      ListMembersDocument,
      url,
      {
        where: filter,
        orderBy: ordering.orderBy,
        orderDirection: ordering.orderDirection,
      }
    );

    return {
      data: res,
    };
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

    const res = await graphFetch<FindDaoQuery, FindDaoQueryVariables>(
      FindDaoDocument,
      url,
      {
        id: dao,
      }
    );

    return {
      data: res,
    };
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

    const res = await graphFetch<FindMemberQuery, FindMemberQueryVariables>(
      FindMemberDocument,
      url,
      {
        id: `${dao}-member-${memberAddress}`,
      }
    );

    return {
      data: res,
    };
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

    const res = await graphFetch<FindProposalQuery, FindProposalQueryVariables>(
      FindProposalDocument,
      url,
      {
        id: `${dao}-proposal-${proposalId}`,
      }
    );

    return {
      data: res,
    };
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

    const res = await graphFetch<FindLatestTxQuery, FindLatestTxQueryVariables>(
      FindLatestTxDocument,
      url,
      {
        where: { dao },
      }
    );

    return {
      data: res,
    };
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
   * Queries scoped to account
   */

  // TODO: should add network indicator to the res somewhere and redo with grapql
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
          entityName: 'members',
          query: DAOS_BY_MEMBER_QUERY,
          variables: { memberAddress: account },
        })
      );
    });

    return Promise.all(promises);
  }
}
