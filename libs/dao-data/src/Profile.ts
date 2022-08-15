import { Keychain } from '@daohaus/common-utilities';
import {
  AccountProfile,
  ICrossNetworkMemberListArguments,
  DaoTokenBalances,
  ListMembershipsDocument,
  ListMembershipsQuery,
  ListMembershipsQueryVariables,
  Member_OrderBy,
  IFindQueryResult,
  ITransformedMembershipsQuery,
  Dao_OrderBy,
  Member_Filter,
  LensProfile,
} from './types';
import {
  transformMembershipList,
  transformProfile,
} from './utils/transformers';
import { graphFetch, graphFetchList } from './utils';
import Query from './Query';
import { Dao_Filter } from './types';
import {
  ListProfileDocument,
  ListProfileQuery,
  ListProfileQueryVariables,
} from './subgraph/queries-lens/profiles.generated';

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
}
