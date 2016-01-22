import React from 'react';
import Detail from 'components/Detail';

export default class DetailRoute extends React.Component {

  render() {
    return (
      <Detail detail={this.props.params.detailId}/>
      );
  }
}