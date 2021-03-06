import React from 'react';
import { props, skinnable, t } from 'revenge';
import OriginalNavBar from 'buildo-react-components/src/nav-bar';
import { Link } from 'react-router-transition-context';
import SearchBar from 'SearchBar/SearchBar';
import './nav-bar.scss';

@skinnable()
@props({
  searchValue: t.String,
  onSearchChange: t.Function,
  onLogoClick: t.Function
})
export default class NavBar extends React.Component {

  leftTemplate({ onLogoClick }) {
    return (
      <div onClick={onLogoClick}>
        <Link to="main">
          <img width="60px" src="http://i.imgur.com/b5NX5ni.gif"/>
        </Link>
      </div>
    );
  }

  centerTemplate({ searchValue, onSearchChange }) {
    return (
      <div>
        <SearchBar onChange={onSearchChange} value={searchValue}/>
      </div>
    );
  }

  getLocals(){
    const {
      onLogoClick,
      searchValue,
      onSearchChange
    } = this.props;

    const leftProps = {
      onLogoClick
    };

    const searchBarProps = {
      searchValue,
      onSearchChange
    };

    const navBarProps = {
      content: {
        left: this.leftTemplate(leftProps),
        center: this.centerTemplate(searchBarProps),
        maxWidth: 1000
      },
      className: 'nav-bar',
      background: '#455A64',
      height: 80
    };
    return {
      navBarProps
    };
  }

  template({ navBarProps }) {
    return (
      <OriginalNavBar {...navBarProps} />
    );
  }
}
