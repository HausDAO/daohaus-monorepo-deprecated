import { Keychain } from '@daohaus/common-utilities';
import {
  DaoWithTokenData,
  DaoWithTokenDataQuery,
  FindDaoQuery,
  Haus,
} from '@daohaus/dao-data';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { loadDao } from '../utils/contextHelpers';

export const defaultDaoId = {
  dao: null,
  isDaoLoading: false,
  refreshDao: async () => undefined,
};

export type DaoConnectType = {
  dao: FindDaoQuery['dao'] | DaoWithTokenData | null | undefined;
  isDaoLoading: boolean;
  refreshDao: () => Promise<void>;
};

export const DaoContext = createContext<DaoConnectType>(defaultDaoId);

type DaoContextProviderProps = {
  children: ReactNode;
};

export const DaoContextProvider = ({ children }: DaoContextProviderProps) => {
  const { daochain, daoid } = useParams();

  const [dao, setDao] = useState<
    FindDaoQuery['dao'] | DaoWithTokenData | undefined
  >();
  const [isDaoLoading, setDaoLoading] = useState(false);

  useEffect(() => {
    // need to prevent firing twice
    if (daochain && daoid) {
      loadDao({
        daoid,
        daochain: daochain as keyof Keychain,
        setDao,
        setDaoLoading,
      });
    }
  }, [daochain, daoid]);

  const refreshDao = async () => {
    console.log('refresh');
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

export const useDao = (): DaoConnectType => {
  const { dao, isDaoLoading, refreshDao } = useContext(DaoContext);

  return {
    dao,
    isDaoLoading,
    refreshDao,
  };
};
