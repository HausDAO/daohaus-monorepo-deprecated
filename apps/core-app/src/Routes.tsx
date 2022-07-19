import React from 'react';
import { Routes as RoutesDom, Route } from 'react-router-dom';

import Home from './pages/Home';
import Dao from './pages/Dao';
import Members from './pages/Members';
import DaoOverview from './pages/DaoOverview';
import Proposals from './pages/Proposals';
import Vaults from './pages/Vaults';

const Routes = () => {
  return (
    <RoutesDom>
      <Route path="/" element={<Home />} />
      <Route path="dao/:daochain/:daoid" element={<Dao />}>
        <Route index element={<DaoOverview />} />
        <Route path="proposals" element={<Proposals />} />
        <Route path="vaults" element={<Vaults />} />
        <Route path="members" element={<Members />} />
      </Route>
    </RoutesDom>
  );
};

export default Routes;
