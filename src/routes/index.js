import React from 'react';
import { Route, DefaultRoute } from 'react-router-transition-context';
import App from './AppRoute';
import List from './ListRoute';
import Detail from './DetailRoute';

export default (
  <Route name="main" path="/" handler={App}>
    <DefaultRoute handler={List} />
    <Route name="details" path="detail/:detailId" handler={Detail} />
  </Route>
);
