import { ethers } from 'ethers';
import { QueryResult, resolvedMembership } from '..';
import { ListMembershipsQuery } from '../subgraph/queries/members.generated';

export const resolveMembershipList = (
  memberships: QueryResult<ListMembershipsQuery>[]
): resolvedMembership[] => {
  return memberships.reduce((list: resolvedMembership[], network) => {
    if (network?.data?.members) {
      const daos: resolvedMembership[] = network?.data?.members.map(
        (member) => {
          return {
            dao: member.dao.id,
            name: member.dao.metaData?.name,
            activeProposalCount: member.dao.activeProposals?.length || 0,
            activeMemberCount: member.dao.activeMemberCount,
            votingPower:
              (Number(ethers.utils.formatEther(member.shares)) /
                Number(ethers.utils.formatEther(member.dao.totalShares))) *
              100,
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
