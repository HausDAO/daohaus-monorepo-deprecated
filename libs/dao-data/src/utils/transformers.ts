import { votingPowerPercentage } from '@daohaus/common-utilities';
import {
  ITransformedProposal,
  ITransformedMembership,
  IFindQueryResult,
  AccountProfile,
  TokenBalance,
  DaoTokenBalances,
  QueryProposal,
  ListMembershipsQuery,
  DaoProfile,
  ListDaosQuery,
  LensProfile,
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
  profile: LensProfile
): AccountProfile => {
  return {
    address,
    name: profile?.name,
    ens: profile?.onChainIdentity?.ens?.name,
    image:
      profile?.picture?.__typename === 'MediaSet'
        ? `https://daohaus.mypinata.cloud/ipfs/${profile.picture.original.url.match(
            /Qm[a-zA-Z0-9/.]+/
          )}`
        : '',
    description: profile?.bio,
    lensHandle: profile?.handle,
    lensId: profile?.id,
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
    const links =
      obj.links && typeof obj.links === 'string'
        ? JSON.parse(obj.links)
        : obj.links;

    const avatarUrl =
      obj.avatarImg && obj.avatarImg.match(/Qm[a-zA-Z0-9/.]+/)
        ? `https://daohaus.mypinata.cloud/ipfs/${obj.avatarImg.match(
            /Qm[a-zA-Z0-9/.]+/
          )}`
        : obj.avatarImg;
    return {
      description: obj.description,
      longDescription: obj.longDescription,
      avatarImg: avatarUrl,
      tags: obj.tags,
      links,
    };
  } catch (e) {
    console.log('daoprofile parsing error', e);
    return;
  }
};
