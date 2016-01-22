import React from 'react';
import Router from 'react-router-transition-context';
import routes from './routes';
import assets from './assets';//eslint-disable-line no-unused-vars

const router = Router.create({
  routes, location: Router.HashLocation
});

const mountNode = document.getElementById('app');

router.run(Handler => {
  React.render(<Handler router={router} />, mountNode);
});
