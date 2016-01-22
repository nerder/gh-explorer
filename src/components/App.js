import React from 'react';
import { skinnable } from 'revenge';
import { RouteHandler } from 'react-router-transition-context';
import { FlexView } from 'buildo-react-components/src/flex';

@skinnable()
export default class App extends React.Component {

  getLocals() {
    return;
  }

  template() {
    return (
        <FlexView
          className='main-wrapper'
          column
          width='100%'
          height='100%'
          hAlignContent='center'
        >
          <FlexView
            className='nav-bar'
            width='100%'
            basis={80}
            style={{backgroundColor:'blue'}}
          />
          <FlexView
            className='result'
            grow
            width='100%'
            style={{backgroundColor:'red', maxWidth: 1000}}
          >
            <RouteHandler />
          </FlexView>
        </FlexView>
    );
  }
}
