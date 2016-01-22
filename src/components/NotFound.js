import React from 'react';
import { skinnable } from 'revenge';

@skinnable()
export default class NotFound extends React.Component {

  getLocals() {
    return;
  }

  template() {
    return (
      <div>404 NOT FOUND</div>
    );
  }
}