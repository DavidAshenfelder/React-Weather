import React, {Component} from 'react';
import GooglePlacesSuggest from 'react-google-autocomplete';
import WeatherSource from '../sources/WeatherSources.js';
import WeatherActions from '../actions/WeatherActions';

  const colors = [
    "#ec4444",
    "#79ba8f",
    "#e68e4f",
    "#a6a539",
    "#f27e7e",
    "#817871",
    "#357db5",
    "#9770a7",
    "#ce4571",
    "#3f3f3f"
  ];

  let rotation = 0;

  function getColor() {
    let idx = rotation++;
    if (rotation > 10) {
      rotation = 1;
      idx = 0;
    }
    return colors[idx];
  };

  function addNewCity(place) {
    let newCity = {
      name: place.address_components[0].long_name,
      lat: place.geometry.location.lat(),
      long: place.geometry.location.lng(),
      color: getColor(rotation, colors)
    };
    WeatherSource.cities.push(newCity);
    WeatherActions.fetchSingleForecast(newCity);
  };

  export default class GooglePlacesAuto extends Component {
  render() {
    return (
      <GooglePlacesSuggest  style={{width: '100%', height: '33px'}}
        onPlaceSelected={(place) => {
          addNewCity(place);
        }}/>
    )
  }

};
