## Synopsis
This is a practice app that I learned react and a little bit of es2015. I tried to keep components as functional and stateless as possible (with the exception of my highest order component.)

## Motivation
I wanted to get familiar with how Alt.js structure worked, and I wanted to incorporate the React Drag and Drop lib into this application since it would be used in the upcoming project.

## Installation
```sh
NOTE: you will need an API Key from Google (with places and maps enabled) and openweathermap.org
```
http://openweathermap.org/api

https://console.developers.google.com

```sh
Clone Repo
```

Run
```sh
npm install
```

create a file with path
```sh
 ~/private/config.js
```

Insert the following snippet into the created config file. (and of course place your api keys where appropriate.)
```sh
export const SECRET = {
  weatherApiKey: "YOUR_WEATHER_API_KEY_HERE",
  googleApiKey: "YOUR_GOOGLE_API_KEY_HERE"
};
```

Run
```sh
node ./node_modules/webpack/bin/webpack
```

Run
```sh
npm start
```

go to
```sh
 http://localhost:8080/
```

## Known Issues/Future Things-To-Do
- Search Bar Does not clear when you select city.
- Tighten up the drag and drop to have more of a dashed outline for drop zone.
- Async call for google maps. If you get console error `TypeError: google is not defined`, you can do the following:
add  
```sh
<script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
```
 directly to the <head> tag in index.html
