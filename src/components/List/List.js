import React from 'react';
import { props, skinnable, t } from 'revenge';
import { FlexView } from 'buildo-react-components/src/flex';
import ResultRow from 'ResultRow/ResultRow';
import LoadingSpinner from 'buildo-react-components/src/loading-spinner';
import './list.scss';

@skinnable()
@props({
  list: t.maybe(t.Array),
  loading: t.Boolean,
  searchValue: t.String,
  errorHandled: t.maybe(t.Object)
})
export default class List extends React.Component {

  getLocals() {
    const {
      list,
      loading,
      searchValue,
      errorHandled
    } = this.props;

    return {
      list,
      loading,
      searchValue,
      errorHandled,
      shouldRenderNoResults: !!list && list.length === 0,
      shouldRenderResults: !!list && list.length > 0,
      shouldRenderErrors: !list && !!errorHandled,
      errorStatus: errorHandled ? errorHandled.status : errorHandled,
      errorMessage: errorHandled ? errorHandled.data.message : errorHandled
    };
  }

  templateNoResults = () => (
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

  templateLoading = () => (
    <FlexView
      vAlignContent='center'
      hAlignContent='center'
      grow
      style={{ position: 'relative', height: '60vh' }}
    >
      <LoadingSpinner color='#03A9F4' />
    </FlexView>
  );

  templateList = ({ list, searchValue }) => (
    <div>
    {
      list.map( (el, i) => {
        return(
          <ResultRow key={i} result={el} searchValue={searchValue}/>
        );
      })
    }
    </div>
  );

  templateError = ({ errorStatus, errorMessage }) => (
    <FlexView
      column
      className="error"
      vAlignContent='top'
      hAlignContent='center'
    >
      <h1>Ops! We got an error {errorStatus}</h1>
      <h3>{errorMessage}</h3>
      <img src='http://i.imgur.com/AeBTzKY.png'/>
    </FlexView>
);

  template({ list, loading, shouldRenderNoResults, shouldRenderResults, shouldRenderErrors, searchValue, errorStatus, errorMessage }) {
    return (
      <div className="list">
        {shouldRenderNoResults && !loading && this.templateNoResults()}
        {loading && this.templateLoading()}
        {shouldRenderResults && !loading && this.templateList({ list, searchValue })}
        {shouldRenderErrors && !loading && this.templateError({ errorStatus, errorMessage })}
      </div>
    );
  }
}
