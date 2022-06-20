import React from 'react';
import { Routes as RoutesDom, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';

const Routes = () => {
  return (
    <RoutesDom>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<HomePage />} />
      <Route path="/explore" element={<HomePage />} />
    </RoutesDom>
  );
};

export default Routes;
