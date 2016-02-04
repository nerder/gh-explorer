import React from 'react';
import Detail from 'Detail/Detail';

export default class DetailRoute extends React.Component {

  static contextTypes = {
    router: React.PropTypes.any
  };

  back = () => {
    this.context.router.goBack();
  }

  render() {
    return (
      <Detail
        id={this.props.params.detailId}
        repo={this.props.params.repo}
        owner={this.props.params.owner}
        back={this.back}
      />
    );
  }
}
