import {
  Dao,
  Keychain,
  KeychainList,
  Proposal,
} from '@daohaus/common-utilities';

import { QueryPair } from './index';
import { QueryResult } from './types';
import {
  // defaultQueryForEntity,
  DEFAULT_DAOS_QUERY,
  DEFAULT_DAO_QUERY,
  DEFAULT_MEMBERS_BY_DAO_QUERY,
  DEFAULT_MEMBER_QUERY,
  DEFAULT_PROPOSALS_BY_DAO_QUERY,
  DEFAULT_PROPOSAL_QUERY,
  ENDPOINTS,
  INVALID_NETWORK_ERROR,
} from './utils';
import { urqlFetch } from './utils/requests';

export default class Query {
  private _endpoints: KeychainList;

  constructor() {
    this._endpoints = ENDPOINTS;
  }

  public async graphFetch(args: {
    networkId: keyof Keychain;
    query: string;
    variables?: QueryPair;
  }): Promise<QueryResult> {
    const endpointType: keyof KeychainList = 'V3_SUBGRAPH';
    if (!this._endpoints[endpointType][args.networkId]) {
      return {
        error: INVALID_NETWORK_ERROR,
      };
    } else {
      return await urqlFetch({
        endpointType: 'V3_SUBGRAPH',
        networkId: args.networkId,
        query: args.query,
        variables: args.variables,
      });
    }
  }

  // public async entityQuery(args: {
  //   networkId: keyof Keychain;
  //   entityName: string;
  //   dao: string;
  // }): Promise<QueryResult> {
  //   const query = defaultQueryForEntity(args.entityName);
  //   // need to build the variables based on this dao/proposal/member
  //   // likely need the id passed but that requires dev to know about how ids are constructed
  //   // also can't type the return very well
  //   return await urqlFetch({
  //     endpointType: 'V3_SUBGRAPH',
  //     networkId: args.networkId,
  //     query,
  //     variables: { dao: args.dao },
  //   });
  // }

  public async dao(args: {
    networkId: keyof Keychain;
    dao: string;
  }): Promise<QueryResult<Dao>> {
    return await urqlFetch({
      endpointType: 'V3_SUBGRAPH',
      networkId: args.networkId,
      query: DEFAULT_DAO_QUERY,
      variables: { dao: args.dao },
    });
  }

  public async daos(args: {
    networkId: keyof Keychain;
  }): Promise<QueryResult<Dao[]>> {
    return await urqlFetch({
      endpointType: 'V3_SUBGRAPH',
      networkId: args.networkId,
      query: DEFAULT_DAOS_QUERY,
    });
  }

  public async proposal(args: {
    networkId: keyof Keychain;
    dao: string;
    proposalId: string;
  }): Promise<QueryResult<Proposal>> {
    return await urqlFetch({
      endpointType: 'V3_SUBGRAPH',
      networkId: args.networkId,
      query: DEFAULT_PROPOSAL_QUERY,
      variables: { id: `${args.dao}-proposal-${args.proposalId}` },
    });
  }

  public async proposals(args: {
    networkId: keyof Keychain;
    dao: string;
  }): Promise<QueryResult<Proposal[]>> {
    return await urqlFetch({
      endpointType: 'V3_SUBGRAPH',
      networkId: args.networkId,
      query: DEFAULT_PROPOSALS_BY_DAO_QUERY,
      variables: { dao: args.dao },
    });
  }

  public async member(args: {
    networkId: keyof Keychain;
    dao: string;
    memberAddress: string;
  }): Promise<QueryResult<Proposal>> {
    return await urqlFetch({
      endpointType: 'V3_SUBGRAPH',
      networkId: args.networkId,
      query: DEFAULT_MEMBER_QUERY,
      variables: { id: `${args.dao}-member-${args.memberAddress}` },
    });
  }

  public async members(args: {
    networkId: keyof Keychain;
    dao: string;
  }): Promise<QueryResult<Proposal[]>> {
    return await urqlFetch({
      endpointType: 'V3_SUBGRAPH',
      networkId: args.networkId,
      query: DEFAULT_MEMBERS_BY_DAO_QUERY,
      variables: { dao: args.dao },
    });
  }
}
