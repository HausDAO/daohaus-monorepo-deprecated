import React from 'react';
import { Routes as RoutesDom, Route } from 'react-router-dom';

import Home from './pages/Home';
import DaoHome from './pages/DaoHome';
import Members from './pages/Members';

const Routes = () => {
  return (
    <RoutesDom>
      <Route path="/" element={<Home />} />
      <Route path="dao/:daochain/:daoid" element={<DaoHome />} />
      <Route path="dao/:daochain/:daoid/proposals" element={<Members />} />
      <Route path="dao/:daochain/:daoid/members" element={<Members />} />
      <Route path="dao/:daochain/:daoid/vaults" element={<Members />} />
    </RoutesDom>
  );
};

export default Routes;
