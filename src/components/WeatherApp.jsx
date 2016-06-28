import React, { Component, PropTypes } from 'react';
import ForecastWrapper from './ForecastWrapper.jsx';
import Header from './Header.jsx';
import WeatherActions from '../actions/WeatherActions.js';
import WeatherStore from '../stores/WeatherStore.js';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


function buildHTML(state, moveCity) {
  const cities = state.cities;
  const forecast = state.forecast;
  const htmlArr = [];
  if (cities) {
    for (var i = 0; i < cities.length; i++) {
      htmlArr.push(
        <div className="col-md-3 col-sm-6" key={i}>
          <ForecastWrapper city={cities[i]} forecast={forecast[i]} color={cities[i].color} index={i} id={forecast[i].id} moveCity={moveCity}/>
        </div>
      );
    }
  }
  return htmlArr;
}

class WeatherApp extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.moveCity = this.moveCity.bind(this);
  }
  onChange(state) {
    let data = {
      forecast: state.forecast,
      cities: state.cities
    }
    this.htmlArr = buildHTML(data, this.moveCity);
    this.setState(state);
  }

  componentDidMount() {
    WeatherActions.fetchCities();
    WeatherStore.listen(this.onChange);
  }

  moveCity(dragIndex, hoverIndex) {
    const cities = this.state.cities;
    const forecasts = this.state.forecast;
    const dragCard = cities[dragIndex];
    const forecastCard = forecasts[dragIndex];
    this.state.cities.splice(dragIndex, 1);
    this.state.cities.splice(hoverIndex, 0, dragCard);
    this.state.forecast.splice(dragIndex, 1);
    this.state.forecast.splice(hoverIndex, 0, forecastCard);
    WeatherActions.updateCities(this.state);
  }

  render() {
    return (
      <div className="container">
        <Header/>
        <div className="row">
          {this.htmlArr}
        </div>
      </div>
    )
  }
};

export default DragDropContext(HTML5Backend)(WeatherApp);
