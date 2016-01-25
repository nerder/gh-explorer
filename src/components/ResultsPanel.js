import React from 'react';
import { props, skinnable, t } from 'revenge';
import { Panel } from 'buildo-react-components/src/Panel';
import ScrollView from 'buildo-react-components/src/scroll';
import List from 'List/List';

@skinnable()
@props({
  results: t.Array
})
export default class ResultsPanel extends React.Component {

  constructor(props){
    super(props);
    this.scrollTo = () => {};
  }

  getLocals() {
    const results = this.props.results;
    return {
      results
    };
  }

  template({ results }){
    return (
        <Panel
          type='floating'
          header={{ title: 'Results Panel' }}
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
          <button style={{ position: 'absolute', right: 0 ,bottom: 0 }} onClick={()=> this.scrollTo(0, 0, 1500)}>
          Go to top
          </button>
        </Panel>
    );
  }

}
