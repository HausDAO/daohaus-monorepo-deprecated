import { Keychain } from '@daohaus/common-utilities';
import {
  DaoWithTokenDataQuery,
  ITransformedProposalListQuery,
  ListMembersQuery,
  Member_Filter,
  Member_OrderBy,
  Ordering,
  Paging,
  Proposal_Filter,
  Proposal_OrderBy,
} from '@daohaus/dao-data';
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
  loadMembersList,
  loadProposalsList,
} from '../utils/contextHelpers';

// TODO: maybe better to send next page in a different way - as it's own state element

export const defaultDaoData = {
  dao: null,
  isDaoLoading: false,
  refreshDao: async () => undefined,
  members: null,
  isMembersLoading: false,
  refreshMembers: async () => undefined,
  membersFilter: undefined,
  setMembersFilter: () => undefined,
  membersSort: undefined,
  setMembersSort: () => undefined,
  membersPaging: undefined,
  membersNextPaging: undefined,
  setMembersPaging: () => undefined,
  proposals: null,
  isProposalsLoading: false,
  refreshProposals: async () => undefined,
  proposalsFilter: undefined,
  setProposalsFilter: () => undefined,
  proposalsSort: undefined,
  setProposalsSort: () => undefined,
  proposalsPaging: undefined,
  proposalsNextPaging: undefined,
  setProposalsPaging: () => undefined,
  getNextPage: async () => undefined,
};

export type DaoConnectDaoType = {
  dao: DaoWithTokenDataQuery['dao'] | null | undefined;
  isDaoLoading: boolean;
  refreshDao: () => Promise<void>;
};

export type DaoConnectMembersType = {
  members: ListMembersQuery['members'] | null | undefined;
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
    DaoConnectMembersType,
    DaoConnectProposalsType {}

export const DaoContext = createContext<DaoConnectType>(defaultDaoData);

type DaoContextProviderProps = {
  children: ReactNode;
};

export const DaoContextProvider = ({ children }: DaoContextProviderProps) => {
  const { daochain, daoid } = useParams();

  const [dao, setDao] = useState<DaoWithTokenDataQuery['dao'] | undefined>();
  const [isDaoLoading, setDaoLoading] = useState(false);

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
    if (daochain && daoid) {
      loadDao({
        daoid,
        daochain: daochain as keyof Keychain,
        setDao,
        setDaoLoading,
      });
    }
  }, [daochain, daoid]);

  useEffect(() => {
    if (daochain && daoid) {
      loadMembersList({
        filter: { dao: daoid, ...membersFilter },
        ordering: membersSort,
        paging: membersPaging,
        daochain: daochain as keyof Keychain,
        setData: setMembers,
        setLoading: setMembersLoading,
        setNextPaging: setMembersNextPaging,
      });
    }
  }, [daochain, daoid, membersFilter, membersSort, membersPaging]);

  useEffect(() => {
    if (daochain && daoid) {
      loadProposalsList({
        filter: { dao: daoid, ...proposalsFilter },
        ordering: proposalsSort,
        paging: proposalsPaging,
        daochain: daochain as keyof Keychain,
        setData: setProposals,
        setLoading: setProposalsLoading,
        setNextPaging: setProposalsNextPaging,
      });
    }
  }, [daochain, daoid, proposalsFilter, proposalsSort, proposalsPaging]);

  const refreshDao = async () => {
    if (daochain && daoid) {
      loadDao({
        daoid,
        daochain: daochain as keyof Keychain,
        setDao,
        setDaoLoading,
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
        members,
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
      }}
    >
      {children}
    </DaoContext.Provider>
  );
};

export const useDao = (): DaoConnectDaoType => {
  const { dao, isDaoLoading, refreshDao } = useContext(DaoContext);
  return {
    dao,
    isDaoLoading,
    refreshDao,
  };
};
export const useMembers = (): DaoConnectMembersType => {
  const {
    members,
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
