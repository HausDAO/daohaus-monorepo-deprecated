import { MouseEvent, ChangeEvent, useEffect, useState } from 'react';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import {
  isValidNetwork,
  networkData,
  ValidNetwork,
} from '@daohaus/common-utilities';

import { Layout, SideTopLeft, SideTopRight } from '../components/Layout';
import ProfileArea from '../components/ProfileArea';
import Header from '../components/Header';
import { HomeDashboard } from '../components/HomeDashboard';
import { HomeNotConnected } from './HomeNotConnected';

import { getDelegateFilter } from '../utils/queryHelpers';
import { DEFAULT_SORT_KEY, SORT_FIELDS } from '../utils/constants';
import useDebounce from '../utils/debounceHook';
import { Haus, ITransformedMembership } from '@daohaus/dao-data';

const HomePage = () => {
  const { isConnected, address } = useHausConnect();
  const [daoData, setDaoData] = useState<ITransformedMembership[]>([]);
  const [filterNetworks, setFilterNetworks] = useState<Record<string, string>>(
    Object.keys(networkData).reduce(
      (acc, networkId) => ({ ...acc, [networkId]: networkId }),
      {}
    )
  );
  const [filterDelegate, setFilterDelegate] = useState<string | ''>('');
  const [sortBy, setSortBy] = useState<string>(DEFAULT_SORT_KEY);
  const [searchTerm, setSearchTerm] = useState<string | ''>('');
  const [loading, setLoading] = useState<boolean>(true);

  const debouncedSearchTerm = useDebounce<string>(searchTerm, 1000);

  useEffect(() => {
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

        if (query.data?.daos) {
          setDaoData(query.data.daos);
        }
      } catch (error) {
        error instanceof Error
          ? console.error(error.message)
          : console.error('Well, shit...');
      } finally {
        setLoading(false);
      }
    };

    if (!address) return;
    getDaos(address);
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

  const toggleSortBy = (event: MouseEvent<HTMLButtonElement>) => {
    setSortBy((prevState) =>
      prevState === event.currentTarget.value
        ? DEFAULT_SORT_KEY
        : event.currentTarget.value
    );
  };

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm((prevState) =>
      prevState === event.target.value ? '' : event.target.value
    );
  };

  return (
    <Layout>
      <SideTopLeft />
      <SideTopRight />
      <Header />
      <ProfileArea />
      {isConnected ? (
        <HomeDashboard
          daoData={daoData}
          filterNetworks={filterNetworks}
          toggleNetworkFilter={toggleNetworkFilter}
          filterDelegate={filterDelegate}
          toggleDelegateFilter={toggleDelegateFilter}
          sortBy={sortBy}
          toggleSortBy={toggleSortBy}
          loading={loading}
          searchTerm={searchTerm}
          setSearchTerm={handleSearchTermChange}
        />
      ) : (
        <HomeNotConnected />
      )}
    </Layout>
  );
};

export default HomePage;
