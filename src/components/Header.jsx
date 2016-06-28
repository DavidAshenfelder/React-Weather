import React, {PropTypes, Component} from 'react';
import GooglePlacesAuto from './GooglePlacesAuto.jsx';

export default class Header extends Component {
  render() {
    return (
      <div className="row main-header">
        <div className="col-md-3 input-group pull-left input-group-header">
          <span className="input-group-addon"><i className="fa fa-search" aria-hidden="true"></i></span>
          <GooglePlacesAuto/>
        </div>
      </div>
    )
  }
};
