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
    if (network?.data?.daos) {
      const daos: ITransformedMembership[] = network?.data?.daos.map(
        (dao: ListMembershipsQuery['dao']) => {
          return {
            dao: dao.id,
            name: dao.name,
            safeAddress: dao.safeAddress,
            activeProposalCount: dao.activeProposals?.length || 0,
            totalProposalCount: dao.proposalCount,
            activeMemberCount: dao.activeMemberCount,
            votingPower: votingPowerPercentage(
              dao.totalShares,
              dao.members[0].delegateShares
            ),
            networkId: network.networkId,
            delegatingTo:
              dao.members[0].delegatingTo !== dao.members[0].memberAddress
                ? dao.members[0].delegatingTo
                : undefined,
            isDelegate: Number(dao.members[0].delegateOfCount) > 0,
            memberAddress: dao.members[0].memberAddress,
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
