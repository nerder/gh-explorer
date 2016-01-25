import React from 'react';
import List from 'components/List';
import { RouteHandler } from 'react-router-transition-context';

export default class ListRoute extends React.Component {

  render() {
    return (
      <div>
        <List list={[1,2,3,4,5]}/>
        <RouteHandler />
      </div>
      );
  }
}
