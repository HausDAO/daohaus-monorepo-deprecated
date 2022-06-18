import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';

const Routes = () => {
  return (
    <Switch>
      <Route path="/">
        <HomePage />
      </Route>
      <Route path="/dashboard">
        <HomePage />
      </Route>
      <Route path="/explore">
        <HomePage />
      </Route>
    </Switch>
  );
};

export default Routes;
