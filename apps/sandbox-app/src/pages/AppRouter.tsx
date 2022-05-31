import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DaoPage from './DaoPage';
import Home from './Home';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dao/:daochain/:daoid" element={<DaoPage />} />

      <Route path="/dao/:daochain/:daoid/proposals" element={<DaoPage />} />
      <Route
        path="/dao/:daochain/:daoid/proposals/:proposalid"
        element={<DaoPage />}
      />
      <Route path="/dao/:daochain/:daoid/members" element={<DaoPage />} />
      <Route
        path="/dao/:daochain/:daoid/members/:memberid"
        element={<DaoPage />}
      />
      <Route path="/dao/:daochain/:daoid/vault" element={<DaoPage />} />
    </Routes>
  );
};

export default AppRouter;
