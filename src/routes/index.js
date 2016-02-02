import React from 'react';
import { Route, NotFoundRoute } from 'react-router-transition-context';
import App from './AppRoute';
import List from './ListRoute';
import Detail from './DetailRoute';
import NotFound from './NotFoundRoute';

export default (
  <Route name="main" path="/" handler={App}>
    <Route name="list" path="search/:query" handler={List}>
      <Route name="details" path="detail/:detailId" handler={Detail} />
    </Route>
    <NotFoundRoute handler={NotFound} />
  </Route>
);
