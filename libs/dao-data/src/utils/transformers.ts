import { votingPowerPercentage } from '@daohaus/common-utilities';
import { ListMembershipsQuery } from '../subgraph/queries/members.generated';
import { Proposal } from '../subgraph/schema.generated';
import {
  TransformedProposal,
  TransformedMembership,
  QueryResult,
  AccountProfile,
  BasicProfile,
} from '../types';

export const transformProposal = (
  proposal: FindProposalQuery | undefined
): TransformedProposalQuery | undefined => {
  if (!proposal) {
    return;
  }
  return { ...proposal, status: 'ok' };
};

export const transformProfile = (
  address: string,
  ens: string | null,
  profile: BasicProfile
): AccountProfile => {
  console.log('profile', profile);
  return {
    address,
    ens,
    ...profile,
    image:
      profile.image?.original?.src &&
      `https://daohaus.mypinata.cloud/ipfs/${profile.image.original.src.match(
        /Qm[a-zA-Z0-9/.]+/
      )}`,
  };
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
