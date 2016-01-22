import React from 'react';
import { Route } from 'react-router-transition-context';
import App from './AppRoute';
import List from './ListRoute';
import Detail from './DetailRoute';

export default (
  <Route name="main" path="/" handler={App}>
    <Route handler={List}>
      <Route name="details" path="detail/:detailId" handler={Detail} />
    </Route>
  </Route>
);
