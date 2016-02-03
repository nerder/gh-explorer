import React from 'react';
import { props, skinnable, t } from 'revenge';
import { FlexView } from 'buildo-react-components/src/flex';
import { Panel } from 'buildo-react-components/src/Panel';
import NavBar from 'NavBar/NavBar';
import { RouteHandler } from 'react-router-transition-context';
import './app.scss';


@skinnable()
@props({
  transitionToList: t.Function,
  backToMain: t.Function,
  searchedValue: t.maybe(t.String)
})
export default class App extends React.Component {

  getLocals() {
    const {
      onSearchChange,
      onLogoClick,
      props: {
        searchedValue
      }
    } = this;

    return {
      onSearchChange,
      searchedValue: searchedValue || '',
      onLogoClick,
      shouldRenderPlaceholder: !searchedValue,
      title: searchedValue ? `Results for : ${searchedValue}` : 'Welcome'
    };
  }

  onSearchChange = (value) => {
    this.props.transitionToList(value);
  };

  onLogoClick = () => {
    this.props.backToMain();
  };

  templatePlaceholder = () => (
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

  template({ searchedValue, onSearchChange, onLogoClick, shouldRenderPlaceholder, title }) {
    return (
      <FlexView
        className='app'
        column
        width='100%'
        height='100%'
        hAlignContent='center'
      >
        <NavBar onSearchChange={onSearchChange} searchValue={searchedValue} onLogoClick={onLogoClick} />
        <FlexView
          className='results'
          grow
          width='100%'
        >
          <Panel
            type='floating'
            header={{ title }}
          >
            {shouldRenderPlaceholder ? this.templatePlaceholder() : <RouteHandler/>}
          </Panel>
        </FlexView>
      </FlexView>
    );
  }
}
