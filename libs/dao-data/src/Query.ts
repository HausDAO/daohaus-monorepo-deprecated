import { ENDPOINTS, Keychain, KeychainList } from '@daohaus/common-utilities';

import {
  ListQueryArguments,
  QueryResult,
  DaoTokenBalances,
  TokenBalance,
  TransformedProposalQuery,
  TransformedProposalListQuery,
  DaoWithTokenDataQuery,
  IListQueryResults,
} from './types';
import * as fetch from './utils';
import { graphFetch, graphFetchList } from './utils/requests';
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
  EventTransaction_Filter,
  EventTransaction_OrderBy,
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
  FindTxDocument,
  FindTxQuery,
  FindTxQueryVariables,
  ListTxsDocument,
  ListTxsQuery,
  ListTxsQueryVariables,
} from './subgraph/queries/transactions.generated';
import {
  transformProposal,
  transformTokenBalances,
} from './utils/transformers';
import { ethers } from 'ethers';
import { HausError } from './HausError';
import { createPaging, defaultPagination, paginateResponse } from './utils';

export default class Query {
  public endpoints: KeychainList;

  constructor() {
    this.endpoints = ENDPOINTS;
  }

  /*
  List queries
*/
  public async listDaoPages({
    networkId,
    filter,
    ordering = {
      orderBy: 'id',
      orderDirection: 'desc',
    },
    paging = {
      pageSize: 1,
      offset: 0,
    },
  }: ListQueryArguments<Dao_OrderBy, Dao_Filter>): Promise<
    IListQueryResults<Dao_OrderBy, Dao_Filter, ListDaosQuery['daos']>
  > {
    const url = this.endpoints['V3_SUBGRAPH'][networkId];
    if (!url) {
      throw new HausError({ type: 'INVALID_NETWORK_ERROR' });
    }

    const res = await graphFetchList<ListDaosQuery, ListDaosQueryVariables>(
      ListDaosDocument,
      url,
      {
        where: { ...filter, id_gt: paging.lastId || '' },
        orderBy: paging.lastId ? 'id' : ordering.orderBy,
        orderDirection: paging.lastId ? 'asc' : ordering.orderDirection,
        first: paging.pageSize + 1,
        skip: paging.offset,
      }
    );

    const pagingUpdates = createPaging(res['daos'], paging);

    return {
      networkId,
      filter,
      ordering,
      nextPaging: pagingUpdates.nextPaging,
      previousPaging: pagingUpdates.previousPaging,
      items: pagingUpdates.pageItems,
    };
  }

  public async listDaos({
    networkId,
    filter,
    ordering = {
      orderBy: 'id',
      orderDirection: 'desc',
    },
    paging = defaultPagination,
  }: ListQueryArguments<Dao_OrderBy, Dao_Filter>): Promise<
    QueryResult<ListDaosQuery>
  > {
    console.log('paging', paging);

    // TODO
    // // return paged results to add some extras to the return
    // // all loop in different ticket
    const url = this.endpoints['V3_SUBGRAPH'][networkId];
    if (!url) {
      return {
        error: new HausError({ type: 'INVALID_NETWORK_ERROR' }),
        data: { daos: [] },
      };
    }

    try {
      // TODO: warn client of ordering override or throw?
      if (paging.lastId) {
        ordering = {
          orderBy: 'id',
          orderDirection: 'asc',
        };
        filter = { ...filter, id_gt: paging.lastId || '' };
      }

      const res = await graphFetch<ListDaosQuery, ListDaosQueryVariables>(
        ListDaosDocument,
        url,
        networkId,
        {
          where: filter,
          orderBy: ordering.orderBy,
          orderDirection: ordering.orderDirection,
          first: paging.pageSize + 1,
          skip: paging.offset,
        }
      );

      // get this all into the function
      // return updated query and function to retry
      // res inclused function for next page and previous page
      if (res?.data?.daos) {
        const pagedData = paginateResponse<ListDaosQuery['daos'][number]>(
          res.data.daos,
          paging
        );
        return { data: { daos: pagedData }, networkId };
      } else {
        return res;
      }
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
      orderBy: 'id',
      orderDirection: 'desc',
    },
    filter,
  }: ListQueryArguments<Proposal_OrderBy, Proposal_Filter>): Promise<
    QueryResult<TransformedProposalListQuery>
  > {
    const url = this.endpoints['V3_SUBGRAPH'][networkId];
    if (!url) {
      return {
        error: new HausError({ type: 'INVALID_NETWORK_ERROR' }),
        data: { proposals: [] },
      };
    }

    try {
      const queryResult = await graphFetch<
        ListProposalsQuery,
        ListProposalsQueryVariables
      >(ListProposalsDocument, url, networkId, {
        where: filter,
        orderBy: ordering.orderBy,
        orderDirection: ordering.orderDirection,
      });

      const proposals = queryResult.data?.proposals
        ? queryResult.data?.proposals.map((prop) => transformProposal(prop))
        : [];

      return {
        ...queryResult,
        data: {
          proposals,
        },
      };
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
      orderBy: 'id',
      orderDirection: 'desc',
    },
    filter,
  }: ListQueryArguments<Member_OrderBy, Member_Filter>): Promise<
    QueryResult<ListMembersQuery>
  > {
    const url = this.endpoints['V3_SUBGRAPH'][networkId];
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

  public async listTransactions({
    networkId,
    ordering = {
      orderBy: 'createdAt',
      orderDirection: 'desc',
    },
    filter,
  }: ListQueryArguments<
    EventTransaction_OrderBy,
    EventTransaction_Filter
  >): Promise<QueryResult<ListTxsQuery>> {
    const url = this.endpoints['V3_SUBGRAPH'][networkId];
    if (!url) {
      return {
        error: new HausError({ type: 'INVALID_NETWORK_ERROR' }),
      };
    }

    try {
      return await graphFetch<ListTxsQuery, ListTxsQueryVariables>(
        ListTxsDocument,
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
      };
    }
  }

  /*
  Find queries
*/
  public async findDao({
    networkId,
    dao,
    includeTokens = false,
  }: {
    networkId: keyof Keychain;
    dao: string;
    includeTokens?: boolean;
  }): Promise<QueryResult<FindDaoQuery | DaoWithTokenDataQuery>> {
    const url = this.endpoints['V3_SUBGRAPH'][networkId];
    if (!url) {
      return {
        error: new HausError({ type: 'INVALID_NETWORK_ERROR' }),
      };
    }

    try {
      const daoRes = await graphFetch<FindDaoQuery, FindDaoQueryVariables>(
        FindDaoDocument,
        url,
        networkId,
        {
          id: dao,
        }
      );

      if (includeTokens && daoRes?.data?.dao) {
        const res = await fetch.get<TokenBalance[]>(
          `${url}/safes/${ethers.utils.getAddress(
            daoRes.data.dao.safeAddress
          )}/balances/usd`
        );

        return {
          data: {
            dao: {
              ...daoRes.data.dao,
              ...transformTokenBalances(res, daoRes.data.dao.safeAddress),
            },
          },
        };
      } else {
        return daoRes;
      }
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
    const url = this.endpoints['V3_SUBGRAPH'][networkId];
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
  }): Promise<QueryResult<TransformedProposalQuery>> {
    const url = this.endpoints['V3_SUBGRAPH'][networkId];
    if (!url) {
      return {
        error: new HausError({ type: 'INVALID_NETWORK_ERROR' }),
      };
    }

    try {
      const queryResult = await graphFetch<
        FindProposalQuery,
        FindProposalQueryVariables
      >(FindProposalDocument, url, networkId, {
        id: `${dao}-proposal-${proposalId}`,
      });

      return {
        ...queryResult,
        data: {
          proposal:
            queryResult?.data?.proposal &&
            transformProposal(queryResult.data.proposal),
        },
      };
    } catch (err) {
      return {
        error: new HausError({ type: 'SUBGRAPH_ERROR', errorObject: err }),
      };
    }
  }

  public async findTransaction({
    networkId,
    txHash,
  }: {
    networkId: keyof Keychain;
    txHash: string;
  }): Promise<QueryResult<FindTxQuery>> {
    const url = this.endpoints['V3_SUBGRAPH'][networkId];
    if (!url) {
      return {
        error: new HausError({ type: 'INVALID_NETWORK_ERROR' }),
      };
    }

    try {
      return await graphFetch<FindTxQuery, FindTxQueryVariables>(
        FindTxDocument,
        url,
        networkId,
        {
          id: txHash,
        }
      );
    } catch (err) {
      return {
        error: new HausError({ type: 'SUBGRAPH_ERROR', errorObject: err }),
      };
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
    const url = this.endpoints['GNOSIS_API'][networkId];
    if (!url) {
      return {
        error: new HausError({ type: 'INVALID_NETWORK_ERROR' }),
      };
    }

    try {
      const res = await fetch.get<TokenBalance[]>(
        `${url}/safes/${ethers.utils.getAddress(safeAddress)}/balances/usd`
      );

      return { data: transformTokenBalances(res, safeAddress) };
    } catch (err) {
      return {
        error: new HausError({ type: 'GNOSIS_ERROR', errorObject: err }),
      };
    }
  }
}
