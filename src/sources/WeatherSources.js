import { SECRET } from '../../private/config.js';
import HTTP from '../services/httpservice';

  var WeatherSource = {
    cities:[],
    forecasts: [],

    fetchCities: function () {
      let cities = this.cities;
      let promiseArr = [];
      for (var i = 0; i < cities.length; i++) {
        var url = "http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + cities[i].lat + "&lon=" + cities[i].long + "&cnt=6&units=imperial&appid=" + SECRET.weatherApiKey
         promiseArr.push(HTTP.get(url).then(function(forecast) {
           forecast.id = this.assignId();
           this.forecasts.push(forecast);
           return {
             forecast: forecast,
             cities: cities
           };
        }.bind(this)));
      }
      return Promise.all(promiseArr);
    },

    assignId() {
      return (Math.random() * 10) * (Math.random() * 10) * (Math.random() * 10);
    },

    returnForecasts() {
      return new Promise((resolve, reject) => {
        return resolve({forecast: this.forecasts, cities: this.cities});
      });
    },

    fetchSingleForecast(city) {
      var url = "http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + city.lat + "&lon=" + city.long + "&cnt=6&units=imperial&appid=" + SECRET.weatherApiKey

      return HTTP.get(url).then(function(data) {
       data.id = this.assignId();
       this.forecasts.push(data);
       return this.returnForecasts();
      }.bind(this));
    }
  };

export default WeatherSource;
