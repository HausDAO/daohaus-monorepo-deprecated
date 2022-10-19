import {
  AccountProfile,
  DaoTokenBalances,
  ITransformedMembershipsQuery,
  Keychain,
  nowInSeconds,
} from '@daohaus/common-utilities';
import {
  ICrossNetworkMemberListArguments,
  ListMembershipsDocument,
  ListMembershipsQuery,
  Member_OrderBy,
  IFindQueryResult,
  Dao_OrderBy,
  Member_Filter,
  LensProfile,
  IListQueryArguments,
  Proposal_OrderBy,
  Proposal_Filter,
  IListQueryResults,
  ListConnectedMemberProposalsQueryVariables,
  ListConnectedMemberProposalsQuery,
  ListConnectedMemberProposalsDocument,
  ListMembershipsQueryVariables,
} from './types';
import {
  transformMembershipList,
  transformProfile,
} from './utils/transformers';
import {
  createPaging,
  DEFAULT_RECORDS_PER_PAGE,
  graphFetch,
  graphFetchList,
} from './utils';
import Query from './Query';
import { Dao_Filter } from './types';
import {
  ListProfileDocument,
  ListProfileQuery,
  ListProfileQueryVariables,
} from './subgraph/queries-lens/profiles.generated';
import { HausError } from './HausError';

export default class Profile {
  query: Query;

  constructor(query: Query) {
    this.query = query;
  }

  public async get({
    address,
    includeDaosOptions,
  }: {
    address: string;
    includeDaosOptions?: Omit<
      ICrossNetworkMemberListArguments<
        Member_OrderBy,
        Dao_Filter,
        Member_Filter
      >,
      'memberAddress'
    >;
  }): Promise<AccountProfile> {
    const lensProfile = await this.getLensProfile({
      memberAddress: address,
    } as ListProfileQueryVariables);

    let profile = transformProfile(address, lensProfile);

    if (includeDaosOptions) {
      const daoRes = await this.listDaosByMember({
        memberAddress: address,
        networkIds: includeDaosOptions['networkIds'],
        includeTokens: includeDaosOptions['includeTokens'],
      });

      profile = { ...profile, daos: daoRes.data?.daos };
    }

    return profile;
  }

  private async getLensProfile({
    memberAddress,
  }: {
    memberAddress: ListProfileQueryVariables;
  }): Promise<LensProfile> {
    const url = 'https://api.lens.dev';

    const res = await graphFetchList<
      ListProfileQuery,
      ListProfileQueryVariables
    >(ListProfileDocument, url, {
      memberAddress,
    });

    return res.profiles.items[0];
  }

  public async listDaosByMember({
    memberAddress,
    daoFilter,
    memberFilter,
    ordering = {
      orderBy: 'createdAt',
      orderDirection: 'desc',
    },
    networkIds,
    includeTokens = false,
  }: ICrossNetworkMemberListArguments<
    Dao_OrderBy,
    Dao_Filter,
    Member_Filter
  >): Promise<IFindQueryResult<ITransformedMembershipsQuery>> {
    const promises: Promise<IFindQueryResult<ListMembershipsQuery>>[] = [];

    networkIds.forEach((networkId: keyof Keychain) => {
      const url = this.query.endpoints['V3_SUBGRAPH'][networkId];

      if (url) {
        promises.push(
          graphFetch<ListMembershipsQuery, ListMembershipsQueryVariables>(
            ListMembershipsDocument,
            url,
            networkId,
            {
              where: {
                members_: { memberAddress: memberAddress, ...memberFilter },
                ...daoFilter,
              },
              memberWhere: { memberAddress },
              now: nowInSeconds().toFixed(),
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
      const tokenPromises: Promise<IFindQueryResult<DaoTokenBalances>>[] = [];
      transformedList.forEach((dao) => {
        if (dao.networkId) {
          tokenPromises.push(
            this.query.listTokenBalances({
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

  public async listProposalVotesByMember({
    networkId,
    filter,
    memberAddress,
    ordering = {
      orderBy: 'createdAt',
      orderDirection: 'desc',
    },
    paging = {
      pageSize: DEFAULT_RECORDS_PER_PAGE,
      offset: 0,
    },
  }: IListQueryArguments<Proposal_OrderBy, Proposal_Filter> & {
    memberAddress: string;
  }): Promise<
    IListQueryResults<
      Proposal_OrderBy,
      Proposal_Filter,
      ListConnectedMemberProposalsQuery['proposals']
    >
  > {
    const url = this.query.endpoints['V3_SUBGRAPH'][networkId];
    if (!url) {
      throw new HausError({ type: 'INVALID_NETWORK_ERROR' });
    }

    const res = await graphFetchList<
      ListConnectedMemberProposalsQuery,
      ListConnectedMemberProposalsQueryVariables
    >(ListConnectedMemberProposalsDocument, url, {
      where: { ...filter, id_gt: paging.lastId || '' },
      memberWhere: { memberAddress },
      orderBy: paging.lastId ? 'id' : ordering.orderBy,
      orderDirection: paging.lastId ? 'asc' : ordering.orderDirection,
      first: paging.pageSize + 1,
      skip: paging.offset,
    });

    const pagingUpdates = createPaging(res['proposals'], paging);

    return {
      networkId,
      filter,
      ordering,
      nextPaging: pagingUpdates.nextPaging,
      previousPaging: pagingUpdates.previousPaging,
      items: pagingUpdates.pageItems,
    };
  }
}
