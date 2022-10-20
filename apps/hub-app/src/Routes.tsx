import React from 'react';
import { Routes as RoutesDom, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import PublicProfilePage from './pages/PublicProfilePage';

const Routes = () => {
  return (
    <RoutesDom>
      <Route path="/" element={<HomePage />} />
      <Route path="profile/:address" element={<PublicProfilePage />} />
    </RoutesDom>
  );
};

export default Routes;
