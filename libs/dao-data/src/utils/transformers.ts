import { votingPowerPercentage } from '@daohaus/common-utilities';
import {
  ITransformedProposal,
  ITransformedMembership,
  IFindQueryResult,
  AccountProfile,
  BasicProfile,
  TokenBalance,
  DaoTokenBalances,
  QueryProposal,
  ListMembershipsQuery,
  DaoProfile,
  ListDaosQuery,
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
        (dao: ListMembershipsQuery['daos'][number]) => {
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

export const addDaoProfileFields = (
  dao: ListDaosQuery['daos'][number]
): DaoProfile | undefined => {
  if (!dao.profile || !dao.profile.length) return;

  try {
    const obj = JSON.parse(dao.profile[0].content);
    return {
      description: obj.description,
      longDescription: obj.longDescription,
      avatarImg:
        obj.avatarImg &&
        `https://daohaus.mypinata.cloud/ipfs/${obj.avatarImg.match(
          /Qm[a-zA-Z0-9/.]+/
        )}`,
      tags: obj.tags,
      links: obj.links,
    };
  } catch (e) {
    console.log('daoprofile parsing error', e);
    return;
  }
};
