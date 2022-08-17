import { Keychain } from '@daohaus/common-utilities';
import {
  DaoWithTokenDataQuery,
  FindMemberQuery,
  ITransformedProposalListQuery,
  ListMembersQuery,
  Member_Filter,
  Member_OrderBy,
  Ordering,
  Paging,
  Proposal_Filter,
  Proposal_OrderBy,
} from '@daohaus/dao-data';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  SetStateAction,
  Dispatch,
  useRef,
} from 'react';
import { useParams } from 'react-router-dom';
import {
  loadDao,
  loadUserMembership,
  loadMembersList,
  loadProposalsList,
} from '../utils/contextHelpers';

export type TDao = DaoWithTokenDataQuery['dao'];
export type TMembers = ListMembersQuery['members'];
export type TMembership = FindMemberQuery['member'];

export const defaultDaoData = {
  dao: null,
  isDaoLoading: false,
  refreshDao: async () => {
    return;
  },
  userMembership: null,
  isUserMembershipLoading: false,
  refreshUserMembership: async () => {
    return;
  },
  members: null,
  isMembersLoading: false,
  refreshMembers: async () => {
    return;
  },
  membersQueryOptions: {
    filter: undefined,
    ordering: undefined,
    paging: { offset: 0, pageSize: 5 },
    nextPaging: undefined,
  },
  setMembersQueryOptions: () => {
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
  membersPaging: undefined,
  membersNextPaging: undefined,
  setMembersPaging: () => {
    return;
  },
  proposals: null,
  isProposalsLoading: false,
  refreshProposals: async () => {
    return;
  },
  proposalsFilter: undefined,
  setProposalsFilter: () => {
    return;
  },
  proposalsSort: undefined,
  setProposalsSort: () => {
    return;
  },
  proposalsPaging: undefined,
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

export type DaoConnectDaoType = {
  dao: DaoWithTokenDataQuery['dao'] | null | undefined;
  isDaoLoading: boolean;
  refreshDao: () => Promise<void>;
  refreshAll: () => Promise<void>;
};

export type DaoConnectUserMembershipType = {
  userMembership: FindMemberQuery['member'] | null | undefined;
  isUserMembershipLoading: boolean;
  refreshUserMembership: () => Promise<void>;
};

export type MemberQueryOptions = {
  filter: Member_Filter | undefined;
  ordering: Ordering<Member_OrderBy> | undefined;
  paging: Paging | undefined;
  nextPaging: Paging | undefined;
};

export type DaoConnectMembersType = {
  members: ListMembersQuery['members'] | null | undefined;
  isMembersLoading: boolean;
  refreshMembers: () => Promise<void>;

  membersQueryOptions: MemberQueryOptions;
  setMembersQueryOptions: Dispatch<SetStateAction<MemberQueryOptions>>;

  membersFilter: Member_Filter | undefined;
  setMembersFilter: Dispatch<SetStateAction<Member_Filter | undefined>>;
  membersSort: Ordering<Member_OrderBy> | undefined;
  setMembersSort: Dispatch<
    SetStateAction<Ordering<Member_OrderBy> | undefined>
  >;
  membersPaging: Paging | undefined;
  membersNextPaging: Paging | undefined;
  setMembersPaging: Dispatch<SetStateAction<Paging | undefined>>;
  getNextPage: (entity: string) => Promise<void>;
};

export type DaoConnectProposalsType = {
  proposals: ITransformedProposalListQuery['proposals'] | null | undefined;
  isProposalsLoading: boolean;
  refreshProposals: () => Promise<void>;
  proposalsFilter: Proposal_Filter | undefined;
  setProposalsFilter: Dispatch<SetStateAction<Proposal_Filter | undefined>>;
  proposalsSort: Ordering<Proposal_OrderBy> | undefined;
  setProposalsSort: Dispatch<
    SetStateAction<Ordering<Proposal_OrderBy> | undefined>
  >;
  proposalsPaging: Paging | undefined;
  proposalsNextPaging: Paging | undefined;
  setProposalsPaging: Dispatch<SetStateAction<Paging | undefined>>;
  getNextPage: (entity: string) => Promise<void>;
};

interface DaoConnectType
  extends DaoConnectDaoType,
    DaoConnectUserMembershipType,
    DaoConnectMembersType,
    DaoConnectProposalsType {}

export const DaoContext = createContext<DaoConnectType>(defaultDaoData);

type DaoContextProviderProps = {
  children: ReactNode;
};

export const DaoContextProvider = ({ children }: DaoContextProviderProps) => {
  const { address } = useHausConnect();

  const { daochain, daoid } = useParams();

  const [dao, setDao] = useState<DaoWithTokenDataQuery['dao'] | undefined>();
  const [isDaoLoading, setDaoLoading] = useState(false);

  const [userMembership, setUserMembership] = useState<
    FindMemberQuery['member'] | undefined
  >();
  const [isUserMembershipLoading, setUserMembershipLoading] = useState(false);

  const [members, setMembers] = useState<
    ListMembersQuery['members'] | undefined
  >();
  const [isMembersLoading, setMembersLoading] = useState(false);

  const [membersQueryOptions, setMembersQueryOptions] =
    useState<MemberQueryOptions>(defaultDaoData.membersQueryOptions);

  const [membersFilter, setMembersFilter] = useState<
    Member_Filter | undefined
  >();
  const [membersSort, setMembersSort] = useState<
    Ordering<Member_OrderBy> | undefined
  >();
  const [membersPaging, setMembersPaging] = useState<Paging | undefined>();
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
  const [proposalsPaging, setProposalsPaging] = useState<Paging | undefined>();
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
      loadUserMembership({
        daoid,
        daochain: daochain as keyof Keychain,
        address,
        setUserMembership,
        setUserMembershipLoading,
        shouldUpdate,
      });
    }
    return () => {
      shouldUpdate = false;
    };
  }, [daochain, daoid, address]);

  // TODO: more testing here - does this work with sort and filter...
  const membersPagingRef = useRef<Paging | null>(null);
  useEffect(() => {
    let shouldUpdate = true;
    console.log('outside', membersPagingRef);
    // need to set ref on the paging

    if (
      daochain &&
      daoid &&
      membersPagingRef.current !== membersQueryOptions.paging
    ) {
      console.log(
        'inside membersQueryOptions.paging',
        membersQueryOptions.paging
      );
      if (membersQueryOptions.paging) {
        membersPagingRef.current = membersQueryOptions.paging;
      }
      loadMembersList({
        filter: { dao: daoid, ...membersQueryOptions.filter },
        ordering: membersQueryOptions.ordering,
        paging: membersQueryOptions.paging,
        daochain: daochain as keyof Keychain,
        setData: setMembers,
        setLoading: setMembersLoading,
        setMembersQueryOptions,
        shouldUpdate,
      });
    }
    return () => {
      shouldUpdate = false;
    };
  }, [daochain, daoid, membersQueryOptions]);

  useEffect(() => {
    let shouldUpdate = true;
    if (daochain && daoid) {
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
    }

    return () => {
      shouldUpdate = false;
    };
  }, [daochain, daoid, proposalsFilter, proposalsSort, proposalsPaging]);

  const refreshAll = async () => {
    refreshDao();
    refreshMembers();
    refreshProposals();
    refreshUserMembership();
  };

  const refreshDao = async () => {
    if (daochain && daoid) {
      loadDao({
        daoid,
        daochain: daochain as keyof Keychain,
        setDao,
        setDaoLoading,
        shouldUpdate: true,
      });
    }
  };
  const refreshUserMembership = async () => {
    if (daochain && daoid && address) {
      loadUserMembership({
        daoid,
        daochain: daochain as keyof Keychain,
        address,
        setUserMembership,
        setUserMembershipLoading,
        shouldUpdate: true,
      });
    }
  };
  const refreshMembers = async () => {
    if (daochain && daoid) {
      loadMembersList({
        filter: { dao: daoid, ...membersQueryOptions.filter },
        ordering: membersQueryOptions.ordering,
        paging: membersQueryOptions.paging,
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
      loadProposalsList({
        filter: { dao: daoid, ...proposalsFilter },
        ordering: proposalsSort,
        paging: proposalsPaging,
        daochain: daochain as keyof Keychain,
        setData: setProposals,
        setLoading: setProposalsLoading,
        setNextPaging: setProposalsNextPaging,
        shouldUpdate: false,
      });
    }
  };

  const getNextPage = async (entity: string): Promise<void> => {
    if (entity === 'members' && membersNextPaging) {
      // setMembersPaging(membersNextPaging);
      setMembersQueryOptions((prevState) => {
        return { ...prevState, paging: prevState.nextPaging };
      });
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
        userMembership,
        isUserMembershipLoading,
        refreshUserMembership,
        members,
        isMembersLoading,
        refreshMembers,
        membersQueryOptions,
        setMembersQueryOptions,
        membersFilter,
        setMembersFilter,
        membersSort,
        setMembersSort,
        membersPaging,
        setMembersPaging,
        membersNextPaging,
        proposals,
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

export const useDao = (): DaoConnectDaoType => {
  const { dao, isDaoLoading, refreshDao, refreshAll } = useContext(DaoContext);
  return {
    dao,
    isDaoLoading,
    refreshDao,
    refreshAll,
  };
};
export const useUserMembership = (): DaoConnectUserMembershipType => {
  const { userMembership, isUserMembershipLoading, refreshUserMembership } =
    useContext(DaoContext);
  return {
    userMembership,
    isUserMembershipLoading,
    refreshUserMembership,
  };
};
export const useMembers = (): DaoConnectMembersType => {
  const {
    members,
    isMembersLoading,
    refreshMembers,
    membersQueryOptions,
    setMembersQueryOptions,
    membersFilter,
    setMembersFilter,
    membersSort,
    setMembersSort,
    membersPaging,
    setMembersPaging,
    membersNextPaging,
    getNextPage,
  } = useContext(DaoContext);
  return {
    members,
    isMembersLoading,
    refreshMembers,
    membersQueryOptions,
    setMembersQueryOptions,
    membersFilter,
    setMembersFilter,
    membersSort,
    setMembersSort,
    membersPaging,
    setMembersPaging,
    membersNextPaging,
    getNextPage,
  };
};
export const useProposals = (): DaoConnectProposalsType => {
  const {
    proposals,
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
  } = useContext(DaoContext);
  return {
    proposals,
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
  };
};
