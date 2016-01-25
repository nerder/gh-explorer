import React from 'react';
import { props, skinnable, t } from 'revenge';
import { Link } from 'react-router-transition-context';


@skinnable()
@props({
  detail: t.String
})

export default class Detail extends React.Component {

  getLocals() {
    const detail = this.props.detail;
    return {
      detail
    };
  }

  template({ detail }) {
    return (
      <div className="detail">
        I'm the datail number # {detail}
        <div>
          <Link to="main">&lt;= Come Home Lessie</Link>
        </div>
      </div>
    );
  }
}
