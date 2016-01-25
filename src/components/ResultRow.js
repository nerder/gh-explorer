import React from 'react';
import { props, skinnable, t } from 'revenge';
import { Link } from 'react-router-transition-context';
import { FlexView } from 'buildo-react-components/src/flex';

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
        width='100%'
        height='100%'
        vAlignContent='bottom'
        hAlignContent='center'
      >
        <FlexView
          column
          width='50%'
          height='100%'
          vAlignContent='center'
          hAlignContent='left'
        >
          <h3>{resultObj.name}</h3>
          <p>{resultObj.description}</p>
        </FlexView>
        <FlexView
          width='50%'
          height='100%'
          grow
          vAlignContent='bottom'
          hAlignContent='right'
          maxHeight='100%'
        >
          <Link key={resultObj.id} to="details" params={{detailId: resultObj.id}}><button>Show More</button></Link>
        </FlexView>
      </FlexView>
    );
  }

}
