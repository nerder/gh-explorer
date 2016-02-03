import React from 'react';
import { props, skinnable, t } from 'revenge';
import { Link } from 'react-router-transition-context';
import { FlexView } from 'buildo-react-components/src/flex';
import './result-row.scss';

@skinnable()
@props({
  result: t.Object,
  searchValue: t.String
})
export default class ResultRow extends React.Component {

  getLocals(){
    return this.props;
  }

  template({ result, searchValue }){
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
          <h3><a target="_blank" href={result.html_url}>{result.name}</a></h3>
          <p>{result.description}</p>
        </FlexView>
        <FlexView
          height='100%'
          grow
          vAlignContent='center'
          hAlignContent='right'
          maxHeight='100%'
        >
          <Link key={result.id} to="details" params={{ query: searchValue, detailId: result.id, repo: result.name, owner: result.owner.login }}><button>Show More</button></Link>
        </FlexView>
      </FlexView>
    );
  }

}
