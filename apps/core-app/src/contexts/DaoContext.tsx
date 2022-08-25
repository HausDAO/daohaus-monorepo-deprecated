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
} from 'react';
import { useParams } from 'react-router-dom';
import {
  loadDao,
  loadMember,
  loadMembersList,
  loadProposalsList,
} from '../utils/dataFetchHelpers';

export type TDao = DaoWithTokenDataQuery['dao'];
export type TMembers = ListMembersQuery['members'];
export type TProposals = ITransformedProposalListQuery['proposals'];
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
  membersPaging: { offset: 0, pageSize: 25 },
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
  proposalsSort: undefined,
  setProposalsSort: () => {
    return;
  },
  proposalsPaging: { offset: 0, pageSize: 3 },
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

export type DaoConnectMembersType = {
  members: ListMembersQuery['members'] | null | undefined;
  setMembers: Dispatch<SetStateAction<ListMembersQuery['members'] | undefined>>;
  isMembersLoading: boolean;
  refreshMembers: () => Promise<void>;
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
  setProposals: Dispatch<
    SetStateAction<ITransformedProposalListQuery['proposals'] | undefined>
  >;
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
        setMember: setUserMembership,
        setMemberLoading: setUserMembershipLoading,
        shouldUpdate,
      });
    }
    return () => {
      shouldUpdate = false;
    };
  }, [daochain, daoid, address]);

  useEffect(() => {
    let shouldUpdate = true;
    if (daoid && daochain) {
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
    }
    return () => {
      shouldUpdate = false;
    };
  }, [daochain, daoid, membersFilter, membersSort, membersPaging]);

  useEffect(() => {
    let shouldUpdate = true;
    if (daochain && daoid) {
      console.log('proposalsFilter', proposalsFilter);
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
      loadMember({
        daoid,
        daochain: daochain as keyof Keychain,
        address,
        setMember: setUserMembership,
        setMemberLoading: setUserMembershipLoading,
        shouldUpdate: true,
      });
    }
  };
  const refreshMembers = async () => {
    if (daochain && daoid) {
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
        userMembership,
        isUserMembershipLoading,
        refreshUserMembership,
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
    getNextPage,
  } = useContext(DaoContext);
  return {
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
    getNextPage,
  };
};
export const useProposals = (): DaoConnectProposalsType => {
  const {
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
  } = useContext(DaoContext);
  return {
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
  };
};
