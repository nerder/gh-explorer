import React from 'react';
import App from 'components/App/App';

export default class AppRoute extends React.Component {

  transitionToList = (query) => {
    this.props.router.transitionTo('list', { query });
  };

  backToMain = () => {
    this.props.router.transitionTo('main');
  }

  render() {
    return (
			<App transitionToList={this.transitionToList} backToMain={this.backToMain} searchedValue={this.props.params.query} />
      );
  }
}
