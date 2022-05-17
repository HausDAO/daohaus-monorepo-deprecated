import { ENDPOINTS, Keychain, KeychainList } from '@daohaus/common-utilities';

import {
  ListQueryArguments,
  QueryResult,
  CrossNetworkQueryArguments,
  Ordering,
  TransformedMembershipsQuery,
  DaoTokenBalances,
  TokenBalance,
} from './types';
import { INVALID_NETWORK_ERROR } from './utils';
import * as fetch from './utils';
import { graphFetch } from './utils/requests';
import {
  FindMemberDocument,
  FindMemberQuery,
  FindMemberQueryVariables,
  ListMembersDocument,
  ListMembershipsDocument,
  ListMembershipsQuery,
  ListMembershipsQueryVariables,
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
import { transformMembershipList } from './utils/transformers';
import { ethers } from 'ethers';
import { HausError } from './HausError';

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
      return {
        error: new HausError({ type: 'INVALID_NETWORK_ERROR' }),
        data: { daos: [] },
      };
    }

    try {
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
    } catch (err) {
      return {
        error: new HausError({ type: 'SUBGRAPH_ERROR', errorObject: err }),
        data: { daos: [] },
      };
    }
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
      return {
        error: new HausError({ type: 'INVALID_NETWORK_ERROR' }),
        data: { proposals: [] },
      };
    }

    try {
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
    } catch (err) {
      return {
        error: new HausError({ type: 'SUBGRAPH_ERROR', errorObject: err }),
        data: { proposals: [] },
      };
    }
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
      return {
        error: new HausError({ type: 'INVALID_NETWORK_ERROR' }),
        data: { members: [] },
      };
    }

    try {
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
    } catch (err) {
      return {
        error: new HausError({ type: 'SUBGRAPH_ERROR', errorObject: err }),
        data: { members: [] },
      };
    }
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
      return {
        error: new HausError({ type: 'INVALID_NETWORK_ERROR' }),
      };
    }

    try {
      return await graphFetch<FindDaoQuery, FindDaoQueryVariables>(
        FindDaoDocument,
        url,
        networkId,
        {
          id: dao,
        }
      );
    } catch (err) {
      return {
        error: new HausError({ type: 'SUBGRAPH_ERROR', errorObject: err }),
      };
    }
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
      return {
        error: new HausError({ type: 'INVALID_NETWORK_ERROR' }),
      };
    }

    try {
      return await graphFetch<FindMemberQuery, FindMemberQueryVariables>(
        FindMemberDocument,
        url,
        networkId,
        {
          id: `${dao}-member-${memberAddress}`,
        }
      );
    } catch (err) {
      return {
        error: new HausError({ type: 'SUBGRAPH_ERROR', errorObject: err }),
      };
    }
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
      return {
        error: new HausError({ type: 'INVALID_NETWORK_ERROR' }),
      };
    }

    try {
      return await graphFetch<FindProposalQuery, FindProposalQueryVariables>(
        FindProposalDocument,
        url,
        networkId,
        {
          id: `${dao}-proposal-${proposalId}`,
        }
      );
    } catch (err) {
      return {
        error: new HausError({ type: 'SUBGRAPH_ERROR', errorObject: err }),
      };
    }
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
      return {
        error: new HausError({ type: 'INVALID_NETWORK_ERROR' }),
      };
    }

    try {
      return await graphFetch<FindLatestTxQuery, FindLatestTxQueryVariables>(
        FindLatestTxDocument,
        url,
        networkId,
        {
          where: { dao },
        }
      );
    } catch (err) {
      return {
        error: new HausError({ type: 'SUBGRAPH_ERROR', errorObject: err }),
      };
    }
  }

  /**
   * Queries scoped to user address
   */
  public async listDaosByMember({
    memberAddress,
    networkIds,
    includeTokens = false,
  }: CrossNetworkQueryArguments): Promise<
    QueryResult<TransformedMembershipsQuery>
  > {
    const promises: Promise<QueryResult<ListMembershipsQuery>>[] = [];
    const filter = { memberAddress: memberAddress };
    const ordering: Ordering<Member_OrderBy> = {
      orderBy: 'createdAt',
      orderDirection: 'desc',
    };

    networkIds.forEach((networkId: keyof Keychain) => {
      const url = this._endpoints['V3_SUBGRAPH'][networkId];

      if (url) {
        promises.push(
          graphFetch<ListMembershipsQuery, ListMembershipsQueryVariables>(
            ListMembershipsDocument,
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

    const memberData = await Promise.all(promises);
    const transformedList = transformMembershipList(memberData);

    if (includeTokens) {
      const tokenPromises: Promise<QueryResult<DaoTokenBalances>>[] = [];
      transformedList.forEach((dao) => {
        if (dao.networkId) {
          tokenPromises.push(
            this.listTokenBalances({
              networkId: dao.networkId,
              safeAddress: dao.safeAddress,
            })
          );
        }
      });

      const tokenData = await Promise.all(tokenPromises);

      const dataWithTokens = transformedList.map((dao) => {
        return {
          ...dao,
          ...tokenData.find(
            (dataRes) => dataRes.data?.safeAddress === dao.safeAddress
          )?.data,
        };
      });

      return { data: { daos: dataWithTokens } };
    } else {
      return { data: { daos: transformedList } };
    }
  }

  /**
   * Token queries
   */

  public async listTokenBalances({
    networkId,
    safeAddress,
  }: {
    networkId: keyof Keychain;
    safeAddress: string;
  }): Promise<QueryResult<DaoTokenBalances>> {
    const url = this._endpoints['GNOSIS_API'][networkId];
    if (!url) {
      return {
        error: new HausError({ type: 'INVALID_NETWORK_ERROR' }),
      };
    }

    try {
      const res = await fetch.get<TokenBalance[]>(
        `${url}/safes/${ethers.utils.getAddress(safeAddress)}/balances/usd`
      );

      const fiatTotal = res.reduce(
        (sum: number, balance: TokenBalance): number => {
          sum += Number(balance.fiatBalance);
          return sum;
        },
        0
      );

      return { data: { safeAddress, tokenBalances: res, fiatTotal } };
    } catch (err) {
      return { error: new HausError({ type: 'GNOSIS_ERROR' }) };
    }
  }
}
