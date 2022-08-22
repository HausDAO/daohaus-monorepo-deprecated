import React from 'react';
import { Routes as RoutesDom, Route } from 'react-router-dom';

import { DaoContextProvider } from './contexts/DaoContext';
import Home from './pages/Home';
import Dao from './pages/Dao';
import DaoOverview from './pages/DaoOverview';
import Members from './pages/Members';
import Member from './pages/Member';
import Proposals from './pages/Proposals';
import Vaults from './pages/Vaults';
import FormTest from './pages/FormTest';
import Settings from './pages/Settings';

const Routes = () => {
  return (
    <RoutesDom>
      <Route path="/" element={<Home />} />
      <Route
        path="molochv3/:daochain/:daoid"
        element={
          <DaoContextProvider>
            <Dao />
          </DaoContextProvider>
        }
      >
        <Route index element={<DaoOverview />} />
        <Route path="formtest" element={<FormTest />} />
        <Route path="proposals" element={<Proposals />} />
        <Route path="proposal/:proposalId" element={<Proposals />} />
        <Route path="vaults" element={<Vaults />} />
        <Route path="members" element={<Members />} />
        <Route path="members/:memberAddress" element={<Member />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </RoutesDom>
  );
};

export default Routes;
