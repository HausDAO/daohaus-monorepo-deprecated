import React from 'react';
import { Routes as RoutesDom, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import PublicProfilePage from './pages/PublicProfilePage';

const Routes = () => {
  return (
    <RoutesDom>
      <Route path="/">
        <Route path="dashboard" element={<HomePage />} />
        <Route path="explore" element={<HomePage />} />
        <Route path="profile">
          <Route path=":address" element={<PublicProfilePage />} />
        </Route>
      </Route>
    </RoutesDom>
  );
};

export default Routes;
