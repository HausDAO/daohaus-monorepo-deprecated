import { Keychain } from '@daohaus/common-utilities';
import {
  DaoWithTokenData,
  FindDaoQuery,
  ITransformedProposalListQuery,
  ListMembersQuery,
} from '@daohaus/dao-data';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import {
  loadDao,
  loadMembersList,
  loadProposalsList,
} from '../utils/contextHelpers';

export const defaultDaoData = {
  dao: null,
  isDaoLoading: false,
  refreshDao: async () => undefined,
  members: null,
  isMembersLoading: false,
  refreshMembers: async () => undefined,
  proposals: null,
  isProposalsLoading: false,
  refreshProposals: async () => undefined,
};

export type DaoConnectDaoType = {
  dao: FindDaoQuery['dao'] | DaoWithTokenData | null | undefined;
  isDaoLoading: boolean;
  refreshDao: () => Promise<void>;
};

export type DaoConnectMembersType = {
  members: ListMembersQuery['members'] | null | undefined;
  isMembersLoading: boolean;
  refreshMembers: () => Promise<void>;
};

export type DaoConnectProposalsType = {
  proposals: ITransformedProposalListQuery['proposals'] | null | undefined;
  isProposalsLoading: boolean;
  refreshProposals: () => Promise<void>;
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

  const [dao, setDao] = useState<
    FindDaoQuery['dao'] | DaoWithTokenData | undefined
  >();
  const [isDaoLoading, setDaoLoading] = useState(false);

  const [members, setMembers] = useState<
    ListMembersQuery['members'] | undefined
  >();
  const [isMembersLoading, setMembersLoading] = useState(false);

  const [proposals, setProposals] = useState<
    ITransformedProposalListQuery['proposals'] | undefined
  >();
  const [isProposalsLoading, setProposalsLoading] = useState(false);

  useEffect(() => {
    if (daochain && daoid) {
      loadDao({
        daoid,
        daochain: daochain as keyof Keychain,
        setDao,
        setDaoLoading,
      });
      loadMembersList({
        daoid,
        daochain: daochain as keyof Keychain,
        setData: setMembers,
        setLoading: setMembersLoading,
      });
      loadProposalsList({
        daoid,
        daochain: daochain as keyof Keychain,
        setData: setProposals,
        setLoading: setProposalsLoading,
      });
    }
  }, [daochain, daoid]);

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
    console.log('refresh');
  };

  const refreshProposals = async () => {
    console.log('refresh');
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
        proposals,
        isProposalsLoading,
        refreshProposals,
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
  const { members, isMembersLoading, refreshMembers } = useContext(DaoContext);
  return {
    members,
    isMembersLoading,
    refreshMembers,
  };
};
export const useProposals = (): DaoConnectProposalsType => {
  const { proposals, isProposalsLoading, refreshProposals } =
    useContext(DaoContext);
  return {
    proposals,
    isProposalsLoading,
    refreshProposals,
  };
};
