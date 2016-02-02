import React from 'react';
import { skinnable } from 'revenge';
import { FlexView } from 'buildo-react-components/src/flex';
import NavBar from 'NavBar/NavBar';
import ResultsPanel from 'ResultsPanel/ResultsPanel';
import { getRepos } from 'api';
import './app.scss';


@skinnable()
export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = { searchValue: '', resultsValue: undefined, loadingResults: false };
  }

  getLocals() {
    const {
      onSearchChange,
      onLogoClick,
      state: {
        searchValue,
        resultsValue,
        loadingResults
      }
    } = this;

    return {
      onSearchChange,
      searchValue,
      onLogoClick,
      resultsValue,
      loadingResults
    };
  }

  onSearchChange = value => {
    this.setState({ loadingResults: true });
    getRepos(value)
      .then(res => {
        this.setState({ searchValue: value, resultsValue: res , loadingResults: false });
      })
      .catch(::console.error);
  }

  onLogoClick = () => {
    this.setState({ searchValue: '', resultsValue: undefined , loadingResults: false });
  }

  template({ searchValue, onSearchChange, resultsValue, onLogoClick, loadingResults }) {
    return (
      <FlexView
        className='app'
        column
        width='100%'
        height='100%'
        hAlignContent='center'
      >
        <NavBar onSearchChange={onSearchChange} searchValue={searchValue} onLogoClick={onLogoClick} />
        <FlexView
          className='results'
          grow
          width='100%'
        >
          <ResultsPanel results={resultsValue} searchedValue={searchValue} loadingResults={loadingResults}/>
        </FlexView>
      </FlexView>
    );
  }
}
