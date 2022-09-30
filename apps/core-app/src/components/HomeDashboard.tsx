import {
  handleErrorMessage,
  isValidNetwork,
  ValidNetwork,
} from '@daohaus/common-utilities';
import { Haus, ITransformedMembership } from '@daohaus/dao-data';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import {
  Spinner,
  useBreakpoint,
  useDebounce,
  useToast,
  widthQuery,
} from '@daohaus/ui';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  defaultNetworks,
  DEFAULT_SORT_KEY,
  getDelegateFilter,
  SORT_FIELDS,
} from '../utils/hub';

// import { DaoCards } from './DaoCards';
// import { DaoTable } from './DaoTable';
// import TableControl from './TableControl';
// import { ListType } from '../utils/appSpecificTypes';

const CenterFrame = styled.div`
  height: 30rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .inner {
    position: absolute;
  }
`;

export const HomeDashboard = () => {
  const { address } = useHausConnect();
  const { errorToast } = useToast();
  const isMobile = useBreakpoint(widthQuery.sm);

  const [daoData, setDaoData] = useState<ITransformedMembership[]>([]);
  const [filterNetworks, setFilterNetworks] =
    useState<Record<string, string>>(defaultNetworks);
  const [filterDelegate, setFilterDelegate] = useState<string | ''>('');
  const [sortBy, setSortBy] = useState<string>(DEFAULT_SORT_KEY);
  const [searchTerm, setSearchTerm] = useState<string | ''>('');
  const [loading, setLoading] = useState<boolean>(true);

  const debouncedSearchTerm = useDebounce<string>(searchTerm, 1000);
  useEffect(() => {
    let shouldUpdate = true;
    const getDaos = async (address: string) => {
      setLoading(true);
      try {
        const haus = Haus.create();
        const query = await haus.profile.listDaosByMember({
          memberAddress: address,
          networkIds: Object.keys(filterNetworks) as ValidNetwork[],
          includeTokens: true,
          daoFilter: { name_contains_nocase: debouncedSearchTerm },
          memberFilter: getDelegateFilter(filterDelegate, address),
          ordering: SORT_FIELDS[sortBy].ordering,
        });
        if (query.data?.daos && shouldUpdate) {
          setDaoData(query.data.daos);
        }
      } catch (error) {
        const errMsg = handleErrorMessage({
          error,
          fallback: 'Error loading DAOs',
        });
        console.error(errMsg);
      } finally {
        setLoading(false);
      }
    };
    if (!address) return;
    getDaos(address);
    return () => {
      shouldUpdate = false;
    };
  }, [address, filterNetworks, filterDelegate, sortBy, debouncedSearchTerm]);

  const toggleNetworkFilter = (event: MouseEvent<HTMLButtonElement>) => {
    const network = event.currentTarget.value;
    if (network && isValidNetwork(network)) {
      filterNetworks[network]
        ? setFilterNetworks((prevState) => {
            delete prevState[network];
            return { ...prevState };
          })
        : setFilterNetworks((prevState) => ({
            ...prevState,
            [network]: network,
          }));
    }
  };
  const toggleDelegateFilter = (event: MouseEvent<HTMLButtonElement>) => {
    setFilterDelegate((prevState) =>
      prevState === event.currentTarget.value ? '' : event.currentTarget.value
    );
  };
  const switchSortBy = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm((prevState) =>
      prevState === event.target.value ? '' : event.target.value
    );
  };

  const tableActions = {
    toggleNetworkFilter,
    toggleDelegateFilter,
    switchSortBy,
    handleSearchTermChange,
  };

  if (loading) {
    <CenterFrame>
      <div className="inner">
        <Spinner size={isMobile ? '8rem' : '16rem'} />
      </div>
    </CenterFrame>;
  }

  return null;
};
