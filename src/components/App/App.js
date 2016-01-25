import React from 'react';
import { skinnable } from 'revenge';
import { RouteHandler } from 'react-router-transition-context';
import { FlexView } from 'buildo-react-components/src/flex';
import NavBar from 'NavBar/NavBar';
import './app.scss';

@skinnable()
export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = { searchValue: '' };
  }

  getLocals() {
    return {
      onSearchChange : this.onSearchChange,
      searchValue : this.state.searchValue
    };
  }

  onSearchChange = value => {
      console.log('I got the value ==>',value);
      //no need for setState now
      //this.setState({ searchValue : value });
  }

  template({ searchValue, onSearchChange }) {
    return (
        <FlexView
          className='app'
          column
          width='100%'
          height='100%'
          hAlignContent='center'
        >
          <NavBar onSearchChange={onSearchChange} searchValue={searchValue} />
          <FlexView
            className="results"
            grow
            width='100%'
          >
            <RouteHandler />
          </FlexView>
        </FlexView>
    );
  }
}
