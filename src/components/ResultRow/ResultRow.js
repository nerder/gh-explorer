import React from 'react';
import { props, skinnable, t } from 'revenge';
import { Link } from 'react-router-transition-context';
import { FlexView } from 'buildo-react-components/src/flex';
import './result-row.scss';

@skinnable()
@props({
  result: t.Object
})
export default class ResultRow extends React.Component {

  getLocals(){
    const resultObj = this.props.result;
    return {
      resultObj
    };
  }

  template({ resultObj }){
    return(
      <FlexView
        className="result-row"
        width='100%'
        height='100%'
        vAlignContent='center'
        hAlignContent='center'
      >
        <FlexView
          column
          grow
          height='100%'
          vAlignContent='center'
          hAlignContent='left'
        >
          <h3><a target="_blank" href={resultObj.html_url}>{resultObj.name}</a></h3>
          <p>{resultObj.description}</p>
        </FlexView>
        <FlexView
          height='100%'
          grow
          vAlignContent='center'
          hAlignContent='right'
          maxHeight='100%'
        >
          <Link key={resultObj.id} to="details" params={{detailId: resultObj.id}}><button>Show More</button></Link>
        </FlexView>
      </FlexView>
    );
  }

}
