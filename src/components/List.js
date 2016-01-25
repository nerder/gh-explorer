import React from 'react';
import { props, skinnable, t } from 'revenge';
import { Link } from 'react-router-transition-context';

@skinnable()
@props({
  list: t.Array
})
export default class List extends React.Component {

  getLocals() {
    const list = this.props.list;
    return {
      list
    };
  }

  template({ list }) {
    return (
      <div className="list">
      {
        list.map( (el) => {
          return <div key={el}><Link key={el} to="details" params={{detailId: el}}>{el}</Link></div>;
        })
      }
      </div>
    );
  }
}
