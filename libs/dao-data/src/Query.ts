import {
  Dao,
  Keychain,
  KeychainList,
  Proposal,
} from '@daohaus/common-utilities';

import { WhereQueryVariables } from './index';
import { QueryResult } from './types';
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
import { urqlFetch } from './utils/requests';

export default class Query {
  private _endpoints: KeychainList;

  constructor() {
    this._endpoints = ENDPOINTS;
  }

  public async graphFetch(args: {
    networkId: keyof Keychain;
    query: string;
    variables?: WhereQueryVariables;
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

  public async listDaos(args: {
    networkId: keyof Keychain;
  }): Promise<QueryResult<Dao[]>> {
    return await urqlFetch({
      endpointType: 'V3_SUBGRAPH',
      networkId: args.networkId,
      query: DEFAULT_DAOS_QUERY,
    });
  }

  public async findDao(args: {
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

  public async findMember(args: {
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

  public async findProposal(args: {
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

  /**
   * Queries scoped to daos
   */

  public async listProposals(args: {
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

  public async listMembers(args: {
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

  public async findLatestTransaction(args: {
    networkId: keyof Keychain;
    dao: string;
  }): Promise<QueryResult<Proposal[]>> {
    return await urqlFetch({
      endpointType: 'V3_SUBGRAPH',
      networkId: args.networkId,
      query: LATEST_TX_BY_DAO,
      variables: { dao: args.dao },
    });
  }

  /**
   * Queries scoped to account
   */

  // TODO: should add network indicator to the res somewhere
  public async listDaosByAccount(args: {
    account: string;
    networks: string[];
  }): Promise<QueryResult<Dao[]>[]> {
    const promises: Promise<QueryResult<Dao[]>>[] = [];

    args.networks.forEach((networkId) => {
      promises.push(
        urqlFetch({
          endpointType: 'V3_SUBGRAPH',
          networkId: networkId as keyof Keychain,
          query: DAOS_BY_MEMBER_QUERY,
          variables: { memberAddress: args.account },
        })
      );
    });

    return Promise.all(promises);
  }
}
