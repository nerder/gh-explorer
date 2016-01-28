import React from 'react';
import { props, skinnable, t } from 'revenge';
import { FlexView } from 'buildo-react-components/src/flex';
import ResultRow from 'ResultRow/ResultRow';
import './list.scss';

@skinnable()
@props({
  list: t.maybe(t.Array)
})
export default class List extends React.Component {

  getLocals() {
    const {
      props: {
        list
      }
    } = this;
    return {
      list,
      shouldRenderPlaceholder: typeof list === 'undefined',
      shouldRenderNoResults: !!list && list.length === 0,
      shouldRenderResults: !!list && list.length > 0
    };
  }

  templatePlaceholder = () =>{
    return (
      <FlexView
        column
        className="homepage"
        vAlignContent='top'
        hAlignContent='center'
      >
        <h1>Welcome to RepoHunter</h1>
        <h3>The webapp that helps you find usefull information about your favourite repos</h3>
        <img src="http://i.imgur.com/b5NX5ni.gif"/>
      </FlexView>
    );
  }

  templateNoResults = () =>{
    return (
      <FlexView
        column
        className="not-found"
        vAlignContent='top'
        hAlignContent='center'
      >
        <h1>404</h1>
        <h3>We are sorry, we are not able to find out nothing related to this. </h3>
        <img src="http://cdn.meme.am/instances/500x/60359423.jpg"/>
      </FlexView>
    );
  }

  templateList = (list) =>{
    return(
      <div>
      {
        list.map( (el,i) => {
          return(
            <ResultRow key={i} result={el}/>
          );
        })
      }
      </div>
    );
  }

  template({ list, shouldRenderPlaceholder, shouldRenderNoResults, shouldRenderResults}) {
    return (
      <div className="list">
        {shouldRenderPlaceholder && this.templatePlaceholder()}
        {shouldRenderNoResults && this.templateNoResults()}
        {shouldRenderResults && this.templateList(list)}
      </div>
    );
  }
}
