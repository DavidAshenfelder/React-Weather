import React, { Component, PropTypes } from 'react';
import { determineIcon } from '../constants/constants.js'

let propTypes = {
  list: PropTypes.array.isRequired
}

function buildHTML(list) {
  let htmlArr = [];
  for (var i = 0; i < list.length; i++) {
    if (i > 0) {
      var day = list[i];
      var icon = determineIcon(day.weather[0].id)
      var date = new Date(day.dt * 1000).toString().slice(0,10);
      var min = Math.floor(day.temp.min);
      var max = Math.floor(day.temp.max);
      var lineItem;

      lineItem = (i % 2) ? "light-line-item" : 'dark-line-item';
      htmlArr.push(
        <div key={i} className={lineItem}>
          <div className="col-md-4 center-text">
            {date}
          </div>
          <div className="col-md-6  center-text">
            <i className={icon}></i> {day.weather[0].description}
          </div>
          <div className="col-md-2  center-text">
            {max}/{min}
          </div>
        </div>
      )
    }
  }
  return htmlArr;
}

export default class FutureDay extends Component {
  render() {
    let { list } = this.props;
    let htmlArr = buildHTML(list)
    return (
      <div className="future-days-wrapper">{htmlArr}</div>
    );
  }
};
