import React from 'react';
import { Route } from 'react-router-transition-context';
import App from './AppRoute';

export default (
  <Route name="main" path="/" handler={App} />
);
