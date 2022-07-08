/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/app.js":
/*!****************************!*\
  !*** ./src/scripts/app.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCity": () => (/* binding */ getCity),
/* harmony export */   "removePreviousInformation": () => (/* binding */ removePreviousInformation),
/* harmony export */   "showCelsius": () => (/* binding */ showCelsius),
/* harmony export */   "showDailyForecast": () => (/* binding */ showDailyForecast),
/* harmony export */   "showFahrenheit": () => (/* binding */ showFahrenheit),
/* harmony export */   "showHourlyForecast": () => (/* binding */ showHourlyForecast)
/* harmony export */ });
/* harmony import */ var _svgs_date_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../svgs/date.svg */ "./src/svgs/date.svg");
/* harmony import */ var _svgs_feels_like_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../svgs/feels-like.svg */ "./src/svgs/feels-like.svg");
/* harmony import */ var _svgs_humidity_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../svgs/humidity.svg */ "./src/svgs/humidity.svg");
/* harmony import */ var _svgs_location_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../svgs/location.svg */ "./src/svgs/location.svg");
/* harmony import */ var _svgs_search_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../svgs/search.svg */ "./src/svgs/search.svg");
/* harmony import */ var _svgs_temp_max_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../svgs/temp-max.svg */ "./src/svgs/temp-max.svg");
/* harmony import */ var _svgs_temp_min_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../svgs/temp-min.svg */ "./src/svgs/temp-min.svg");
/* harmony import */ var _svgs_temp_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../svgs/temp.svg */ "./src/svgs/temp.svg");
/* harmony import */ var _svgs_time_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../svgs/time.svg */ "./src/svgs/time.svg");
/* harmony import */ var _svgs_weather_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../svgs/weather.svg */ "./src/svgs/weather.svg");
/* harmony import */ var _svgs_wind_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../svgs/wind.svg */ "./src/svgs/wind.svg");












let retrievedCityName;
let retrievedCityLat;
let retrievedCityLon;

async function getCity() {
  let corsBypass = 'https://cors-everywhere-me.herokuapp.com/';
  let searchedCity = document.getElementById('search-bar-input').value;
  let defaultCity = 'Reykjavík';

  if (searchedCity.length === 0) {
    searchedCity = defaultCity;
  }

  let citySearch = 'q=';
  let api = 'http://api.openweathermap.org/geo/1.0/direct?';
  let amountToRetrieve = '&limit=1';
  let language = '&lang=en';
  let apiKey = '&appid=6c89c21bfc11d403be41f489af3b2eae';
  let searchCity = corsBypass + api + citySearch + searchedCity + amountToRetrieve + language + apiKey;

  try {
    const response = await fetch(searchCity, {
      mode: 'cors'
    });
    const searchData = await response.json();
    retrievedCityName = searchData[0].local_names.en;
    retrievedCityLat = searchData[0].lat;
    retrievedCityLon = searchData[0].lon;
    getTodaysWeather();
    getWeatherForecast();
  } catch (error) {
    console.log(error);
    alert('The server could not find what you were looking for, please try again');
  }
}

async function getTodaysWeather() {
  let corsBypass = 'https://cors-everywhere-me.herokuapp.com/';
  let api = 'https://api.openweathermap.org/data/2.5/weather?';
  let lat = "&lat=".concat(retrievedCityLat);
  let lon = "&lon=".concat(retrievedCityLon);
  let language = '&lang=en';
  let units = '&units=imperial';
  let apiKey = '&appid=6c89c21bfc11d403be41f489af3b2eae';
  let searchWeather = corsBypass + api + lat + lon + apiKey + language + units;

  try {
    const response = await fetch(searchWeather, {
      mode: 'cors'
    });
    const searchData = await response.json(); // variables for information to be appended to the DOM for weather display

    let temp;
    let weatherType = searchData.weather[0].main;
    let description = searchData.weather[0].description;
    let country = searchData.sys.country;
    let feelsLike;
    let humidity = searchData.main.humidity;
    let tempMin;
    let tempMax;
    let wind = searchData.wind.speed; //checks if celsius button is on for conversion

    const celsiusButton = document.querySelector('#celsius-button');

    if (celsiusButton.classList.contains('celsius-on')) {
      temp = fahrenheitToCelsius(searchData.main.temp);
      feelsLike = fahrenheitToCelsius(searchData.main.feels_like);
      tempMin = fahrenheitToCelsius(searchData.main.temp_min);
      tempMax = fahrenheitToCelsius(searchData.main.temp_max);
    } else {
      temp = searchData.main.temp;
      feelsLike = searchData.main.feels_like;
      tempMin = searchData.main.temp_min;
      tempMax = searchData.main.temp_max;
    }

    appendCurrentWeather(temp, weatherType, description, country, feelsLike, humidity, tempMin, tempMax, wind);
  } catch (error) {
    console.log(error);
    alert('The server could not find what you were looking for, please try again');
  }
}

async function getWeatherForecast() {
  let corsBypass = 'https://cors-everywhere-me.herokuapp.com/';
  let api = 'https://api.openweathermap.org/data/2.5/forecast?';
  let lat = "&lat=".concat(retrievedCityLat);
  let lon = "&lon=".concat(retrievedCityLon);
  let language = '&lang=en';
  let units = '&units=imperial';
  let apiKey = '&appid=6c89c21bfc11d403be41f489af3b2eae';
  let searchWeather = corsBypass + api + lat + lon + apiKey + language + units;

  try {
    const response = await fetch(searchWeather, {
      mode: 'cors'
    });
    const searchData = await response.json();
    let forecastList = searchData.list;
    bundleForecastData(forecastList);
  } catch (error) {
    console.log(error);
    alert('The server could not find what you were looking for, please try again');
  }
}

function appendCurrentWeather(temp, weatherType, description, country, feelsLike, humidity, tempMin, tempMax, wind) {
  let today = new Date().toDateString();
  let time = new Date().toLocaleTimeString();
  const locationInformation = document.querySelector('#location-information');
  let cityContainer = document.createElement('div');
  cityContainer.setAttribute('id', 'city-container');
  let citySvg = document.createElement('img');
  citySvg.setAttribute('id', 'city-svg');
  citySvg.src = _svgs_location_svg__WEBPACK_IMPORTED_MODULE_3__;
  let city = document.createElement('p');
  city.setAttribute('id', 'city-name');
  city.textContent = "".concat(retrievedCityName, ", ").concat(country);
  let weatherDescriptionContainer = document.createElement('div');
  weatherDescriptionContainer.setAttribute('id', 'weather-description-container');
  let weatherDescriptionSvg = document.createElement('img');
  weatherDescriptionSvg.setAttribute('id', 'weather-description-svg');
  weatherDescriptionSvg.src = _svgs_weather_svg__WEBPACK_IMPORTED_MODULE_9__;
  let weatherDescription = document.createElement('p');
  weatherDescription.setAttribute('id', 'weather-description');
  weatherDescription.textContent = "".concat(weatherType, ", ").concat(description);
  let weatherTemperatureContainer = document.createElement('div');
  weatherTemperatureContainer.setAttribute('id', 'weather-temperature-container');
  let weatherTemperatureSvg = document.createElement('img');
  weatherTemperatureSvg.setAttribute('id', 'weather-temperature-svg');
  weatherTemperatureSvg.src = _svgs_temp_svg__WEBPACK_IMPORTED_MODULE_7__;
  let weatherTemperature = document.createElement('p');
  weatherTemperature.setAttribute('id', 'weather-temperature');
  let todaysDateContainer = document.createElement('div');
  todaysDateContainer.setAttribute('id', 'todays-date-container');
  let todaysDateSvg = document.createElement('img');
  todaysDateSvg.setAttribute('id', 'todays-date-svg');
  todaysDateSvg.src = _svgs_date_svg__WEBPACK_IMPORTED_MODULE_0__;
  let todaysDate = document.createElement('p');
  todaysDate.setAttribute('id', 'todays-date');
  todaysDate.textContent = "".concat(today);
  let todaysTimeContainer = document.createElement('div');
  todaysTimeContainer.setAttribute('id', 'todays-time-container');
  let todaysTimeSvg = document.createElement('img');
  todaysTimeSvg.setAttribute('id', 'todays-time-svg');
  todaysTimeSvg.src = _svgs_time_svg__WEBPACK_IMPORTED_MODULE_8__;
  let todaysTime = document.createElement('p');
  todaysTime.setAttribute('id', 'todays-time');
  todaysTime.textContent = "Updated: ".concat(time); //checks if celsius button is on for conversion

  const celsiusButton = document.querySelector('#celsius-button');

  if (celsiusButton.classList.contains('celsius-on')) {
    weatherTemperature.textContent = "".concat(temp, " \xB0C");
  } else {
    weatherTemperature.textContent = "".concat(temp, " \xB0F");
  }

  cityContainer.appendChild(citySvg);
  cityContainer.appendChild(city);
  weatherDescriptionContainer.appendChild(weatherDescriptionSvg);
  weatherDescriptionContainer.appendChild(weatherDescription);
  weatherTemperatureContainer.appendChild(weatherTemperatureSvg);
  weatherTemperatureContainer.appendChild(weatherTemperature);
  todaysDateContainer.appendChild(todaysDateSvg);
  todaysDateContainer.appendChild(todaysDate);
  todaysTimeContainer.appendChild(todaysTimeSvg);
  todaysTimeContainer.appendChild(todaysTime);
  locationInformation.appendChild(cityContainer);
  locationInformation.appendChild(weatherDescriptionContainer);
  locationInformation.appendChild(weatherTemperatureContainer);
  locationInformation.appendChild(todaysDateContainer);
  locationInformation.appendChild(todaysTimeContainer);
  const locationExtraInformation = document.querySelector('#location-extra-information');
  let weatherFeelsLikeContainer = document.createElement('div');
  weatherFeelsLikeContainer.setAttribute('id', 'weather-feels-like-container');
  let weatherFeelsLikeSvg = document.createElement('img');
  weatherFeelsLikeSvg.setAttribute('id', 'weather-feels-like-svg');
  weatherFeelsLikeSvg.src = _svgs_feels_like_svg__WEBPACK_IMPORTED_MODULE_1__;
  let weatherFeelsLike = document.createElement('p');
  weatherFeelsLike.setAttribute('id', 'weather-feels-like');
  let weatherHumidityContainer = document.createElement('div');
  weatherHumidityContainer.setAttribute('id', 'weather-humidity-container');
  let weatherHumiditySvg = document.createElement('img');
  weatherHumiditySvg.setAttribute('id', 'weather-humidity-svg');
  weatherHumiditySvg.src = _svgs_humidity_svg__WEBPACK_IMPORTED_MODULE_2__;
  let weatherHumidity = document.createElement('p');
  weatherHumidity.setAttribute('id', 'weather-humidity');
  weatherHumidity.textContent = "Humidity: ".concat(humidity, " %");
  let weatherMinContainer = document.createElement('div');
  weatherMinContainer.setAttribute('id', 'weather-min-container');
  let weatherMinSvg = document.createElement('img');
  weatherMinSvg.setAttribute('id', 'weather-min-svg');
  weatherMinSvg.src = _svgs_temp_min_svg__WEBPACK_IMPORTED_MODULE_6__;
  let weatherMin = document.createElement('p');
  weatherMin.setAttribute('id', 'weather-min');
  let weatherMaxContainer = document.createElement('div');
  weatherMaxContainer.setAttribute('id', 'weather-max-container');
  let weatherMaxSvg = document.createElement('img');
  weatherMaxSvg.setAttribute('id', 'weather-max-svg');
  weatherMaxSvg.src = _svgs_temp_max_svg__WEBPACK_IMPORTED_MODULE_5__;
  let weatherMax = document.createElement('p');
  weatherMax.setAttribute('id', 'weather-max');
  let windSpeedContainer = document.createElement('div');
  windSpeedContainer.setAttribute('id', 'wind-speed-container');
  let windSpeedSvg = document.createElement('img');
  windSpeedSvg.setAttribute('id', 'wind-speed-svg');
  windSpeedSvg.src = _svgs_wind_svg__WEBPACK_IMPORTED_MODULE_10__;
  let windSpeed = document.createElement('p');
  windSpeed.setAttribute('id', 'wind-speed');
  windSpeed.textContent = "Wind Speed: ".concat(wind, " MPH"); // controls for celsius conversion

  if (celsiusButton.classList.contains('celsius-on')) {
    weatherFeelsLike.textContent = "Feels Like: ".concat(feelsLike, " \xB0C");
    weatherMin.textContent = "Low: ".concat(tempMin, " \xB0C");
    weatherMax.textContent = "High: ".concat(tempMax, " \xB0C");
  } else {
    weatherFeelsLike.textContent = "Feels Like: ".concat(feelsLike, " \xB0F");
    weatherMin.textContent = "Low: ".concat(tempMin, " \xB0F");
    weatherMax.textContent = "High: ".concat(tempMax, " \xB0F");
  }

  weatherFeelsLikeContainer.appendChild(weatherFeelsLikeSvg);
  weatherFeelsLikeContainer.appendChild(weatherFeelsLike);
  weatherHumidityContainer.appendChild(weatherHumiditySvg);
  weatherHumidityContainer.appendChild(weatherHumidity);
  weatherMinContainer.appendChild(weatherMinSvg);
  weatherMinContainer.appendChild(weatherMin);
  weatherMaxContainer.appendChild(weatherMaxSvg);
  weatherMaxContainer.appendChild(weatherMax);
  windSpeedContainer.appendChild(windSpeedSvg);
  windSpeedContainer.appendChild(windSpeed);
  locationExtraInformation.appendChild(weatherFeelsLikeContainer);
  locationExtraInformation.appendChild(weatherHumidityContainer);
  locationExtraInformation.appendChild(weatherMinContainer);
  locationExtraInformation.appendChild(weatherMaxContainer);
  locationExtraInformation.appendChild(windSpeedContainer);
}

function convertDate(date) {
  date = new Date(date).toDateString();
  return date;
}

function bundleForecastData(forecastList) {
  const celsiusButton = document.querySelector('#celsius-button'); // Hourly forecast bundle

  let next21Hours = forecastList.slice(0, 7);
  next21Hours.forEach(function (item) {
    let date = convertDate(item.dt_txt.slice(0, 10));
    let time = item.dt_txt.slice(11, 19);
    let temp = item.main.temp;
    let humidity = item.main.humidity;
    let weatherType = item.weather[0].main;
    let weatherDescription = item.weather[0].description;
    let windSpeed = item.wind.speed; //checks if celsius button is on for conversion

    if (celsiusButton.classList.contains('celsius-on')) {
      temp = fahrenheitToCelsius(item.main.temp);
    } else {
      temp = item.main.temp;
    }

    appendHourlyForecast(date, time, temp, humidity, weatherType, weatherDescription, windSpeed);
  }); // Daily forecast bundle

  let dailyForecast = [];
  let nextDay = forecastList.slice(7, 8);
  let secondDay = forecastList.slice(15, 16);
  let thirdDay = forecastList.slice(23, 24);
  let fourthDay = forecastList.slice(31, 32);
  let fifthDay = forecastList.slice(39, 40);
  dailyForecast.push(nextDay, secondDay, thirdDay, fourthDay, fifthDay);
  dailyForecast.forEach(function (item) {
    let date = convertDate(item[0].dt_txt.slice(0, 10));
    let time = item[0].dt_txt.slice(11, 19);
    let temp = item[0].main.temp;
    let humidity = item[0].main.humidity;
    let weatherType = item[0].weather[0].main;
    let weatherDescription = item[0].weather[0].description;
    let windSpeed = item[0].wind.speed; //checks if celsius button is on for conversion

    if (celsiusButton.classList.contains('celsius-on')) {
      temp = fahrenheitToCelsius(item[0].main.temp);
    } else {
      temp = item[0].main.temp;
    }

    appendDailyForecast(date, time, temp, humidity, weatherType, weatherDescription, windSpeed);
  });
}

function appendHourlyForecast(date, time, temp, humidity, weatherType, weatherDescription, windSpeed) {
  const foreCastHourly = document.querySelector('#forecast-hourly');
  let nextHourlyForecast = document.createElement('div');
  nextHourlyForecast.setAttribute('id', 'next-hourly-forecast');
  nextHourlyForecast.classList.add('forecast-hourly-open');
  let nextHourlyForecastDateContainer = document.createElement('div');
  nextHourlyForecastDateContainer.setAttribute('id', 'next-hourly-forecast-date-container');
  nextHourlyForecastDateContainer.classList.add('forecast-hourly-open');
  let nextHourlyForecastDateSvg = document.createElement('img');
  nextHourlyForecastDateSvg.setAttribute('id', 'next-hourly-forecast-date-svg');
  nextHourlyForecastDateSvg.classList.add('forecast-hourly-item-open');
  nextHourlyForecastDateSvg.src = _svgs_date_svg__WEBPACK_IMPORTED_MODULE_0__;
  let nextHourlyForecastDate = document.createElement('p');
  nextHourlyForecastDate.setAttribute('id', 'next-hourly-forecast-date');
  nextHourlyForecastDate.classList.add('forecast-hourly-item-open');
  nextHourlyForecastDate.textContent = "".concat(date);
  let nextHourlyForecastTimeContainer = document.createElement('div');
  nextHourlyForecastTimeContainer.setAttribute('id', 'next-hourly-forecast-time-container');
  nextHourlyForecastTimeContainer.classList.add('forecast-hourly-open');
  let nextHourlyForecastTimeSvg = document.createElement('img');
  nextHourlyForecastTimeSvg.setAttribute('id', 'next-hourly-forecast-time-svg');
  nextHourlyForecastTimeSvg.classList.add('forecast-hourly-item-open');
  nextHourlyForecastTimeSvg.src = _svgs_time_svg__WEBPACK_IMPORTED_MODULE_8__;
  let nextHourlyForecastTime = document.createElement('p');
  nextHourlyForecastTime.setAttribute('id', 'next-hourly-forecast-time');
  nextHourlyForecastTime.classList.add('forecast-hourly-item-open');
  nextHourlyForecastTime.textContent = "".concat(time);
  let nextHourlyForecastTempContainer = document.createElement('div');
  nextHourlyForecastTempContainer.setAttribute('id', 'next-hourly-forecast-temp-container');
  nextHourlyForecastTempContainer.classList.add('forecast-hourly-open');
  let nextHourlyForecastTempSvg = document.createElement('img');
  nextHourlyForecastTempSvg.setAttribute('id', 'next-hourly-forecast-temp-svg');
  nextHourlyForecastTempSvg.classList.add('forecast-hourly-item-open');
  nextHourlyForecastTempSvg.src = _svgs_temp_svg__WEBPACK_IMPORTED_MODULE_7__;
  let nextHourlyForecastTemp = document.createElement('p');
  nextHourlyForecastTemp.setAttribute('id', 'next-hourly-forecast-temp');
  nextHourlyForecastTemp.classList.add('forecast-hourly-item-open');
  let nextHourlyForecastHumidityContainer = document.createElement('div');
  nextHourlyForecastHumidityContainer.setAttribute('id', 'next-hourly-forecast-humidity-container');
  nextHourlyForecastHumidityContainer.classList.add('forecast-hourly-open');
  let nextHourlyForecastHumiditySvg = document.createElement('img');
  nextHourlyForecastHumiditySvg.setAttribute('id', 'next-hourly-forecast-humidity-svg');
  nextHourlyForecastHumiditySvg.classList.add('forecast-hourly-item-open');
  nextHourlyForecastHumiditySvg.src = _svgs_humidity_svg__WEBPACK_IMPORTED_MODULE_2__;
  let nextHourlyForecastHumidity = document.createElement('p');
  nextHourlyForecastHumidity.setAttribute('id', 'next-hourly-forecast-humidity');
  nextHourlyForecastHumidity.classList.add('forecast-hourly-item-open');
  nextHourlyForecastHumidity.textContent = "Humidity: ".concat(humidity, " %");
  let nextHourlyForecastWeatherTypeContainer = document.createElement('div');
  nextHourlyForecastWeatherTypeContainer.setAttribute('id', 'next-hourly-forecast-weather-type-container');
  nextHourlyForecastWeatherTypeContainer.classList.add('forecast-hourly-open');
  let nextHourlyForecastWeatherTypeSvg = document.createElement('img');
  nextHourlyForecastWeatherTypeSvg.setAttribute('id', 'next-hourly-forecast-weather-type-svg');
  nextHourlyForecastWeatherTypeSvg.classList.add('forecast-hourly-item-open');
  nextHourlyForecastWeatherTypeSvg.src = _svgs_weather_svg__WEBPACK_IMPORTED_MODULE_9__;
  let nextHourlyForecastWeatherType = document.createElement('p');
  nextHourlyForecastWeatherType.setAttribute('id', 'next-hourly-forecast-weather-type');
  nextHourlyForecastWeatherType.classList.add('forecast-hourly-item-open');
  nextHourlyForecastWeatherType.textContent = "".concat(weatherType, ", ").concat(weatherDescription);
  let nextHourlyForecastWindContainer = document.createElement('div');
  nextHourlyForecastWindContainer.setAttribute('id', 'next-hourly-forecast-wind-container');
  nextHourlyForecastWindContainer.classList.add('forecast-hourly-open');
  let nextHourlyForecastWindSvg = document.createElement('img');
  nextHourlyForecastWindSvg.setAttribute('id', 'next-hourly-forecast-wind-svg');
  nextHourlyForecastWindSvg.classList.add('forecast-hourly-item-open');
  nextHourlyForecastWindSvg.src = _svgs_wind_svg__WEBPACK_IMPORTED_MODULE_10__;
  let nextHourlyForecastWind = document.createElement('p');
  nextHourlyForecastWind.setAttribute('id', 'next-hourly-forecast-wind');
  nextHourlyForecastWind.classList.add('forecast-hourly-item-open');
  nextHourlyForecastWind.textContent = "Wind Speed: ".concat(windSpeed, " MPH"); //checks if celsius button is on for conversion

  const celsiusButton = document.querySelector('#celsius-button');

  if (celsiusButton.classList.contains('celsius-on')) {
    nextHourlyForecastTemp.textContent = "".concat(temp, " \xB0C");
  } else {
    nextHourlyForecastTemp.textContent = "".concat(temp, " \xB0F");
  }

  nextHourlyForecastDateContainer.appendChild(nextHourlyForecastDateSvg);
  nextHourlyForecastDateContainer.appendChild(nextHourlyForecastDate);
  nextHourlyForecastTimeContainer.appendChild(nextHourlyForecastTimeSvg);
  nextHourlyForecastTimeContainer.appendChild(nextHourlyForecastTime);
  nextHourlyForecastTempContainer.appendChild(nextHourlyForecastTempSvg);
  nextHourlyForecastTempContainer.appendChild(nextHourlyForecastTemp);
  nextHourlyForecastHumidityContainer.appendChild(nextHourlyForecastHumiditySvg);
  nextHourlyForecastHumidityContainer.appendChild(nextHourlyForecastHumidity);
  nextHourlyForecastWeatherTypeContainer.appendChild(nextHourlyForecastWeatherTypeSvg);
  nextHourlyForecastWeatherTypeContainer.appendChild(nextHourlyForecastWeatherType);
  nextHourlyForecastWindContainer.appendChild(nextHourlyForecastWindSvg);
  nextHourlyForecastWindContainer.appendChild(nextHourlyForecastWind);
  nextHourlyForecast.appendChild(nextHourlyForecastDateContainer);
  nextHourlyForecast.appendChild(nextHourlyForecastTimeContainer);
  nextHourlyForecast.appendChild(nextHourlyForecastTempContainer);
  nextHourlyForecast.appendChild(nextHourlyForecastHumidityContainer);
  nextHourlyForecast.appendChild(nextHourlyForecastWeatherTypeContainer);
  nextHourlyForecast.appendChild(nextHourlyForecastWindContainer);
  foreCastHourly.appendChild(nextHourlyForecast);
}

function appendDailyForecast(date, time, temp, humidity, weatherType, weatherDescription, windSpeed) {
  const foreCastDaily = document.querySelector('#forecast-daily');
  let nextDailyForecast = document.createElement('div');
  nextDailyForecast.setAttribute('id', 'next-daily-forecast');
  nextDailyForecast.classList.add('next-daily-forecast-open');
  let nextDailyForecastDateContainer = document.createElement('div');
  nextDailyForecastDateContainer.setAttribute('id', 'next-daily-forecast-date-container');
  nextDailyForecastDateContainer.classList.add('forecast-daily-open');
  let nextDailyForecastDateSvg = document.createElement('img');
  nextDailyForecastDateSvg.setAttribute('id', 'next-daily-forecast-date-svg');
  nextDailyForecastDateSvg.classList.add('forecast-daily-item-open');
  nextDailyForecastDateSvg.src = _svgs_date_svg__WEBPACK_IMPORTED_MODULE_0__;
  let nextDailyForecastDate = document.createElement('p');
  nextDailyForecastDate.setAttribute('id', 'next-daily-forecast-date');
  nextDailyForecastDate.classList.add('forecast-daily-item-open');
  nextDailyForecastDate.textContent = "".concat(date);
  let nextDailyForecastTimeContainer = document.createElement('div');
  nextDailyForecastTimeContainer.setAttribute('id', 'next-daily-forecast-time-container');
  nextDailyForecastTimeContainer.classList.add('forecast-daily-open');
  let nextDailyForecastTimeSvg = document.createElement('img');
  nextDailyForecastTimeSvg.setAttribute('id', 'next-daily-forecast-time-svg');
  nextDailyForecastTimeSvg.classList.add('forecast-daily-item-open');
  nextDailyForecastTimeSvg.src = _svgs_time_svg__WEBPACK_IMPORTED_MODULE_8__;
  let nextDailyForecastTime = document.createElement('p');
  nextDailyForecastTime.setAttribute('id', 'next-daily-forecast-time');
  nextDailyForecastTime.classList.add('forecast-daily-item-open');
  nextDailyForecastTime.textContent = "".concat(time);
  let nextDailyForecastTempContainer = document.createElement('div');
  nextDailyForecastTempContainer.setAttribute('id', 'next-daily-forecast-temp-container');
  nextDailyForecastTempContainer.classList.add('forecast-daily-open');
  let nextDailyForecastTempSvg = document.createElement('img');
  nextDailyForecastTempSvg.setAttribute('id', 'next-daily-forecast-temp-svg');
  nextDailyForecastTempSvg.classList.add('forecast-daily-item-open');
  nextDailyForecastTempSvg.src = _svgs_temp_svg__WEBPACK_IMPORTED_MODULE_7__;
  let nextDailyForecastTemp = document.createElement('p');
  nextDailyForecastTemp.setAttribute('id', 'next-daily-forecast-temp');
  nextDailyForecastTemp.classList.add('forecast-daily-item-open');
  let nextDailyForecastHumidityContainer = document.createElement('div');
  nextDailyForecastHumidityContainer.setAttribute('id', 'next-daily-forecast-humidity-container');
  nextDailyForecastHumidityContainer.classList.add('forecast-daily-open');
  let nextDailyForecastHumiditySvg = document.createElement('img');
  nextDailyForecastHumiditySvg.setAttribute('id', 'next-daily-forecast-humidity-svg');
  nextDailyForecastHumiditySvg.classList.add('forecast-daily-item-open');
  nextDailyForecastHumiditySvg.src = _svgs_humidity_svg__WEBPACK_IMPORTED_MODULE_2__;
  let nextDailyForecastHumidity = document.createElement('p');
  nextDailyForecastHumidity.setAttribute('id', 'next-daily-forecast-humidity');
  nextDailyForecastHumidity.classList.add('forecast-daily-item-open');
  nextDailyForecastHumidity.textContent = "Humidity: ".concat(humidity, " %");
  let nextDailyForecastWeatherTypeContainer = document.createElement('div');
  nextDailyForecastWeatherTypeContainer.setAttribute('id', 'next-daily-forecast-weather-type-container');
  nextDailyForecastWeatherTypeContainer.classList.add('forecast-daily-open');
  let nextDailyForecastWeatherTypeSvg = document.createElement('img');
  nextDailyForecastWeatherTypeSvg.setAttribute('id', 'next-daily-forecast-weather-type-svg');
  nextDailyForecastWeatherTypeSvg.classList.add('forecast-daily-item-open');
  nextDailyForecastWeatherTypeSvg.src = _svgs_weather_svg__WEBPACK_IMPORTED_MODULE_9__;
  let nextDailyForecastWeatherType = document.createElement('p');
  nextDailyForecastWeatherType.setAttribute('id', 'next-daily-forecast-weather-type');
  nextDailyForecastWeatherType.classList.add('forecast-daily-item-open');
  nextDailyForecastWeatherType.textContent = "".concat(weatherType, ", ").concat(weatherDescription);
  let nextDailyForecastWindContainer = document.createElement('div');
  nextDailyForecastWindContainer.setAttribute('id', 'next-daily-forecast-wind-container');
  nextDailyForecastWindContainer.classList.add('forecast-daily-open');
  let nextDailyForecastWindSvg = document.createElement('img');
  nextDailyForecastWindSvg.setAttribute('id', 'next-daily-forecast-wind-svg');
  nextDailyForecastWindSvg.classList.add('forecast-daily-item-open');
  nextDailyForecastWindSvg.src = _svgs_wind_svg__WEBPACK_IMPORTED_MODULE_10__;
  let nextDailyForecastWind = document.createElement('p');
  nextDailyForecastWind.setAttribute('id', 'next-daily-forecast-wind');
  nextDailyForecastWind.classList.add('forecast-daily-item-open');
  nextDailyForecastWind.textContent = "Wind Speed: ".concat(windSpeed, " MPH"); //checks if celsius button is on for conversion

  const celsiusButton = document.querySelector('#celsius-button');

  if (celsiusButton.classList.contains('celsius-on')) {
    nextDailyForecastTemp.textContent = "".concat(temp, " \xB0C");
  } else {
    nextDailyForecastTemp.textContent = "".concat(temp, " \xB0F");
  }

  nextDailyForecastDateContainer.appendChild(nextDailyForecastDateSvg);
  nextDailyForecastDateContainer.appendChild(nextDailyForecastDate);
  nextDailyForecastTimeContainer.appendChild(nextDailyForecastTimeSvg);
  nextDailyForecastTimeContainer.appendChild(nextDailyForecastTime);
  nextDailyForecastTempContainer.appendChild(nextDailyForecastTempSvg);
  nextDailyForecastTempContainer.appendChild(nextDailyForecastTemp);
  nextDailyForecastHumidityContainer.appendChild(nextDailyForecastHumiditySvg);
  nextDailyForecastHumidityContainer.appendChild(nextDailyForecastHumidity);
  nextDailyForecastWeatherTypeContainer.appendChild(nextDailyForecastWeatherTypeSvg);
  nextDailyForecastWeatherTypeContainer.appendChild(nextDailyForecastWeatherType);
  nextDailyForecastWindContainer.appendChild(nextDailyForecastWindSvg);
  nextDailyForecastWindContainer.appendChild(nextDailyForecastWind);
  nextDailyForecast.appendChild(nextDailyForecastDateContainer);
  nextDailyForecast.appendChild(nextDailyForecastTimeContainer);
  nextDailyForecast.appendChild(nextDailyForecastTempContainer);
  nextDailyForecast.appendChild(nextDailyForecastHumidityContainer);
  nextDailyForecast.appendChild(nextDailyForecastWeatherTypeContainer);
  nextDailyForecast.appendChild(nextDailyForecastWindContainer);
  foreCastDaily.appendChild(nextDailyForecast);
}

function showHourlyForecast() {
  const dailyForecastButton = document.querySelector('#daily-forecast-button');
  const hourlyForecastButton = document.querySelector('#hourly-forecast-button');
  const forecastDaily = document.querySelector('#forecast-daily');
  const forecastHourly = document.querySelector('#forecast-hourly');

  if (dailyForecastButton.classList.contains('daily-forecast-button-on')) {
    dailyForecastButton.classList.remove('daily-forecast-button-on');
    dailyForecastButton.classList.add('daily-forecast-button-off');
    hourlyForecastButton.classList.add('hourly-forecast-button-on');
    hourlyForecastButton.classList.remove('hourly-forecast-button-off');
    forecastDaily.classList.remove('forecast-daily-on');
    forecastDaily.classList.add('forecast-daily-off');
    forecastHourly.classList.remove('forecast-hourly-off');
    forecastHourly.classList.add('forecast-hourly-on');
  } else if (hourlyForecastButton.classList.contains('hourly-forecast-button-on')) {
    return;
  } else {
    return;
  }
}

function showDailyForecast() {
  const dailyForecastButton = document.querySelector('#daily-forecast-button');
  const hourlyForecastButton = document.querySelector('#hourly-forecast-button');
  const forecastDaily = document.querySelector('#forecast-daily');
  const forecastHourly = document.querySelector('#forecast-hourly');

  if (dailyForecastButton.classList.contains('daily-forecast-button-on')) {
    return;
  } else if (hourlyForecastButton.classList.contains('hourly-forecast-button-on')) {
    dailyForecastButton.classList.add('daily-forecast-button-on');
    dailyForecastButton.classList.remove('daily-forecast-button-off');
    hourlyForecastButton.classList.remove('hourly-forecast-button-on');
    hourlyForecastButton.classList.add('hourly-forecast-button-off');
    forecastDaily.classList.add('forecast-daily-on');
    forecastDaily.classList.remove('forecast-daily-off');
    forecastHourly.classList.add('forecast-hourly-off');
    forecastHourly.classList.remove('forecast-hourly-on');
  } else {
    return;
  }
}

function removePreviousInformation() {
  const locationInformation = document.querySelector('#location-information');
  const locationExtraInformation = document.querySelector('#location-extra-information');
  const forecastHourly = document.querySelector('#forecast-hourly');
  const forecastDaily = document.querySelector('#forecast-daily');
  removeAllChildNodes(locationInformation);
  removeAllChildNodes(locationExtraInformation);
  removeAllChildNodes(forecastHourly);
  removeAllChildNodes(forecastDaily);
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function showFahrenheit() {
  const fahrenheitButton = document.querySelector('#fahrenheit-button');
  const celsiusButton = document.querySelector('#celsius-button'); // informs user on when to expect to see the celsius/fahrenheit reading change. It only shows it once per session

  let firstAlert = sessionStorage.getItem('first-alert');

  if (firstAlert === 'true') {
    alert('When changing between celsius and fahrenheit, the temperature readings will change on your next search');
    sessionStorage.setItem('first-alert', 'false');
  }

  if (fahrenheitButton.classList.contains('fahrenheit-on')) {
    return;
  } else if (fahrenheitButton.classList.contains('fahrenheit-off')) {
    fahrenheitButton.classList.remove('fahrenheit-off');
    fahrenheitButton.classList.add('fahrenheit-on');
    celsiusButton.classList.remove('celsius-on');
    celsiusButton.classList.add('celsius-off');
  } else {
    return;
  }
}

function showCelsius() {
  const fahrenheitButton = document.querySelector('#fahrenheit-button');
  const celsiusButton = document.querySelector('#celsius-button'); // informs user on when to expect to see the celsius/fahrenheit reading change. It only shows it once per session

  let firstAlert = sessionStorage.getItem('first-alert');

  if (firstAlert === 'true') {
    alert('When changing between celsius and fahrenheit, the temperature readings will change on your next search');
    sessionStorage.setItem('first-alert', 'false');
  }

  if (celsiusButton.classList.contains('celsius-on')) {
    return;
  } else if (celsiusButton.classList.contains('celsius-off')) {
    celsiusButton.classList.remove('celsius-off');
    celsiusButton.classList.add('celsius-on');
    fahrenheitButton.classList.add('fahrenheit-off');
    fahrenheitButton.classList.remove('fahrenheit-on');
  } else {
    return;
  }
}

function fahrenheitToCelsius(number) {
  let total = (number - 32) * 5 / 9;
  let rounded = Math.round(total * 10) / 10;
  number = rounded;
  return number;
}

/***/ }),

/***/ "./src/scripts/sessionStorage.js":
/*!***************************************!*\
  !*** ./src/scripts/sessionStorage.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadMeasurementAlert": () => (/* binding */ loadMeasurementAlert)
/* harmony export */ });


function loadMeasurementAlert() {
  sessionStorage.setItem('first-alert', 'true');
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./imgs/mountain-lake.jpg */ "./src/imgs/mountain-lake.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./svgs/search.svg */ "./src/svgs/search.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Fredoka:wght@300&family=Roboto+Mono:wght@300&display=swap);"]);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  font-family: 'Roboto Mono', monospace, 'Fredoka', sans-serif;\n}\n\n#background {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size: cover;\n  width: 100vw;\n  height: 100vh;\n}\n\n#header {\n  width: 100vw;\n  height: 10vh;\n  display: flex;\n  align-items: center;\n}\n\n#header-left {\n  display: flex;\n  width: 50vw;\n  height: 10vh;\n  align-items: center;\n}\n\n#header-title-first {\n  padding-left: 4%;\n  font-size: 2.5em;\n  font-weight: bolder;\n  color: #f3ac4c;\n}\n\n#header-title-second {\n  font-size: 2.5em;\n  font-weight: bolder;\n  color: #438ccc;\n}\n\n#header-icon {\n  display: flex;\n  width: 4em;\n  height: 4em;\n  padding-left: 4%;\n}\n\n#header-right {\n  display: flex;\n  width: 50vw;\n  justify-content: flex-end;\n  padding-right: 4%;\n  align-items: center;\n}\n\nlabel {\n  position: relative;\n}\n\nlabel:before {\n  content: \"\";\n  position: absolute;\n  left: 10px;\n  top: 0;\n  bottom: 0;\n  width: 1.5em;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") center / contain no-repeat;\n  filter: invert(79%) sepia(72%) saturate(913%) hue-rotate(323deg) brightness(101%) contrast(91%);\n}\n\n#search-bar-input {\n  width: 15vw;\n  height: 5vh;\n  font-size: 1.5em;\n  padding-left: 16%;\n  color: #438ccc;\n}\n\n#app {\n  display: flex;\n  width: 100vw;\n  height: 90vh;\n  flex-flow: column nowrap;\n\n}\n\n#app-top {\n  display: flex;\n  height: 50vh;\n  width: 100vw;\n}\n\n#app-top-left {\n  display: flex;\n  width: 45vw;\n  height: 50vh;\n}\n\n#location-information {\n  display: flex;\n  width: 45vw;\n  height: 40vh;\n  flex-flow: row wrap;\n  align-content: center;\n  justify-content: flex-start;\n  align-items: center;\n  margin-top: 5%;\n  margin-left: 5%;\n}\n\n#city-container, #weather-description-container, #weather-temperature-container, #todays-date-container, #todays-time-container {\n  display: flex;\n  width: 45vw;\n  height: 5vh;\n  align-items: center;\n  background-color: rgb(240, 242, 240, 0.9);\n  margin: 0;\n  width: 40vw;\n  padding: 2%;\n}\n\n#city-svg, #weather-description-svg, #weather-temperature-svg, #todays-date-svg, #todays-time-svg {\n  display: flex;\n  width: 2.5em;\n  height: 2.5em;\n  filter: invert(79%) sepia(72%) saturate(913%) hue-rotate(323deg) brightness(101%) contrast(91%);\n  padding-right: 5%;\n}\n\n#city-name, #weather-temperature, #todays-time, #weather-description, #todays-date {\n  font-size: 2em;\n  font-weight: bolder;\n  color: #f3ac4c;\n}\n\n#app-top-right {\n  display: flex;\n  width: 45vw;\n  height: 50vh;\n}\n\n#location-extra-information {\n  display: flex;\n  width: 45vw;\n  height: 40vh;\n  flex-flow: row wrap;\n  align-content: center;\n  justify-content: flex-start;\n  align-items: center;\n  margin-top: 5%;\n  margin-left: 16.5%;\n}\n\n#weather-feels-like-container, #weather-humidity-container, #weather-min-container, #weather-max-container, #wind-speed-container {\n  display: flex;\n  width: 45vw;\n  height: 5vh;\n  align-items: center;\n  background-color: rgb(240, 242, 240, 0.9);\n  margin: 0;\n  padding: 2%;\n}\n\n#weather-feels-like-svg, #weather-humidity-svg, #weather-min-svg, #weather-max-svg, #wind-speed-svg, #next-daily-forecast-weather-type-svg, #next-hourly-forecast-weather-type-svg {\n  display: flex;\n  width: 2.5em;\n  height: 2.5em;\n  filter: invert(54%) sepia(34%) saturate(861%) hue-rotate(166deg) brightness(88%) contrast(88%);\n  padding-right: 5%;\n}\n\n#weather-feels-like, #weather-humidity, #weather-min, #weather-max, #wind-speed {\n  font-size: 2em;\n  font-weight: bolder;\n  color: #438ccc;\n}\n\n#app-bottom {\n  display:flex;\n  width: 100vw;\n  height: 50vh;\n  flex-flow: column nowrap;\n  align-content: flex-start;\n  justify-content: flex-start;\n  align-items: flex-start;\n}\n\n#information-switcher {\n  display: flex;\n  width: 10vw;\n  height: 3.5vh;\n  flex-flow: row nowrap;\n  align-content: center;\n  justify-content: flex-start;\n  align-items: center;\n  padding-left: 2.75%;\n}\n\n#daily-forecast-button, #hourly-forecast-button, #fahrenheit-button, #celsius-button {\n  width: 8vw;\n  height: 3.5vh;\n  font-size: 1em;\n  font-weight: bolder;\n  border-radius: 10%;\n  margin-left: 3%;\n}\n\n#fahrenheit-button {\n  margin-left: 1vw;\n}\n\n.daily-forecast-button-off {\n  background-color: rgb(240, 242, 240, 0.9);\n  color: #f3ac4c;\n}\n\n.daily-forecast-button-on {\n  background-color: #f3ac4c;\n  border: 1px solid rgb(240, 242, 240, 0.9);\n  color: rgb(240, 242, 240, 0.8);;\n}\n\n.hourly-forecast-button-off {\n  background-color: rgb(240, 242, 240, 0.9);\n  color: #438ccc;\n}\n\n.hourly-forecast-button-on {\n  background-color: #438ccc;\n  color: rgb(240, 242, 240, 0.8);\n  border: 1px solid rgb(240, 242, 240, 0.9);\n}\n\n.celsius-off {\n  background-color: rgb(240, 242, 240, 0.9);\n  color: #438ccc;\n}\n\n.fahrenheit-off {\n  background-color: rgb(240, 242, 240, 0.9);\n  color: #f3ac4c;\n}\n\n.celsius-on {\n  background-color: #438ccc;\n  color: rgb(240, 242, 240, 0.8);\n  border: 1px solid rgb(240, 242, 240, 0.9);\n}\n\n.fahrenheit-on {\n  background-color: #f3ac4c;\n  border: 1px solid rgb(240, 242, 240, 0.9);\n  color: rgb(240, 242, 240, 0.8);;\n}\n\n.forecast-hourly-off {\n  visibility: hidden;\n  display: none;\n  width: 0;\n  height: 0;\n  margin: 0;\n}\n\n.forecast-daily-off {\n  visibility: hidden;\n  display: none;\n  width: 0;\n  height: 0;\n  margin: 0;\n}\n\n.forecast-daily-on {\n  visibility: visible;\n  display: flex;\n  width: 100vw;\n  height: 36.5vh;\n  flex-flow: row nowrap;\n  align-content: center;\n  justify-content: center;\n  align-items: flex-start;\n}\n\n.next-daily-forecast-open {\n  display: flex;\n  flex-flow: column nowrap;\n  align-items: center;\n  width: 18vw;\n  height: 30vh;\n  font-size: 0.8em;\n  background-color: rgb(240, 242, 240, 0.9);\n  margin: 0.5%;\n}\n\n.forecast-daily-open {\n  display: flex;\n  flex-flow: row nowrap;\n  justify-content: flex-start;\n  align-items: center;\n  width: 18vw;\n  height: 5vh;\n}\n\n.forecast-daily-item-open {\n  margin: 0;\n  margin-left: 5%;\n  color: #438ccc;\n  font-weight: bolder;\n}\n\n#next-daily-forecast-date-svg, #next-daily-forecast-time-svg, #next-daily-forecast-temp-svg, #next-daily-forecast-humidity-svg, #next-daily-forecast-weather-type-svg, #next-daily-forecast-wind-svg {\n  filter: invert(79%) sepia(72%) saturate(913%) hue-rotate(323deg) brightness(101%) contrast(91%);\n}\n\n.forecast-hourly-on {\n  visibility: visible;\n  display: flex;\n  width: 100vw;\n  height: 36.5vh;\n  flex-flow: row nowrap;\n  align-content: center;\n  justify-content: center;\n  align-items: flex-start;\n}\n\n#next-hourly-forecast {\n  display: flex;\n  flex-flow: column nowrap;\n  align-items: center;\n  width: 13.5vw;\n  height: 32vh;\n  font-size: 0.85em;\n  background-color: rgb(240, 242, 240, 0.9);\n  margin: 0.25%;\n}\n\n.forecast-hourly-open {\n  display: flex;\n  flex-flow: row nowrap;\n  justify-content: flex-start;\n  align-items: center;\n  width: 12vw;\n  height: 5vh;\n}\n\n.forecast-hourly-item-open {\n  margin: 0;\n  margin-left: 5%;\n  color: #438ccc;\n  font-weight: bolder;\n}\n\n#next-hourly-forecast-date-svg, #next-hourly-forecast-time-svg, #next-hourly-forecast-temp-svg, #next-hourly-forecast-humidity-svg, #next-hourly-forecast-weather-type-svg, #next-hourly-forecast-wind-svg {\n  filter: invert(79%) sepia(72%) saturate(913%) hue-rotate(323deg) brightness(101%) contrast(91%);\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300&family=Roboto+Mono:wght@300&display=swap');\n\nbody {\n  font-family: 'Roboto Mono', monospace, 'Fredoka', sans-serif;\n}\n\n#background {\n  background-image: url('./imgs/mountain-lake.jpg');\n  background-size: cover;\n  width: 100vw;\n  height: 100vh;\n}\n\n#header {\n  width: 100vw;\n  height: 10vh;\n  display: flex;\n  align-items: center;\n}\n\n#header-left {\n  display: flex;\n  width: 50vw;\n  height: 10vh;\n  align-items: center;\n}\n\n#header-title-first {\n  padding-left: 4%;\n  font-size: 2.5em;\n  font-weight: bolder;\n  color: #f3ac4c;\n}\n\n#header-title-second {\n  font-size: 2.5em;\n  font-weight: bolder;\n  color: #438ccc;\n}\n\n#header-icon {\n  display: flex;\n  width: 4em;\n  height: 4em;\n  padding-left: 4%;\n}\n\n#header-right {\n  display: flex;\n  width: 50vw;\n  justify-content: flex-end;\n  padding-right: 4%;\n  align-items: center;\n}\n\nlabel {\n  position: relative;\n}\n\nlabel:before {\n  content: \"\";\n  position: absolute;\n  left: 10px;\n  top: 0;\n  bottom: 0;\n  width: 1.5em;\n  background: url(\"./svgs/search.svg\") center / contain no-repeat;\n  filter: invert(79%) sepia(72%) saturate(913%) hue-rotate(323deg) brightness(101%) contrast(91%);\n}\n\n#search-bar-input {\n  width: 15vw;\n  height: 5vh;\n  font-size: 1.5em;\n  padding-left: 16%;\n  color: #438ccc;\n}\n\n#app {\n  display: flex;\n  width: 100vw;\n  height: 90vh;\n  flex-flow: column nowrap;\n\n}\n\n#app-top {\n  display: flex;\n  height: 50vh;\n  width: 100vw;\n}\n\n#app-top-left {\n  display: flex;\n  width: 45vw;\n  height: 50vh;\n}\n\n#location-information {\n  display: flex;\n  width: 45vw;\n  height: 40vh;\n  flex-flow: row wrap;\n  align-content: center;\n  justify-content: flex-start;\n  align-items: center;\n  margin-top: 5%;\n  margin-left: 5%;\n}\n\n#city-container, #weather-description-container, #weather-temperature-container, #todays-date-container, #todays-time-container {\n  display: flex;\n  width: 45vw;\n  height: 5vh;\n  align-items: center;\n  background-color: rgb(240, 242, 240, 0.9);\n  margin: 0;\n  width: 40vw;\n  padding: 2%;\n}\n\n#city-svg, #weather-description-svg, #weather-temperature-svg, #todays-date-svg, #todays-time-svg {\n  display: flex;\n  width: 2.5em;\n  height: 2.5em;\n  filter: invert(79%) sepia(72%) saturate(913%) hue-rotate(323deg) brightness(101%) contrast(91%);\n  padding-right: 5%;\n}\n\n#city-name, #weather-temperature, #todays-time, #weather-description, #todays-date {\n  font-size: 2em;\n  font-weight: bolder;\n  color: #f3ac4c;\n}\n\n#app-top-right {\n  display: flex;\n  width: 45vw;\n  height: 50vh;\n}\n\n#location-extra-information {\n  display: flex;\n  width: 45vw;\n  height: 40vh;\n  flex-flow: row wrap;\n  align-content: center;\n  justify-content: flex-start;\n  align-items: center;\n  margin-top: 5%;\n  margin-left: 16.5%;\n}\n\n#weather-feels-like-container, #weather-humidity-container, #weather-min-container, #weather-max-container, #wind-speed-container {\n  display: flex;\n  width: 45vw;\n  height: 5vh;\n  align-items: center;\n  background-color: rgb(240, 242, 240, 0.9);\n  margin: 0;\n  padding: 2%;\n}\n\n#weather-feels-like-svg, #weather-humidity-svg, #weather-min-svg, #weather-max-svg, #wind-speed-svg, #next-daily-forecast-weather-type-svg, #next-hourly-forecast-weather-type-svg {\n  display: flex;\n  width: 2.5em;\n  height: 2.5em;\n  filter: invert(54%) sepia(34%) saturate(861%) hue-rotate(166deg) brightness(88%) contrast(88%);\n  padding-right: 5%;\n}\n\n#weather-feels-like, #weather-humidity, #weather-min, #weather-max, #wind-speed {\n  font-size: 2em;\n  font-weight: bolder;\n  color: #438ccc;\n}\n\n#app-bottom {\n  display:flex;\n  width: 100vw;\n  height: 50vh;\n  flex-flow: column nowrap;\n  align-content: flex-start;\n  justify-content: flex-start;\n  align-items: flex-start;\n}\n\n#information-switcher {\n  display: flex;\n  width: 10vw;\n  height: 3.5vh;\n  flex-flow: row nowrap;\n  align-content: center;\n  justify-content: flex-start;\n  align-items: center;\n  padding-left: 2.75%;\n}\n\n#daily-forecast-button, #hourly-forecast-button, #fahrenheit-button, #celsius-button {\n  width: 8vw;\n  height: 3.5vh;\n  font-size: 1em;\n  font-weight: bolder;\n  border-radius: 10%;\n  margin-left: 3%;\n}\n\n#fahrenheit-button {\n  margin-left: 1vw;\n}\n\n.daily-forecast-button-off {\n  background-color: rgb(240, 242, 240, 0.9);\n  color: #f3ac4c;\n}\n\n.daily-forecast-button-on {\n  background-color: #f3ac4c;\n  border: 1px solid rgb(240, 242, 240, 0.9);\n  color: rgb(240, 242, 240, 0.8);;\n}\n\n.hourly-forecast-button-off {\n  background-color: rgb(240, 242, 240, 0.9);\n  color: #438ccc;\n}\n\n.hourly-forecast-button-on {\n  background-color: #438ccc;\n  color: rgb(240, 242, 240, 0.8);\n  border: 1px solid rgb(240, 242, 240, 0.9);\n}\n\n.celsius-off {\n  background-color: rgb(240, 242, 240, 0.9);\n  color: #438ccc;\n}\n\n.fahrenheit-off {\n  background-color: rgb(240, 242, 240, 0.9);\n  color: #f3ac4c;\n}\n\n.celsius-on {\n  background-color: #438ccc;\n  color: rgb(240, 242, 240, 0.8);\n  border: 1px solid rgb(240, 242, 240, 0.9);\n}\n\n.fahrenheit-on {\n  background-color: #f3ac4c;\n  border: 1px solid rgb(240, 242, 240, 0.9);\n  color: rgb(240, 242, 240, 0.8);;\n}\n\n.forecast-hourly-off {\n  visibility: hidden;\n  display: none;\n  width: 0;\n  height: 0;\n  margin: 0;\n}\n\n.forecast-daily-off {\n  visibility: hidden;\n  display: none;\n  width: 0;\n  height: 0;\n  margin: 0;\n}\n\n.forecast-daily-on {\n  visibility: visible;\n  display: flex;\n  width: 100vw;\n  height: 36.5vh;\n  flex-flow: row nowrap;\n  align-content: center;\n  justify-content: center;\n  align-items: flex-start;\n}\n\n.next-daily-forecast-open {\n  display: flex;\n  flex-flow: column nowrap;\n  align-items: center;\n  width: 18vw;\n  height: 30vh;\n  font-size: 0.8em;\n  background-color: rgb(240, 242, 240, 0.9);\n  margin: 0.5%;\n}\n\n.forecast-daily-open {\n  display: flex;\n  flex-flow: row nowrap;\n  justify-content: flex-start;\n  align-items: center;\n  width: 18vw;\n  height: 5vh;\n}\n\n.forecast-daily-item-open {\n  margin: 0;\n  margin-left: 5%;\n  color: #438ccc;\n  font-weight: bolder;\n}\n\n#next-daily-forecast-date-svg, #next-daily-forecast-time-svg, #next-daily-forecast-temp-svg, #next-daily-forecast-humidity-svg, #next-daily-forecast-weather-type-svg, #next-daily-forecast-wind-svg {\n  filter: invert(79%) sepia(72%) saturate(913%) hue-rotate(323deg) brightness(101%) contrast(91%);\n}\n\n.forecast-hourly-on {\n  visibility: visible;\n  display: flex;\n  width: 100vw;\n  height: 36.5vh;\n  flex-flow: row nowrap;\n  align-content: center;\n  justify-content: center;\n  align-items: flex-start;\n}\n\n#next-hourly-forecast {\n  display: flex;\n  flex-flow: column nowrap;\n  align-items: center;\n  width: 13.5vw;\n  height: 32vh;\n  font-size: 0.85em;\n  background-color: rgb(240, 242, 240, 0.9);\n  margin: 0.25%;\n}\n\n.forecast-hourly-open {\n  display: flex;\n  flex-flow: row nowrap;\n  justify-content: flex-start;\n  align-items: center;\n  width: 12vw;\n  height: 5vh;\n}\n\n.forecast-hourly-item-open {\n  margin: 0;\n  margin-left: 5%;\n  color: #438ccc;\n  font-weight: bolder;\n}\n\n#next-hourly-forecast-date-svg, #next-hourly-forecast-time-svg, #next-hourly-forecast-temp-svg, #next-hourly-forecast-humidity-svg, #next-hourly-forecast-weather-type-svg, #next-hourly-forecast-wind-svg {\n  filter: invert(79%) sepia(72%) saturate(913%) hue-rotate(323deg) brightness(101%) contrast(91%);\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/imgs/mountain-lake.jpg":
/*!************************************!*\
  !*** ./src/imgs/mountain-lake.jpg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "55efb9776634d0d95de5.jpg";

/***/ }),

/***/ "./src/svgs/date.svg":
/*!***************************!*\
  !*** ./src/svgs/date.svg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0330c6889cb95fe5ad10.svg";

/***/ }),

/***/ "./src/svgs/feels-like.svg":
/*!*********************************!*\
  !*** ./src/svgs/feels-like.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "99a60685c883de448609.svg";

/***/ }),

/***/ "./src/svgs/humidity.svg":
/*!*******************************!*\
  !*** ./src/svgs/humidity.svg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "800d006a543de33d7e3d.svg";

/***/ }),

/***/ "./src/svgs/location.svg":
/*!*******************************!*\
  !*** ./src/svgs/location.svg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "f2fee57a7f55047a4bdb.svg";

/***/ }),

/***/ "./src/svgs/search.svg":
/*!*****************************!*\
  !*** ./src/svgs/search.svg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "230bea6ac20a05aaa7b1.svg";

/***/ }),

/***/ "./src/svgs/temp-max.svg":
/*!*******************************!*\
  !*** ./src/svgs/temp-max.svg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "e72f3d0c9aceac6fd34e.svg";

/***/ }),

/***/ "./src/svgs/temp-min.svg":
/*!*******************************!*\
  !*** ./src/svgs/temp-min.svg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ec578bd37716e31c100c.svg";

/***/ }),

/***/ "./src/svgs/temp.svg":
/*!***************************!*\
  !*** ./src/svgs/temp.svg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "2bf150cbb30a63043a8c.svg";

/***/ }),

/***/ "./src/svgs/time.svg":
/*!***************************!*\
  !*** ./src/svgs/time.svg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "73ffa0631c8be363df0a.svg";

/***/ }),

/***/ "./src/svgs/weather.svg":
/*!******************************!*\
  !*** ./src/svgs/weather.svg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "6cb8238507668441d7ee.svg";

/***/ }),

/***/ "./src/svgs/wind.svg":
/*!***************************!*\
  !*** ./src/svgs/wind.svg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "d9ca25c3d652e3566b0d.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _scripts_app_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/app.js */ "./src/scripts/app.js");
/* harmony import */ var _scripts_sessionStorage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/sessionStorage.js */ "./src/scripts/sessionStorage.js");




window.onload = function () {
  (0,_scripts_app_js__WEBPACK_IMPORTED_MODULE_1__.getCity)();
  (0,_scripts_sessionStorage_js__WEBPACK_IMPORTED_MODULE_2__.loadMeasurementAlert)();
};

(function attachEventListeners() {
  const hourlyButton = document.querySelector('#hourly-forecast-button');
  hourlyButton.addEventListener('click', _scripts_app_js__WEBPACK_IMPORTED_MODULE_1__.showHourlyForecast);
  const dailyButton = document.querySelector('#daily-forecast-button');
  dailyButton.addEventListener('click', _scripts_app_js__WEBPACK_IMPORTED_MODULE_1__.showDailyForecast);
  const fahrenheitButton = document.querySelector('#fahrenheit-button');
  fahrenheitButton.addEventListener('click', _scripts_app_js__WEBPACK_IMPORTED_MODULE_1__.showFahrenheit);
  const celsiusButton = document.querySelector('#celsius-button');
  celsiusButton.addEventListener('click', _scripts_app_js__WEBPACK_IMPORTED_MODULE_1__.showCelsius);
  const searchInput = document.querySelector('#search-bar-input');
  searchInput.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
      (0,_scripts_app_js__WEBPACK_IMPORTED_MODULE_1__.removePreviousInformation)();
      (0,_scripts_app_js__WEBPACK_IMPORTED_MODULE_1__.getCity)();
    } else {
      return;
    }
  });
})();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGdOQUFnTixvR0FBb0csR0FBRyxPQUFPLGdGQUFnRixZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLE9BQU8sS0FBSyxZQUFZLGFBQWEsV0FBVyxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsVUFBVSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFB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QyxhQUFULENBQXVCLGlCQUF2QixDQUF0QjtFQUNFRCxhQUFhLENBQUN1SSxnQkFBZCxDQUErQixPQUEvQixFQUF3Q2pNLHdEQUF4QztFQUVGLE1BQU1tTSxXQUFXLEdBQUdsTCxRQUFRLENBQUMwQyxhQUFULENBQXVCLG1CQUF2QixDQUFwQjtFQUNFd0ksV0FBVyxDQUFDRixnQkFBWixDQUE2QixVQUE3QixFQUF5QyxVQUFTRyxDQUFULEVBQVk7SUFDbkQsSUFBSUEsQ0FBQyxDQUFDQyxPQUFGLEtBQWMsRUFBbEIsRUFBc0I7TUFDcEJ6TSwwRUFBeUI7TUFDekJELHdEQUFPO0lBQ1IsQ0FIRCxNQUdPO01BQ0w7SUFDRDtFQUNGLENBUEQ7QUFRSCxDQXRCRCxJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc2NyaXB0cy9hcHAuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc2NyaXB0cy9zZXNzaW9uU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQge1xuICBnZXRDaXR5LFxuICByZW1vdmVQcmV2aW91c0luZm9ybWF0aW9uLFxuICBzaG93SG91cmx5Rm9yZWNhc3QsXG4gIHNob3dEYWlseUZvcmVjYXN0LFxuICBzaG93RmFocmVuaGVpdCxcbiAgc2hvd0NlbHNpdXNcbn1cblxuaW1wb3J0IGRhdGVTdmdJbXBvcnQgZnJvbSAnLi4vc3Zncy9kYXRlLnN2Zyc7XG5pbXBvcnQgZmVlbHNMaWtlU3ZnSW1wb3J0IGZyb20gJy4uL3N2Z3MvZmVlbHMtbGlrZS5zdmcnO1xuaW1wb3J0IGh1bWlkaXR5U3ZnSW1wb3J0IGZyb20gJy4uL3N2Z3MvaHVtaWRpdHkuc3ZnJztcbmltcG9ydCBsb2NhdGlvblN2Z0ltcG9ydCBmcm9tICcuLi9zdmdzL2xvY2F0aW9uLnN2Zyc7XG5pbXBvcnQgc2VhcmNoU3ZnSW1wb3J0IGZyb20gJy4uL3N2Z3Mvc2VhcmNoLnN2Zyc7XG5pbXBvcnQgdGVtcE1heFN2Z0ltcG9ydCBmcm9tICcuLi9zdmdzL3RlbXAtbWF4LnN2Zyc7XG5pbXBvcnQgdGVtcE1pblN2Z0ltcG9ydCBmcm9tICcuLi9zdmdzL3RlbXAtbWluLnN2Zyc7XG5pbXBvcnQgdGVtcFN2Z0ltcG9ydCBmcm9tICcuLi9zdmdzL3RlbXAuc3ZnJztcbmltcG9ydCB0aW1lU3ZnSW1wb3J0IGZyb20gJy4uL3N2Z3MvdGltZS5zdmcnO1xuaW1wb3J0IHdlYXRoZXJTdmdJbXBvcnQgZnJvbSAnLi4vc3Zncy93ZWF0aGVyLnN2Zyc7XG5pbXBvcnQgd2luZFN2Z0ltcG9ydCBmcm9tICcuLi9zdmdzL3dpbmQuc3ZnJztcblxubGV0IHJldHJpZXZlZENpdHlOYW1lO1xubGV0IHJldHJpZXZlZENpdHlMYXQ7XG5sZXQgcmV0cmlldmVkQ2l0eUxvbjtcblxuYXN5bmMgZnVuY3Rpb24gZ2V0Q2l0eSgpIHtcbiAgbGV0IGNvcnNCeXBhc3MgPSAnaHR0cHM6Ly9jb3JzLWV2ZXJ5d2hlcmUtbWUuaGVyb2t1YXBwLmNvbS8nO1xuICBsZXQgc2VhcmNoZWRDaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaC1iYXItaW5wdXQnKS52YWx1ZTtcbiAgbGV0IGRlZmF1bHRDaXR5ID0gJ1JleWtqYXbDrWsnO1xuICBpZiAoc2VhcmNoZWRDaXR5Lmxlbmd0aCA9PT0gMCkge1xuICAgIHNlYXJjaGVkQ2l0eSA9IGRlZmF1bHRDaXR5O1xuICB9XG4gIGxldCBjaXR5U2VhcmNoID0gJ3E9JztcbiAgbGV0IGFwaSA9ICdodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9nZW8vMS4wL2RpcmVjdD8nO1xuICBsZXQgYW1vdW50VG9SZXRyaWV2ZSA9ICcmbGltaXQ9MSc7XG4gIGxldCBsYW5ndWFnZSA9ICcmbGFuZz1lbic7XG4gIGxldCBhcGlLZXkgPSAnJmFwcGlkPTZjODljMjFiZmMxMWQ0MDNiZTQxZjQ4OWFmM2IyZWFlJztcbiAgbGV0IHNlYXJjaENpdHkgPSBjb3JzQnlwYXNzICsgYXBpICsgY2l0eVNlYXJjaCArIHNlYXJjaGVkQ2l0eSArIGFtb3VudFRvUmV0cmlldmUgKyBsYW5ndWFnZSArIGFwaUtleTtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2ggKHNlYXJjaENpdHksIHttb2RlOiAnY29ycyd9KTtcbiAgICBjb25zdCBzZWFyY2hEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIHJldHJpZXZlZENpdHlOYW1lID0gc2VhcmNoRGF0YVswXS5sb2NhbF9uYW1lcy5lbjtcbiAgICByZXRyaWV2ZWRDaXR5TGF0ID0gc2VhcmNoRGF0YVswXS5sYXQ7XG4gICAgcmV0cmlldmVkQ2l0eUxvbiA9IHNlYXJjaERhdGFbMF0ubG9uO1xuICAgIGdldFRvZGF5c1dlYXRoZXIoKTtcbiAgICBnZXRXZWF0aGVyRm9yZWNhc3QoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgYWxlcnQoJ1RoZSBzZXJ2ZXIgY291bGQgbm90IGZpbmQgd2hhdCB5b3Ugd2VyZSBsb29raW5nIGZvciwgcGxlYXNlIHRyeSBhZ2FpbicpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFRvZGF5c1dlYXRoZXIoKSB7XG4gIGxldCBjb3JzQnlwYXNzID0gJ2h0dHBzOi8vY29ycy1ldmVyeXdoZXJlLW1lLmhlcm9rdWFwcC5jb20vJztcbiAgbGV0IGFwaSA9ICdodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj8nO1xuICBsZXQgbGF0ID0gYCZsYXQ9JHtyZXRyaWV2ZWRDaXR5TGF0fWA7XG4gIGxldCBsb24gPSBgJmxvbj0ke3JldHJpZXZlZENpdHlMb259YDtcbiAgbGV0IGxhbmd1YWdlID0gJyZsYW5nPWVuJztcbiAgbGV0IHVuaXRzID0gJyZ1bml0cz1pbXBlcmlhbCc7XG4gIGxldCBhcGlLZXkgPSAnJmFwcGlkPTZjODljMjFiZmMxMWQ0MDNiZTQxZjQ4OWFmM2IyZWFlJztcbiAgbGV0IHNlYXJjaFdlYXRoZXIgPSBjb3JzQnlwYXNzICsgYXBpICsgbGF0ICsgbG9uICsgYXBpS2V5ICsgbGFuZ3VhZ2UgKyB1bml0cztcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2ggKHNlYXJjaFdlYXRoZXIsIHttb2RlOiAnY29ycyd9KTtcbiAgICBjb25zdCBzZWFyY2hEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIFxuICAgIC8vIHZhcmlhYmxlcyBmb3IgaW5mb3JtYXRpb24gdG8gYmUgYXBwZW5kZWQgdG8gdGhlIERPTSBmb3Igd2VhdGhlciBkaXNwbGF5XG4gICAgbGV0IHRlbXA7XG4gICAgbGV0IHdlYXRoZXJUeXBlID0gc2VhcmNoRGF0YS53ZWF0aGVyWzBdLm1haW47XG4gICAgbGV0IGRlc2NyaXB0aW9uID0gc2VhcmNoRGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuICAgIGxldCBjb3VudHJ5ID0gc2VhcmNoRGF0YS5zeXMuY291bnRyeTtcbiAgICBsZXQgZmVlbHNMaWtlO1xuICAgIGxldCBodW1pZGl0eSA9IHNlYXJjaERhdGEubWFpbi5odW1pZGl0eTtcbiAgICBsZXQgdGVtcE1pbjtcbiAgICBsZXQgdGVtcE1heDtcbiAgICBsZXQgd2luZCA9IHNlYXJjaERhdGEud2luZC5zcGVlZDtcblxuICAgIC8vY2hlY2tzIGlmIGNlbHNpdXMgYnV0dG9uIGlzIG9uIGZvciBjb252ZXJzaW9uXG4gICAgY29uc3QgY2Vsc2l1c0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjZWxzaXVzLWJ1dHRvbicpO1xuICAgIGlmIChjZWxzaXVzQnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnY2Vsc2l1cy1vbicpKSB7XG4gICAgICB0ZW1wID0gZmFocmVuaGVpdFRvQ2Vsc2l1cyhzZWFyY2hEYXRhLm1haW4udGVtcCk7XG4gICAgICBmZWVsc0xpa2UgPSBmYWhyZW5oZWl0VG9DZWxzaXVzKHNlYXJjaERhdGEubWFpbi5mZWVsc19saWtlKTtcbiAgICAgIHRlbXBNaW4gPSBmYWhyZW5oZWl0VG9DZWxzaXVzKHNlYXJjaERhdGEubWFpbi50ZW1wX21pbik7XG4gICAgICB0ZW1wTWF4ID0gZmFocmVuaGVpdFRvQ2Vsc2l1cyhzZWFyY2hEYXRhLm1haW4udGVtcF9tYXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0ZW1wID0gc2VhcmNoRGF0YS5tYWluLnRlbXA7XG4gICAgICBmZWVsc0xpa2UgPSBzZWFyY2hEYXRhLm1haW4uZmVlbHNfbGlrZTtcbiAgICAgIHRlbXBNaW4gPSBzZWFyY2hEYXRhLm1haW4udGVtcF9taW47XG4gICAgICB0ZW1wTWF4ID0gc2VhcmNoRGF0YS5tYWluLnRlbXBfbWF4O1xuICAgIH1cblxuICAgIGFwcGVuZEN1cnJlbnRXZWF0aGVyKFxuICAgICAgdGVtcCxcbiAgICAgIHdlYXRoZXJUeXBlLFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICBjb3VudHJ5LFxuICAgICAgZmVlbHNMaWtlLFxuICAgICAgaHVtaWRpdHksXG4gICAgICB0ZW1wTWluLFxuICAgICAgdGVtcE1heCxcbiAgICAgIHdpbmRcbiAgICApO1xuXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIGFsZXJ0KCdUaGUgc2VydmVyIGNvdWxkIG5vdCBmaW5kIHdoYXQgeW91IHdlcmUgbG9va2luZyBmb3IsIHBsZWFzZSB0cnkgYWdhaW4nKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyRm9yZWNhc3QoKSB7XG4gIGxldCBjb3JzQnlwYXNzID0gJ2h0dHBzOi8vY29ycy1ldmVyeXdoZXJlLW1lLmhlcm9rdWFwcC5jb20vJztcbiAgbGV0IGFwaSA9ICdodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/JztcbiAgbGV0IGxhdCA9IGAmbGF0PSR7cmV0cmlldmVkQ2l0eUxhdH1gO1xuICBsZXQgbG9uID0gYCZsb249JHtyZXRyaWV2ZWRDaXR5TG9ufWA7XG4gIGxldCBsYW5ndWFnZSA9ICcmbGFuZz1lbic7XG4gIGxldCB1bml0cyA9ICcmdW5pdHM9aW1wZXJpYWwnO1xuICBsZXQgYXBpS2V5ID0gJyZhcHBpZD02Yzg5YzIxYmZjMTFkNDAzYmU0MWY0ODlhZjNiMmVhZSc7XG4gIGxldCBzZWFyY2hXZWF0aGVyID0gY29yc0J5cGFzcyArIGFwaSArIGxhdCArIGxvbiArIGFwaUtleSArIGxhbmd1YWdlICsgdW5pdHM7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoIChzZWFyY2hXZWF0aGVyLCB7bW9kZTogJ2NvcnMnfSk7XG4gICAgY29uc3Qgc2VhcmNoRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBsZXQgZm9yZWNhc3RMaXN0ID0gc2VhcmNoRGF0YS5saXN0O1xuICAgIGJ1bmRsZUZvcmVjYXN0RGF0YShmb3JlY2FzdExpc3QpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICBhbGVydCgnVGhlIHNlcnZlciBjb3VsZCBub3QgZmluZCB3aGF0IHlvdSB3ZXJlIGxvb2tpbmcgZm9yLCBwbGVhc2UgdHJ5IGFnYWluJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwZW5kQ3VycmVudFdlYXRoZXIoXG4gIHRlbXAsXG4gIHdlYXRoZXJUeXBlLFxuICBkZXNjcmlwdGlvbixcbiAgY291bnRyeSxcbiAgZmVlbHNMaWtlLFxuICBodW1pZGl0eSxcbiAgdGVtcE1pbixcbiAgdGVtcE1heCxcbiAgd2luZFxuICApIHtcbiAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpLnRvRGF0ZVN0cmluZygpO1xuICAgIGxldCB0aW1lID0gbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKTtcbiAgICBjb25zdCBsb2NhdGlvbkluZm9ybWF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvY2F0aW9uLWluZm9ybWF0aW9uJyk7XG4gICAgbGV0IGNpdHlDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNpdHlDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdjaXR5LWNvbnRhaW5lcicpO1xuICAgIGxldCBjaXR5U3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICBjaXR5U3ZnLnNldEF0dHJpYnV0ZSgnaWQnLCAnY2l0eS1zdmcnKTtcbiAgICAgIGNpdHlTdmcuc3JjID0gbG9jYXRpb25TdmdJbXBvcnQ7XG4gICAgbGV0IGNpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICBjaXR5LnNldEF0dHJpYnV0ZSgnaWQnLCAnY2l0eS1uYW1lJyk7XG4gICAgICBjaXR5LnRleHRDb250ZW50ID0gYCR7cmV0cmlldmVkQ2l0eU5hbWV9LCAke2NvdW50cnl9YDtcbiAgICBsZXQgd2VhdGhlckRlc2NyaXB0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB3ZWF0aGVyRGVzY3JpcHRpb25Db250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICd3ZWF0aGVyLWRlc2NyaXB0aW9uLWNvbnRhaW5lcicpO1xuICAgIGxldCB3ZWF0aGVyRGVzY3JpcHRpb25TdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIHdlYXRoZXJEZXNjcmlwdGlvblN2Zy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dlYXRoZXItZGVzY3JpcHRpb24tc3ZnJyk7XG4gICAgICB3ZWF0aGVyRGVzY3JpcHRpb25Tdmcuc3JjID0gd2VhdGhlclN2Z0ltcG9ydDtcbiAgICBsZXQgd2VhdGhlckRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgd2VhdGhlckRlc2NyaXB0aW9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnd2VhdGhlci1kZXNjcmlwdGlvbicpO1xuICAgICAgd2VhdGhlckRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYCR7d2VhdGhlclR5cGV9LCAke2Rlc2NyaXB0aW9ufWA7XG4gICAgbGV0IHdlYXRoZXJUZW1wZXJhdHVyZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgd2VhdGhlclRlbXBlcmF0dXJlQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnd2VhdGhlci10ZW1wZXJhdHVyZS1jb250YWluZXInKTtcbiAgICBsZXQgd2VhdGhlclRlbXBlcmF0dXJlU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICB3ZWF0aGVyVGVtcGVyYXR1cmVTdmcuc2V0QXR0cmlidXRlKCdpZCcsICd3ZWF0aGVyLXRlbXBlcmF0dXJlLXN2ZycpO1xuICAgICAgd2VhdGhlclRlbXBlcmF0dXJlU3ZnLnNyYyA9IHRlbXBTdmdJbXBvcnQ7XG4gICAgbGV0IHdlYXRoZXJUZW1wZXJhdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIHdlYXRoZXJUZW1wZXJhdHVyZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dlYXRoZXItdGVtcGVyYXR1cmUnKTtcbiAgICBsZXQgdG9kYXlzRGF0ZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdG9kYXlzRGF0ZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3RvZGF5cy1kYXRlLWNvbnRhaW5lcicpO1xuICAgIGxldCB0b2RheXNEYXRlU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICB0b2RheXNEYXRlU3ZnLnNldEF0dHJpYnV0ZSgnaWQnLCAndG9kYXlzLWRhdGUtc3ZnJyk7XG4gICAgICB0b2RheXNEYXRlU3ZnLnNyYyA9IGRhdGVTdmdJbXBvcnQ7XG4gICAgbGV0IHRvZGF5c0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICB0b2RheXNEYXRlLnNldEF0dHJpYnV0ZSgnaWQnLCAndG9kYXlzLWRhdGUnKTtcbiAgICAgIHRvZGF5c0RhdGUudGV4dENvbnRlbnQgPSBgJHt0b2RheX1gO1xuICAgIGxldCB0b2RheXNUaW1lQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0b2RheXNUaW1lQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAndG9kYXlzLXRpbWUtY29udGFpbmVyJyk7XG4gICAgbGV0IHRvZGF5c1RpbWVTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIHRvZGF5c1RpbWVTdmcuc2V0QXR0cmlidXRlKCdpZCcsICd0b2RheXMtdGltZS1zdmcnKTtcbiAgICAgIHRvZGF5c1RpbWVTdmcuc3JjID0gdGltZVN2Z0ltcG9ydDtcbiAgICBsZXQgdG9kYXlzVGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIHRvZGF5c1RpbWUuc2V0QXR0cmlidXRlKCdpZCcsICd0b2RheXMtdGltZScpO1xuICAgICAgdG9kYXlzVGltZS50ZXh0Q29udGVudCA9IGBVcGRhdGVkOiAke3RpbWV9YDtcblxuICAgIC8vY2hlY2tzIGlmIGNlbHNpdXMgYnV0dG9uIGlzIG9uIGZvciBjb252ZXJzaW9uXG4gICAgY29uc3QgY2Vsc2l1c0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjZWxzaXVzLWJ1dHRvbicpO1xuICAgIGlmIChjZWxzaXVzQnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnY2Vsc2l1cy1vbicpKSB7XG4gICAgICB3ZWF0aGVyVGVtcGVyYXR1cmUudGV4dENvbnRlbnQgPSBgJHt0ZW1wfSDCsENgO1xuICAgIH0gZWxzZSB7XG4gICAgICB3ZWF0aGVyVGVtcGVyYXR1cmUudGV4dENvbnRlbnQgPSBgJHt0ZW1wfSDCsEZgO1xuICAgIH1cblxuICAgIGNpdHlDb250YWluZXIuYXBwZW5kQ2hpbGQoY2l0eVN2Zyk7XG4gICAgY2l0eUNvbnRhaW5lci5hcHBlbmRDaGlsZChjaXR5KTtcbiAgICB3ZWF0aGVyRGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQod2VhdGhlckRlc2NyaXB0aW9uU3ZnKTtcbiAgICB3ZWF0aGVyRGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQod2VhdGhlckRlc2NyaXB0aW9uKTtcbiAgICB3ZWF0aGVyVGVtcGVyYXR1cmVDb250YWluZXIuYXBwZW5kQ2hpbGQod2VhdGhlclRlbXBlcmF0dXJlU3ZnKTtcbiAgICB3ZWF0aGVyVGVtcGVyYXR1cmVDb250YWluZXIuYXBwZW5kQ2hpbGQod2VhdGhlclRlbXBlcmF0dXJlKTtcbiAgICB0b2RheXNEYXRlQ29udGFpbmVyLmFwcGVuZENoaWxkKHRvZGF5c0RhdGVTdmcpO1xuICAgIHRvZGF5c0RhdGVDb250YWluZXIuYXBwZW5kQ2hpbGQodG9kYXlzRGF0ZSk7XG4gICAgdG9kYXlzVGltZUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RheXNUaW1lU3ZnKTtcbiAgICB0b2RheXNUaW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKHRvZGF5c1RpbWUpO1xuICAgIGxvY2F0aW9uSW5mb3JtYXRpb24uYXBwZW5kQ2hpbGQoY2l0eUNvbnRhaW5lcik7XG4gICAgbG9jYXRpb25JbmZvcm1hdGlvbi5hcHBlbmRDaGlsZCh3ZWF0aGVyRGVzY3JpcHRpb25Db250YWluZXIpO1xuICAgIGxvY2F0aW9uSW5mb3JtYXRpb24uYXBwZW5kQ2hpbGQod2VhdGhlclRlbXBlcmF0dXJlQ29udGFpbmVyKTtcbiAgICBsb2NhdGlvbkluZm9ybWF0aW9uLmFwcGVuZENoaWxkKHRvZGF5c0RhdGVDb250YWluZXIpO1xuICAgIGxvY2F0aW9uSW5mb3JtYXRpb24uYXBwZW5kQ2hpbGQodG9kYXlzVGltZUNvbnRhaW5lcik7XG5cbiAgICBjb25zdCBsb2NhdGlvbkV4dHJhSW5mb3JtYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9jYXRpb24tZXh0cmEtaW5mb3JtYXRpb24nKTtcbiAgICBsZXQgd2VhdGhlckZlZWxzTGlrZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgd2VhdGhlckZlZWxzTGlrZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dlYXRoZXItZmVlbHMtbGlrZS1jb250YWluZXInKTtcbiAgICBsZXQgd2VhdGhlckZlZWxzTGlrZVN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgd2VhdGhlckZlZWxzTGlrZVN2Zy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dlYXRoZXItZmVlbHMtbGlrZS1zdmcnKTtcbiAgICAgIHdlYXRoZXJGZWVsc0xpa2VTdmcuc3JjID0gZmVlbHNMaWtlU3ZnSW1wb3J0O1xuICAgIGxldCB3ZWF0aGVyRmVlbHNMaWtlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgd2VhdGhlckZlZWxzTGlrZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dlYXRoZXItZmVlbHMtbGlrZScpO1xuICAgIGxldCB3ZWF0aGVySHVtaWRpdHlDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHdlYXRoZXJIdW1pZGl0eUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dlYXRoZXItaHVtaWRpdHktY29udGFpbmVyJyk7XG4gICAgbGV0IHdlYXRoZXJIdW1pZGl0eVN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgd2VhdGhlckh1bWlkaXR5U3ZnLnNldEF0dHJpYnV0ZSgnaWQnLCAnd2VhdGhlci1odW1pZGl0eS1zdmcnKTtcbiAgICAgIHdlYXRoZXJIdW1pZGl0eVN2Zy5zcmMgPSBodW1pZGl0eVN2Z0ltcG9ydDtcbiAgICBsZXQgd2VhdGhlckh1bWlkaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgd2VhdGhlckh1bWlkaXR5LnNldEF0dHJpYnV0ZSgnaWQnLCAnd2VhdGhlci1odW1pZGl0eScpO1xuICAgICAgd2VhdGhlckh1bWlkaXR5LnRleHRDb250ZW50ID0gYEh1bWlkaXR5OiAke2h1bWlkaXR5fSAlYDtcbiAgICBsZXQgd2VhdGhlck1pbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgd2VhdGhlck1pbkNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dlYXRoZXItbWluLWNvbnRhaW5lcicpO1xuICAgIGxldCB3ZWF0aGVyTWluU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICB3ZWF0aGVyTWluU3ZnLnNldEF0dHJpYnV0ZSgnaWQnLCAnd2VhdGhlci1taW4tc3ZnJyk7XG4gICAgICB3ZWF0aGVyTWluU3ZnLnNyYyA9IHRlbXBNaW5TdmdJbXBvcnQ7XG4gICAgbGV0IHdlYXRoZXJNaW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICB3ZWF0aGVyTWluLnNldEF0dHJpYnV0ZSgnaWQnLCAnd2VhdGhlci1taW4nKTtcbiAgICBsZXQgd2VhdGhlck1heENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgd2VhdGhlck1heENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dlYXRoZXItbWF4LWNvbnRhaW5lcicpO1xuICAgIGxldCB3ZWF0aGVyTWF4U3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICB3ZWF0aGVyTWF4U3ZnLnNldEF0dHJpYnV0ZSgnaWQnLCAnd2VhdGhlci1tYXgtc3ZnJyk7XG4gICAgICB3ZWF0aGVyTWF4U3ZnLnNyYyA9IHRlbXBNYXhTdmdJbXBvcnQ7XG4gICAgbGV0IHdlYXRoZXJNYXggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICB3ZWF0aGVyTWF4LnNldEF0dHJpYnV0ZSgnaWQnLCAnd2VhdGhlci1tYXgnKTtcbiAgICBsZXQgd2luZFNwZWVkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB3aW5kU3BlZWRDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICd3aW5kLXNwZWVkLWNvbnRhaW5lcicpO1xuICAgIGxldCB3aW5kU3BlZWRTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIHdpbmRTcGVlZFN2Zy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dpbmQtc3BlZWQtc3ZnJyk7XG4gICAgICB3aW5kU3BlZWRTdmcuc3JjID0gd2luZFN2Z0ltcG9ydDtcbiAgICBsZXQgd2luZFNwZWVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgd2luZFNwZWVkLnNldEF0dHJpYnV0ZSgnaWQnLCAnd2luZC1zcGVlZCcpO1xuICAgICAgd2luZFNwZWVkLnRleHRDb250ZW50ID0gYFdpbmQgU3BlZWQ6ICR7d2luZH0gTVBIYDtcblxuICAgIC8vIGNvbnRyb2xzIGZvciBjZWxzaXVzIGNvbnZlcnNpb25cbiAgICBpZiAoY2Vsc2l1c0J1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2NlbHNpdXMtb24nKSkge1xuICAgICAgd2VhdGhlckZlZWxzTGlrZS50ZXh0Q29udGVudCA9IGBGZWVscyBMaWtlOiAke2ZlZWxzTGlrZX0gwrBDYDtcbiAgICAgIHdlYXRoZXJNaW4udGV4dENvbnRlbnQgPSBgTG93OiAke3RlbXBNaW59IMKwQ2A7XG4gICAgICB3ZWF0aGVyTWF4LnRleHRDb250ZW50ID0gYEhpZ2g6ICR7dGVtcE1heH0gwrBDYDtcbiAgICB9IGVsc2Uge1xuICAgICAgd2VhdGhlckZlZWxzTGlrZS50ZXh0Q29udGVudCA9IGBGZWVscyBMaWtlOiAke2ZlZWxzTGlrZX0gwrBGYDtcbiAgICAgIHdlYXRoZXJNaW4udGV4dENvbnRlbnQgPSBgTG93OiAke3RlbXBNaW59IMKwRmA7XG4gICAgICB3ZWF0aGVyTWF4LnRleHRDb250ZW50ID0gYEhpZ2g6ICR7dGVtcE1heH0gwrBGYDtcbiAgICB9XG5cbiAgICB3ZWF0aGVyRmVlbHNMaWtlQ29udGFpbmVyLmFwcGVuZENoaWxkKHdlYXRoZXJGZWVsc0xpa2VTdmcpO1xuICAgIHdlYXRoZXJGZWVsc0xpa2VDb250YWluZXIuYXBwZW5kQ2hpbGQod2VhdGhlckZlZWxzTGlrZSk7XG4gICAgd2VhdGhlckh1bWlkaXR5Q29udGFpbmVyLmFwcGVuZENoaWxkKHdlYXRoZXJIdW1pZGl0eVN2Zyk7XG4gICAgd2VhdGhlckh1bWlkaXR5Q29udGFpbmVyLmFwcGVuZENoaWxkKHdlYXRoZXJIdW1pZGl0eSk7XG4gICAgd2VhdGhlck1pbkNvbnRhaW5lci5hcHBlbmRDaGlsZCh3ZWF0aGVyTWluU3ZnKTtcbiAgICB3ZWF0aGVyTWluQ29udGFpbmVyLmFwcGVuZENoaWxkKHdlYXRoZXJNaW4pO1xuICAgIHdlYXRoZXJNYXhDb250YWluZXIuYXBwZW5kQ2hpbGQod2VhdGhlck1heFN2Zyk7XG4gICAgd2VhdGhlck1heENvbnRhaW5lci5hcHBlbmRDaGlsZCh3ZWF0aGVyTWF4KTtcbiAgICB3aW5kU3BlZWRDb250YWluZXIuYXBwZW5kQ2hpbGQod2luZFNwZWVkU3ZnKTtcbiAgICB3aW5kU3BlZWRDb250YWluZXIuYXBwZW5kQ2hpbGQod2luZFNwZWVkKTtcblxuICAgIGxvY2F0aW9uRXh0cmFJbmZvcm1hdGlvbi5hcHBlbmRDaGlsZCh3ZWF0aGVyRmVlbHNMaWtlQ29udGFpbmVyKTtcbiAgICBsb2NhdGlvbkV4dHJhSW5mb3JtYXRpb24uYXBwZW5kQ2hpbGQod2VhdGhlckh1bWlkaXR5Q29udGFpbmVyKTtcbiAgICBsb2NhdGlvbkV4dHJhSW5mb3JtYXRpb24uYXBwZW5kQ2hpbGQod2VhdGhlck1pbkNvbnRhaW5lcik7XG4gICAgbG9jYXRpb25FeHRyYUluZm9ybWF0aW9uLmFwcGVuZENoaWxkKHdlYXRoZXJNYXhDb250YWluZXIpO1xuICAgIGxvY2F0aW9uRXh0cmFJbmZvcm1hdGlvbi5hcHBlbmRDaGlsZCh3aW5kU3BlZWRDb250YWluZXIpOyAgIFxufVxuXG5mdW5jdGlvbiBjb252ZXJ0RGF0ZShkYXRlKSB7XG4gIGRhdGUgPSBuZXcgRGF0ZShkYXRlKS50b0RhdGVTdHJpbmcoKTtcbiAgcmV0dXJuIGRhdGU7XG59XG5cbmZ1bmN0aW9uIGJ1bmRsZUZvcmVjYXN0RGF0YShmb3JlY2FzdExpc3QpIHtcbiAgY29uc3QgY2Vsc2l1c0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjZWxzaXVzLWJ1dHRvbicpO1xuXG4gIC8vIEhvdXJseSBmb3JlY2FzdCBidW5kbGVcbiAgbGV0IG5leHQyMUhvdXJzID0gZm9yZWNhc3RMaXN0LnNsaWNlKDAsIDcpO1xuICBuZXh0MjFIb3Vycy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIGxldCBkYXRlID0gY29udmVydERhdGUoaXRlbS5kdF90eHQuc2xpY2UoMCwgMTApKTtcbiAgICBsZXQgdGltZSA9IGl0ZW0uZHRfdHh0LnNsaWNlKDExLCAxOSk7XG4gICAgbGV0IHRlbXAgPSBpdGVtLm1haW4udGVtcDtcbiAgICBsZXQgaHVtaWRpdHkgPSBpdGVtLm1haW4uaHVtaWRpdHk7XG4gICAgbGV0IHdlYXRoZXJUeXBlID0gaXRlbS53ZWF0aGVyWzBdLm1haW47XG4gICAgbGV0IHdlYXRoZXJEZXNjcmlwdGlvbiA9IGl0ZW0ud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcbiAgICBsZXQgd2luZFNwZWVkID0gaXRlbS53aW5kLnNwZWVkO1xuXG4gICAgLy9jaGVja3MgaWYgY2Vsc2l1cyBidXR0b24gaXMgb24gZm9yIGNvbnZlcnNpb25cbiAgICBpZiAoY2Vsc2l1c0J1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2NlbHNpdXMtb24nKSkge1xuICAgICAgdGVtcCA9IGZhaHJlbmhlaXRUb0NlbHNpdXMoaXRlbS5tYWluLnRlbXApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0ZW1wID0gaXRlbS5tYWluLnRlbXA7XG4gICAgfVxuXG4gICAgYXBwZW5kSG91cmx5Rm9yZWNhc3QoXG4gICAgICBkYXRlLFxuICAgICAgdGltZSxcbiAgICAgIHRlbXAsXG4gICAgICBodW1pZGl0eSxcbiAgICAgIHdlYXRoZXJUeXBlLFxuICAgICAgd2VhdGhlckRlc2NyaXB0aW9uLFxuICAgICAgd2luZFNwZWVkXG4gICAgICApO1xuICB9KVxuICBcbiAgLy8gRGFpbHkgZm9yZWNhc3QgYnVuZGxlXG4gIGxldCBkYWlseUZvcmVjYXN0ID0gW107XG4gIGxldCBuZXh0RGF5ID0gZm9yZWNhc3RMaXN0LnNsaWNlKDcsIDgpO1xuICBsZXQgc2Vjb25kRGF5ID0gZm9yZWNhc3RMaXN0LnNsaWNlKDE1LCAxNilcbiAgbGV0IHRoaXJkRGF5ID0gZm9yZWNhc3RMaXN0LnNsaWNlKDIzLCAyNCk7XG4gIGxldCBmb3VydGhEYXkgPSBmb3JlY2FzdExpc3Quc2xpY2UoMzEsIDMyKTtcbiAgbGV0IGZpZnRoRGF5ID0gZm9yZWNhc3RMaXN0LnNsaWNlKDM5LCA0MCk7XG4gIGRhaWx5Rm9yZWNhc3QucHVzaChuZXh0RGF5LCBzZWNvbmREYXksIHRoaXJkRGF5LCBmb3VydGhEYXksIGZpZnRoRGF5KTtcbiAgZGFpbHlGb3JlY2FzdC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIGxldCBkYXRlID0gY29udmVydERhdGUoaXRlbVswXS5kdF90eHQuc2xpY2UoMCwgMTApKTtcbiAgICBsZXQgdGltZSA9IGl0ZW1bMF0uZHRfdHh0LnNsaWNlKDExLCAxOSk7XG4gICAgbGV0IHRlbXAgPSBpdGVtWzBdLm1haW4udGVtcDtcbiAgICBsZXQgaHVtaWRpdHkgPSBpdGVtWzBdLm1haW4uaHVtaWRpdHk7XG4gICAgbGV0IHdlYXRoZXJUeXBlID0gaXRlbVswXS53ZWF0aGVyWzBdLm1haW47XG4gICAgbGV0IHdlYXRoZXJEZXNjcmlwdGlvbiA9IGl0ZW1bMF0ud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcbiAgICBsZXQgd2luZFNwZWVkID0gaXRlbVswXS53aW5kLnNwZWVkO1xuXG4gICAgLy9jaGVja3MgaWYgY2Vsc2l1cyBidXR0b24gaXMgb24gZm9yIGNvbnZlcnNpb25cbiAgICBpZiAoY2Vsc2l1c0J1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2NlbHNpdXMtb24nKSkge1xuICAgICAgdGVtcCA9IGZhaHJlbmhlaXRUb0NlbHNpdXMoaXRlbVswXS5tYWluLnRlbXApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0ZW1wID0gaXRlbVswXS5tYWluLnRlbXA7XG4gICAgfVxuXG4gICAgYXBwZW5kRGFpbHlGb3JlY2FzdChcbiAgICAgIGRhdGUsXG4gICAgICB0aW1lLFxuICAgICAgdGVtcCxcbiAgICAgIGh1bWlkaXR5LFxuICAgICAgd2VhdGhlclR5cGUsXG4gICAgICB3ZWF0aGVyRGVzY3JpcHRpb24sXG4gICAgICB3aW5kU3BlZWRcbiAgICApXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGFwcGVuZEhvdXJseUZvcmVjYXN0KFxuICBkYXRlLFxuICB0aW1lLFxuICB0ZW1wLFxuICBodW1pZGl0eSxcbiAgd2VhdGhlclR5cGUsXG4gIHdlYXRoZXJEZXNjcmlwdGlvbixcbiAgd2luZFNwZWVkXG4gICkge1xuICBjb25zdCBmb3JlQ2FzdEhvdXJseSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JlY2FzdC1ob3VybHknKTtcbiAgbGV0IG5leHRIb3VybHlGb3JlY2FzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtaG91cmx5LWZvcmVjYXN0Jyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0LmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWhvdXJseS1vcGVuJyk7XG4gIGxldCBuZXh0SG91cmx5Rm9yZWNhc3REYXRlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0RGF0ZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtaG91cmx5LWZvcmVjYXN0LWRhdGUtY29udGFpbmVyJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0RGF0ZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1ob3VybHktb3BlbicpO1xuICBsZXQgbmV4dEhvdXJseUZvcmVjYXN0RGF0ZVN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdERhdGVTdmcuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWhvdXJseS1mb3JlY2FzdC1kYXRlLXN2ZycpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdERhdGVTdmcuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtaG91cmx5LWl0ZW0tb3BlbicpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdERhdGVTdmcuc3JjID0gZGF0ZVN2Z0ltcG9ydDtcbiAgbGV0IG5leHRIb3VybHlGb3JlY2FzdERhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0RGF0ZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtaG91cmx5LWZvcmVjYXN0LWRhdGUnKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3REYXRlLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWhvdXJseS1pdGVtLW9wZW4nKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3REYXRlLnRleHRDb250ZW50ID0gYCR7ZGF0ZX1gO1xuICBsZXQgbmV4dEhvdXJseUZvcmVjYXN0VGltZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFRpbWVDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWhvdXJseS1mb3JlY2FzdC10aW1lLWNvbnRhaW5lcicpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFRpbWVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtaG91cmx5LW9wZW4nKTtcbiAgbGV0IG5leHRIb3VybHlGb3JlY2FzdFRpbWVTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RUaW1lU3ZnLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1ob3VybHktZm9yZWNhc3QtdGltZS1zdmcnKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RUaW1lU3ZnLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWhvdXJseS1pdGVtLW9wZW4nKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RUaW1lU3ZnLnNyYyA9IHRpbWVTdmdJbXBvcnQ7XG4gIGxldCBuZXh0SG91cmx5Rm9yZWNhc3RUaW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFRpbWUuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWhvdXJseS1mb3JlY2FzdC10aW1lJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0VGltZS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1ob3VybHktaXRlbS1vcGVuJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0VGltZS50ZXh0Q29udGVudCA9IGAke3RpbWV9YDtcbiAgbGV0IG5leHRIb3VybHlGb3JlY2FzdFRlbXBDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RUZW1wQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1ob3VybHktZm9yZWNhc3QtdGVtcC1jb250YWluZXInKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RUZW1wQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWhvdXJseS1vcGVuJyk7XG4gIGxldCBuZXh0SG91cmx5Rm9yZWNhc3RUZW1wU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0VGVtcFN2Zy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtaG91cmx5LWZvcmVjYXN0LXRlbXAtc3ZnJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0VGVtcFN2Zy5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1ob3VybHktaXRlbS1vcGVuJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0VGVtcFN2Zy5zcmMgPSB0ZW1wU3ZnSW1wb3J0O1xuICBsZXQgbmV4dEhvdXJseUZvcmVjYXN0VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RUZW1wLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1ob3VybHktZm9yZWNhc3QtdGVtcCcpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFRlbXAuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtaG91cmx5LWl0ZW0tb3BlbicpO1xuICBsZXQgbmV4dEhvdXJseUZvcmVjYXN0SHVtaWRpdHlDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RIdW1pZGl0eUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtaG91cmx5LWZvcmVjYXN0LWh1bWlkaXR5LWNvbnRhaW5lcicpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdEh1bWlkaXR5Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWhvdXJseS1vcGVuJyk7XG4gIGxldCBuZXh0SG91cmx5Rm9yZWNhc3RIdW1pZGl0eVN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdEh1bWlkaXR5U3ZnLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1ob3VybHktZm9yZWNhc3QtaHVtaWRpdHktc3ZnJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0SHVtaWRpdHlTdmcuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtaG91cmx5LWl0ZW0tb3BlbicpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdEh1bWlkaXR5U3ZnLnNyYyA9IGh1bWlkaXR5U3ZnSW1wb3J0O1xuICBsZXQgbmV4dEhvdXJseUZvcmVjYXN0SHVtaWRpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0SHVtaWRpdHkuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWhvdXJseS1mb3JlY2FzdC1odW1pZGl0eScpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdEh1bWlkaXR5LmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWhvdXJseS1pdGVtLW9wZW4nKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RIdW1pZGl0eS50ZXh0Q29udGVudCA9IGBIdW1pZGl0eTogJHtodW1pZGl0eX0gJWA7XG4gIGxldCBuZXh0SG91cmx5Rm9yZWNhc3RXZWF0aGVyVHlwZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFdlYXRoZXJUeXBlQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1ob3VybHktZm9yZWNhc3Qtd2VhdGhlci10eXBlLWNvbnRhaW5lcicpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFdlYXRoZXJUeXBlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWhvdXJseS1vcGVuJyk7XG4gIGxldCBuZXh0SG91cmx5Rm9yZWNhc3RXZWF0aGVyVHlwZVN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFdlYXRoZXJUeXBlU3ZnLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1ob3VybHktZm9yZWNhc3Qtd2VhdGhlci10eXBlLXN2ZycpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFdlYXRoZXJUeXBlU3ZnLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWhvdXJseS1pdGVtLW9wZW4nKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RXZWF0aGVyVHlwZVN2Zy5zcmMgPSB3ZWF0aGVyU3ZnSW1wb3J0O1xuICBsZXQgbmV4dEhvdXJseUZvcmVjYXN0V2VhdGhlclR5cGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0V2VhdGhlclR5cGUuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWhvdXJseS1mb3JlY2FzdC13ZWF0aGVyLXR5cGUnKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RXZWF0aGVyVHlwZS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1ob3VybHktaXRlbS1vcGVuJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0V2VhdGhlclR5cGUudGV4dENvbnRlbnQgPSBgJHt3ZWF0aGVyVHlwZX0sICR7d2VhdGhlckRlc2NyaXB0aW9ufWA7XG4gIGxldCBuZXh0SG91cmx5Rm9yZWNhc3RXaW5kQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0V2luZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtaG91cmx5LWZvcmVjYXN0LXdpbmQtY29udGFpbmVyJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0V2luZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1ob3VybHktb3BlbicpO1xuICBsZXQgbmV4dEhvdXJseUZvcmVjYXN0V2luZFN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFdpbmRTdmcuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWhvdXJseS1mb3JlY2FzdC13aW5kLXN2ZycpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFdpbmRTdmcuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtaG91cmx5LWl0ZW0tb3BlbicpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFdpbmRTdmcuc3JjID0gd2luZFN2Z0ltcG9ydDtcbiAgbGV0IG5leHRIb3VybHlGb3JlY2FzdFdpbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0V2luZC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtaG91cmx5LWZvcmVjYXN0LXdpbmQnKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RXaW5kLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWhvdXJseS1pdGVtLW9wZW4nKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RXaW5kLnRleHRDb250ZW50ID0gYFdpbmQgU3BlZWQ6ICR7d2luZFNwZWVkfSBNUEhgO1xuXG4gIC8vY2hlY2tzIGlmIGNlbHNpdXMgYnV0dG9uIGlzIG9uIGZvciBjb252ZXJzaW9uXG4gIGNvbnN0IGNlbHNpdXNCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2Vsc2l1cy1idXR0b24nKTtcbiAgaWYgKGNlbHNpdXNCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxzaXVzLW9uJykpIHtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RUZW1wLnRleHRDb250ZW50ID0gYCR7dGVtcH0gwrBDYDtcbiAgfSBlbHNlIHtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RUZW1wLnRleHRDb250ZW50ID0gYCR7dGVtcH0gwrBGYDtcbiAgfVxuXG4gIG5leHRIb3VybHlGb3JlY2FzdERhdGVDb250YWluZXIuYXBwZW5kQ2hpbGQobmV4dEhvdXJseUZvcmVjYXN0RGF0ZVN2Zyk7XG4gIG5leHRIb3VybHlGb3JlY2FzdERhdGVDb250YWluZXIuYXBwZW5kQ2hpbGQobmV4dEhvdXJseUZvcmVjYXN0RGF0ZSk7XG4gIG5leHRIb3VybHlGb3JlY2FzdFRpbWVDb250YWluZXIuYXBwZW5kQ2hpbGQobmV4dEhvdXJseUZvcmVjYXN0VGltZVN2Zyk7XG4gIG5leHRIb3VybHlGb3JlY2FzdFRpbWVDb250YWluZXIuYXBwZW5kQ2hpbGQobmV4dEhvdXJseUZvcmVjYXN0VGltZSk7XG4gIG5leHRIb3VybHlGb3JlY2FzdFRlbXBDb250YWluZXIuYXBwZW5kQ2hpbGQobmV4dEhvdXJseUZvcmVjYXN0VGVtcFN2Zyk7XG4gIG5leHRIb3VybHlGb3JlY2FzdFRlbXBDb250YWluZXIuYXBwZW5kQ2hpbGQobmV4dEhvdXJseUZvcmVjYXN0VGVtcCk7XG4gIG5leHRIb3VybHlGb3JlY2FzdEh1bWlkaXR5Q29udGFpbmVyLmFwcGVuZENoaWxkKG5leHRIb3VybHlGb3JlY2FzdEh1bWlkaXR5U3ZnKTtcbiAgbmV4dEhvdXJseUZvcmVjYXN0SHVtaWRpdHlDb250YWluZXIuYXBwZW5kQ2hpbGQobmV4dEhvdXJseUZvcmVjYXN0SHVtaWRpdHkpO1xuICBuZXh0SG91cmx5Rm9yZWNhc3RXZWF0aGVyVHlwZUNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXh0SG91cmx5Rm9yZWNhc3RXZWF0aGVyVHlwZVN2Zyk7XG4gIG5leHRIb3VybHlGb3JlY2FzdFdlYXRoZXJUeXBlQ29udGFpbmVyLmFwcGVuZENoaWxkKG5leHRIb3VybHlGb3JlY2FzdFdlYXRoZXJUeXBlKTtcbiAgbmV4dEhvdXJseUZvcmVjYXN0V2luZENvbnRhaW5lci5hcHBlbmRDaGlsZChuZXh0SG91cmx5Rm9yZWNhc3RXaW5kU3ZnKTtcbiAgbmV4dEhvdXJseUZvcmVjYXN0V2luZENvbnRhaW5lci5hcHBlbmRDaGlsZChuZXh0SG91cmx5Rm9yZWNhc3RXaW5kKTtcblxuICBuZXh0SG91cmx5Rm9yZWNhc3QuYXBwZW5kQ2hpbGQobmV4dEhvdXJseUZvcmVjYXN0RGF0ZUNvbnRhaW5lcik7XG4gIG5leHRIb3VybHlGb3JlY2FzdC5hcHBlbmRDaGlsZChuZXh0SG91cmx5Rm9yZWNhc3RUaW1lQ29udGFpbmVyKTtcbiAgbmV4dEhvdXJseUZvcmVjYXN0LmFwcGVuZENoaWxkKG5leHRIb3VybHlGb3JlY2FzdFRlbXBDb250YWluZXIpO1xuICBuZXh0SG91cmx5Rm9yZWNhc3QuYXBwZW5kQ2hpbGQobmV4dEhvdXJseUZvcmVjYXN0SHVtaWRpdHlDb250YWluZXIpO1xuICBuZXh0SG91cmx5Rm9yZWNhc3QuYXBwZW5kQ2hpbGQobmV4dEhvdXJseUZvcmVjYXN0V2VhdGhlclR5cGVDb250YWluZXIpO1xuICBuZXh0SG91cmx5Rm9yZWNhc3QuYXBwZW5kQ2hpbGQobmV4dEhvdXJseUZvcmVjYXN0V2luZENvbnRhaW5lcik7XG5cbiAgZm9yZUNhc3RIb3VybHkuYXBwZW5kQ2hpbGQobmV4dEhvdXJseUZvcmVjYXN0KTtcbn1cblxuZnVuY3Rpb24gYXBwZW5kRGFpbHlGb3JlY2FzdChcbiAgZGF0ZSxcbiAgdGltZSxcbiAgdGVtcCxcbiAgaHVtaWRpdHksXG4gIHdlYXRoZXJUeXBlLFxuICB3ZWF0aGVyRGVzY3JpcHRpb24sXG4gIHdpbmRTcGVlZFxuKSB7XG4gIGNvbnN0IGZvcmVDYXN0RGFpbHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9yZWNhc3QtZGFpbHknKTtcbiAgbGV0IG5leHREYWlseUZvcmVjYXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3Quc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWRhaWx5LWZvcmVjYXN0Jyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3QuY2xhc3NMaXN0LmFkZCgnbmV4dC1kYWlseS1mb3JlY2FzdC1vcGVuJyk7XG4gICAgbGV0IG5leHREYWlseUZvcmVjYXN0RGF0ZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5leHREYWlseUZvcmVjYXN0RGF0ZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtZGFpbHktZm9yZWNhc3QtZGF0ZS1jb250YWluZXInKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdERhdGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtZGFpbHktb3BlbicpO1xuICBsZXQgbmV4dERhaWx5Rm9yZWNhc3REYXRlU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3REYXRlU3ZnLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1kYWlseS1mb3JlY2FzdC1kYXRlLXN2ZycpO1xuICAgIG5leHREYWlseUZvcmVjYXN0RGF0ZVN2Zy5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1kYWlseS1pdGVtLW9wZW4nKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdERhdGVTdmcuc3JjID0gZGF0ZVN2Z0ltcG9ydDtcbiAgbGV0IG5leHREYWlseUZvcmVjYXN0RGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdERhdGUuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWRhaWx5LWZvcmVjYXN0LWRhdGUnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdERhdGUuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtZGFpbHktaXRlbS1vcGVuJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3REYXRlLnRleHRDb250ZW50ID0gYCR7ZGF0ZX1gO1xuICBsZXQgbmV4dERhaWx5Rm9yZWNhc3RUaW1lQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RUaW1lQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1kYWlseS1mb3JlY2FzdC10aW1lLWNvbnRhaW5lcicpO1xuICAgIG5leHREYWlseUZvcmVjYXN0VGltZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1kYWlseS1vcGVuJyk7XG4gIGxldCBuZXh0RGFpbHlGb3JlY2FzdFRpbWVTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFRpbWVTdmcuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWRhaWx5LWZvcmVjYXN0LXRpbWUtc3ZnJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RUaW1lU3ZnLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWRhaWx5LWl0ZW0tb3BlbicpO1xuICAgIG5leHREYWlseUZvcmVjYXN0VGltZVN2Zy5zcmMgPSB0aW1lU3ZnSW1wb3J0O1xuICBsZXQgbmV4dERhaWx5Rm9yZWNhc3RUaW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIG5leHREYWlseUZvcmVjYXN0VGltZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtZGFpbHktZm9yZWNhc3QtdGltZScpO1xuICAgIG5leHREYWlseUZvcmVjYXN0VGltZS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1kYWlseS1pdGVtLW9wZW4nKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFRpbWUudGV4dENvbnRlbnQgPSBgJHt0aW1lfWA7XG4gIGxldCBuZXh0RGFpbHlGb3JlY2FzdFRlbXBDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFRlbXBDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWRhaWx5LWZvcmVjYXN0LXRlbXAtY29udGFpbmVyJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RUZW1wQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWRhaWx5LW9wZW4nKTtcbiAgbGV0IG5leHREYWlseUZvcmVjYXN0VGVtcFN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIG5leHREYWlseUZvcmVjYXN0VGVtcFN2Zy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtZGFpbHktZm9yZWNhc3QtdGVtcC1zdmcnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFRlbXBTdmcuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtZGFpbHktaXRlbS1vcGVuJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RUZW1wU3ZnLnNyYyA9IHRlbXBTdmdJbXBvcnQ7XG4gIGxldCBuZXh0RGFpbHlGb3JlY2FzdFRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RUZW1wLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1kYWlseS1mb3JlY2FzdC10ZW1wJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RUZW1wLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWRhaWx5LWl0ZW0tb3BlbicpO1xuICBsZXQgbmV4dERhaWx5Rm9yZWNhc3RIdW1pZGl0eUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5leHREYWlseUZvcmVjYXN0SHVtaWRpdHlDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWRhaWx5LWZvcmVjYXN0LWh1bWlkaXR5LWNvbnRhaW5lcicpO1xuICAgIG5leHREYWlseUZvcmVjYXN0SHVtaWRpdHlDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtZGFpbHktb3BlbicpO1xuICBsZXQgbmV4dERhaWx5Rm9yZWNhc3RIdW1pZGl0eVN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIG5leHREYWlseUZvcmVjYXN0SHVtaWRpdHlTdmcuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWRhaWx5LWZvcmVjYXN0LWh1bWlkaXR5LXN2ZycpO1xuICAgIG5leHREYWlseUZvcmVjYXN0SHVtaWRpdHlTdmcuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtZGFpbHktaXRlbS1vcGVuJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RIdW1pZGl0eVN2Zy5zcmMgPSBodW1pZGl0eVN2Z0ltcG9ydDtcbiAgbGV0IG5leHREYWlseUZvcmVjYXN0SHVtaWRpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RIdW1pZGl0eS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtZGFpbHktZm9yZWNhc3QtaHVtaWRpdHknKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdEh1bWlkaXR5LmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWRhaWx5LWl0ZW0tb3BlbicpO1xuICAgIG5leHREYWlseUZvcmVjYXN0SHVtaWRpdHkudGV4dENvbnRlbnQgPSBgSHVtaWRpdHk6ICR7aHVtaWRpdHl9ICVgO1xuICBsZXQgbmV4dERhaWx5Rm9yZWNhc3RXZWF0aGVyVHlwZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5leHREYWlseUZvcmVjYXN0V2VhdGhlclR5cGVDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWRhaWx5LWZvcmVjYXN0LXdlYXRoZXItdHlwZS1jb250YWluZXInKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFdlYXRoZXJUeXBlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWRhaWx5LW9wZW4nKTtcbiAgbGV0IG5leHREYWlseUZvcmVjYXN0V2VhdGhlclR5cGVTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFdlYXRoZXJUeXBlU3ZnLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1kYWlseS1mb3JlY2FzdC13ZWF0aGVyLXR5cGUtc3ZnJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RXZWF0aGVyVHlwZVN2Zy5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1kYWlseS1pdGVtLW9wZW4nKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFdlYXRoZXJUeXBlU3ZnLnNyYyA9IHdlYXRoZXJTdmdJbXBvcnQ7XG4gIGxldCBuZXh0RGFpbHlGb3JlY2FzdFdlYXRoZXJUeXBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIG5leHREYWlseUZvcmVjYXN0V2VhdGhlclR5cGUuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWRhaWx5LWZvcmVjYXN0LXdlYXRoZXItdHlwZScpO1xuICAgIG5leHREYWlseUZvcmVjYXN0V2VhdGhlclR5cGUuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtZGFpbHktaXRlbS1vcGVuJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RXZWF0aGVyVHlwZS50ZXh0Q29udGVudCA9IGAke3dlYXRoZXJUeXBlfSwgJHt3ZWF0aGVyRGVzY3JpcHRpb259YDtcbiAgbGV0IG5leHREYWlseUZvcmVjYXN0V2luZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5leHREYWlseUZvcmVjYXN0V2luZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtZGFpbHktZm9yZWNhc3Qtd2luZC1jb250YWluZXInKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFdpbmRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtZGFpbHktb3BlbicpO1xuICBsZXQgbmV4dERhaWx5Rm9yZWNhc3RXaW5kU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RXaW5kU3ZnLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1kYWlseS1mb3JlY2FzdC13aW5kLXN2ZycpO1xuICAgIG5leHREYWlseUZvcmVjYXN0V2luZFN2Zy5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1kYWlseS1pdGVtLW9wZW4nKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFdpbmRTdmcuc3JjID0gd2luZFN2Z0ltcG9ydDtcbiAgbGV0IG5leHREYWlseUZvcmVjYXN0V2luZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFdpbmQuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWRhaWx5LWZvcmVjYXN0LXdpbmQnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFdpbmQuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtZGFpbHktaXRlbS1vcGVuJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RXaW5kLnRleHRDb250ZW50ID0gYFdpbmQgU3BlZWQ6ICR7d2luZFNwZWVkfSBNUEhgO1xuXG4gIC8vY2hlY2tzIGlmIGNlbHNpdXMgYnV0dG9uIGlzIG9uIGZvciBjb252ZXJzaW9uXG4gIGNvbnN0IGNlbHNpdXNCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2Vsc2l1cy1idXR0b24nKTtcbiAgaWYgKGNlbHNpdXNCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxzaXVzLW9uJykpIHtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFRlbXAudGV4dENvbnRlbnQgPSBgJHt0ZW1wfSDCsENgO1xuICB9IGVsc2Uge1xuICAgIG5leHREYWlseUZvcmVjYXN0VGVtcC50ZXh0Q29udGVudCA9IGAke3RlbXB9IMKwRmA7XG4gIH1cblxuICBuZXh0RGFpbHlGb3JlY2FzdERhdGVDb250YWluZXIuYXBwZW5kQ2hpbGQobmV4dERhaWx5Rm9yZWNhc3REYXRlU3ZnKTtcbiAgbmV4dERhaWx5Rm9yZWNhc3REYXRlQ29udGFpbmVyLmFwcGVuZENoaWxkKG5leHREYWlseUZvcmVjYXN0RGF0ZSk7XG4gIG5leHREYWlseUZvcmVjYXN0VGltZUNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXh0RGFpbHlGb3JlY2FzdFRpbWVTdmcpO1xuICBuZXh0RGFpbHlGb3JlY2FzdFRpbWVDb250YWluZXIuYXBwZW5kQ2hpbGQobmV4dERhaWx5Rm9yZWNhc3RUaW1lKTtcbiAgbmV4dERhaWx5Rm9yZWNhc3RUZW1wQ29udGFpbmVyLmFwcGVuZENoaWxkKG5leHREYWlseUZvcmVjYXN0VGVtcFN2Zyk7XG4gIG5leHREYWlseUZvcmVjYXN0VGVtcENvbnRhaW5lci5hcHBlbmRDaGlsZChuZXh0RGFpbHlGb3JlY2FzdFRlbXApO1xuICBuZXh0RGFpbHlGb3JlY2FzdEh1bWlkaXR5Q29udGFpbmVyLmFwcGVuZENoaWxkKG5leHREYWlseUZvcmVjYXN0SHVtaWRpdHlTdmcpO1xuICBuZXh0RGFpbHlGb3JlY2FzdEh1bWlkaXR5Q29udGFpbmVyLmFwcGVuZENoaWxkKG5leHREYWlseUZvcmVjYXN0SHVtaWRpdHkpO1xuICBuZXh0RGFpbHlGb3JlY2FzdFdlYXRoZXJUeXBlQ29udGFpbmVyLmFwcGVuZENoaWxkKG5leHREYWlseUZvcmVjYXN0V2VhdGhlclR5cGVTdmcpO1xuICBuZXh0RGFpbHlGb3JlY2FzdFdlYXRoZXJUeXBlQ29udGFpbmVyLmFwcGVuZENoaWxkKG5leHREYWlseUZvcmVjYXN0V2VhdGhlclR5cGUpO1xuICBuZXh0RGFpbHlGb3JlY2FzdFdpbmRDb250YWluZXIuYXBwZW5kQ2hpbGQobmV4dERhaWx5Rm9yZWNhc3RXaW5kU3ZnKTtcbiAgbmV4dERhaWx5Rm9yZWNhc3RXaW5kQ29udGFpbmVyLmFwcGVuZENoaWxkKG5leHREYWlseUZvcmVjYXN0V2luZCk7XG4gIG5leHREYWlseUZvcmVjYXN0LmFwcGVuZENoaWxkKG5leHREYWlseUZvcmVjYXN0RGF0ZUNvbnRhaW5lcik7XG4gIG5leHREYWlseUZvcmVjYXN0LmFwcGVuZENoaWxkKG5leHREYWlseUZvcmVjYXN0VGltZUNvbnRhaW5lcik7XG4gIG5leHREYWlseUZvcmVjYXN0LmFwcGVuZENoaWxkKG5leHREYWlseUZvcmVjYXN0VGVtcENvbnRhaW5lcik7XG4gIG5leHREYWlseUZvcmVjYXN0LmFwcGVuZENoaWxkKG5leHREYWlseUZvcmVjYXN0SHVtaWRpdHlDb250YWluZXIpO1xuICBuZXh0RGFpbHlGb3JlY2FzdC5hcHBlbmRDaGlsZChuZXh0RGFpbHlGb3JlY2FzdFdlYXRoZXJUeXBlQ29udGFpbmVyKTtcbiAgbmV4dERhaWx5Rm9yZWNhc3QuYXBwZW5kQ2hpbGQobmV4dERhaWx5Rm9yZWNhc3RXaW5kQ29udGFpbmVyKTtcbiAgZm9yZUNhc3REYWlseS5hcHBlbmRDaGlsZChuZXh0RGFpbHlGb3JlY2FzdCk7XG59XG5cbmZ1bmN0aW9uIHNob3dIb3VybHlGb3JlY2FzdCgpIHtcbiAgY29uc3QgZGFpbHlGb3JlY2FzdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYWlseS1mb3JlY2FzdC1idXR0b24nKTtcbiAgY29uc3QgaG91cmx5Rm9yZWNhc3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaG91cmx5LWZvcmVjYXN0LWJ1dHRvbicpO1xuICBjb25zdCBmb3JlY2FzdERhaWx5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZvcmVjYXN0LWRhaWx5Jyk7XG4gIGNvbnN0IGZvcmVjYXN0SG91cmx5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZvcmVjYXN0LWhvdXJseScpO1xuXG4gIGlmIChkYWlseUZvcmVjYXN0QnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnZGFpbHktZm9yZWNhc3QtYnV0dG9uLW9uJykpIHtcbiAgICBkYWlseUZvcmVjYXN0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2RhaWx5LWZvcmVjYXN0LWJ1dHRvbi1vbicpO1xuICAgIGRhaWx5Rm9yZWNhc3RCdXR0b24uY2xhc3NMaXN0LmFkZCgnZGFpbHktZm9yZWNhc3QtYnV0dG9uLW9mZicpO1xuICAgIGhvdXJseUZvcmVjYXN0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hvdXJseS1mb3JlY2FzdC1idXR0b24tb24nKTtcbiAgICBob3VybHlGb3JlY2FzdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdob3VybHktZm9yZWNhc3QtYnV0dG9uLW9mZicpO1xuICAgIGZvcmVjYXN0RGFpbHkuY2xhc3NMaXN0LnJlbW92ZSgnZm9yZWNhc3QtZGFpbHktb24nKTtcbiAgICBmb3JlY2FzdERhaWx5LmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWRhaWx5LW9mZicpO1xuICAgIGZvcmVjYXN0SG91cmx5LmNsYXNzTGlzdC5yZW1vdmUoJ2ZvcmVjYXN0LWhvdXJseS1vZmYnKTtcbiAgICBmb3JlY2FzdEhvdXJseS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1ob3VybHktb24nKTtcbiAgfSBlbHNlIGlmIChob3VybHlGb3JlY2FzdEJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2hvdXJseS1mb3JlY2FzdC1idXR0b24tb24nKSkge1xuICAgIHJldHVybjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm47XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hvd0RhaWx5Rm9yZWNhc3QoKSB7XG4gIGNvbnN0IGRhaWx5Rm9yZWNhc3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGFpbHktZm9yZWNhc3QtYnV0dG9uJyk7XG4gIGNvbnN0IGhvdXJseUZvcmVjYXN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hvdXJseS1mb3JlY2FzdC1idXR0b24nKTtcbiAgY29uc3QgZm9yZWNhc3REYWlseSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JlY2FzdC1kYWlseScpO1xuICBjb25zdCBmb3JlY2FzdEhvdXJseSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JlY2FzdC1ob3VybHknKTtcblxuICBpZiAoZGFpbHlGb3JlY2FzdEJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2RhaWx5LWZvcmVjYXN0LWJ1dHRvbi1vbicpKSB7XG4gICAgcmV0dXJuO1xuICB9IGVsc2UgaWYgKGhvdXJseUZvcmVjYXN0QnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnaG91cmx5LWZvcmVjYXN0LWJ1dHRvbi1vbicpKSB7XG4gICAgZGFpbHlGb3JlY2FzdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdkYWlseS1mb3JlY2FzdC1idXR0b24tb24nKTtcbiAgICBkYWlseUZvcmVjYXN0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2RhaWx5LWZvcmVjYXN0LWJ1dHRvbi1vZmYnKTtcbiAgICBob3VybHlGb3JlY2FzdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdob3VybHktZm9yZWNhc3QtYnV0dG9uLW9uJyk7XG4gICAgaG91cmx5Rm9yZWNhc3RCdXR0b24uY2xhc3NMaXN0LmFkZCgnaG91cmx5LWZvcmVjYXN0LWJ1dHRvbi1vZmYnKTtcbiAgICBmb3JlY2FzdERhaWx5LmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWRhaWx5LW9uJyk7XG4gICAgZm9yZWNhc3REYWlseS5jbGFzc0xpc3QucmVtb3ZlKCdmb3JlY2FzdC1kYWlseS1vZmYnKTtcbiAgICBmb3JlY2FzdEhvdXJseS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1ob3VybHktb2ZmJyk7XG4gICAgZm9yZWNhc3RIb3VybHkuY2xhc3NMaXN0LnJlbW92ZSgnZm9yZWNhc3QtaG91cmx5LW9uJyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVByZXZpb3VzSW5mb3JtYXRpb24oKSB7XG4gIGNvbnN0IGxvY2F0aW9uSW5mb3JtYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9jYXRpb24taW5mb3JtYXRpb24nKTtcbiAgY29uc3QgbG9jYXRpb25FeHRyYUluZm9ybWF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvY2F0aW9uLWV4dHJhLWluZm9ybWF0aW9uJyk7XG4gIGNvbnN0IGZvcmVjYXN0SG91cmx5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZvcmVjYXN0LWhvdXJseScpO1xuICBjb25zdCBmb3JlY2FzdERhaWx5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZvcmVjYXN0LWRhaWx5Jyk7XG5cbiAgcmVtb3ZlQWxsQ2hpbGROb2Rlcyhsb2NhdGlvbkluZm9ybWF0aW9uKTtcbiAgcmVtb3ZlQWxsQ2hpbGROb2Rlcyhsb2NhdGlvbkV4dHJhSW5mb3JtYXRpb24pO1xuICByZW1vdmVBbGxDaGlsZE5vZGVzKGZvcmVjYXN0SG91cmx5KTtcbiAgcmVtb3ZlQWxsQ2hpbGROb2Rlcyhmb3JlY2FzdERhaWx5KTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQWxsQ2hpbGROb2RlcyhwYXJlbnQpIHtcbiAgd2hpbGUgKHBhcmVudC5maXJzdENoaWxkKSB7XG4gICAgcGFyZW50LnJlbW92ZUNoaWxkKHBhcmVudC5maXJzdENoaWxkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzaG93RmFocmVuaGVpdCgpIHtcbiAgY29uc3QgZmFocmVuaGVpdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmYWhyZW5oZWl0LWJ1dHRvbicpO1xuICBjb25zdCBjZWxzaXVzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NlbHNpdXMtYnV0dG9uJyk7XG5cbiAgLy8gaW5mb3JtcyB1c2VyIG9uIHdoZW4gdG8gZXhwZWN0IHRvIHNlZSB0aGUgY2Vsc2l1cy9mYWhyZW5oZWl0IHJlYWRpbmcgY2hhbmdlLiBJdCBvbmx5IHNob3dzIGl0IG9uY2UgcGVyIHNlc3Npb25cbiAgbGV0IGZpcnN0QWxlcnQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdmaXJzdC1hbGVydCcpO1xuICBpZiAoZmlyc3RBbGVydCA9PT0gJ3RydWUnKSB7XG4gICAgYWxlcnQoJ1doZW4gY2hhbmdpbmcgYmV0d2VlbiBjZWxzaXVzIGFuZCBmYWhyZW5oZWl0LCB0aGUgdGVtcGVyYXR1cmUgcmVhZGluZ3Mgd2lsbCBjaGFuZ2Ugb24geW91ciBuZXh0IHNlYXJjaCcpO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2ZpcnN0LWFsZXJ0JywgJ2ZhbHNlJyk7XG4gIH1cblxuICBpZiAoZmFocmVuaGVpdEJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2ZhaHJlbmhlaXQtb24nKSkge1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmIChmYWhyZW5oZWl0QnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnZmFocmVuaGVpdC1vZmYnKSkge1xuICAgIGZhaHJlbmhlaXRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnZmFocmVuaGVpdC1vZmYnKTtcbiAgICBmYWhyZW5oZWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2ZhaHJlbmhlaXQtb24nKTtcbiAgICBjZWxzaXVzQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2NlbHNpdXMtb24nKTtcbiAgICBjZWxzaXVzQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2NlbHNpdXMtb2ZmJyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNob3dDZWxzaXVzKCkge1xuICBjb25zdCBmYWhyZW5oZWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZhaHJlbmhlaXQtYnV0dG9uJyk7XG4gIGNvbnN0IGNlbHNpdXNCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2Vsc2l1cy1idXR0b24nKTtcblxuICAvLyBpbmZvcm1zIHVzZXIgb24gd2hlbiB0byBleHBlY3QgdG8gc2VlIHRoZSBjZWxzaXVzL2ZhaHJlbmhlaXQgcmVhZGluZyBjaGFuZ2UuIEl0IG9ubHkgc2hvd3MgaXQgb25jZSBwZXIgc2Vzc2lvblxuICBsZXQgZmlyc3RBbGVydCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2ZpcnN0LWFsZXJ0Jyk7XG4gIGlmIChmaXJzdEFsZXJ0ID09PSAndHJ1ZScpIHtcbiAgICBhbGVydCgnV2hlbiBjaGFuZ2luZyBiZXR3ZWVuIGNlbHNpdXMgYW5kIGZhaHJlbmhlaXQsIHRoZSB0ZW1wZXJhdHVyZSByZWFkaW5ncyB3aWxsIGNoYW5nZSBvbiB5b3VyIG5leHQgc2VhcmNoJyk7XG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnZmlyc3QtYWxlcnQnLCAnZmFsc2UnKTtcbiAgfVxuICBcbiAgaWYgKGNlbHNpdXNCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxzaXVzLW9uJykpIHtcbiAgICByZXR1cm47XG4gIH0gZWxzZSBpZiAoY2Vsc2l1c0J1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2NlbHNpdXMtb2ZmJykpIHtcbiAgICBjZWxzaXVzQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2NlbHNpdXMtb2ZmJyk7XG4gICAgY2Vsc2l1c0J1dHRvbi5jbGFzc0xpc3QuYWRkKCdjZWxzaXVzLW9uJyk7XG4gICAgZmFocmVuaGVpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdmYWhyZW5oZWl0LW9mZicpO1xuICAgIGZhaHJlbmhlaXRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnZmFocmVuaGVpdC1vbicpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybjtcbiAgfVxufVxuXG5mdW5jdGlvbiBmYWhyZW5oZWl0VG9DZWxzaXVzKG51bWJlcikge1xuICBsZXQgdG90YWwgPSAobnVtYmVyLTMyKSAqIDUvOVxuICBsZXQgcm91bmRlZCA9IE1hdGgucm91bmQodG90YWwgKiAxMCkgLyAxMDtcbiAgbnVtYmVyID0gcm91bmRlZDtcbiAgcmV0dXJuIG51bWJlcjtcbn0iLCJleHBvcnQge1xuICBsb2FkTWVhc3VyZW1lbnRBbGVydFxufVxuXG5mdW5jdGlvbiBsb2FkTWVhc3VyZW1lbnRBbGVydCgpIHtcbiAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnZmlyc3QtYWxlcnQnLCAndHJ1ZScpO1xufSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2ltZ3MvbW91bnRhaW4tbGFrZS5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuL3N2Z3Mvc2VhcmNoLnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9RnJlZG9rYTp3Z2h0QDMwMCZmYW1pbHk9Um9ib3RvK01vbm86d2dodEAzMDAmZGlzcGxheT1zd2FwKTtcIl0pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIE1vbm8nLCBtb25vc3BhY2UsICdGcmVkb2thJywgc2Fucy1zZXJpZjtcXG59XFxuXFxuI2JhY2tncm91bmQge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4jaGVhZGVyIHtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTB2aDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4jaGVhZGVyLWxlZnQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiA1MHZ3O1xcbiAgaGVpZ2h0OiAxMHZoO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuI2hlYWRlci10aXRsZS1maXJzdCB7XFxuICBwYWRkaW5nLWxlZnQ6IDQlO1xcbiAgZm9udC1zaXplOiAyLjVlbTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxuICBjb2xvcjogI2YzYWM0YztcXG59XFxuXFxuI2hlYWRlci10aXRsZS1zZWNvbmQge1xcbiAgZm9udC1zaXplOiAyLjVlbTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxuICBjb2xvcjogIzQzOGNjYztcXG59XFxuXFxuI2hlYWRlci1pY29uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogNGVtO1xcbiAgaGVpZ2h0OiA0ZW07XFxuICBwYWRkaW5nLWxlZnQ6IDQlO1xcbn1cXG5cXG4jaGVhZGVyLXJpZ2h0IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogNTB2dztcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuICBwYWRkaW5nLXJpZ2h0OiA0JTtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmxhYmVsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxubGFiZWw6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMTBweDtcXG4gIHRvcDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIHdpZHRoOiAxLjVlbTtcXG4gIGJhY2tncm91bmQ6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gKyBcIikgY2VudGVyIC8gY29udGFpbiBuby1yZXBlYXQ7XFxuICBmaWx0ZXI6IGludmVydCg3OSUpIHNlcGlhKDcyJSkgc2F0dXJhdGUoOTEzJSkgaHVlLXJvdGF0ZSgzMjNkZWcpIGJyaWdodG5lc3MoMTAxJSkgY29udHJhc3QoOTElKTtcXG59XFxuXFxuI3NlYXJjaC1iYXItaW5wdXQge1xcbiAgd2lkdGg6IDE1dnc7XFxuICBoZWlnaHQ6IDV2aDtcXG4gIGZvbnQtc2l6ZTogMS41ZW07XFxuICBwYWRkaW5nLWxlZnQ6IDE2JTtcXG4gIGNvbG9yOiAjNDM4Y2NjO1xcbn1cXG5cXG4jYXBwIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDkwdmg7XFxuICBmbGV4LWZsb3c6IGNvbHVtbiBub3dyYXA7XFxuXFxufVxcblxcbiNhcHAtdG9wIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBoZWlnaHQ6IDUwdmg7XFxuICB3aWR0aDogMTAwdnc7XFxufVxcblxcbiNhcHAtdG9wLWxlZnQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiA0NXZ3O1xcbiAgaGVpZ2h0OiA1MHZoO1xcbn1cXG5cXG4jbG9jYXRpb24taW5mb3JtYXRpb24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiA0NXZ3O1xcbiAgaGVpZ2h0OiA0MHZoO1xcbiAgZmxleC1mbG93OiByb3cgd3JhcDtcXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBtYXJnaW4tdG9wOiA1JTtcXG4gIG1hcmdpbi1sZWZ0OiA1JTtcXG59XFxuXFxuI2NpdHktY29udGFpbmVyLCAjd2VhdGhlci1kZXNjcmlwdGlvbi1jb250YWluZXIsICN3ZWF0aGVyLXRlbXBlcmF0dXJlLWNvbnRhaW5lciwgI3RvZGF5cy1kYXRlLWNvbnRhaW5lciwgI3RvZGF5cy10aW1lLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDQ1dnc7XFxuICBoZWlnaHQ6IDV2aDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG4gIG1hcmdpbjogMDtcXG4gIHdpZHRoOiA0MHZ3O1xcbiAgcGFkZGluZzogMiU7XFxufVxcblxcbiNjaXR5LXN2ZywgI3dlYXRoZXItZGVzY3JpcHRpb24tc3ZnLCAjd2VhdGhlci10ZW1wZXJhdHVyZS1zdmcsICN0b2RheXMtZGF0ZS1zdmcsICN0b2RheXMtdGltZS1zdmcge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiAyLjVlbTtcXG4gIGhlaWdodDogMi41ZW07XFxuICBmaWx0ZXI6IGludmVydCg3OSUpIHNlcGlhKDcyJSkgc2F0dXJhdGUoOTEzJSkgaHVlLXJvdGF0ZSgzMjNkZWcpIGJyaWdodG5lc3MoMTAxJSkgY29udHJhc3QoOTElKTtcXG4gIHBhZGRpbmctcmlnaHQ6IDUlO1xcbn1cXG5cXG4jY2l0eS1uYW1lLCAjd2VhdGhlci10ZW1wZXJhdHVyZSwgI3RvZGF5cy10aW1lLCAjd2VhdGhlci1kZXNjcmlwdGlvbiwgI3RvZGF5cy1kYXRlIHtcXG4gIGZvbnQtc2l6ZTogMmVtO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG4gIGNvbG9yOiAjZjNhYzRjO1xcbn1cXG5cXG4jYXBwLXRvcC1yaWdodCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDQ1dnc7XFxuICBoZWlnaHQ6IDUwdmg7XFxufVxcblxcbiNsb2NhdGlvbi1leHRyYS1pbmZvcm1hdGlvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDQ1dnc7XFxuICBoZWlnaHQ6IDQwdmg7XFxuICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1hcmdpbi10b3A6IDUlO1xcbiAgbWFyZ2luLWxlZnQ6IDE2LjUlO1xcbn1cXG5cXG4jd2VhdGhlci1mZWVscy1saWtlLWNvbnRhaW5lciwgI3dlYXRoZXItaHVtaWRpdHktY29udGFpbmVyLCAjd2VhdGhlci1taW4tY29udGFpbmVyLCAjd2VhdGhlci1tYXgtY29udGFpbmVyLCAjd2luZC1zcGVlZC1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiA0NXZ3O1xcbiAgaGVpZ2h0OiA1dmg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MCwgMjQyLCAyNDAsIDAuOSk7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAyJTtcXG59XFxuXFxuI3dlYXRoZXItZmVlbHMtbGlrZS1zdmcsICN3ZWF0aGVyLWh1bWlkaXR5LXN2ZywgI3dlYXRoZXItbWluLXN2ZywgI3dlYXRoZXItbWF4LXN2ZywgI3dpbmQtc3BlZWQtc3ZnLCAjbmV4dC1kYWlseS1mb3JlY2FzdC13ZWF0aGVyLXR5cGUtc3ZnLCAjbmV4dC1ob3VybHktZm9yZWNhc3Qtd2VhdGhlci10eXBlLXN2ZyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDIuNWVtO1xcbiAgaGVpZ2h0OiAyLjVlbTtcXG4gIGZpbHRlcjogaW52ZXJ0KDU0JSkgc2VwaWEoMzQlKSBzYXR1cmF0ZSg4NjElKSBodWUtcm90YXRlKDE2NmRlZykgYnJpZ2h0bmVzcyg4OCUpIGNvbnRyYXN0KDg4JSk7XFxuICBwYWRkaW5nLXJpZ2h0OiA1JTtcXG59XFxuXFxuI3dlYXRoZXItZmVlbHMtbGlrZSwgI3dlYXRoZXItaHVtaWRpdHksICN3ZWF0aGVyLW1pbiwgI3dlYXRoZXItbWF4LCAjd2luZC1zcGVlZCB7XFxuICBmb250LXNpemU6IDJlbTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxuICBjb2xvcjogIzQzOGNjYztcXG59XFxuXFxuI2FwcC1ib3R0b20ge1xcbiAgZGlzcGxheTpmbGV4O1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiA1MHZoO1xcbiAgZmxleC1mbG93OiBjb2x1bW4gbm93cmFwO1xcbiAgYWxpZ24tY29udGVudDogZmxleC1zdGFydDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG4jaW5mb3JtYXRpb24tc3dpdGNoZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiAxMHZ3O1xcbiAgaGVpZ2h0OiAzLjV2aDtcXG4gIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBwYWRkaW5nLWxlZnQ6IDIuNzUlO1xcbn1cXG5cXG4jZGFpbHktZm9yZWNhc3QtYnV0dG9uLCAjaG91cmx5LWZvcmVjYXN0LWJ1dHRvbiwgI2ZhaHJlbmhlaXQtYnV0dG9uLCAjY2Vsc2l1cy1idXR0b24ge1xcbiAgd2lkdGg6IDh2dztcXG4gIGhlaWdodDogMy41dmg7XFxuICBmb250LXNpemU6IDFlbTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxuICBib3JkZXItcmFkaXVzOiAxMCU7XFxuICBtYXJnaW4tbGVmdDogMyU7XFxufVxcblxcbiNmYWhyZW5oZWl0LWJ1dHRvbiB7XFxuICBtYXJnaW4tbGVmdDogMXZ3O1xcbn1cXG5cXG4uZGFpbHktZm9yZWNhc3QtYnV0dG9uLW9mZiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG4gIGNvbG9yOiAjZjNhYzRjO1xcbn1cXG5cXG4uZGFpbHktZm9yZWNhc3QtYnV0dG9uLW9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmM2FjNGM7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG4gIGNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC44KTs7XFxufVxcblxcbi5ob3VybHktZm9yZWNhc3QtYnV0dG9uLW9mZiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG4gIGNvbG9yOiAjNDM4Y2NjO1xcbn1cXG5cXG4uaG91cmx5LWZvcmVjYXN0LWJ1dHRvbi1vbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDM4Y2NjO1xcbiAgY29sb3I6IHJnYigyNDAsIDI0MiwgMjQwLCAwLjgpO1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiKDI0MCwgMjQyLCAyNDAsIDAuOSk7XFxufVxcblxcbi5jZWxzaXVzLW9mZiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG4gIGNvbG9yOiAjNDM4Y2NjO1xcbn1cXG5cXG4uZmFocmVuaGVpdC1vZmYge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MCwgMjQyLCAyNDAsIDAuOSk7XFxuICBjb2xvcjogI2YzYWM0YztcXG59XFxuXFxuLmNlbHNpdXMtb24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQzOGNjYztcXG4gIGNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC44KTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYigyNDAsIDI0MiwgMjQwLCAwLjkpO1xcbn1cXG5cXG4uZmFocmVuaGVpdC1vbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjNhYzRjO1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiKDI0MCwgMjQyLCAyNDAsIDAuOSk7XFxuICBjb2xvcjogcmdiKDI0MCwgMjQyLCAyNDAsIDAuOCk7O1xcbn1cXG5cXG4uZm9yZWNhc3QtaG91cmx5LW9mZiB7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICBkaXNwbGF5OiBub25lO1xcbiAgd2lkdGg6IDA7XFxuICBoZWlnaHQ6IDA7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi5mb3JlY2FzdC1kYWlseS1vZmYge1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHdpZHRoOiAwO1xcbiAgaGVpZ2h0OiAwO1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4uZm9yZWNhc3QtZGFpbHktb24ge1xcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDM2LjV2aDtcXG4gIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxufVxcblxcbi5uZXh0LWRhaWx5LWZvcmVjYXN0LW9wZW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTh2dztcXG4gIGhlaWdodDogMzB2aDtcXG4gIGZvbnQtc2l6ZTogMC44ZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG4gIG1hcmdpbjogMC41JTtcXG59XFxuXFxuLmZvcmVjYXN0LWRhaWx5LW9wZW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTh2dztcXG4gIGhlaWdodDogNXZoO1xcbn1cXG5cXG4uZm9yZWNhc3QtZGFpbHktaXRlbS1vcGVuIHtcXG4gIG1hcmdpbjogMDtcXG4gIG1hcmdpbi1sZWZ0OiA1JTtcXG4gIGNvbG9yOiAjNDM4Y2NjO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG59XFxuXFxuI25leHQtZGFpbHktZm9yZWNhc3QtZGF0ZS1zdmcsICNuZXh0LWRhaWx5LWZvcmVjYXN0LXRpbWUtc3ZnLCAjbmV4dC1kYWlseS1mb3JlY2FzdC10ZW1wLXN2ZywgI25leHQtZGFpbHktZm9yZWNhc3QtaHVtaWRpdHktc3ZnLCAjbmV4dC1kYWlseS1mb3JlY2FzdC13ZWF0aGVyLXR5cGUtc3ZnLCAjbmV4dC1kYWlseS1mb3JlY2FzdC13aW5kLXN2ZyB7XFxuICBmaWx0ZXI6IGludmVydCg3OSUpIHNlcGlhKDcyJSkgc2F0dXJhdGUoOTEzJSkgaHVlLXJvdGF0ZSgzMjNkZWcpIGJyaWdodG5lc3MoMTAxJSkgY29udHJhc3QoOTElKTtcXG59XFxuXFxuLmZvcmVjYXN0LWhvdXJseS1vbiB7XFxuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMzYuNXZoO1xcbiAgZmxleC1mbG93OiByb3cgbm93cmFwO1xcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG59XFxuXFxuI25leHQtaG91cmx5LWZvcmVjYXN0IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWZsb3c6IGNvbHVtbiBub3dyYXA7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgd2lkdGg6IDEzLjV2dztcXG4gIGhlaWdodDogMzJ2aDtcXG4gIGZvbnQtc2l6ZTogMC44NWVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MCwgMjQyLCAyNDAsIDAuOSk7XFxuICBtYXJnaW46IDAuMjUlO1xcbn1cXG5cXG4uZm9yZWNhc3QtaG91cmx5LW9wZW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTJ2dztcXG4gIGhlaWdodDogNXZoO1xcbn1cXG5cXG4uZm9yZWNhc3QtaG91cmx5LWl0ZW0tb3BlbiB7XFxuICBtYXJnaW46IDA7XFxuICBtYXJnaW4tbGVmdDogNSU7XFxuICBjb2xvcjogIzQzOGNjYztcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxufVxcblxcbiNuZXh0LWhvdXJseS1mb3JlY2FzdC1kYXRlLXN2ZywgI25leHQtaG91cmx5LWZvcmVjYXN0LXRpbWUtc3ZnLCAjbmV4dC1ob3VybHktZm9yZWNhc3QtdGVtcC1zdmcsICNuZXh0LWhvdXJseS1mb3JlY2FzdC1odW1pZGl0eS1zdmcsICNuZXh0LWhvdXJseS1mb3JlY2FzdC13ZWF0aGVyLXR5cGUtc3ZnLCAjbmV4dC1ob3VybHktZm9yZWNhc3Qtd2luZC1zdmcge1xcbiAgZmlsdGVyOiBpbnZlcnQoNzklKSBzZXBpYSg3MiUpIHNhdHVyYXRlKDkxMyUpIGh1ZS1yb3RhdGUoMzIzZGVnKSBicmlnaHRuZXNzKDEwMSUpIGNvbnRyYXN0KDkxJSk7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBRUE7RUFDRSw0REFBNEQ7QUFDOUQ7O0FBRUE7RUFDRSx5REFBaUQ7RUFDakQsc0JBQXNCO0VBQ3RCLFlBQVk7RUFDWixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxZQUFZO0VBQ1osWUFBWTtFQUNaLGFBQWE7RUFDYixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsV0FBVztFQUNYLFlBQVk7RUFDWixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFVBQVU7RUFDVixX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QUFDWDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsUUFBUTtFQUNSLFNBQVM7RUFDVCxTQUFTO0FBQ1g7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLFlBQVk7RUFDWixjQUFjO0VBQ2QscUJBQXFCO0VBQ3JCLHFCQUFxQjtFQUNyQix1QkFBdUI7RUFDdkIsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHdCQUF3QjtFQUN4QixtQkFBbUI7RUFDbkIsV0FBVztFQUNYLFlBQVk7RUFDWixnQkFBZ0I7RUFDaEIseUNBQXlDO0VBQ3pDLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7RUFDYixxQkFBcUI7RUFDckIsMkJBQTJCO0VBQzNCLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gsV0FBVztBQUNiOztBQUVBO0VBQ0UsU0FBUztFQUNULGVBQWU7RUFDZixjQUFjO0VBQ2QsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsK0ZBQStGO0FBQ2pHOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixZQUFZO0VBQ1osY0FBYztFQUNkLHFCQUFxQjtFQUNyQixxQkFBcUI7RUFDckIsdUJBQXVCO0VBQ3ZCLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYix3QkFBd0I7RUFDeEIsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLHlDQUF5QztFQUN6QyxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxhQUFhO0VBQ2IscUJBQXFCO0VBQ3JCLDJCQUEyQjtFQUMzQixtQkFBbUI7RUFDbkIsV0FBVztFQUNYLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFNBQVM7RUFDVCxlQUFlO0VBQ2YsY0FBYztFQUNkLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLCtGQUErRjtBQUNqR1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1GcmVkb2thOndnaHRAMzAwJmZhbWlseT1Sb2JvdG8rTW9ubzp3Z2h0QDMwMCZkaXNwbGF5PXN3YXAnKTtcXG5cXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIE1vbm8nLCBtb25vc3BhY2UsICdGcmVkb2thJywgc2Fucy1zZXJpZjtcXG59XFxuXFxuI2JhY2tncm91bmQge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcuL2ltZ3MvbW91bnRhaW4tbGFrZS5qcGcnKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4jaGVhZGVyIHtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTB2aDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4jaGVhZGVyLWxlZnQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiA1MHZ3O1xcbiAgaGVpZ2h0OiAxMHZoO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuI2hlYWRlci10aXRsZS1maXJzdCB7XFxuICBwYWRkaW5nLWxlZnQ6IDQlO1xcbiAgZm9udC1zaXplOiAyLjVlbTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxuICBjb2xvcjogI2YzYWM0YztcXG59XFxuXFxuI2hlYWRlci10aXRsZS1zZWNvbmQge1xcbiAgZm9udC1zaXplOiAyLjVlbTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxuICBjb2xvcjogIzQzOGNjYztcXG59XFxuXFxuI2hlYWRlci1pY29uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogNGVtO1xcbiAgaGVpZ2h0OiA0ZW07XFxuICBwYWRkaW5nLWxlZnQ6IDQlO1xcbn1cXG5cXG4jaGVhZGVyLXJpZ2h0IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogNTB2dztcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuICBwYWRkaW5nLXJpZ2h0OiA0JTtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmxhYmVsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxubGFiZWw6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMTBweDtcXG4gIHRvcDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIHdpZHRoOiAxLjVlbTtcXG4gIGJhY2tncm91bmQ6IHVybChcXFwiLi9zdmdzL3NlYXJjaC5zdmdcXFwiKSBjZW50ZXIgLyBjb250YWluIG5vLXJlcGVhdDtcXG4gIGZpbHRlcjogaW52ZXJ0KDc5JSkgc2VwaWEoNzIlKSBzYXR1cmF0ZSg5MTMlKSBodWUtcm90YXRlKDMyM2RlZykgYnJpZ2h0bmVzcygxMDElKSBjb250cmFzdCg5MSUpO1xcbn1cXG5cXG4jc2VhcmNoLWJhci1pbnB1dCB7XFxuICB3aWR0aDogMTV2dztcXG4gIGhlaWdodDogNXZoO1xcbiAgZm9udC1zaXplOiAxLjVlbTtcXG4gIHBhZGRpbmctbGVmdDogMTYlO1xcbiAgY29sb3I6ICM0MzhjY2M7XFxufVxcblxcbiNhcHAge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogOTB2aDtcXG4gIGZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcXG5cXG59XFxuXFxuI2FwcC10b3Age1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGhlaWdodDogNTB2aDtcXG4gIHdpZHRoOiAxMDB2dztcXG59XFxuXFxuI2FwcC10b3AtbGVmdCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDQ1dnc7XFxuICBoZWlnaHQ6IDUwdmg7XFxufVxcblxcbiNsb2NhdGlvbi1pbmZvcm1hdGlvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDQ1dnc7XFxuICBoZWlnaHQ6IDQwdmg7XFxuICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1hcmdpbi10b3A6IDUlO1xcbiAgbWFyZ2luLWxlZnQ6IDUlO1xcbn1cXG5cXG4jY2l0eS1jb250YWluZXIsICN3ZWF0aGVyLWRlc2NyaXB0aW9uLWNvbnRhaW5lciwgI3dlYXRoZXItdGVtcGVyYXR1cmUtY29udGFpbmVyLCAjdG9kYXlzLWRhdGUtY29udGFpbmVyLCAjdG9kYXlzLXRpbWUtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogNDV2dztcXG4gIGhlaWdodDogNXZoO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDAsIDI0MiwgMjQwLCAwLjkpO1xcbiAgbWFyZ2luOiAwO1xcbiAgd2lkdGg6IDQwdnc7XFxuICBwYWRkaW5nOiAyJTtcXG59XFxuXFxuI2NpdHktc3ZnLCAjd2VhdGhlci1kZXNjcmlwdGlvbi1zdmcsICN3ZWF0aGVyLXRlbXBlcmF0dXJlLXN2ZywgI3RvZGF5cy1kYXRlLXN2ZywgI3RvZGF5cy10aW1lLXN2ZyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDIuNWVtO1xcbiAgaGVpZ2h0OiAyLjVlbTtcXG4gIGZpbHRlcjogaW52ZXJ0KDc5JSkgc2VwaWEoNzIlKSBzYXR1cmF0ZSg5MTMlKSBodWUtcm90YXRlKDMyM2RlZykgYnJpZ2h0bmVzcygxMDElKSBjb250cmFzdCg5MSUpO1xcbiAgcGFkZGluZy1yaWdodDogNSU7XFxufVxcblxcbiNjaXR5LW5hbWUsICN3ZWF0aGVyLXRlbXBlcmF0dXJlLCAjdG9kYXlzLXRpbWUsICN3ZWF0aGVyLWRlc2NyaXB0aW9uLCAjdG9kYXlzLWRhdGUge1xcbiAgZm9udC1zaXplOiAyZW07XFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcbiAgY29sb3I6ICNmM2FjNGM7XFxufVxcblxcbiNhcHAtdG9wLXJpZ2h0IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogNDV2dztcXG4gIGhlaWdodDogNTB2aDtcXG59XFxuXFxuI2xvY2F0aW9uLWV4dHJhLWluZm9ybWF0aW9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogNDV2dztcXG4gIGhlaWdodDogNDB2aDtcXG4gIGZsZXgtZmxvdzogcm93IHdyYXA7XFxuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWFyZ2luLXRvcDogNSU7XFxuICBtYXJnaW4tbGVmdDogMTYuNSU7XFxufVxcblxcbiN3ZWF0aGVyLWZlZWxzLWxpa2UtY29udGFpbmVyLCAjd2VhdGhlci1odW1pZGl0eS1jb250YWluZXIsICN3ZWF0aGVyLW1pbi1jb250YWluZXIsICN3ZWF0aGVyLW1heC1jb250YWluZXIsICN3aW5kLXNwZWVkLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDQ1dnc7XFxuICBoZWlnaHQ6IDV2aDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDIlO1xcbn1cXG5cXG4jd2VhdGhlci1mZWVscy1saWtlLXN2ZywgI3dlYXRoZXItaHVtaWRpdHktc3ZnLCAjd2VhdGhlci1taW4tc3ZnLCAjd2VhdGhlci1tYXgtc3ZnLCAjd2luZC1zcGVlZC1zdmcsICNuZXh0LWRhaWx5LWZvcmVjYXN0LXdlYXRoZXItdHlwZS1zdmcsICNuZXh0LWhvdXJseS1mb3JlY2FzdC13ZWF0aGVyLXR5cGUtc3ZnIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogMi41ZW07XFxuICBoZWlnaHQ6IDIuNWVtO1xcbiAgZmlsdGVyOiBpbnZlcnQoNTQlKSBzZXBpYSgzNCUpIHNhdHVyYXRlKDg2MSUpIGh1ZS1yb3RhdGUoMTY2ZGVnKSBicmlnaHRuZXNzKDg4JSkgY29udHJhc3QoODglKTtcXG4gIHBhZGRpbmctcmlnaHQ6IDUlO1xcbn1cXG5cXG4jd2VhdGhlci1mZWVscy1saWtlLCAjd2VhdGhlci1odW1pZGl0eSwgI3dlYXRoZXItbWluLCAjd2VhdGhlci1tYXgsICN3aW5kLXNwZWVkIHtcXG4gIGZvbnQtc2l6ZTogMmVtO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG4gIGNvbG9yOiAjNDM4Y2NjO1xcbn1cXG5cXG4jYXBwLWJvdHRvbSB7XFxuICBkaXNwbGF5OmZsZXg7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDUwdmg7XFxuICBmbGV4LWZsb3c6IGNvbHVtbiBub3dyYXA7XFxuICBhbGlnbi1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxufVxcblxcbiNpbmZvcm1hdGlvbi1zd2l0Y2hlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDEwdnc7XFxuICBoZWlnaHQ6IDMuNXZoO1xcbiAgZmxleC1mbG93OiByb3cgbm93cmFwO1xcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBhZGRpbmctbGVmdDogMi43NSU7XFxufVxcblxcbiNkYWlseS1mb3JlY2FzdC1idXR0b24sICNob3VybHktZm9yZWNhc3QtYnV0dG9uLCAjZmFocmVuaGVpdC1idXR0b24sICNjZWxzaXVzLWJ1dHRvbiB7XFxuICB3aWR0aDogOHZ3O1xcbiAgaGVpZ2h0OiAzLjV2aDtcXG4gIGZvbnQtc2l6ZTogMWVtO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDEwJTtcXG4gIG1hcmdpbi1sZWZ0OiAzJTtcXG59XFxuXFxuI2ZhaHJlbmhlaXQtYnV0dG9uIHtcXG4gIG1hcmdpbi1sZWZ0OiAxdnc7XFxufVxcblxcbi5kYWlseS1mb3JlY2FzdC1idXR0b24tb2ZmIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDAsIDI0MiwgMjQwLCAwLjkpO1xcbiAgY29sb3I6ICNmM2FjNGM7XFxufVxcblxcbi5kYWlseS1mb3JlY2FzdC1idXR0b24tb24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YzYWM0YztcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYigyNDAsIDI0MiwgMjQwLCAwLjkpO1xcbiAgY29sb3I6IHJnYigyNDAsIDI0MiwgMjQwLCAwLjgpOztcXG59XFxuXFxuLmhvdXJseS1mb3JlY2FzdC1idXR0b24tb2ZmIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDAsIDI0MiwgMjQwLCAwLjkpO1xcbiAgY29sb3I6ICM0MzhjY2M7XFxufVxcblxcbi5ob3VybHktZm9yZWNhc3QtYnV0dG9uLW9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0MzhjY2M7XFxuICBjb2xvcjogcmdiKDI0MCwgMjQyLCAyNDAsIDAuOCk7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG59XFxuXFxuLmNlbHNpdXMtb2ZmIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDAsIDI0MiwgMjQwLCAwLjkpO1xcbiAgY29sb3I6ICM0MzhjY2M7XFxufVxcblxcbi5mYWhyZW5oZWl0LW9mZiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG4gIGNvbG9yOiAjZjNhYzRjO1xcbn1cXG5cXG4uY2Vsc2l1cy1vbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDM4Y2NjO1xcbiAgY29sb3I6IHJnYigyNDAsIDI0MiwgMjQwLCAwLjgpO1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiKDI0MCwgMjQyLCAyNDAsIDAuOSk7XFxufVxcblxcbi5mYWhyZW5oZWl0LW9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmM2FjNGM7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG4gIGNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC44KTs7XFxufVxcblxcbi5mb3JlY2FzdC1ob3VybHktb2ZmIHtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICB3aWR0aDogMDtcXG4gIGhlaWdodDogMDtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuLmZvcmVjYXN0LWRhaWx5LW9mZiB7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICBkaXNwbGF5OiBub25lO1xcbiAgd2lkdGg6IDA7XFxuICBoZWlnaHQ6IDA7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi5mb3JlY2FzdC1kYWlseS1vbiB7XFxuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMzYuNXZoO1xcbiAgZmxleC1mbG93OiByb3cgbm93cmFwO1xcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG59XFxuXFxuLm5leHQtZGFpbHktZm9yZWNhc3Qtb3BlbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1mbG93OiBjb2x1bW4gbm93cmFwO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHdpZHRoOiAxOHZ3O1xcbiAgaGVpZ2h0OiAzMHZoO1xcbiAgZm9udC1zaXplOiAwLjhlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDAsIDI0MiwgMjQwLCAwLjkpO1xcbiAgbWFyZ2luOiAwLjUlO1xcbn1cXG5cXG4uZm9yZWNhc3QtZGFpbHktb3BlbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1mbG93OiByb3cgbm93cmFwO1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHdpZHRoOiAxOHZ3O1xcbiAgaGVpZ2h0OiA1dmg7XFxufVxcblxcbi5mb3JlY2FzdC1kYWlseS1pdGVtLW9wZW4ge1xcbiAgbWFyZ2luOiAwO1xcbiAgbWFyZ2luLWxlZnQ6IDUlO1xcbiAgY29sb3I6ICM0MzhjY2M7XFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcbn1cXG5cXG4jbmV4dC1kYWlseS1mb3JlY2FzdC1kYXRlLXN2ZywgI25leHQtZGFpbHktZm9yZWNhc3QtdGltZS1zdmcsICNuZXh0LWRhaWx5LWZvcmVjYXN0LXRlbXAtc3ZnLCAjbmV4dC1kYWlseS1mb3JlY2FzdC1odW1pZGl0eS1zdmcsICNuZXh0LWRhaWx5LWZvcmVjYXN0LXdlYXRoZXItdHlwZS1zdmcsICNuZXh0LWRhaWx5LWZvcmVjYXN0LXdpbmQtc3ZnIHtcXG4gIGZpbHRlcjogaW52ZXJ0KDc5JSkgc2VwaWEoNzIlKSBzYXR1cmF0ZSg5MTMlKSBodWUtcm90YXRlKDMyM2RlZykgYnJpZ2h0bmVzcygxMDElKSBjb250cmFzdCg5MSUpO1xcbn1cXG5cXG4uZm9yZWNhc3QtaG91cmx5LW9uIHtcXG4gIHZpc2liaWxpdHk6IHZpc2libGU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAzNi41dmg7XFxuICBmbGV4LWZsb3c6IHJvdyBub3dyYXA7XFxuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG4jbmV4dC1ob3VybHktZm9yZWNhc3Qge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTMuNXZ3O1xcbiAgaGVpZ2h0OiAzMnZoO1xcbiAgZm9udC1zaXplOiAwLjg1ZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG4gIG1hcmdpbjogMC4yNSU7XFxufVxcblxcbi5mb3JlY2FzdC1ob3VybHktb3BlbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1mbG93OiByb3cgbm93cmFwO1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHdpZHRoOiAxMnZ3O1xcbiAgaGVpZ2h0OiA1dmg7XFxufVxcblxcbi5mb3JlY2FzdC1ob3VybHktaXRlbS1vcGVuIHtcXG4gIG1hcmdpbjogMDtcXG4gIG1hcmdpbi1sZWZ0OiA1JTtcXG4gIGNvbG9yOiAjNDM4Y2NjO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG59XFxuXFxuI25leHQtaG91cmx5LWZvcmVjYXN0LWRhdGUtc3ZnLCAjbmV4dC1ob3VybHktZm9yZWNhc3QtdGltZS1zdmcsICNuZXh0LWhvdXJseS1mb3JlY2FzdC10ZW1wLXN2ZywgI25leHQtaG91cmx5LWZvcmVjYXN0LWh1bWlkaXR5LXN2ZywgI25leHQtaG91cmx5LWZvcmVjYXN0LXdlYXRoZXItdHlwZS1zdmcsICNuZXh0LWhvdXJseS1mb3JlY2FzdC13aW5kLXN2ZyB7XFxuICBmaWx0ZXI6IGludmVydCg3OSUpIHNlcGlhKDcyJSkgc2F0dXJhdGUoOTEzJSkgaHVlLXJvdGF0ZSgzMjNkZWcpIGJyaWdodG5lc3MoMTAxJSkgY29udHJhc3QoOTElKTtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTsgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG5cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9IC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcblxuXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCB7IFxuICBnZXRDaXR5LFxuICByZW1vdmVQcmV2aW91c0luZm9ybWF0aW9uLFxuICBzaG93SG91cmx5Rm9yZWNhc3QsXG4gIHNob3dEYWlseUZvcmVjYXN0LFxuICBzaG93RmFocmVuaGVpdCxcbiAgc2hvd0NlbHNpdXNcbiB9IGZyb20gJy4vc2NyaXB0cy9hcHAuanMnO1xuXG5pbXBvcnQgeyBsb2FkTWVhc3VyZW1lbnRBbGVydCB9IGZyb20gJy4vc2NyaXB0cy9zZXNzaW9uU3RvcmFnZS5qcyc7XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIGdldENpdHkoKTtcbiAgbG9hZE1lYXN1cmVtZW50QWxlcnQoKTtcbn1cblxuKGZ1bmN0aW9uIGF0dGFjaEV2ZW50TGlzdGVuZXJzKCkge1xuICBjb25zdCBob3VybHlCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaG91cmx5LWZvcmVjYXN0LWJ1dHRvbicpO1xuICAgIGhvdXJseUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dIb3VybHlGb3JlY2FzdCk7XG5cbiAgY29uc3QgZGFpbHlCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGFpbHktZm9yZWNhc3QtYnV0dG9uJyk7XG4gICAgZGFpbHlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93RGFpbHlGb3JlY2FzdCk7XG5cbiAgY29uc3QgZmFocmVuaGVpdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmYWhyZW5oZWl0LWJ1dHRvbicpO1xuICAgIGZhaHJlbmhlaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93RmFocmVuaGVpdCk7XG4gIFxuICBjb25zdCBjZWxzaXVzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NlbHNpdXMtYnV0dG9uJyk7XG4gICAgY2Vsc2l1c0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dDZWxzaXVzKTtcblxuICBjb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtYmFyLWlucHV0Jyk7XG4gICAgc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICByZW1vdmVQcmV2aW91c0luZm9ybWF0aW9uKCk7XG4gICAgICAgIGdldENpdHkoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9KVxufSkoKTsiXSwibmFtZXMiOlsiZ2V0Q2l0eSIsInJlbW92ZVByZXZpb3VzSW5mb3JtYXRpb24iLCJzaG93SG91cmx5Rm9yZWNhc3QiLCJzaG93RGFpbHlGb3JlY2FzdCIsInNob3dGYWhyZW5oZWl0Iiwic2hvd0NlbHNpdXMiLCJkYXRlU3ZnSW1wb3J0IiwiZmVlbHNMaWtlU3ZnSW1wb3J0IiwiaHVtaWRpdHlTdmdJbXBvcnQiLCJsb2NhdGlvblN2Z0ltcG9ydCIsInNlYXJjaFN2Z0ltcG9ydCIsInRlbXBNYXhTdmdJbXBvcnQiLCJ0ZW1wTWluU3ZnSW1wb3J0IiwidGVtcFN2Z0ltcG9ydCIsInRpbWVTdmdJbXBvcnQiLCJ3ZWF0aGVyU3ZnSW1wb3J0Iiwid2luZFN2Z0ltcG9ydCIsInJldHJpZXZlZENpdHlOYW1lIiwicmV0cmlldmVkQ2l0eUxhdCIsInJldHJpZXZlZENpdHlMb24iLCJjb3JzQnlwYXNzIiwic2VhcmNoZWRDaXR5IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInZhbHVlIiwiZGVmYXVsdENpdHkiLCJsZW5ndGgiLCJjaXR5U2VhcmNoIiwiYXBpIiwiYW1vdW50VG9SZXRyaWV2ZSIsImxhbmd1YWdlIiwiYXBpS2V5Iiwic2VhcmNoQ2l0eSIsInJlc3BvbnNlIiwiZmV0Y2giLCJtb2RlIiwic2VhcmNoRGF0YSIsImpzb24iLCJsb2NhbF9uYW1lcyIsImVuIiwibGF0IiwibG9uIiwiZ2V0VG9kYXlzV2VhdGhlciIsImdldFdlYXRoZXJGb3JlY2FzdCIsImVycm9yIiwiY29uc29sZSIsImxvZyIsImFsZXJ0IiwidW5pdHMiLCJzZWFyY2hXZWF0aGVyIiwidGVtcCIsIndlYXRoZXJUeXBlIiwid2VhdGhlciIsIm1haW4iLCJkZXNjcmlwdGlvbiIsImNvdW50cnkiLCJzeXMiLCJmZWVsc0xpa2UiLCJodW1pZGl0eSIsInRlbXBNaW4iLCJ0ZW1wTWF4Iiwid2luZCIsInNwZWVkIiwiY2Vsc2l1c0J1dHRvbiIsInF1ZXJ5U2VsZWN0b3IiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImZhaHJlbmhlaXRUb0NlbHNpdXMiLCJmZWVsc19saWtlIiwidGVtcF9taW4iLCJ0ZW1wX21heCIsImFwcGVuZEN1cnJlbnRXZWF0aGVyIiwiZm9yZWNhc3RMaXN0IiwibGlzdCIsImJ1bmRsZUZvcmVjYXN0RGF0YSIsInRvZGF5IiwiRGF0ZSIsInRvRGF0ZVN0cmluZyIsInRpbWUiLCJ0b0xvY2FsZVRpbWVTdHJpbmciLCJsb2NhdGlvbkluZm9ybWF0aW9uIiwiY2l0eUNvbnRhaW5lciIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJjaXR5U3ZnIiwic3JjIiwiY2l0eSIsInRleHRDb250ZW50Iiwid2VhdGhlckRlc2NyaXB0aW9uQ29udGFpbmVyIiwid2VhdGhlckRlc2NyaXB0aW9uU3ZnIiwid2VhdGhlckRlc2NyaXB0aW9uIiwid2VhdGhlclRlbXBlcmF0dXJlQ29udGFpbmVyIiwid2VhdGhlclRlbXBlcmF0dXJlU3ZnIiwid2VhdGhlclRlbXBlcmF0dXJlIiwidG9kYXlzRGF0ZUNvbnRhaW5lciIsInRvZGF5c0RhdGVTdmciLCJ0b2RheXNEYXRlIiwidG9kYXlzVGltZUNvbnRhaW5lciIsInRvZGF5c1RpbWVTdmciLCJ0b2RheXNUaW1lIiwiYXBwZW5kQ2hpbGQiLCJsb2NhdGlvbkV4dHJhSW5mb3JtYXRpb24iLCJ3ZWF0aGVyRmVlbHNMaWtlQ29udGFpbmVyIiwid2VhdGhlckZlZWxzTGlrZVN2ZyIsIndlYXRoZXJGZWVsc0xpa2UiLCJ3ZWF0aGVySHVtaWRpdHlDb250YWluZXIiLCJ3ZWF0aGVySHVtaWRpdHlTdmciLCJ3ZWF0aGVySHVtaWRpdHkiLCJ3ZWF0aGVyTWluQ29udGFpbmVyIiwid2VhdGhlck1pblN2ZyIsIndlYXRoZXJNaW4iLCJ3ZWF0aGVyTWF4Q29udGFpbmVyIiwid2VhdGhlck1heFN2ZyIsIndlYXRoZXJNYXgiLCJ3aW5kU3BlZWRDb250YWluZXIiLCJ3aW5kU3BlZWRTdmciLCJ3aW5kU3BlZWQiLCJjb252ZXJ0RGF0ZSIsImRhdGUiLCJuZXh0MjFIb3VycyIsInNsaWNlIiwiZm9yRWFjaCIsIml0ZW0iLCJkdF90eHQiLCJhcHBlbmRIb3VybHlGb3JlY2FzdCIsImRhaWx5Rm9yZWNhc3QiLCJuZXh0RGF5Iiwic2Vjb25kRGF5IiwidGhpcmREYXkiLCJmb3VydGhEYXkiLCJmaWZ0aERheSIsInB1c2giLCJhcHBlbmREYWlseUZvcmVjYXN0IiwiZm9yZUNhc3RIb3VybHkiLCJuZXh0SG91cmx5Rm9yZWNhc3QiLCJhZGQiLCJuZXh0SG91cmx5Rm9yZWNhc3REYXRlQ29udGFpbmVyIiwibmV4dEhvdXJseUZvcmVjYXN0RGF0ZVN2ZyIsIm5leHRIb3VybHlGb3JlY2FzdERhdGUiLCJuZXh0SG91cmx5Rm9yZWNhc3RUaW1lQ29udGFpbmVyIiwibmV4dEhvdXJseUZvcmVjYXN0VGltZVN2ZyIsIm5leHRIb3VybHlGb3JlY2FzdFRpbWUiLCJuZXh0SG91cmx5Rm9yZWNhc3RUZW1wQ29udGFpbmVyIiwibmV4dEhvdXJseUZvcmVjYXN0VGVtcFN2ZyIsIm5leHRIb3VybHlGb3JlY2FzdFRlbXAiLCJuZXh0SG91cmx5Rm9yZWNhc3RIdW1pZGl0eUNvbnRhaW5lciIsIm5leHRIb3VybHlGb3JlY2FzdEh1bWlkaXR5U3ZnIiwibmV4dEhvdXJseUZvcmVjYXN0SHVtaWRpdHkiLCJuZXh0SG91cmx5Rm9yZWNhc3RXZWF0aGVyVHlwZUNvbnRhaW5lciIsIm5leHRIb3VybHlGb3JlY2FzdFdlYXRoZXJUeXBlU3ZnIiwibmV4dEhvdXJseUZvcmVjYXN0V2VhdGhlclR5cGUiLCJuZXh0SG91cmx5Rm9yZWNhc3RXaW5kQ29udGFpbmVyIiwibmV4dEhvdXJseUZvcmVjYXN0V2luZFN2ZyIsIm5leHRIb3VybHlGb3JlY2FzdFdpbmQiLCJmb3JlQ2FzdERhaWx5IiwibmV4dERhaWx5Rm9yZWNhc3QiLCJuZXh0RGFpbHlGb3JlY2FzdERhdGVDb250YWluZXIiLCJuZXh0RGFpbHlGb3JlY2FzdERhdGVTdmciLCJuZXh0RGFpbHlGb3JlY2FzdERhdGUiLCJuZXh0RGFpbHlGb3JlY2FzdFRpbWVDb250YWluZXIiLCJuZXh0RGFpbHlGb3JlY2FzdFRpbWVTdmciLCJuZXh0RGFpbHlGb3JlY2FzdFRpbWUiLCJuZXh0RGFpbHlGb3JlY2FzdFRlbXBDb250YWluZXIiLCJuZXh0RGFpbHlGb3JlY2FzdFRlbXBTdmciLCJuZXh0RGFpbHlGb3JlY2FzdFRlbXAiLCJuZXh0RGFpbHlGb3JlY2FzdEh1bWlkaXR5Q29udGFpbmVyIiwibmV4dERhaWx5Rm9yZWNhc3RIdW1pZGl0eVN2ZyIsIm5leHREYWlseUZvcmVjYXN0SHVtaWRpdHkiLCJuZXh0RGFpbHlGb3JlY2FzdFdlYXRoZXJUeXBlQ29udGFpbmVyIiwibmV4dERhaWx5Rm9yZWNhc3RXZWF0aGVyVHlwZVN2ZyIsIm5leHREYWlseUZvcmVjYXN0V2VhdGhlclR5cGUiLCJuZXh0RGFpbHlGb3JlY2FzdFdpbmRDb250YWluZXIiLCJuZXh0RGFpbHlGb3JlY2FzdFdpbmRTdmciLCJuZXh0RGFpbHlGb3JlY2FzdFdpbmQiLCJkYWlseUZvcmVjYXN0QnV0dG9uIiwiaG91cmx5Rm9yZWNhc3RCdXR0b24iLCJmb3JlY2FzdERhaWx5IiwiZm9yZWNhc3RIb3VybHkiLCJyZW1vdmUiLCJyZW1vdmVBbGxDaGlsZE5vZGVzIiwicGFyZW50IiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwiZmFocmVuaGVpdEJ1dHRvbiIsImZpcnN0QWxlcnQiLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJzZXRJdGVtIiwibnVtYmVyIiwidG90YWwiLCJyb3VuZGVkIiwiTWF0aCIsInJvdW5kIiwibG9hZE1lYXN1cmVtZW50QWxlcnQiLCJ3aW5kb3ciLCJvbmxvYWQiLCJhdHRhY2hFdmVudExpc3RlbmVycyIsImhvdXJseUJ1dHRvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJkYWlseUJ1dHRvbiIsInNlYXJjaElucHV0IiwiZSIsImtleUNvZGUiXSwic291cmNlUm9vdCI6IiJ9