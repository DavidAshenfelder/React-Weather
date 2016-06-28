import alt from '../alt.js';
import WeatherSource from '../sources/WeatherSources';

class WeatherActions {
  fetchCities() {
    return (dispatch) => {
      dispatch();
      WeatherSource.fetchCities().then((data) => {
        this.updateCities({forecast: data.forecast, cities: data.cities});
      })
    }
  }

  updateCities(data) {
    return data;
  }

  fetchSingleForecast(city) {
    return(dispatch) => {
      dispatch(city)
      WeatherSource.fetchSingleForecast(city).then(() => {
        let forecast = WeatherSource.forecasts;
        let cities = WeatherSource.cities;
        this.updateCities({forecast:forecast, cities: cities});
      });
    };
  }

  deleteCity(idx, id) {
    return (dispatch) => {
      dispatch();
      WeatherSource.cities = WeatherSource.cities.filter((city, i) =>{
        if (i !== idx) {
          return city
        }
      });
      WeatherSource.forecasts = WeatherSource.forecasts.filter((forecast, i) => {
        if (forecast.id !== id) {
          return forecast;
        }
      });
      this.updateCities({forecast: WeatherSource.forecasts, cities: WeatherSource.cities});
    };
  }

};
export default alt.createActions(WeatherActions);
