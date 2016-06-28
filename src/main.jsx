import React from 'react';
import reactDOM from 'react-dom';
import WeatherApp from './components/WeatherApp.jsx';
import { SECRET } from '../private/config.js';

function buildScript() {
    let s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://maps.googleapis.com/maps/api/js?key=" + SECRET.googleApiKey + "&libraries=places";
    let head = document.getElementsByTagName("body")[0];
    head.appendChild(s);
};

$('document').ready(function() {
  buildScript();
  // I don't like this, but need it because google async call and document.write loader.
  setTimeout(function () {
    reactDOM.render(<WeatherApp/>, document.getElementById('weather-app'));
  }, 500);
})
