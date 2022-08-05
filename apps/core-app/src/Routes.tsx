import React from 'react';
import { Routes as RoutesDom, Route } from 'react-router-dom';

import Home from './pages/Home';
import Dao from './pages/Dao';
import Members from './pages/Members';
import DaoOverview from './pages/DaoOverview';
import Proposals from './pages/Proposals';
import Vaults from './pages/Vaults';

import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { useDao } from './contexts/DaoContext';
import { TXBuilder } from '@daohaus/tx-builder-feature';
import FormTest from './pages/FormTest';

const Routes = () => {
  const { chainId, provider, profile } = useHausConnect();
  const { dao } = useDao();

  return (
    <TXBuilder
      chainId={chainId}
      safeId={dao?.safeAddress}
      daoId={dao?.id}
      provider={provider}
      appState={{
        dao,
        profile,
        chainId,
      }}
    >
      <RoutesDom>
        <Route path="/" element={<Home />} />
        <Route path="molochv3/:daochain/:daoid" element={<Dao />}>
          <Route index element={<DaoOverview />} />
          <Route path="formtest" element={<FormTest />} />
          <Route path="proposals" element={<Proposals />} />
          <Route path="proposal/:proposalId" element={<Proposals />} />
          <Route path="vaults" element={<Vaults />} />
          <Route path="members" element={<Members />} />
          <Route path="member/:memberAddress" element={<Members />} />
          <Route path="settings" element={<DaoOverview />} />
        </Route>
      </RoutesDom>
    </TXBuilder>
  );
};

export default Routes;
