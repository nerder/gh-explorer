import React from 'react';
import List from 'components/List';

export default class ListRoute extends React.Component {

  render() {
    return (
      <List list={[1,2,3,4,5]}/>
      );
  }
}