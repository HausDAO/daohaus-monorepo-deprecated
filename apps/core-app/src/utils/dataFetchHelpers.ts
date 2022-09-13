import { Keychain, ReactSetter } from '@daohaus/common-utilities';
import {
  DaoWithTokenDataQuery,
  FindMemberQuery,
  Haus,
  ITransformedProposalListQuery,
  ITransformedProposalQuery,
  ListConnectedMemberProposalsQuery,
  ListMembersQuery,
  Member_Filter,
  Member_OrderBy,
  Ordering,
  Paging,
  Proposal_Filter,
  Proposal_OrderBy,
} from '@daohaus/dao-data';
import { ErrorMessage } from '@daohaus/ui';
import deepEqual from 'deep-eql';

export const loadDao = async ({
  daoid,
  daochain,
  setDao,
  setDaoLoading,
  shouldUpdate,
}: {
  daoid: string;
  daochain: keyof Keychain;
  setDao: ReactSetter<DaoWithTokenDataQuery['dao'] | undefined>;
  setDaoLoading: ReactSetter<boolean>;
  shouldUpdate: boolean;
}) => {
  try {
    setDaoLoading(true);
    const haus = Haus.create();
    const daoRes = await haus.query.findDao({
      networkId: daochain,
      dao: daoid,
      includeTokens: true,
    });

    if (daoRes?.data?.dao && shouldUpdate) {
      const daoData: DaoWithTokenDataQuery['dao'] = {
        tokenBalances: [],
        fiatTotal: 0,
        ...daoRes.data.dao,
      };

      setDao(daoData);
    }
  } catch (error) {
    console.error(error);
    setDao(undefined);
  } finally {
    if (shouldUpdate) {
      setDaoLoading(false);
    }
  }
};

export const loadMember = async ({
  daoid,
  daochain,
  address,
  setMember,
  setMemberLoading,
  shouldUpdate,
}: {
  daoid: string;
  daochain: keyof Keychain;
  address: string;
  setMember: ReactSetter<FindMemberQuery['member'] | undefined>;
  setMemberLoading: ReactSetter<boolean>;
  shouldUpdate: boolean;
}) => {
  try {
    setMemberLoading(true);
    const haus = Haus.create();
    const memberRes = await haus.query.findMember({
      networkId: daochain,
      dao: daoid,
      memberAddress: address.toLowerCase(),
    });

    if (memberRes?.data?.member && shouldUpdate) {
      setMember(memberRes.data.member);
    } else if (shouldUpdate) {
      setMember(undefined);
    }
  } catch (error) {
    console.error(error);
    setMember(undefined);
  } finally {
    if (shouldUpdate) {
      setMemberLoading(false);
    }
  }
};

export const loadProposal = async ({
  daoid,
  daochain,
  proposalId,
  setProposal,
  setProposalLoading,
  shouldUpdate,
  connectedAddress,
}: {
  daoid: string;
  daochain: keyof Keychain;
  proposalId: string;
  setProposal: ReactSetter<ITransformedProposalQuery['proposal'] | undefined>;
  setProposalLoading: ReactSetter<boolean>;
  shouldUpdate: boolean;
  connectedAddress?: string | null;
}) => {
  try {
    setProposalLoading(true);
    const haus = Haus.create();
    const res = await haus.query.findProposal({
      networkId: daochain,
      dao: daoid,
      proposalId: proposalId.toLowerCase(),
      connectedAddress,
    });

    if (res?.data?.proposal && shouldUpdate) {
      setProposal(res.data.proposal);
    } else if (shouldUpdate) {
      setProposal(undefined);
    }
  } catch (error) {
    console.error(error);
    setProposal(undefined);
  } finally {
    if (shouldUpdate) {
      setProposalLoading(false);
    }
  }
};

export const loadMembersList = async ({
  filter,
  ordering,
  paging,
  daochain,
  setData,
  setLoading,
  setNextPaging,
  shouldUpdate,
}: {
  filter: Member_Filter;
  ordering?: Ordering<Member_OrderBy>;
  paging?: Paging;
  daochain: keyof Keychain;
  setData: ReactSetter<ListMembersQuery['members'] | undefined>;
  setLoading: ReactSetter<boolean>;
  setNextPaging: ReactSetter<Paging | undefined>;
  shouldUpdate: boolean;
}) => {
  try {
    setLoading(true);
    const haus = Haus.create();
    const res = await haus.query.listMembers({
      networkId: daochain,
      filter,
      ordering,
      paging,
    });

    if (shouldUpdate) {
      setNextPaging(res.nextPaging);

      setData((prevState) => {
        if (deepEqual(prevState, res.items)) return res.items;
        if (prevState) {
          return [...prevState, ...res.items];
        } else {
          return res.items;
        }
      });
    }
  } catch (error) {
    console.error(error);
    setData(undefined);
  } finally {
    if (shouldUpdate) {
      setLoading(false);
    }
  }
};

export const isActiveMember = async ({
  daoid,
  daochain,
  address,
  setMemberLoading,
}: {
  daoid: string;
  daochain: keyof Keychain;
  address: string;
  setMemberLoading: ReactSetter<boolean>;
}): Promise<{ member?: FindMemberQuery['member']; error?: ErrorMessage }> => {
  try {
    setMemberLoading(true);
    const haus = Haus.create();
    const memberRes = await haus.query.findMember({
      networkId: daochain,
      dao: daoid,
      memberAddress: address.toLowerCase(),
    });

    if (
      memberRes?.data?.member &&
      Number(memberRes?.data?.member?.shares) > 0
    ) {
      return {
        member: memberRes.data.member,
      };
    }
    if (
      memberRes?.data?.member &&
      Number(memberRes?.data?.member?.loot) > 0
    ) {
      return {
        member: memberRes.data.member,
        error: {
          type: 'error',
          message: `Member doesn't own any shares`,
        },
      };
    }
    return {
      error: {
        type: 'error',
        message: `Member not found`,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      error: {
        type: 'error',
        message: `${error}`,
      },
    };
  } finally {
    setMemberLoading(false);
  }
};

export const loadProposalsList = async ({
  filter,
  ordering,
  paging,
  daochain,
  setData,
  setLoading,
  setNextPaging,
  shouldUpdate,
}: {
  filter: Proposal_Filter;
  ordering?: Ordering<Proposal_OrderBy>;
  paging?: Paging;
  daochain: keyof Keychain;
  setData: ReactSetter<ITransformedProposalListQuery['proposals'] | undefined>;
  setLoading: ReactSetter<boolean>;
  setNextPaging: ReactSetter<Paging | undefined>;
  shouldUpdate: boolean;
}) => {
  try {
    setLoading(true);
    const haus = Haus.create();
    const res = await haus.query.listProposals({
      networkId: daochain,
      filter,
      ordering,
      paging,
    });

    if (shouldUpdate) {
      setNextPaging(res.nextPaging);

      setData((prevState) => {
        if (deepEqual(prevState, res.items)) return res.items;
        if (prevState) {
          return [...prevState, ...res.items];
        } else {
          return res.items;
        }
      });
    }
  } catch (error) {
    console.error(error);
    setData(undefined);
  } finally {
    if (shouldUpdate) {
      setLoading(false);
    }
  }
};

export const loadConnectedMemberVotesList = async ({
  filter,
  ordering,
  paging,
  daochain,
  setData,
  setLoading,
  shouldUpdate,
  memberAddress,
}: {
  filter: Proposal_Filter;
  ordering?: Ordering<Proposal_OrderBy>;
  paging?: Paging;
  daochain: keyof Keychain;
  setData: ReactSetter<
    ListConnectedMemberProposalsQuery['proposals'] | undefined
  >;
  setLoading: ReactSetter<boolean>;
  shouldUpdate: boolean;
  memberAddress: string;
}) => {
  try {
    setLoading(true);
    const haus = Haus.create();
    const res = await haus.profile.listProposalVotesByMember({
      networkId: daochain,
      filter,
      ordering,
      paging,
      memberAddress,
    });
    if (shouldUpdate) {
      setData((prevState) => {
        if (deepEqual(prevState, res.items)) return res.items;
        if (prevState) {
          return [...prevState, ...res.items];
        } else {
          return res.items;
        }
      });
    }
  } catch (error) {
    console.error(error);
    setData(undefined);
  } finally {
    if (shouldUpdate) {
      setLoading(false);
    }
  }
};
