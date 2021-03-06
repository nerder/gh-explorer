import React from 'react';
import { props, skinnable, t } from 'revenge';
import { linkState } from 'buildo-react-components/src/link-state';
import './search-bar.scss';

@skinnable()
@props({
  value: t.String,
  onChange: t.Function
})
export default class SearchBar extends React.Component {

  constructor(props){
    super(props);
    this.state = { currentValue: this.getStateValue(this.props) };
  }

  getStateValue(props) {
    return props.value;
  }

  componentWillReceiveProps(newProps){
    this.setState({ currentValue: this.getStateValue(newProps) });
  }

  onSearch = () => {
    this.props.onChange(this.state.currentValue);
  };

  getLocals() {
    const onSearch = this.onSearch;
    return {
      onSearch,
      valueLink: linkState(this, 'currentValue')
    };
  }

  template({ onSearch, valueLink }) {
    return (
      <div className="searchBar">
        <input type="text" placeholder="Search your Repository" valueLink={valueLink} required></input>
        <button onClick={onSearch}><i className="fa fa-search"></i></button>
      </div>
    );
  }
}
