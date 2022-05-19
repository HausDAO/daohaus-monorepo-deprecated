import { votingPowerPercentage } from '@daohaus/common-utilities';
import { ListMembershipsQuery } from '../subgraph/queries/members.generated';
import { Proposal } from '../subgraph/schema.generated';
import {
  TransformedProposal,
  TransformedMembership,
  QueryResult,
} from '../types';

export const transformProposal = (
  proposal: FindProposalQuery | undefined
): TransformedProposalQuery | undefined => {
  if (!proposal) {
    return;
  }
  return { ...proposal, status: 'ok' };
};

export const transformMembershipList = (
  memberships: QueryResult<ListMembershipsQuery>[]
): TransformedMembership[] => {
  return memberships.reduce((list: TransformedMembership[], network) => {
    if (network?.data?.members) {
      const daos: TransformedMembership[] = network?.data?.members.map(
        (member) => {
          return {
            dao: member.dao.id,
            name: member.dao.metaData?.name,
            safeAddress: member.dao.safeAddress,
            activeProposalCount: member.dao.activeProposals?.length || 0,
            activeMemberCount: member.dao.activeMemberCount,
            votingPower: votingPowerPercentage(
              member.dao.totalShares,
              member.shares
            ),
            networkId: network.networkId,
            delegate:
              member.delegatingTo !== member.memberAddress
                ? member.delegatingTo
                : undefined,
            isDelegate: Number(member.delegateShares) > 0,
            memberAddress: member.memberAddress,
          };
        }
      );
      return [...list, ...daos];
    } else {
      return list;
    }
  }, []);
};
