import { MouseEvent, useState } from 'react';

import { useHausConnect } from '@daohaus/daohaus-connect-feature';

import { Layout, SideTopLeft, SideTopRight } from '../components/Layout';
import ProfileArea from '../components/ProfileArea';
import Header from '../components/Header';
import { HomeDashboard } from '../components/HomeDashboard';
import useDaoData from '../hooks/useDaoData';
import { HomeNotConnected } from './HomeNotConnected';
import { isValidNetwork, networkData } from '@daohaus/common-utilities';

import { DEFAULT_SORT_KEY } from '../utils/constants';

const HomePage = () => {
  const { isConnected } = useHausConnect();
  const { daoData, isLoadingDaoData } = useDaoData();
  const [filterNetworks, setFilterNetworks] = useState<Record<string, string>>(
    Object.keys(networkData).reduce(
      (acc, networkId) => ({ ...acc, [networkId]: networkId }),
      {}
    )
  );
  const [filterDelegate, setFilterDelegate] = useState<string | ''>('');
  const [sortBy, setSortBy] = useState<string>(DEFAULT_SORT_KEY);

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
          loading={isLoadingDaoData}
        />
      ) : (
        <HomeNotConnected />
      )}
    </Layout>
  );
};

export default HomePage;
