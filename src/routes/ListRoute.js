import React from 'react';
import ResultsPanel from 'ResultsPanel/ResultsPanel';

export default class ListRoute extends React.Component {

  render() {
    return (
      <div>
        <ResultsPanel searchValue={this.props.params.query}/>
      </div>
    );
  }
}
