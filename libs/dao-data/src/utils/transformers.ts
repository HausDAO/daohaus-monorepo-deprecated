import { votingPowerPercentage } from '@daohaus/common-utilities';
import { ListMembershipsQuery } from '../subgraph/queries/members.generated';
import {
  ITransformedProposal,
  ITransformedMembership,
  IFindQueryResult,
  AccountProfile,
  BasicProfile,
  TokenBalance,
  DaoTokenBalances,
  QueryProposal,
} from '../types';
import { getProposalStatus } from './proposalsStatus';

export const transformProposal = (
  proposal: QueryProposal
): ITransformedProposal => {
  return {
    ...proposal,
    status: getProposalStatus(proposal),
  };
};

export const transformProfile = (
  address: string,
  ens: string | null,
  profile: BasicProfile
): AccountProfile => {
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

export const transformTokenBalances = (
  tokenBalanceRes: TokenBalance[],
  safeAddress: string
): DaoTokenBalances => {
  const fiatTotal = tokenBalanceRes.reduce(
    (sum: number, balance: TokenBalance): number => {
      sum += Number(balance.fiatBalance);
      return sum;
    },
    0
  );

  return { safeAddress, tokenBalances: tokenBalanceRes, fiatTotal };
};

export const transformMembershipList = (
  memberships: IFindQueryResult<ListMembershipsQuery>[]
): ITransformedMembership[] => {
  return memberships.reduce((list: ITransformedMembership[], network) => {
    if (network?.data?.members) {
      const daos: ITransformedMembership[] = network?.data?.members.map(
        (member) => {
          return {
            dao: member.dao.id,
            name: member.dao.name,
            safeAddress: member.dao.safeAddress,
            activeProposalCount: member.dao.activeProposals?.length || 0,
            totalProposalCount: member.dao.proposalCount,
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
            contractType: 'Moloch V3',
          };
        }
      );
      return [...list, ...daos];
    } else {
      return list;
    }
  }, []);
};
