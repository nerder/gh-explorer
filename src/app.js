import './assets';
import React from 'react';
import Router from 'react-router-transition-context';
import routes from './routes';

const router = Router.create({
  routes, location: Router.HashLocation
});

const mountNode = document.getElementById('app');

router.run((Handler, { params, query }) => {
  React.render(<Handler router={router} params={params} query={query} />, mountNode);
});
