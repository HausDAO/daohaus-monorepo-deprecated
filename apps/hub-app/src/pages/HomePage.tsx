import { useEffect, useState } from 'react';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { breakpoints } from '@daohaus/ui';
import styled from 'styled-components';
import { BodyNav } from '../components/BodyNav';
import Header from '../components/Header';
import { HeaderProfile } from '../components/Profile';

import { indigoDark } from '@radix-ui/colors';
import { HomeDashboard } from '../components/HomeDashboard';
import { HomeNotConnected } from './HomeNotConnected';
import { Haus, ITransformedMembership } from '@daohaus/dao-data';

const Layout = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100%;
  min-width: 100%;
  overflow-x: hidden;
  // REVIEW
  // SWITCH TO SCROLL WHEN NEEDED
  // WAS CAUSING DOUBLE SCROLL BARS
  overflow-y: auto;
  gap: 0rem 0rem;
  display: grid;

  grid-template:
    'sidebarTopLeft header sidebarTopRight' 9.6rem
    'sidebarTopLeft profile sidebarTopRight' minmax(auto, 9.6rem)
    'sidebar body aside' 1fr / 1fr minmax(auto, 35rem) 1fr;

  @media (min-width: ${breakpoints.xs}) {
    grid-template:
      'sidebarTopLeft header sidebarTopRight' 9.6rem
      'sidebarTopLeft profile sidebarTopRight' minmax(auto, 26rem)
      'sidebar body aside' 1fr / minmax(2.6rem, 1fr) minmax(auto, 120rem) minmax(2.6rem, 1fr);
  }
`;

const ProfileContainer = styled.div`
  grid-area: profile;
  display: flex;
  gap: 2.6rem;
  background: ${indigoDark.indigo2};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SideTopLeft = styled.div`
  grid-area: sidebarTopLeft;
  width: 100%;
`;

const SideTopRight = styled.div`
  grid-area: sidebarTopRight;
  width: 100%;
`;

const temporaryInitHaus = () => {
  return Haus.create();
};

const HomePage = () => {
  const { isProfileLoading, isConnected, address } = useHausConnect();
  const [daoData, setDaoData] = useState<ITransformedMembership[]>([]);

  useEffect(() => {
    const getDaos = async (address: string) => {
      const haus = temporaryInitHaus();
      const query = await haus.profile.listDaosByMember({
        memberAddress: address,
        networkIds: ['0x5'],
        includeTokens: true,
      });

      if (query.data?.daos) {
        setDaoData(query.data.daos);
      }
    };

    if (!address) return;
    getDaos(address);
  }, [address]);
  return (
    <Layout>
      <SideTopLeft />
      <SideTopRight />
      <Header />
      <ProfileContainer>
        <BodyNav />
        {isConnected && !isProfileLoading && <HeaderProfile />}
      </ProfileContainer>
      {isConnected ? <HomeDashboard daoData={daoData} /> : <HomeNotConnected />}
    </Layout>
  );
};

export default HomePage;
