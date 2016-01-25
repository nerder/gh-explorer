import React from 'react';
import { skinnable } from 'revenge';
import { RouteHandler } from 'react-router-transition-context';
import { FlexView } from 'buildo-react-components/src/flex';
import './app.scss';

@skinnable()
export default class App extends React.Component {

  getLocals() {
    return;
  }

  template() {
    return (
        <FlexView
          className='app'
          column
          width='100%'
          height='100%'
          hAlignContent='center'
        >
          <FlexView
            width='100%'
            basis={80}
            style={{backgroundColor:'#2196F3'}}
          />
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
