import React from 'react';
import { Routes as RoutesDom, Route } from 'react-router-dom';

import Home from './pages/Home';
import DaoHome from './pages/DaoHome';
import Members from './pages/Members';

const Routes = () => {
  return (
    <RoutesDom>
      <Route path="/" element={<Home />} />
      <Route path="dao/:daochain/:daoid" element={<DaoHome />}>
        <Route path="proposals" element={<Members />} />
        <Route path="members" element={<Members />} />
        <Route path="vaults" element={<Members />} />
      </Route>
    </RoutesDom>
  );
};

export default Routes;
