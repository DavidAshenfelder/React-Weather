import alt from "../alt.js";
import WeatherActions from '../actions/WeatherActions.js';

class WeatherStore {
  constructor() {
    this.forecast = null;
    this.cities = null;

    this.bindListeners({
      handleUpdateCities: WeatherActions.UPDATE_CITIES
    });
  }

  handleUpdateCities(data){
    this.forecast = data.forecast;
    this.cities = data.cities;
  }
};

export default alt.createStore(WeatherStore, 'WeatherStore');
