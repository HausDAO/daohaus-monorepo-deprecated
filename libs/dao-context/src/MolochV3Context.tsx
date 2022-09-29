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

export const defaultDaoData = {
  dao: null,
  isDaoLoading: false,
  refreshDao: async () => {
    return;
  },
};

export type MolochV3ContextType = {
  dao: DaoWithTokenDataQuery['dao'] | null | undefined;
  isDaoLoading: boolean;
  refreshDao: () => Promise<void>;
};

export const DaoContext = createContext<MolochV3ContextType>(defaultDaoData);

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

  const refreshDao = async () => {
    return undefined;
  };

  return (
    <DaoContext.Provider
      value={{
        dao,
        isDaoLoading,
        refreshDao,
      }}
    >
      {children}
    </DaoContext.Provider>
  );
};
