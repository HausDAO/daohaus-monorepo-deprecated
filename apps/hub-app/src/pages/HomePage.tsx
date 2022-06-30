import React, { useState } from 'react';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { breakpoints } from '@daohaus/ui';
import styled from 'styled-components';
import { BodyNav } from '../components/BodyNav';
import ConnectCard from '../components/ConnectCard';
import Header from '../components/Header';
import { HeaderProfile } from '../components/Profile';
import TableControl from '../components/TableControl';
import { crimsonDark, indigoDark } from '@radix-ui/colors';
import { DaoCards } from '../components/DaoCards';
import { DataTable } from '../components/Table';
import { sampleDaoData } from '../utils/temp';
import { ListType, TemporaryDAOType } from '../utils/appSpecificTypes';

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
  /* background: ${crimsonDark.crimson2}; */
  width: 100%;
`;

const SideTopRight = styled.div`
  grid-area: sidebarTopRight;
  /* background: ${crimsonDark.crimson2}; */
  width: 100%;
`;

const Body = styled.div`
  grid-area: body;
`;

const HomePage = () => {
  const [daoData] = useState<TemporaryDAOType[]>(sampleDaoData);
  const { isProfileLoading, isConnected } = useHausConnect();
  const [listType, setListType] = useState<ListType>('cards');

  const toggleListType = () => {
    listType === 'cards' ? setListType('table') : setListType('cards');
  };

  return (
    <Layout>
      <SideTopLeft />
      <SideTopRight />
      <Header />
      <ProfileContainer>
        <BodyNav />
        {isConnected && !isProfileLoading ? <HeaderProfile /> : <ConnectCard />}
      </ProfileContainer>
      <Body>
        <TableControl listType={listType} toggleListType={toggleListType} />
        {listType === 'cards' && <DaoCards daoData={daoData} />}
        {listType === 'table' && <DataTable />}
      </Body>
    </Layout>
  );
};

export default HomePage;
