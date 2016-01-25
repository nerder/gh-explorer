import React from 'react';
import { props, skinnable, t } from 'revenge';
import './search-bar.scss';

@skinnable()
@props({
  value: t.String,
  onChange: t.Function
})
export default class SearchBar extends React.Component {

  onSearch = () => {
    const input = React.findDOMNode(this.refs.input);
    this.props.onChange(input.value);
  }

  getLocals() {
    const value = this.props.value;
    return {
      value,
      onSearch: this.onSearch
    };
  }

  template({ value, onSearch }) {
    return (
      <div className="searchBar">
        <input type="text" placeholder="Search your Repository" ref="input" defaultValue={value} required></input>
        <button onClick={onSearch}><img width="20px" src="http://www.jobbafrisk.se/sites/all/themes/jobbafrisk/images/sbicon.png"/></button>
      </div>
    );
  }
}
