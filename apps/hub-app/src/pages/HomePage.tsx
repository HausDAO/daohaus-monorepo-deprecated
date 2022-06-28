import React, { useState } from 'react';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { breakpoints } from '@daohaus/ui';
import styled from 'styled-components';
import { BodyNav } from '../components/BodyNav';
import ConnectCard from '../components/ConnectCard';
import Header from '../components/Header';
import Profile from '../components/Profile';
import TableControl from '../components/TableControl';
import { crimsonDark, indigoDark } from '@radix-ui/colors';
import { DaoCard } from '../components/DaoCard';

const Layout = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100%;
  min-width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  gap: 0rem 0rem;
  display: grid;

  grid-template:
    'sidebarTopLeft header sidebarTopRight' 9.6rem
    'sidebarTopLeft profile sidebarTopRight' minmax(auto, 26rem)
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
  flex-direction: column;
  justify-content: center;
  gap: 2.6rem;
  background: ${indigoDark.indigo2};

  @media (min-width: ${breakpoints.xs}px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const sampleDaoData = [
  {
    isDelegate: true,
    unreadProposalAmt: 4,
    daoName: 'Uber Complex Meta Governance',
    amtMembers: 100,
    amtToken: 68,
    tokenSymbol: 'ETH',
    amtProposals: 36,
    amtPower: 12.6,
    networkName: 'Gnosis Chain',
    contractName: 'Moloch V3',
  },
];

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
  const [daoData, setData] = useState(sampleDaoData);
  const { isProfileLoading, isConnected } = useHausConnect();

  return (
    <Layout>
      <SideTopLeft />
      <SideTopRight />
      <Header />
      <ProfileContainer>
        <BodyNav />
        {isConnected && !isProfileLoading ? <Profile /> : <ConnectCard />}
      </ProfileContainer>
      <Body>
        <TableControl />
        {daoData.map((dao, index) => (
          <DaoCard key={`${dao.daoName}-${index}`} {...dao} />
        ))}
        {/* <DataTable /> */}
      </Body>
    </Layout>
  );
};

export default HomePage;
