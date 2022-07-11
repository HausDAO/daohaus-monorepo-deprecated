import { MouseEvent, useState } from 'react';

import { useHausConnect } from '@daohaus/daohaus-connect-feature';

import { Layout, SideTopLeft, SideTopRight } from '../components/Layout';
import ProfileArea from '../components/ProfileArea';
import Header from '../components/Header';
import { HomeDashboard } from '../components/HomeDashboard';
import useDaoData from '../hooks/useDaoData';
import { HomeNotConnected } from './HomeNotConnected';
import { isValidNetwork, networkData } from '@daohaus/common-utilities';

const HomePage = () => {
  const { isConnected } = useHausConnect();
  const { daoData, isLoadingDaoData } = useDaoData();
  const [filterNetworks, setFilterNetworks] = useState<Record<string, string>>(
    Object.keys(networkData).reduce(
      (acc, networkId) => ({ [networkId]: networkId }),
      {}
    )
  );
  const [filterDelegate, setFilterDelegate] = useState<string | ''>('');

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
          loading={isLoadingDaoData}
        />
      ) : (
        <HomeNotConnected />
      )}
    </Layout>
  );
};

export default HomePage;
