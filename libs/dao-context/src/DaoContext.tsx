import { createContext, ReactNode, useEffect, useState, useRef } from 'react';
import { Keychain } from '@daohaus/common-utilities';
import {
  DaoWithTokenDataQuery,
  FindMemberQuery,
  ITransformedProposalListQuery,
  ListConnectedMemberProposalsQuery,
  ListMembersQuery,
  Member_Filter,
  Member_OrderBy,
  Ordering,
  Paging,
  Proposal_Filter,
  Proposal_OrderBy,
} from '@daohaus/dao-data';
import {
  DEFAULT_MEMBERS_PAGE_SIZE,
  DEFAULT_PROPOSAL_PAGE_SIZE,
  DEFAULT_PROPOSAL_SORT,
} from './utils/constants';
import {
  loadConnectedMemberVotesList,
  loadDao,
  loadMember,
  loadMembersList,
  loadProposalsList,
} from './utils/fetchHelpers';
import { DaoConnectType } from './utils/types';

export const defaultDaoData = {
  dao: null,
  isDaoLoading: false,
  refreshDao: async () => {
    return;
  },
  connectedMembership: null,
  isConnectedMembershipLoading: false,
  refreshConnectedMembership: async () => {
    return;
  },
  connectedMembershipProposalVotes: null,
  isConnectedMembershipProposalVotesLoading: false,
  refreshConnectedMembershipProposalVotes: async () => {
    return;
  },
  members: null,
  setMembers: () => {
    return;
  },
  isMembersLoading: false,
  refreshMembers: async () => {
    return;
  },
  membersFilter: undefined,
  setMembersFilter: () => {
    return;
  },
  membersSort: undefined,
  setMembersSort: () => {
    return;
  },
  membersPaging: { offset: 0, pageSize: DEFAULT_MEMBERS_PAGE_SIZE },
  membersNextPaging: undefined,
  setMembersPaging: () => {
    return;
  },
  proposals: null,
  setProposals: () => {
    return;
  },
  isProposalsLoading: false,
  refreshProposals: async () => {
    return;
  },
  proposalsFilter: undefined,
  setProposalsFilter: () => {
    return;
  },
  proposalsSort: DEFAULT_PROPOSAL_SORT,
  setProposalsSort: () => {
    return;
  },
  proposalsPaging: { offset: 0, pageSize: DEFAULT_PROPOSAL_PAGE_SIZE },
  proposalsNextPaging: undefined,
  setProposalsPaging: () => {
    return;
  },
  getNextPage: async () => {
    return;
  },
  refreshAll: async () => {
    return;
  },
};

export const DaoContext = createContext<DaoConnectType>(defaultDaoData);

type DaoContextProviderProps = {
  address: string | null | undefined;
  daoid: string | null | undefined;
  daochain: string | null | undefined;
  children: ReactNode;
};

export const DaoContextProvider = ({
  address,
  children,
  daoid,
  daochain,
}: DaoContextProviderProps) => {
  const [dao, setDao] = useState<DaoWithTokenDataQuery['dao'] | undefined>();
  const [isDaoLoading, setDaoLoading] = useState(false);
  const [connectedMembership, setConnectedMembership] = useState<
    FindMemberQuery['member'] | undefined
  >();
  const [isConnectedMembershipLoading, setConnectedMembershipLoading] =
    useState(false);

  const [
    connectedMembershipProposalVotes,
    setConnectedMembershipProposalVotes,
  ] = useState<ListConnectedMemberProposalsQuery['proposals'] | undefined>();
  const [
    isConnectedMembershipProposalVotesLoading,
    setConnectedMembershipProposalVotesLoading,
  ] = useState(false);

  const [members, setMembers] = useState<
    ListMembersQuery['members'] | undefined
  >();
  const [isMembersLoading, setMembersLoading] = useState(false);

  const [membersFilter, setMembersFilter] = useState<
    Member_Filter | undefined
  >();
  const [membersSort, setMembersSort] = useState<
    Ordering<Member_OrderBy> | undefined
  >();
  const [membersPaging, setMembersPaging] = useState<Paging | undefined>(
    defaultDaoData.membersPaging
  );
  const [membersNextPaging, setMembersNextPaging] = useState<
    Paging | undefined
  >();

  const [proposals, setProposals] = useState<
    ITransformedProposalListQuery['proposals'] | undefined
  >();
  const [isProposalsLoading, setProposalsLoading] = useState(false);
  const [proposalsFilter, setProposalsFilter] = useState<
    Proposal_Filter | undefined
  >();
  const [proposalsSort, setProposalsSort] = useState<
    Ordering<Proposal_OrderBy> | undefined
  >();
  const [proposalsPaging, setProposalsPaging] = useState<Paging | undefined>(
    defaultDaoData.proposalsPaging
  );
  const [proposalsNextPaging, setProposalsNextPaging] = useState<
    Paging | undefined
  >();

  useEffect(() => {
    let shouldUpdate = true;
    if (daochain && daoid) {
      loadDao({
        daoid,
        daochain: daochain as keyof Keychain,
        setDao,
        setDaoLoading,
        shouldUpdate,
      });
    }

    return () => {
      shouldUpdate = false;
    };
  }, [daochain, daoid]);

  useEffect(() => {
    let shouldUpdate = true;
    if (daochain && daoid && address) {
      loadMember({
        daoid,
        daochain: daochain as keyof Keychain,
        address,
        setMember: setConnectedMembership,
        setMemberLoading: setConnectedMembershipLoading,
        shouldUpdate,
      });
    } else {
      setConnectedMembership(undefined);
    }
    return () => {
      shouldUpdate = false;
    };
  }, [daochain, daoid, address]);

  const currentDaoMembers = useRef<null | string>(null);
  useEffect(() => {
    let shouldUpdate = true;
    if (daoid && daochain) {
      if (currentDaoMembers.current && currentDaoMembers.current !== daoid) {
        setMembers(undefined);
      }
      loadMembersList({
        filter: { dao: daoid, ...membersFilter },
        ordering: membersSort,
        paging: membersPaging,
        daochain: daochain as keyof Keychain,
        setData: setMembers,
        setLoading: setMembersLoading,
        setNextPaging: setMembersNextPaging,
        shouldUpdate,
      });
      currentDaoMembers.current = daoid;
    }
    return () => {
      shouldUpdate = false;
    };
  }, [daochain, daoid, membersFilter, membersSort, membersPaging]);

  const currentDaoProposals = useRef<null | string>(null);
  useEffect(() => {
    let shouldUpdate = true;
    if (daochain && daoid) {
      if (
        currentDaoProposals.current &&
        currentDaoProposals.current !== daoid
      ) {
        console.log('CLEAR');
        setProposals(undefined);
      }
      loadProposalsList({
        filter: { dao: daoid, ...proposalsFilter },
        ordering: proposalsSort,
        paging: proposalsPaging,
        daochain: daochain as keyof Keychain,
        setData: setProposals,
        setLoading: setProposalsLoading,
        setNextPaging: setProposalsNextPaging,
        shouldUpdate,
      });
      currentDaoProposals.current = daoid;
    }

    return () => {
      shouldUpdate = false;
    };
  }, [daochain, daoid, proposalsFilter, proposalsSort, proposalsPaging]);

  const currentDaoConnectedMembershipProposalVotes = useRef<null | string>(
    null
  );
  useEffect(() => {
    let shouldUpdate = true;
    if (daochain && daoid && address) {
      if (
        currentDaoConnectedMembershipProposalVotes.current &&
        currentDaoConnectedMembershipProposalVotes.current !== daoid
      ) {
        setConnectedMembershipProposalVotes(undefined);
      }
      loadConnectedMemberVotesList({
        filter: { dao: daoid, ...proposalsFilter },
        ordering: proposalsSort,
        paging: proposalsPaging,
        daochain: daochain as keyof Keychain,
        setData: setConnectedMembershipProposalVotes,
        setLoading: setConnectedMembershipProposalVotesLoading,
        shouldUpdate,
        memberAddress: address,
      });
      currentDaoConnectedMembershipProposalVotes.current = daoid;
    }

    return () => {
      shouldUpdate = false;
    };
  }, [
    daochain,
    daoid,
    proposalsFilter,
    proposalsSort,
    proposalsPaging,
    address,
  ]);

  const refreshAll = async () => {
    refreshDao();
    refreshMembers();
    refreshProposals();
    refreshConnectedMembership();
  };

  const refreshDao = async () => {
    if (daochain && daoid) {
      setDao(undefined);
      loadDao({
        daoid,
        daochain: daochain as keyof Keychain,
        setDao,
        setDaoLoading,
        shouldUpdate: true,
      });
    }
  };
  const refreshConnectedMembership = async () => {
    if (daochain && daoid && address) {
      setConnectedMembership(undefined);
      loadMember({
        daoid,
        daochain: daochain as keyof Keychain,
        address,
        setMember: setConnectedMembership,
        setMemberLoading: setConnectedMembershipLoading,
        shouldUpdate: true,
      });
    }
  };
  const refreshMembers = async () => {
    if (daochain && daoid) {
      setMembers(undefined);
      loadMembersList({
        filter: { dao: daoid, ...membersFilter },
        ordering: membersSort,
        paging: membersPaging,
        daochain: daochain as keyof Keychain,
        setData: setMembers,
        setLoading: setMembersLoading,
        setNextPaging: setMembersNextPaging,
        shouldUpdate: true,
      });
    }
  };
  const refreshProposals = async () => {
    if (daochain && daoid) {
      setProposals(undefined);
      loadProposalsList({
        filter: { dao: daoid, ...proposalsFilter },
        ordering: proposalsSort,
        paging: proposalsPaging,
        daochain: daochain as keyof Keychain,
        setData: setProposals,
        setLoading: setProposalsLoading,
        setNextPaging: setProposalsNextPaging,
        shouldUpdate: true,
      });
    }
  };
  const refreshConnectedMembershipProposalVotes = async () => {
    if (daochain && daoid && address) {
      setConnectedMembershipProposalVotes(undefined);
      loadConnectedMemberVotesList({
        filter: { dao: daoid, ...proposalsFilter },
        ordering: proposalsSort,
        paging: proposalsPaging,
        daochain: daochain as keyof Keychain,
        setData: setConnectedMembershipProposalVotes,
        setLoading: setConnectedMembershipProposalVotesLoading,
        shouldUpdate: true,
        memberAddress: address,
      });
    }
  };

  const getNextPage = async (entity: string): Promise<void> => {
    if (entity === 'members' && membersNextPaging) {
      setMembersPaging(membersNextPaging);
    }
    if (entity === 'proposal' && proposalsNextPaging) {
      setProposalsPaging(proposalsNextPaging);
    }
  };

  return (
    <DaoContext.Provider
      value={{
        dao,
        isDaoLoading,
        refreshDao,
        connectedMembership,
        isConnectedMembershipLoading,
        refreshConnectedMembership,
        connectedMembershipProposalVotes,
        isConnectedMembershipProposalVotesLoading,
        refreshConnectedMembershipProposalVotes,
        members,
        setMembers,
        isMembersLoading,
        refreshMembers,
        membersFilter,
        setMembersFilter,
        membersSort,
        setMembersSort,
        membersPaging,
        setMembersPaging,
        membersNextPaging,
        proposals,
        setProposals,
        isProposalsLoading,
        refreshProposals,
        proposalsFilter,
        setProposalsFilter,
        proposalsSort,
        setProposalsSort,
        proposalsPaging,
        setProposalsPaging,
        proposalsNextPaging,
        getNextPage,
        refreshAll,
      }}
    >
      {children}
    </DaoContext.Provider>
  );
};
