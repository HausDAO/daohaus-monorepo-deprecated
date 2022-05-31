import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dao from './Dao';
import Home from './Home';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Home />
      </Route>
      <Route path="/dao/:daochain/:daoid" element={<Dao />}>
        {/* <Dao /> */}
      </Route>

      {/* <Route path="/dao/:daochain/:daoid/proposals" element={<Dao />} />
      <Route
        path="/dao/:daochain/:daoid/proposals/:proposalid"
        element={<Dao />}
      />
      <Route path="/dao/:daochain/:daoid/members" element={<Dao />} />
      <Route path="/dao/:daochain/:daoid/members/:memberid" element={<Dao />} />
      <Route path="/dao/:daochain/:daoid/vault" element={<Dao />} /> */}
    </Routes>
  );
};

export default AppRouter;
