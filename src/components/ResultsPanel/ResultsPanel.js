import React from 'react';
import { props, skinnable, t } from 'revenge';
import { Panel } from 'buildo-react-components/src/Panel';
import ScrollView from 'buildo-react-components/src/scroll';
import List from 'List/List';
import './results-panel.scss';

@skinnable()
@props({
  results: t.maybe(t.Array),
  searchedValue: t.String
})
export default class ResultsPanel extends React.Component {

  constructor(props){
    super(props);
    this.scrollTo = () => {};
  }

  getLocals() {
    const {
      results,
      searchedValue
    } = this.props;
    return {
      results,
      searchedValue
    };
  }

  template({ results, searchedValue }){
    return (
        <Panel
          className="results-panel"
          type='floating'
          header={{ title: (searchedValue ? 'Results for : ' + searchedValue : 'Welcome')}}
        >
          <ScrollView
            easing='easeInOutQuad'
            scrollX={false}
            scrollPropagation={false}
            style={{ position: 'absolute', width: '100%', maxHeight:'100%'}}
          >
          {(scrollTo) => {
            this.scrollTo = scrollTo;
            return (
              <div>
                <List list={results} />
              </div>
              );
              }
          }
          </ScrollView>
          <button className="back-to-top" style={{position:'absolute'}} onClick={()=> this.scrollTo(0, 0, Math.min(1500, results.length * 100))}><i className="fa fa-arrow-up"></i></button>
        </Panel>
    );
  }

}
