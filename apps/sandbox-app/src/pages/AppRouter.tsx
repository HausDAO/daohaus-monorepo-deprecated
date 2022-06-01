import React from 'react';
import { Routes, Route } from 'react-router-dom';

import DaoPage from './DaoPage';
import Home from './Home';
import Members from './Members';
import Proposal from './Proposal';
import Proposals from './Proposals';
import Vault from './Vault';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dao/:daochain/:daoid" element={<DaoPage />} />

      <Route path="/dao/:daochain/:daoid/proposals" element={<Proposals />} />
      <Route
        path="/dao/:daochain/:daoid/proposals/:proposalid"
        element={<Proposal />}
      />
      <Route path="/dao/:daochain/:daoid/members" element={<Members />} />
      <Route
        path="/dao/:daochain/:daoid/vault/:safeaddress"
        element={<Vault />}
      />
    </Routes>
  );
};

export default AppRouter;
