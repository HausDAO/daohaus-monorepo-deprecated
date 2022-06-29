import { Core } from '@self.id/core';
import { Caip10Link } from '@ceramicnetwork/stream-caip10-link';
import { ethers } from 'ethers';

import { ENDPOINTS, Keychain } from '@daohaus/common-utilities';

import {
  AccountProfile,
  BasicProfile,
  CrossNetworkQueryArguments,
  DaoTokenBalances,
  ListMembershipsDocument,
  ListMembershipsQuery,
  ListMembershipsQueryVariables,
  Member_OrderBy,
  Ordering,
  QueryResult,
  TransformedMembershipsQuery,
} from './types';
import {
  transformMembershipList,
  transformProfile,
} from './utils/transformers';
import { graphFetch } from './utils';
import Query from './Query';

export default class Profile {
  query: Query;
  providers?: Keychain;
  ceramicNode: string;

  constructor(query: Query, providers?: Keychain, node?: string) {
    this.query = query;
    this.providers = providers;
    this.ceramicNode = node || '';
  }

  public async get(
    address: string,
    includeDaosOptions?: Omit<CrossNetworkQueryArguments, 'memberAddress'>
  ): Promise<AccountProfile> {
    const ens = await this.getEns(address);
    const basicProfile = await this.getBasicProfile('0x1', address);

    let profile = transformProfile(address, ens, basicProfile);

    if (includeDaosOptions) {
      const daos = await this.listDaosByMember({
        memberAddress: address,
        networkIds: includeDaosOptions.networkIds,
        includeTokens: includeDaosOptions.includeTokens,
      });

      profile = { ...profile, daos };
    }

    return profile;
  }

  private async getBasicProfile(
    chain: keyof Keychain = '0x1',
    address: string
  ): Promise<BasicProfile> {
    const core = new Core({
      ceramic: this.ceramicNode || 'https://gateway.ceramic.network',
    });
    const link = await Caip10Link.fromAccount(
      core.ceramic,
      `${address.toLowerCase()}@eip155:${Number(chain)}`
    );

    const profile = core.get('basicProfile', link.did || '');
    if (Object.keys(profile).length === 0) {
      return {};
    }

    return {};
  }

  private async getEns(address: string): Promise<string | null> {
    if (this.providers && this.providers['0x1']) {
      const provider = new ethers.providers.JsonRpcProvider(
        this.providers['0x1']
      );
      return await provider.lookupAddress(address);
    } else {
      return null;
    }
  }

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
      const url = this.query._endpoints['V3_SUBGRAPH'][networkId];

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
