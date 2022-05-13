import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Profile from '../components/Profile';
import { crimsonDark } from '@radix-ui/colors';

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
    'sidebar body aside' 1fr / minmax(2.6rem, 1fr) minmax(auto, 120rem) minmax(2.6rem, 1fr);
`;

const ProfileContainer = styled.div`
  grid-area: profile;
  display: flex;
  justify-content: flex-end;
  gap: 2.6rem;
  background: ${crimsonDark.crimson2};
`;

const SideTopLeft = styled.div`
  grid-area: sidebarTopLeft;
  background: ${crimsonDark.crimson2};
  width: 100%;
`;

const SideTopRight = styled.div`
  grid-area: sidebarTopRight;
  background: ${crimsonDark.crimson2};
  width: 100%;
`;

const App = () => {
  return (
    <Layout>
      <SideTopLeft />
      <SideTopRight />
      <Header />
      <ProfileContainer>
        <Profile />
      </ProfileContainer>
    </Layout>
  );
};

export default App;
