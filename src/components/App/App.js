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
    this.state = { searchValue : '', resultsValue: undefined};
  }

  getLocals() {
    const {
      onSearchChange,
      onLogoClick,
      state: {
        searchValue,
        resultsValue
      }
    } = this;

    return {
      onSearchChange,
      searchValue,
      onLogoClick,
      resultsValue
    };
  }

  onSearchChange = value => {
    //This is used for testing purpose only
    //const results = (value === 'reactjs' ? fakeResults : []);

    getRepos(value)
      .then(res => {
        this.setState({ searchValue : value, resultsValue : res });
      }).catch(::console.error);
  }

  onLogoClick = () => {
    this.setState({ searchValue : '', resultsValue: undefined });
  }

  template({ searchValue, onSearchChange, resultsValue, onLogoClick }) {
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
          <ResultsPanel results={resultsValue} searchedValue={searchValue}/>
        </FlexView>
      </FlexView>
    );
  }
}
