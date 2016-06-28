import React, {Component, PropTypes} from 'react';
import { findDOMNode } from 'react-dom';
import WeatherActions from '../actions/WeatherActions';
import WeatherSource from '../sources/WeatherSources';
import { determineIcon } from '../constants/constants.js'
import FutureDay from './FutureDay.jsx';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../constants/constants.js';

const DayWeatherSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragPreview: connect.dragPreview(),
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

function determineWindDirection(deg) {
    deg = Number(deg);
    let comp;

    if (deg >= 349 && deg <= 360 && deg >= 0 && deg <= 11) comp = "N";
    else if (deg >= 12 && deg <= 33) comp = "NNE";
    else if (deg >= 34 && deg <= 56) comp = "NE";
    else if (deg >= 57 && deg <= 79) comp = "ENE";
    else if (deg >= 80 && deg <= 101) comp = "E";
    else if (deg >= 102 && deg <= 124) comp = "ESE";
    else if (deg >= 125 && deg <= 146) comp = "SE";
    else if (deg >= 147 && deg <= 169) comp = "SSE";
    else if (deg >= 170 && deg <= 191) comp = "S";
    else if (deg >= 192 && deg <= 214) comp = "SSW";
    else if (deg >= 215 && deg <= 236) comp = "SW";
    else if (deg >= 237 && deg <= 259) comp = "WSW";
    else if (deg >= 260 && deg <= 281) comp = "W";
    else if (deg >= 282 && deg <= 304) comp = "WNW";
    else if (deg >= 305 && deg <= 326) comp = "NW";
    else if (deg >= 327 && deg <= 348) comp = "NNW";

    return comp;
  };

function determineWindIcon(deg) {
    let windIcon = "wi wi-wind towards-" + deg + "-deg";
    return windIcon;
  };

  const propTypes = {
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    city: PropTypes.object.isRequired,
    color: PropTypes.string.isRequired,
    forecast: PropTypes.object.isRequired
  };

 class DayWeather extends Component {
   deleteCity(index, id) {
     WeatherActions.deleteCity(index, id);
   }

  render() {
    const { isDragging, connectDragSource, connectDragPreview, color, city, id, index, forecast } = this.props;
    let list = forecast.list;
    let mainIcon = determineIcon(list[0].weather[0].id);
    let comp = determineWindDirection(list[0].deg);
    let windIcon = determineWindIcon(list[0].deg);
    let maxTemp = Math.floor(Number(list[0].temp.max));
    let minTemp = Math.floor(Number(list[0].temp.min));
    let date = new Date(forecast.list[0].dt * 1000).toString().slice(0,10);
    let dropContainer = city.isPreview ? "weather-wrapper margin-5  drop-container" : "weather-wrapper margin-5";
    let opacity = city.isPreview ? 0 : 1;
    let style = {background: this.props.city.color};

    return (
    <div>
    {connectDragPreview(
    <div className={dropContainer}>
      <div className="current-wrapper" style={style}>
        <div className="col-md-12">
          {connectDragSource(
            <div className="heightWidth10 pull-left center margin-5" style={{cursor: "move"}}>
            <i className="fa fa-bars margin-left-10" aria-hidden="true"></i>
          </div>
          )}
          <button className="btn btn-xs btn-danger round margin-top-10 pull-right" type="button" onClick={() => this.deleteCity(index, id)}>X</button>
        </div>
        <div className="center-text row">
          <h3 className="no-margin-top padding-top-10">
            {forecast.city.name}, {forecast.city.country}
          </h3>
          <div>
            {date}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 center-text">
            <div className="col-md-12 main-icon center-text">
              <i className={mainIcon}></i>
            </div>
            <div className="center-text margin-minus-20">
              {list[0].weather[0].description}
            </div>
          </div>
          <div className="col-md-6 center-text row maxMinTemp">
            <div className="center-text">
              {maxTemp}/{minTemp} <i className="wi wi-fahrenheit"></i>
            </div>
          </div>
        </div>
        <div className="row center-text margin-top-10">
          <div className=" col-md-6 large-font center-text">
          <i className={windIcon}></i> <span>{comp}</span>
          </div>
          <div className="col-md-6">
            <i className="wi wi-strong-wind  large-font"></i> {list[0].speed} MPH
          </div>
        </div>
      </div>
      <FutureDay list={list}/>
    </div>
  )}
  </div>
);
  }
};

DayWeather.propTypes = propTypes;

export default DragSource(ItemTypes.CITY, DayWeatherSource, collect)(DayWeather);
