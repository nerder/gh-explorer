import React from 'react';
import { skinnable } from 'revenge';
import { FlexView } from 'buildo-react-components/src/flex';
import NavBar from 'NavBar/NavBar';
import ResultsPanel from 'ResultsPanel/ResultsPanel';
import './app.scss';

@skinnable()
export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = { searchValue : '', resultsValue: undefined};
  }

  getLocals() {
    return {
      onSearchChange : this.onSearchChange,
      searchValue : this.state.searchValue,
      onLogoClick: this.onLogoClick,
      resultsValue: this.state.resultsValue
    };
  }

  onSearchChange = value => {
    console.log('I got the value ==>',value);
    let results;
    //This is used for testing purpose only
    if(value){
      results = [
        {'id': 1, 'name': 'reactjs_koans', 'description':'Learn basics of React.js making the tests pass'},
        {'id': 2, 'name': 'react-hot-boilerplate', 'description':'Minimal live-editing boilerplate for your next ReactJS project'},
        {'id': 3, 'name': 'generator-react-webpack', 'description':'Yeoman generator for ReactJS and Webpack'},
        {'id': 4, 'name': 'generator-react-webpack', 'description':'Yeoman generator for ReactJS and Webpack'},
        {'id': 5, 'name': 'generator-react-webpack', 'description':'Yeoman generator for ReactJS and Webpack'},
        {'id': 6, 'name': 'generator-react-webpack', 'description':'Yeoman generator for ReactJS and Webpack'}
      ];
    }if( value !== 'reactjs' ){
      results = [];
    }

    this.setState({ searchValue : value, resultsValue : results });
  }

  onLogoClick = () => {
    this.setState({ searchValue : ''});
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
