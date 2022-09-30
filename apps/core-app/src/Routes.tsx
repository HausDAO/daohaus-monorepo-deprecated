import React, { ReactNode } from 'react';
import { Routes as RoutesDom, Route, Outlet } from 'react-router-dom';

import Home from './pages/Home';
import DaoOverview from './pages/DaoOverview';
import Members from './pages/Members';
import Member from './pages/Member';
import Proposals from './pages/Proposals';
import Vaults from './pages/Vaults';
import FormTest from './pages/FormTest';
import Settings from './pages/Settings';
import NewProposal from './pages/NewProposal';
import UpdateSettings from './pages/UpdateSettings';
import ProposalDetails from './pages/ProposalDetails';
import { DaoContainer } from './pages/DaoContainer';
import { Banner, H1 } from '@daohaus/ui';
import RageQuit from './pages/RageQuit';
import { HausLayout } from '@daohaus/daohaus-connect-feature';

const Profile = () => <H1>Profile</H1>;

const HomeContainer = () => {
  return (
    <HausLayout
      navLinks={[
        { label: 'Home', href: '/' },
        { label: 'Profile', href: '/profile' },
      ]}
    >
      <Outlet />
    </HausLayout>
  );
};

const Routes = () => {
  return (
    <>
      <Banner />
      <RoutesDom>
        <Route path="/" element={<HomeContainer />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="molochv3/:daochain/:daoid" element={<DaoContainer />}>
          <Route index element={<DaoOverview />} />
          <Route path="formtest" element={<FormTest />} />
          <Route path="proposals" element={<Proposals />} />
          <Route path="new-proposal" element={<NewProposal />} />
          <Route path="proposals/:proposalId" element={<ProposalDetails />} />
          <Route path="vaults" element={<Vaults />} />
          <Route path="members" element={<Members />} />
          <Route path="members/:memberAddress" element={<Member />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/update" element={<UpdateSettings />} />
          <Route path="members/ragequit" element={<RageQuit />} />
        </Route>
      </RoutesDom>
    </>
  );
};

export default Routes;
