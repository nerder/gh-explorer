import React from 'react';
import { props, skinnable, t } from 'revenge';
import { RouteHandler } from 'react-router-transition-context';
import ScrollView from 'buildo-react-components/src/scroll';
import List from 'List/List';
import './results-panel.scss';
import { getRepos } from 'api.js';

@skinnable()
@props({
  searchValue: t.String
})
export default class ResultsPanel extends React.Component {

  constructor(props){
    super(props);
    this.scrollTo = () => {};
    this.state = { results: undefined, loadingResults: false, needBackToTop: false };
  }

  handleScroll = (event) => {
    const newNeedBackToTop = event.target.scrollTop > 500;
    if (this.state.needBackToTop !==  newNeedBackToTop) {
      this.setState({ needBackToTop: newNeedBackToTop });
    }
  }

  getLocals() {
    const {
      props: {
        searchValue
      },
      state: {
        needBackToTop,
        loadingResults,
        results
      }
    } = this;
    return {
      searchValue,
      results,
      loadingResults,
      needBackToTop,
      scrollDuration: results ? Math.min(1500, results.length * 100) : 1500,
      handleScroll: this.handleScroll
    };
  }

  getRepos(searchValue) {
    this.setState({ loadingResults: true });
    getRepos(searchValue)
      .then(res => {
        this.setState({ results: res, loadingResults: false });
      })
      .catch(::console.error);
  }

  componentDidMount() {
    this.getRepos(this.props.searchValue);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.searchValue !== this.props.searchValue) {
      this.getRepos(newProps.searchValue);
    }
  }

  template({ results, loadingResults, handleScroll, needBackToTop, scrollDuration, searchValue }){
    return (
      <div className="results-panel">
        <ScrollView
          easing='easeInOutQuad'
          scrollX={false}
          scrollPropagation={false}
          style={{ position: 'absolute', width: '100%', maxHeight: '100%' }}
          onScroll={handleScroll}
        >
        {(scrollTo) => {
          this.scrollTo = scrollTo;
          return (
            <List list={results} loading={loadingResults} searchValue={searchValue}/>
          );
        }
        }
        </ScrollView>
        {needBackToTop && (
          <button
            className="back-to-top"
            style={{ position: 'absolute' }}
            onClick={() => this.scrollTo(0, 0, scrollDuration )}
          >
            <i className="fa fa-arrow-up" />
          </button>
        )}
        <RouteHandler />
      </div>
    );
  }

}
