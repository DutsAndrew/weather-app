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
/* harmony import */ var _svgs_temp_max_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../svgs/temp-max.svg */ "./src/svgs/temp-max.svg");
/* harmony import */ var _svgs_temp_min_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../svgs/temp-min.svg */ "./src/svgs/temp-min.svg");
/* harmony import */ var _svgs_temp_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../svgs/temp.svg */ "./src/svgs/temp.svg");
/* harmony import */ var _svgs_time_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../svgs/time.svg */ "./src/svgs/time.svg");
/* harmony import */ var _svgs_weather_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../svgs/weather.svg */ "./src/svgs/weather.svg");
/* harmony import */ var _svgs_wind_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../svgs/wind.svg */ "./src/svgs/wind.svg");











let retrievedCityName;
let retrievedCityLat;
let retrievedCityLon;

async function getCity() {
  let cityInput = document.getElementById('search-bar-input').value,
      defaultCity = 'Reykjavík';

  if (cityInput.length === 0) {
    cityInput = defaultCity;
  }

  const api = 'https://api.openweathermap.org/geo/1.0/direct?q=',
        amountToRetrieve = '&limit=1',
        apiKey = '&appid=6c89c21bfc11d403be41f489af3b2eae',
        searchCity = api + cityInput + amountToRetrieve + apiKey;

  try {
    const response = await fetch(searchCity),
          searchData = await response.json();
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
  const api = 'https://api.openweathermap.org/data/2.5/weather?',
        lat = "&lat=".concat(retrievedCityLat),
        lon = "&lon=".concat(retrievedCityLon),
        units = '&units=imperial',
        apiKey = '&appid=6c89c21bfc11d403be41f489af3b2eae',
        searchWeather = api + lat + lon + apiKey + units;

  try {
    const response = await fetch(searchWeather, {
      mode: 'cors'
    });
    const searchData = await response.json(); // variables for information to be appended to the DOM for weather display

    const weatherType = searchData.weather[0].main,
          description = searchData.weather[0].description,
          country = searchData.sys.country,
          humidity = searchData.main.humidity,
          wind = searchData.wind.speed;
    let temp, feelsLike, tempMin, tempMax; //checks if celsius button is on for conversion

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
  const api = 'https://api.openweathermap.org/data/2.5/forecast?',
        lat = "&lat=".concat(retrievedCityLat),
        lon = "&lon=".concat(retrievedCityLon),
        language = '&lang=en',
        units = '&units=imperial',
        apiKey = '&appid=6c89c21bfc11d403be41f489af3b2eae',
        searchWeather = api + lat + lon + apiKey + language + units;

  try {
    const response = await fetch(searchWeather, {
      mode: 'cors'
    }),
          searchData = await response.json(),
          forecastList = searchData.list;
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
  const cityContainer = document.createElement('div');
  cityContainer.setAttribute('id', 'city-container');
  const citySvg = document.createElement('img');
  citySvg.setAttribute('id', 'city-svg');
  citySvg.src = _svgs_location_svg__WEBPACK_IMPORTED_MODULE_3__;
  const city = document.createElement('p');
  city.setAttribute('id', 'city-name');
  city.textContent = "".concat(retrievedCityName, ", ").concat(country);
  const weatherDescriptionContainer = document.createElement('div');
  weatherDescriptionContainer.setAttribute('id', 'weather-description-container');
  const weatherDescriptionSvg = document.createElement('img');
  weatherDescriptionSvg.setAttribute('id', 'weather-description-svg');
  weatherDescriptionSvg.src = _svgs_weather_svg__WEBPACK_IMPORTED_MODULE_8__;
  const weatherDescription = document.createElement('p');
  weatherDescription.setAttribute('id', 'weather-description');
  weatherDescription.textContent = "".concat(weatherType, ", ").concat(description);
  const weatherTemperatureContainer = document.createElement('div');
  weatherTemperatureContainer.setAttribute('id', 'weather-temperature-container');
  const weatherTemperatureSvg = document.createElement('img');
  weatherTemperatureSvg.setAttribute('id', 'weather-temperature-svg');
  weatherTemperatureSvg.src = _svgs_temp_svg__WEBPACK_IMPORTED_MODULE_6__;
  const weatherTemperature = document.createElement('p');
  weatherTemperature.setAttribute('id', 'weather-temperature');
  const todaysDateContainer = document.createElement('div');
  todaysDateContainer.setAttribute('id', 'todays-date-container');
  const todaysDateSvg = document.createElement('img');
  todaysDateSvg.setAttribute('id', 'todays-date-svg');
  todaysDateSvg.src = _svgs_date_svg__WEBPACK_IMPORTED_MODULE_0__;
  const todaysDate = document.createElement('p');
  todaysDate.setAttribute('id', 'todays-date');
  todaysDate.textContent = "".concat(today);
  const todaysTimeContainer = document.createElement('div');
  todaysTimeContainer.setAttribute('id', 'todays-time-container');
  const todaysTimeSvg = document.createElement('img');
  todaysTimeSvg.setAttribute('id', 'todays-time-svg');
  todaysTimeSvg.src = _svgs_time_svg__WEBPACK_IMPORTED_MODULE_7__;
  const todaysTime = document.createElement('p');
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
  const weatherFeelsLikeContainer = document.createElement('div');
  weatherFeelsLikeContainer.setAttribute('id', 'weather-feels-like-container');
  const weatherFeelsLikeSvg = document.createElement('img');
  weatherFeelsLikeSvg.setAttribute('id', 'weather-feels-like-svg');
  weatherFeelsLikeSvg.src = _svgs_feels_like_svg__WEBPACK_IMPORTED_MODULE_1__;
  const weatherFeelsLike = document.createElement('p');
  weatherFeelsLike.setAttribute('id', 'weather-feels-like');
  const weatherHumidityContainer = document.createElement('div');
  weatherHumidityContainer.setAttribute('id', 'weather-humidity-container');
  const weatherHumiditySvg = document.createElement('img');
  weatherHumiditySvg.setAttribute('id', 'weather-humidity-svg');
  weatherHumiditySvg.src = _svgs_humidity_svg__WEBPACK_IMPORTED_MODULE_2__;
  const weatherHumidity = document.createElement('p');
  weatherHumidity.setAttribute('id', 'weather-humidity');
  weatherHumidity.textContent = "Humidity: ".concat(humidity, " %");
  const weatherMinContainer = document.createElement('div');
  weatherMinContainer.setAttribute('id', 'weather-min-container');
  const weatherMinSvg = document.createElement('img');
  weatherMinSvg.setAttribute('id', 'weather-min-svg');
  weatherMinSvg.src = _svgs_temp_min_svg__WEBPACK_IMPORTED_MODULE_5__;
  const weatherMin = document.createElement('p');
  weatherMin.setAttribute('id', 'weather-min');
  const weatherMaxContainer = document.createElement('div');
  weatherMaxContainer.setAttribute('id', 'weather-max-container');
  const weatherMaxSvg = document.createElement('img');
  weatherMaxSvg.setAttribute('id', 'weather-max-svg');
  weatherMaxSvg.src = _svgs_temp_max_svg__WEBPACK_IMPORTED_MODULE_4__;
  const weatherMax = document.createElement('p');
  weatherMax.setAttribute('id', 'weather-max');
  const windSpeedContainer = document.createElement('div');
  windSpeedContainer.setAttribute('id', 'wind-speed-container');
  const windSpeedSvg = document.createElement('img');
  windSpeedSvg.setAttribute('id', 'wind-speed-svg');
  windSpeedSvg.src = _svgs_wind_svg__WEBPACK_IMPORTED_MODULE_9__;
  const windSpeed = document.createElement('p');
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

  const next21Hours = forecastList.slice(0, 7);
  next21Hours.forEach(function (item) {
    const date = convertDate(item.dt_txt.slice(0, 10)),
          time = item.dt_txt.slice(11, 19),
          humidity = item.main.humidity,
          weatherType = item.weather[0].main,
          weatherDescription = item.weather[0].description,
          windSpeed = item.wind.speed;
    let temp = item.main.temp; //checks if celsius button is on for conversion

    if (celsiusButton.classList.contains('celsius-on')) {
      temp = fahrenheitToCelsius(item.main.temp);
    } else {
      temp = item.main.temp;
    }

    appendHourlyForecast(date, time, temp, humidity, weatherType, weatherDescription, windSpeed);
  }); // Daily forecast bundle

  const dailyForecast = [],
        nextDay = forecastList.slice(7, 8),
        secondDay = forecastList.slice(15, 16),
        thirdDay = forecastList.slice(23, 24),
        fourthDay = forecastList.slice(31, 32),
        fifthDay = forecastList.slice(39, 40);
  dailyForecast.push(nextDay, secondDay, thirdDay, fourthDay, fifthDay);
  dailyForecast.forEach(function (item) {
    const date = convertDate(item[0].dt_txt.slice(0, 10)),
          time = item[0].dt_txt.slice(11, 19),
          humidity = item[0].main.humidity,
          weatherType = item[0].weather[0].main,
          weatherDescription = item[0].weather[0].description,
          windSpeed = item[0].wind.speed;
    let temp = item[0].main.temp; //checks if celsius button is on for conversion

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
  const nextHourlyForecast = document.createElement('div');
  nextHourlyForecast.setAttribute('id', 'next-hourly-forecast');
  nextHourlyForecast.classList.add('forecast-hourly-open');
  const nextHourlyForecastDateContainer = document.createElement('div');
  nextHourlyForecastDateContainer.setAttribute('id', 'next-hourly-forecast-date-container');
  nextHourlyForecastDateContainer.classList.add('forecast-hourly-open');
  const nextHourlyForecastDateSvg = document.createElement('img');
  nextHourlyForecastDateSvg.setAttribute('id', 'next-hourly-forecast-date-svg');
  nextHourlyForecastDateSvg.classList.add('forecast-hourly-item-open');
  nextHourlyForecastDateSvg.src = _svgs_date_svg__WEBPACK_IMPORTED_MODULE_0__;
  const nextHourlyForecastDate = document.createElement('p');
  nextHourlyForecastDate.setAttribute('id', 'next-hourly-forecast-date');
  nextHourlyForecastDate.classList.add('forecast-hourly-item-open');
  nextHourlyForecastDate.textContent = "".concat(date);
  const nextHourlyForecastTimeContainer = document.createElement('div');
  nextHourlyForecastTimeContainer.setAttribute('id', 'next-hourly-forecast-time-container');
  nextHourlyForecastTimeContainer.classList.add('forecast-hourly-open');
  const nextHourlyForecastTimeSvg = document.createElement('img');
  nextHourlyForecastTimeSvg.setAttribute('id', 'next-hourly-forecast-time-svg');
  nextHourlyForecastTimeSvg.classList.add('forecast-hourly-item-open');
  nextHourlyForecastTimeSvg.src = _svgs_time_svg__WEBPACK_IMPORTED_MODULE_7__;
  const nextHourlyForecastTime = document.createElement('p');
  nextHourlyForecastTime.setAttribute('id', 'next-hourly-forecast-time');
  nextHourlyForecastTime.classList.add('forecast-hourly-item-open');
  nextHourlyForecastTime.textContent = "".concat(time);
  const nextHourlyForecastTempContainer = document.createElement('div');
  nextHourlyForecastTempContainer.setAttribute('id', 'next-hourly-forecast-temp-container');
  nextHourlyForecastTempContainer.classList.add('forecast-hourly-open');
  const nextHourlyForecastTempSvg = document.createElement('img');
  nextHourlyForecastTempSvg.setAttribute('id', 'next-hourly-forecast-temp-svg');
  nextHourlyForecastTempSvg.classList.add('forecast-hourly-item-open');
  nextHourlyForecastTempSvg.src = _svgs_temp_svg__WEBPACK_IMPORTED_MODULE_6__;
  const nextHourlyForecastTemp = document.createElement('p');
  nextHourlyForecastTemp.setAttribute('id', 'next-hourly-forecast-temp');
  nextHourlyForecastTemp.classList.add('forecast-hourly-item-open');
  const nextHourlyForecastHumidityContainer = document.createElement('div');
  nextHourlyForecastHumidityContainer.setAttribute('id', 'next-hourly-forecast-humidity-container');
  nextHourlyForecastHumidityContainer.classList.add('forecast-hourly-open');
  const nextHourlyForecastHumiditySvg = document.createElement('img');
  nextHourlyForecastHumiditySvg.setAttribute('id', 'next-hourly-forecast-humidity-svg');
  nextHourlyForecastHumiditySvg.classList.add('forecast-hourly-item-open');
  nextHourlyForecastHumiditySvg.src = _svgs_humidity_svg__WEBPACK_IMPORTED_MODULE_2__;
  const nextHourlyForecastHumidity = document.createElement('p');
  nextHourlyForecastHumidity.setAttribute('id', 'next-hourly-forecast-humidity');
  nextHourlyForecastHumidity.classList.add('forecast-hourly-item-open');
  nextHourlyForecastHumidity.textContent = "Humidity: ".concat(humidity, " %");
  const nextHourlyForecastWeatherTypeContainer = document.createElement('div');
  nextHourlyForecastWeatherTypeContainer.setAttribute('id', 'next-hourly-forecast-weather-type-container');
  nextHourlyForecastWeatherTypeContainer.classList.add('forecast-hourly-open');
  const nextHourlyForecastWeatherTypeSvg = document.createElement('img');
  nextHourlyForecastWeatherTypeSvg.setAttribute('id', 'next-hourly-forecast-weather-type-svg');
  nextHourlyForecastWeatherTypeSvg.classList.add('forecast-hourly-item-open');
  nextHourlyForecastWeatherTypeSvg.src = _svgs_weather_svg__WEBPACK_IMPORTED_MODULE_8__;
  const nextHourlyForecastWeatherType = document.createElement('p');
  nextHourlyForecastWeatherType.setAttribute('id', 'next-hourly-forecast-weather-type');
  nextHourlyForecastWeatherType.classList.add('forecast-hourly-item-open');
  nextHourlyForecastWeatherType.textContent = "".concat(weatherType, ", ").concat(weatherDescription);
  const nextHourlyForecastWindContainer = document.createElement('div');
  nextHourlyForecastWindContainer.setAttribute('id', 'next-hourly-forecast-wind-container');
  nextHourlyForecastWindContainer.classList.add('forecast-hourly-open');
  const nextHourlyForecastWindSvg = document.createElement('img');
  nextHourlyForecastWindSvg.setAttribute('id', 'next-hourly-forecast-wind-svg');
  nextHourlyForecastWindSvg.classList.add('forecast-hourly-item-open');
  nextHourlyForecastWindSvg.src = _svgs_wind_svg__WEBPACK_IMPORTED_MODULE_9__;
  const nextHourlyForecastWind = document.createElement('p');
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
  const nextDailyForecast = document.createElement('div');
  nextDailyForecast.setAttribute('id', 'next-daily-forecast');
  nextDailyForecast.classList.add('next-daily-forecast-open');
  const nextDailyForecastDateContainer = document.createElement('div');
  nextDailyForecastDateContainer.setAttribute('id', 'next-daily-forecast-date-container');
  nextDailyForecastDateContainer.classList.add('forecast-daily-open');
  const nextDailyForecastDateSvg = document.createElement('img');
  nextDailyForecastDateSvg.setAttribute('id', 'next-daily-forecast-date-svg');
  nextDailyForecastDateSvg.classList.add('forecast-daily-item-open');
  nextDailyForecastDateSvg.src = _svgs_date_svg__WEBPACK_IMPORTED_MODULE_0__;
  const nextDailyForecastDate = document.createElement('p');
  nextDailyForecastDate.setAttribute('id', 'next-daily-forecast-date');
  nextDailyForecastDate.classList.add('forecast-daily-item-open');
  nextDailyForecastDate.textContent = "".concat(date);
  const nextDailyForecastTimeContainer = document.createElement('div');
  nextDailyForecastTimeContainer.setAttribute('id', 'next-daily-forecast-time-container');
  nextDailyForecastTimeContainer.classList.add('forecast-daily-open');
  const nextDailyForecastTimeSvg = document.createElement('img');
  nextDailyForecastTimeSvg.setAttribute('id', 'next-daily-forecast-time-svg');
  nextDailyForecastTimeSvg.classList.add('forecast-daily-item-open');
  nextDailyForecastTimeSvg.src = _svgs_time_svg__WEBPACK_IMPORTED_MODULE_7__;
  const nextDailyForecastTime = document.createElement('p');
  nextDailyForecastTime.setAttribute('id', 'next-daily-forecast-time');
  nextDailyForecastTime.classList.add('forecast-daily-item-open');
  nextDailyForecastTime.textContent = "".concat(time);
  const nextDailyForecastTempContainer = document.createElement('div');
  nextDailyForecastTempContainer.setAttribute('id', 'next-daily-forecast-temp-container');
  nextDailyForecastTempContainer.classList.add('forecast-daily-open');
  const nextDailyForecastTempSvg = document.createElement('img');
  nextDailyForecastTempSvg.setAttribute('id', 'next-daily-forecast-temp-svg');
  nextDailyForecastTempSvg.classList.add('forecast-daily-item-open');
  nextDailyForecastTempSvg.src = _svgs_temp_svg__WEBPACK_IMPORTED_MODULE_6__;
  const nextDailyForecastTemp = document.createElement('p');
  nextDailyForecastTemp.setAttribute('id', 'next-daily-forecast-temp');
  nextDailyForecastTemp.classList.add('forecast-daily-item-open');
  const nextDailyForecastHumidityContainer = document.createElement('div');
  nextDailyForecastHumidityContainer.setAttribute('id', 'next-daily-forecast-humidity-container');
  nextDailyForecastHumidityContainer.classList.add('forecast-daily-open');
  const nextDailyForecastHumiditySvg = document.createElement('img');
  nextDailyForecastHumiditySvg.setAttribute('id', 'next-daily-forecast-humidity-svg');
  nextDailyForecastHumiditySvg.classList.add('forecast-daily-item-open');
  nextDailyForecastHumiditySvg.src = _svgs_humidity_svg__WEBPACK_IMPORTED_MODULE_2__;
  const nextDailyForecastHumidity = document.createElement('p');
  nextDailyForecastHumidity.setAttribute('id', 'next-daily-forecast-humidity');
  nextDailyForecastHumidity.classList.add('forecast-daily-item-open');
  nextDailyForecastHumidity.textContent = "Humidity: ".concat(humidity, " %");
  const nextDailyForecastWeatherTypeContainer = document.createElement('div');
  nextDailyForecastWeatherTypeContainer.setAttribute('id', 'next-daily-forecast-weather-type-container');
  nextDailyForecastWeatherTypeContainer.classList.add('forecast-daily-open');
  const nextDailyForecastWeatherTypeSvg = document.createElement('img');
  nextDailyForecastWeatherTypeSvg.setAttribute('id', 'next-daily-forecast-weather-type-svg');
  nextDailyForecastWeatherTypeSvg.classList.add('forecast-daily-item-open');
  nextDailyForecastWeatherTypeSvg.src = _svgs_weather_svg__WEBPACK_IMPORTED_MODULE_8__;
  const nextDailyForecastWeatherType = document.createElement('p');
  nextDailyForecastWeatherType.setAttribute('id', 'next-daily-forecast-weather-type');
  nextDailyForecastWeatherType.classList.add('forecast-daily-item-open');
  nextDailyForecastWeatherType.textContent = "".concat(weatherType, ", ").concat(weatherDescription);
  const nextDailyForecastWindContainer = document.createElement('div');
  nextDailyForecastWindContainer.setAttribute('id', 'next-daily-forecast-wind-container');
  nextDailyForecastWindContainer.classList.add('forecast-daily-open');
  const nextDailyForecastWindSvg = document.createElement('img');
  nextDailyForecastWindSvg.setAttribute('id', 'next-daily-forecast-wind-svg');
  nextDailyForecastWindSvg.classList.add('forecast-daily-item-open');
  nextDailyForecastWindSvg.src = _svgs_wind_svg__WEBPACK_IMPORTED_MODULE_9__;
  const nextDailyForecastWind = document.createElement('p');
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
  const dailyForecastButton = document.querySelector('#daily-forecast-button'),
        hourlyForecastButton = document.querySelector('#hourly-forecast-button'),
        forecastDaily = document.querySelector('#forecast-daily'),
        forecastHourly = document.querySelector('#forecast-hourly');

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
  const dailyForecastButton = document.querySelector('#daily-forecast-button'),
        hourlyForecastButton = document.querySelector('#hourly-forecast-button'),
        forecastDaily = document.querySelector('#forecast-daily'),
        forecastHourly = document.querySelector('#forecast-hourly');

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
  const locationInformation = document.querySelector('#location-information'),
        locationExtraInformation = document.querySelector('#location-extra-information'),
        forecastHourly = document.querySelector('#forecast-hourly'),
        forecastDaily = document.querySelector('#forecast-daily');
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
  const fahrenheitButton = document.querySelector('#fahrenheit-button'),
        celsiusButton = document.querySelector('#celsius-button'); // informs user on when to expect to see the celsius/fahrenheit reading change. It only shows it once per session

  const firstAlert = sessionStorage.getItem('first-alert');

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
  const fahrenheitButton = document.querySelector('#fahrenheit-button'),
        celsiusButton = document.querySelector('#celsius-button'); // informs user on when to expect to see the celsius/fahrenheit reading change. It only shows it once per session

  const firstAlert = sessionStorage.getItem('first-alert');

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
  const total = (number - 32) * 5 / 9,
        rounded = Math.round(total * 10) / 10;
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
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  font-family: 'Roboto Mono', monospace, 'Fredoka', sans-serif;\n}\n\n#background {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size: cover;\n  width: 100vw;\n  height: 100vh;\n}\n\n#header {\n  width: 100vw;\n  height: 10vh;\n  display: flex;\n  align-items: center;\n}\n\n#header-left {\n  display: flex;\n  width: 50vw;\n  height: 10vh;\n  align-items: center;\n}\n\n#header-title-first {\n  padding-left: 4%;\n  font-size: 2.5em;\n  font-weight: bolder;\n  color: #f3ac4c;\n}\n\n#header-title-second {\n  font-size: 2.5em;\n  font-weight: bolder;\n  color: #438ccc;\n}\n\n#header-icon {\n  display: flex;\n  width: 4em;\n  height: 4em;\n  padding-left: 4%;\n}\n\n#header-right {\n  display: flex;\n  width: 50vw;\n  justify-content: flex-end;\n  padding-right: 4%;\n  align-items: center;\n}\n\nlabel {\n  position: relative;\n}\n\nlabel:before {\n  content: \"\";\n  position: absolute;\n  left: 10px;\n  top: 0;\n  bottom: 0;\n  width: 1.5em;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") center / contain no-repeat;\n  filter: invert(79%) sepia(72%) saturate(913%) hue-rotate(323deg) brightness(101%) contrast(91%);\n}\n\n#search-bar-input {\n  width: 15vw;\n  height: 5vh;\n  font-size: 1.5em;\n  padding-left: 16%;\n  color: #438ccc;\n}\n\n#app {\n  display: flex;\n  width: 100vw;\n  height: 90vh;\n  flex-flow: column nowrap;\n\n}\n\n#app-top {\n  display: flex;\n  height: 50vh;\n  width: 100vw;\n}\n\n#app-top-left {\n  display: flex;\n  width: 45vw;\n  height: 50vh;\n}\n\n#location-information {\n  display: flex;\n  width: 45vw;\n  height: 40vh;\n  flex-flow: row wrap;\n  align-content: center;\n  justify-content: flex-start;\n  align-items: center;\n  margin-top: 5%;\n  margin-left: 5%;\n}\n\n#city-container, #weather-description-container, #weather-temperature-container, #todays-date-container, #todays-time-container {\n  display: flex;\n  width: 45vw;\n  height: 5vh;\n  align-items: center;\n  background-color: rgb(240, 242, 240, 0.9);\n  margin: 0;\n  width: 40vw;\n  padding: 2%;\n}\n\n#city-svg, #weather-description-svg, #weather-temperature-svg, #todays-date-svg, #todays-time-svg {\n  display: flex;\n  width: 2.5em;\n  height: 2.5em;\n  filter: invert(79%) sepia(72%) saturate(913%) hue-rotate(323deg) brightness(101%) contrast(91%);\n  padding-right: 5%;\n}\n\n#city-name, #weather-temperature, #todays-time, #weather-description, #todays-date {\n  font-size: 2em;\n  font-weight: bolder;\n  color: #f3ac4c;\n}\n\n#app-top-right {\n  display: flex;\n  width: 45vw;\n  height: 50vh;\n}\n\n#location-extra-information {\n  display: flex;\n  width: 45vw;\n  height: 40vh;\n  flex-flow: row wrap;\n  align-content: center;\n  justify-content: flex-start;\n  align-items: center;\n  margin-top: 5%;\n  margin-left: 16.5%;\n}\n\n#weather-feels-like-container, #weather-humidity-container, #weather-min-container, #weather-max-container, #wind-speed-container {\n  display: flex;\n  width: 45vw;\n  height: 5vh;\n  align-items: center;\n  background-color: rgb(240, 242, 240, 0.9);\n  margin: 0;\n  padding: 2%;\n}\n\n#weather-feels-like-svg, #weather-humidity-svg, #weather-min-svg, #weather-max-svg, #wind-speed-svg, #next-daily-forecast-weather-type-svg, #next-hourly-forecast-weather-type-svg {\n  display: flex;\n  width: 2.5em;\n  height: 2.5em;\n  filter: invert(54%) sepia(34%) saturate(861%) hue-rotate(166deg) brightness(88%) contrast(88%);\n  padding-right: 5%;\n}\n\n#weather-feels-like, #weather-humidity, #weather-min, #weather-max, #wind-speed {\n  font-size: 2em;\n  font-weight: bolder;\n  color: #438ccc;\n}\n\n#app-bottom {\n  display:flex;\n  width: 100vw;\n  height: 50vh;\n  flex-flow: column nowrap;\n  align-content: flex-start;\n  justify-content: flex-start;\n  align-items: flex-start;\n}\n\n#information-switcher {\n  display: flex;\n  width: 10vw;\n  height: 3.5vh;\n  flex-flow: row nowrap;\n  align-content: center;\n  justify-content: flex-start;\n  align-items: center;\n  padding-left: 2.75%;\n}\n\n#daily-forecast-button, #hourly-forecast-button, #fahrenheit-button, #celsius-button {\n  width: 8vw;\n  height: 3.5vh;\n  font-size: 1em;\n  font-weight: bolder;\n  border-radius: 10%;\n  margin-left: 3%;\n}\n\n#fahrenheit-button {\n  margin-left: 1vw;\n}\n\n.daily-forecast-button-off {\n  background-color: rgb(240, 242, 240, 0.9);\n  color: #f3ac4c;\n}\n\n.daily-forecast-button-on {\n  background-color: #f3ac4c;\n  border: 1px solid rgb(240, 242, 240, 0.9);\n  color: rgb(240, 242, 240, 0.8);;\n}\n\n.hourly-forecast-button-off {\n  background-color: rgb(240, 242, 240, 0.9);\n  color: #438ccc;\n}\n\n.hourly-forecast-button-on {\n  background-color: #438ccc;\n  color: rgb(240, 242, 240, 0.8);\n  border: 1px solid rgb(240, 242, 240, 0.9);\n}\n\n.celsius-off {\n  background-color: rgb(240, 242, 240, 0.9);\n  color: #438ccc;\n}\n\n.fahrenheit-off {\n  background-color: rgb(240, 242, 240, 0.9);\n  color: #f3ac4c;\n}\n\n.celsius-on {\n  background-color: #438ccc;\n  color: rgb(240, 242, 240, 0.8);\n  border: 1px solid rgb(240, 242, 240, 0.9);\n}\n\n.fahrenheit-on {\n  background-color: #f3ac4c;\n  border: 1px solid rgb(240, 242, 240, 0.9);\n  color: rgb(240, 242, 240, 0.8);;\n}\n\n.forecast-hourly-off {\n  visibility: hidden;\n  display: none;\n  width: 0;\n  height: 0;\n  margin: 0;\n}\n\n.forecast-daily-off {\n  visibility: hidden;\n  display: none;\n  width: 0;\n  height: 0;\n  margin: 0;\n}\n\n.forecast-daily-on {\n  visibility: visible;\n  display: flex;\n  width: 100vw;\n  height: 36.5vh;\n  flex-flow: row nowrap;\n  align-content: center;\n  justify-content: center;\n  align-items: flex-start;\n}\n\n.next-daily-forecast-open {\n  display: flex;\n  flex-flow: column nowrap;\n  align-items: center;\n  width: 18vw;\n  height: 30vh;\n  font-size: 0.8em;\n  background-color: rgb(240, 242, 240, 0.9);\n  margin: 0.5%;\n}\n\n.forecast-daily-open {\n  display: flex;\n  flex-flow: row nowrap;\n  justify-content: flex-start;\n  align-items: center;\n  width: 18vw;\n  height: 5vh;\n}\n\n.forecast-daily-item-open {\n  margin: 0;\n  margin-left: 5%;\n  color: #438ccc;\n  font-weight: bolder;\n}\n\n#next-daily-forecast-date-svg, #next-daily-forecast-time-svg, #next-daily-forecast-temp-svg, #next-daily-forecast-humidity-svg, #next-daily-forecast-weather-type-svg, #next-daily-forecast-wind-svg {\n  filter: invert(79%) sepia(72%) saturate(913%) hue-rotate(323deg) brightness(101%) contrast(91%);\n}\n\n.forecast-hourly-on {\n  visibility: visible;\n  display: flex;\n  width: 100vw;\n  height: 36.5vh;\n  flex-flow: row nowrap;\n  align-content: center;\n  justify-content: center;\n  align-items: flex-start;\n}\n\n#next-hourly-forecast {\n  display: flex;\n  flex-flow: column nowrap;\n  align-items: center;\n  width: 13.5vw;\n  height: 32vh;\n  font-size: 0.85em;\n  background-color: rgb(240, 242, 240, 0.9);\n  margin: 0.25%;\n}\n\n.forecast-hourly-open {\n  display: flex;\n  flex-flow: row nowrap;\n  justify-content: flex-start;\n  align-items: center;\n  width: 12vw;\n  height: 5vh;\n}\n\n.forecast-hourly-item-open {\n  margin: 0;\n  margin-left: 5%;\n  color: #438ccc;\n  font-weight: bolder;\n}\n\n#next-hourly-forecast-date-svg, #next-hourly-forecast-time-svg, #next-hourly-forecast-temp-svg, #next-hourly-forecast-humidity-svg, #next-hourly-forecast-weather-type-svg, #next-hourly-forecast-wind-svg {\n  filter: invert(79%) sepia(72%) saturate(913%) hue-rotate(323deg) brightness(101%) contrast(91%);\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAEA;EACE,4DAA4D;AAC9D;;AAEA;EACE,yDAAiD;EACjD,sBAAsB;EACtB,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,WAAW;EACX,YAAY;EACZ,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;EAChB,gBAAgB;EAChB,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,gBAAgB;EAChB,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,UAAU;EACV,WAAW;EACX,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,WAAW;EACX,yBAAyB;EACzB,iBAAiB;EACjB,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,UAAU;EACV,MAAM;EACN,SAAS;EACT,YAAY;EACZ,8EAA+D;EAC/D,+FAA+F;AACjG;;AAEA;EACE,WAAW;EACX,WAAW;EACX,gBAAgB;EAChB,iBAAiB;EACjB,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,YAAY;EACZ,YAAY;EACZ,wBAAwB;;AAE1B;;AAEA;EACE,aAAa;EACb,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,aAAa;EACb,WAAW;EACX,YAAY;AACd;;AAEA;EACE,aAAa;EACb,WAAW;EACX,YAAY;EACZ,mBAAmB;EACnB,qBAAqB;EACrB,2BAA2B;EAC3B,mBAAmB;EACnB,cAAc;EACd,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,WAAW;EACX,WAAW;EACX,mBAAmB;EACnB,yCAAyC;EACzC,SAAS;EACT,WAAW;EACX,WAAW;AACb;;AAEA;EACE,aAAa;EACb,YAAY;EACZ,aAAa;EACb,+FAA+F;EAC/F,iBAAiB;AACnB;;AAEA;EACE,cAAc;EACd,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,WAAW;EACX,YAAY;AACd;;AAEA;EACE,aAAa;EACb,WAAW;EACX,YAAY;EACZ,mBAAmB;EACnB,qBAAqB;EACrB,2BAA2B;EAC3B,mBAAmB;EACnB,cAAc;EACd,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,WAAW;EACX,WAAW;EACX,mBAAmB;EACnB,yCAAyC;EACzC,SAAS;EACT,WAAW;AACb;;AAEA;EACE,aAAa;EACb,YAAY;EACZ,aAAa;EACb,8FAA8F;EAC9F,iBAAiB;AACnB;;AAEA;EACE,cAAc;EACd,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,YAAY;EACZ,wBAAwB;EACxB,yBAAyB;EACzB,2BAA2B;EAC3B,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,WAAW;EACX,aAAa;EACb,qBAAqB;EACrB,qBAAqB;EACrB,2BAA2B;EAC3B,mBAAmB;EACnB,mBAAmB;AACrB;;AAEA;EACE,UAAU;EACV,aAAa;EACb,cAAc;EACd,mBAAmB;EACnB,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,yCAAyC;EACzC,cAAc;AAChB;;AAEA;EACE,yBAAyB;EACzB,yCAAyC;EACzC,8BAA8B;AAChC;;AAEA;EACE,yCAAyC;EACzC,cAAc;AAChB;;AAEA;EACE,yBAAyB;EACzB,8BAA8B;EAC9B,yCAAyC;AAC3C;;AAEA;EACE,yCAAyC;EACzC,cAAc;AAChB;;AAEA;EACE,yCAAyC;EACzC,cAAc;AAChB;;AAEA;EACE,yBAAyB;EACzB,8BAA8B;EAC9B,yCAAyC;AAC3C;;AAEA;EACE,yBAAyB;EACzB,yCAAyC;EACzC,8BAA8B;AAChC;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,QAAQ;EACR,SAAS;EACT,SAAS;AACX;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,QAAQ;EACR,SAAS;EACT,SAAS;AACX;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,YAAY;EACZ,cAAc;EACd,qBAAqB;EACrB,qBAAqB;EACrB,uBAAuB;EACvB,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,wBAAwB;EACxB,mBAAmB;EACnB,WAAW;EACX,YAAY;EACZ,gBAAgB;EAChB,yCAAyC;EACzC,YAAY;AACd;;AAEA;EACE,aAAa;EACb,qBAAqB;EACrB,2BAA2B;EAC3B,mBAAmB;EACnB,WAAW;EACX,WAAW;AACb;;AAEA;EACE,SAAS;EACT,eAAe;EACf,cAAc;EACd,mBAAmB;AACrB;;AAEA;EACE,+FAA+F;AACjG;;AAEA;EACE,mBAAmB;EACnB,aAAa;EACb,YAAY;EACZ,cAAc;EACd,qBAAqB;EACrB,qBAAqB;EACrB,uBAAuB;EACvB,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,wBAAwB;EACxB,mBAAmB;EACnB,aAAa;EACb,YAAY;EACZ,iBAAiB;EACjB,yCAAyC;EACzC,aAAa;AACf;;AAEA;EACE,aAAa;EACb,qBAAqB;EACrB,2BAA2B;EAC3B,mBAAmB;EACnB,WAAW;EACX,WAAW;AACb;;AAEA;EACE,SAAS;EACT,eAAe;EACf,cAAc;EACd,mBAAmB;AACrB;;AAEA;EACE,+FAA+F;AACjG","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300&family=Roboto+Mono:wght@300&display=swap');\n\nbody {\n  font-family: 'Roboto Mono', monospace, 'Fredoka', sans-serif;\n}\n\n#background {\n  background-image: url('./imgs/mountain-lake.jpg');\n  background-size: cover;\n  width: 100vw;\n  height: 100vh;\n}\n\n#header {\n  width: 100vw;\n  height: 10vh;\n  display: flex;\n  align-items: center;\n}\n\n#header-left {\n  display: flex;\n  width: 50vw;\n  height: 10vh;\n  align-items: center;\n}\n\n#header-title-first {\n  padding-left: 4%;\n  font-size: 2.5em;\n  font-weight: bolder;\n  color: #f3ac4c;\n}\n\n#header-title-second {\n  font-size: 2.5em;\n  font-weight: bolder;\n  color: #438ccc;\n}\n\n#header-icon {\n  display: flex;\n  width: 4em;\n  height: 4em;\n  padding-left: 4%;\n}\n\n#header-right {\n  display: flex;\n  width: 50vw;\n  justify-content: flex-end;\n  padding-right: 4%;\n  align-items: center;\n}\n\nlabel {\n  position: relative;\n}\n\nlabel:before {\n  content: \"\";\n  position: absolute;\n  left: 10px;\n  top: 0;\n  bottom: 0;\n  width: 1.5em;\n  background: url(\"./svgs/search.svg\") center / contain no-repeat;\n  filter: invert(79%) sepia(72%) saturate(913%) hue-rotate(323deg) brightness(101%) contrast(91%);\n}\n\n#search-bar-input {\n  width: 15vw;\n  height: 5vh;\n  font-size: 1.5em;\n  padding-left: 16%;\n  color: #438ccc;\n}\n\n#app {\n  display: flex;\n  width: 100vw;\n  height: 90vh;\n  flex-flow: column nowrap;\n\n}\n\n#app-top {\n  display: flex;\n  height: 50vh;\n  width: 100vw;\n}\n\n#app-top-left {\n  display: flex;\n  width: 45vw;\n  height: 50vh;\n}\n\n#location-information {\n  display: flex;\n  width: 45vw;\n  height: 40vh;\n  flex-flow: row wrap;\n  align-content: center;\n  justify-content: flex-start;\n  align-items: center;\n  margin-top: 5%;\n  margin-left: 5%;\n}\n\n#city-container, #weather-description-container, #weather-temperature-container, #todays-date-container, #todays-time-container {\n  display: flex;\n  width: 45vw;\n  height: 5vh;\n  align-items: center;\n  background-color: rgb(240, 242, 240, 0.9);\n  margin: 0;\n  width: 40vw;\n  padding: 2%;\n}\n\n#city-svg, #weather-description-svg, #weather-temperature-svg, #todays-date-svg, #todays-time-svg {\n  display: flex;\n  width: 2.5em;\n  height: 2.5em;\n  filter: invert(79%) sepia(72%) saturate(913%) hue-rotate(323deg) brightness(101%) contrast(91%);\n  padding-right: 5%;\n}\n\n#city-name, #weather-temperature, #todays-time, #weather-description, #todays-date {\n  font-size: 2em;\n  font-weight: bolder;\n  color: #f3ac4c;\n}\n\n#app-top-right {\n  display: flex;\n  width: 45vw;\n  height: 50vh;\n}\n\n#location-extra-information {\n  display: flex;\n  width: 45vw;\n  height: 40vh;\n  flex-flow: row wrap;\n  align-content: center;\n  justify-content: flex-start;\n  align-items: center;\n  margin-top: 5%;\n  margin-left: 16.5%;\n}\n\n#weather-feels-like-container, #weather-humidity-container, #weather-min-container, #weather-max-container, #wind-speed-container {\n  display: flex;\n  width: 45vw;\n  height: 5vh;\n  align-items: center;\n  background-color: rgb(240, 242, 240, 0.9);\n  margin: 0;\n  padding: 2%;\n}\n\n#weather-feels-like-svg, #weather-humidity-svg, #weather-min-svg, #weather-max-svg, #wind-speed-svg, #next-daily-forecast-weather-type-svg, #next-hourly-forecast-weather-type-svg {\n  display: flex;\n  width: 2.5em;\n  height: 2.5em;\n  filter: invert(54%) sepia(34%) saturate(861%) hue-rotate(166deg) brightness(88%) contrast(88%);\n  padding-right: 5%;\n}\n\n#weather-feels-like, #weather-humidity, #weather-min, #weather-max, #wind-speed {\n  font-size: 2em;\n  font-weight: bolder;\n  color: #438ccc;\n}\n\n#app-bottom {\n  display:flex;\n  width: 100vw;\n  height: 50vh;\n  flex-flow: column nowrap;\n  align-content: flex-start;\n  justify-content: flex-start;\n  align-items: flex-start;\n}\n\n#information-switcher {\n  display: flex;\n  width: 10vw;\n  height: 3.5vh;\n  flex-flow: row nowrap;\n  align-content: center;\n  justify-content: flex-start;\n  align-items: center;\n  padding-left: 2.75%;\n}\n\n#daily-forecast-button, #hourly-forecast-button, #fahrenheit-button, #celsius-button {\n  width: 8vw;\n  height: 3.5vh;\n  font-size: 1em;\n  font-weight: bolder;\n  border-radius: 10%;\n  margin-left: 3%;\n}\n\n#fahrenheit-button {\n  margin-left: 1vw;\n}\n\n.daily-forecast-button-off {\n  background-color: rgb(240, 242, 240, 0.9);\n  color: #f3ac4c;\n}\n\n.daily-forecast-button-on {\n  background-color: #f3ac4c;\n  border: 1px solid rgb(240, 242, 240, 0.9);\n  color: rgb(240, 242, 240, 0.8);;\n}\n\n.hourly-forecast-button-off {\n  background-color: rgb(240, 242, 240, 0.9);\n  color: #438ccc;\n}\n\n.hourly-forecast-button-on {\n  background-color: #438ccc;\n  color: rgb(240, 242, 240, 0.8);\n  border: 1px solid rgb(240, 242, 240, 0.9);\n}\n\n.celsius-off {\n  background-color: rgb(240, 242, 240, 0.9);\n  color: #438ccc;\n}\n\n.fahrenheit-off {\n  background-color: rgb(240, 242, 240, 0.9);\n  color: #f3ac4c;\n}\n\n.celsius-on {\n  background-color: #438ccc;\n  color: rgb(240, 242, 240, 0.8);\n  border: 1px solid rgb(240, 242, 240, 0.9);\n}\n\n.fahrenheit-on {\n  background-color: #f3ac4c;\n  border: 1px solid rgb(240, 242, 240, 0.9);\n  color: rgb(240, 242, 240, 0.8);;\n}\n\n.forecast-hourly-off {\n  visibility: hidden;\n  display: none;\n  width: 0;\n  height: 0;\n  margin: 0;\n}\n\n.forecast-daily-off {\n  visibility: hidden;\n  display: none;\n  width: 0;\n  height: 0;\n  margin: 0;\n}\n\n.forecast-daily-on {\n  visibility: visible;\n  display: flex;\n  width: 100vw;\n  height: 36.5vh;\n  flex-flow: row nowrap;\n  align-content: center;\n  justify-content: center;\n  align-items: flex-start;\n}\n\n.next-daily-forecast-open {\n  display: flex;\n  flex-flow: column nowrap;\n  align-items: center;\n  width: 18vw;\n  height: 30vh;\n  font-size: 0.8em;\n  background-color: rgb(240, 242, 240, 0.9);\n  margin: 0.5%;\n}\n\n.forecast-daily-open {\n  display: flex;\n  flex-flow: row nowrap;\n  justify-content: flex-start;\n  align-items: center;\n  width: 18vw;\n  height: 5vh;\n}\n\n.forecast-daily-item-open {\n  margin: 0;\n  margin-left: 5%;\n  color: #438ccc;\n  font-weight: bolder;\n}\n\n#next-daily-forecast-date-svg, #next-daily-forecast-time-svg, #next-daily-forecast-temp-svg, #next-daily-forecast-humidity-svg, #next-daily-forecast-weather-type-svg, #next-daily-forecast-wind-svg {\n  filter: invert(79%) sepia(72%) saturate(913%) hue-rotate(323deg) brightness(101%) contrast(91%);\n}\n\n.forecast-hourly-on {\n  visibility: visible;\n  display: flex;\n  width: 100vw;\n  height: 36.5vh;\n  flex-flow: row nowrap;\n  align-content: center;\n  justify-content: center;\n  align-items: flex-start;\n}\n\n#next-hourly-forecast {\n  display: flex;\n  flex-flow: column nowrap;\n  align-items: center;\n  width: 13.5vw;\n  height: 32vh;\n  font-size: 0.85em;\n  background-color: rgb(240, 242, 240, 0.9);\n  margin: 0.25%;\n}\n\n.forecast-hourly-open {\n  display: flex;\n  flex-flow: row nowrap;\n  justify-content: flex-start;\n  align-items: center;\n  width: 12vw;\n  height: 5vh;\n}\n\n.forecast-hourly-item-open {\n  margin: 0;\n  margin-left: 5%;\n  color: #438ccc;\n  font-weight: bolder;\n}\n\n#next-hourly-forecast-date-svg, #next-hourly-forecast-time-svg, #next-hourly-forecast-temp-svg, #next-hourly-forecast-humidity-svg, #next-hourly-forecast-weather-type-svg, #next-hourly-forecast-wind-svg {\n  filter: invert(79%) sepia(72%) saturate(913%) hue-rotate(323deg) brightness(101%) contrast(91%);\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFVBQVUsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLFVB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QVBEO0FBUUgsQ0F0QkQsSSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3NjcmlwdHMvYXBwLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3NjcmlwdHMvc2Vzc2lvblN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHtcbiAgZ2V0Q2l0eSxcbiAgcmVtb3ZlUHJldmlvdXNJbmZvcm1hdGlvbixcbiAgc2hvd0hvdXJseUZvcmVjYXN0LFxuICBzaG93RGFpbHlGb3JlY2FzdCxcbiAgc2hvd0ZhaHJlbmhlaXQsXG4gIHNob3dDZWxzaXVzXG59XG5cbmltcG9ydCBkYXRlU3ZnSW1wb3J0IGZyb20gJy4uL3N2Z3MvZGF0ZS5zdmcnO1xuaW1wb3J0IGZlZWxzTGlrZVN2Z0ltcG9ydCBmcm9tICcuLi9zdmdzL2ZlZWxzLWxpa2Uuc3ZnJztcbmltcG9ydCBodW1pZGl0eVN2Z0ltcG9ydCBmcm9tICcuLi9zdmdzL2h1bWlkaXR5LnN2Zyc7XG5pbXBvcnQgbG9jYXRpb25TdmdJbXBvcnQgZnJvbSAnLi4vc3Zncy9sb2NhdGlvbi5zdmcnO1xuaW1wb3J0IHRlbXBNYXhTdmdJbXBvcnQgZnJvbSAnLi4vc3Zncy90ZW1wLW1heC5zdmcnO1xuaW1wb3J0IHRlbXBNaW5TdmdJbXBvcnQgZnJvbSAnLi4vc3Zncy90ZW1wLW1pbi5zdmcnO1xuaW1wb3J0IHRlbXBTdmdJbXBvcnQgZnJvbSAnLi4vc3Zncy90ZW1wLnN2Zyc7XG5pbXBvcnQgdGltZVN2Z0ltcG9ydCBmcm9tICcuLi9zdmdzL3RpbWUuc3ZnJztcbmltcG9ydCB3ZWF0aGVyU3ZnSW1wb3J0IGZyb20gJy4uL3N2Z3Mvd2VhdGhlci5zdmcnO1xuaW1wb3J0IHdpbmRTdmdJbXBvcnQgZnJvbSAnLi4vc3Zncy93aW5kLnN2Zyc7XG5cbmxldCByZXRyaWV2ZWRDaXR5TmFtZTtcbmxldCByZXRyaWV2ZWRDaXR5TGF0O1xubGV0IHJldHJpZXZlZENpdHlMb247XG5cbmFzeW5jIGZ1bmN0aW9uIGdldENpdHkoKSB7XG4gIGxldCBjaXR5SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLWJhci1pbnB1dCcpLnZhbHVlLFxuICAgICAgICBkZWZhdWx0Q2l0eSA9ICdSZXlramF2w61rJztcbiAgaWYgKGNpdHlJbnB1dC5sZW5ndGggPT09IDApIHtcbiAgICBjaXR5SW5wdXQgPSBkZWZhdWx0Q2l0eTtcbiAgfVxuICBjb25zdCBhcGkgPSAnaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvZGlyZWN0P3E9JyxcbiAgICAgICAgYW1vdW50VG9SZXRyaWV2ZSA9ICcmbGltaXQ9MScsXG4gICAgICAgIGFwaUtleSA9ICcmYXBwaWQ9NmM4OWMyMWJmYzExZDQwM2JlNDFmNDg5YWYzYjJlYWUnLFxuICAgICAgICBzZWFyY2hDaXR5ID0gYXBpICsgY2l0eUlucHV0ICsgYW1vdW50VG9SZXRyaWV2ZSArIGFwaUtleTtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2ggKHNlYXJjaENpdHkpLFxuICAgICAgICAgIHNlYXJjaERhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICByZXRyaWV2ZWRDaXR5TmFtZSA9IHNlYXJjaERhdGFbMF0ubG9jYWxfbmFtZXMuZW47XG4gICAgcmV0cmlldmVkQ2l0eUxhdCA9IHNlYXJjaERhdGFbMF0ubGF0O1xuICAgIHJldHJpZXZlZENpdHlMb24gPSBzZWFyY2hEYXRhWzBdLmxvbjtcbiAgICBnZXRUb2RheXNXZWF0aGVyKCk7XG4gICAgZ2V0V2VhdGhlckZvcmVjYXN0KCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIGFsZXJ0KCdUaGUgc2VydmVyIGNvdWxkIG5vdCBmaW5kIHdoYXQgeW91IHdlcmUgbG9va2luZyBmb3IsIHBsZWFzZSB0cnkgYWdhaW4nKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRUb2RheXNXZWF0aGVyKCkge1xuICBjb25zdCBhcGkgPSAnaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/JyxcbiAgICAgICAgbGF0ID0gYCZsYXQ9JHtyZXRyaWV2ZWRDaXR5TGF0fWAsXG4gICAgICAgIGxvbiA9IGAmbG9uPSR7cmV0cmlldmVkQ2l0eUxvbn1gLFxuICAgICAgICB1bml0cyA9ICcmdW5pdHM9aW1wZXJpYWwnLFxuICAgICAgICBhcGlLZXkgPSAnJmFwcGlkPTZjODljMjFiZmMxMWQ0MDNiZTQxZjQ4OWFmM2IyZWFlJyxcbiAgICAgICAgc2VhcmNoV2VhdGhlciA9IGFwaSArIGxhdCArIGxvbiArIGFwaUtleSArIHVuaXRzO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCAoc2VhcmNoV2VhdGhlciwge21vZGU6ICdjb3JzJ30pO1xuICAgIGNvbnN0IHNlYXJjaERhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgXG4gICAgLy8gdmFyaWFibGVzIGZvciBpbmZvcm1hdGlvbiB0byBiZSBhcHBlbmRlZCB0byB0aGUgRE9NIGZvciB3ZWF0aGVyIGRpc3BsYXlcbiAgICBjb25zdCB3ZWF0aGVyVHlwZSA9IHNlYXJjaERhdGEud2VhdGhlclswXS5tYWluLFxuICAgICAgICAgIGRlc2NyaXB0aW9uID0gc2VhcmNoRGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIGNvdW50cnkgPSBzZWFyY2hEYXRhLnN5cy5jb3VudHJ5LFxuICAgICAgICAgIGh1bWlkaXR5ID0gc2VhcmNoRGF0YS5tYWluLmh1bWlkaXR5LFxuICAgICAgICAgIHdpbmQgPSBzZWFyY2hEYXRhLndpbmQuc3BlZWQ7XG5cbiAgICBsZXQgdGVtcCxcbiAgICAgICAgZmVlbHNMaWtlLFxuICAgICAgICB0ZW1wTWluLFxuICAgICAgICB0ZW1wTWF4OyAgXG5cbiAgICAvL2NoZWNrcyBpZiBjZWxzaXVzIGJ1dHRvbiBpcyBvbiBmb3IgY29udmVyc2lvblxuICAgIGNvbnN0IGNlbHNpdXNCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2Vsc2l1cy1idXR0b24nKTtcbiAgICBpZiAoY2Vsc2l1c0J1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2NlbHNpdXMtb24nKSkge1xuICAgICAgdGVtcCA9IGZhaHJlbmhlaXRUb0NlbHNpdXMoc2VhcmNoRGF0YS5tYWluLnRlbXApO1xuICAgICAgZmVlbHNMaWtlID0gZmFocmVuaGVpdFRvQ2Vsc2l1cyhzZWFyY2hEYXRhLm1haW4uZmVlbHNfbGlrZSk7XG4gICAgICB0ZW1wTWluID0gZmFocmVuaGVpdFRvQ2Vsc2l1cyhzZWFyY2hEYXRhLm1haW4udGVtcF9taW4pO1xuICAgICAgdGVtcE1heCA9IGZhaHJlbmhlaXRUb0NlbHNpdXMoc2VhcmNoRGF0YS5tYWluLnRlbXBfbWF4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGVtcCA9IHNlYXJjaERhdGEubWFpbi50ZW1wO1xuICAgICAgZmVlbHNMaWtlID0gc2VhcmNoRGF0YS5tYWluLmZlZWxzX2xpa2U7XG4gICAgICB0ZW1wTWluID0gc2VhcmNoRGF0YS5tYWluLnRlbXBfbWluO1xuICAgICAgdGVtcE1heCA9IHNlYXJjaERhdGEubWFpbi50ZW1wX21heDtcbiAgICB9XG5cbiAgICBhcHBlbmRDdXJyZW50V2VhdGhlcihcbiAgICAgIHRlbXAsXG4gICAgICB3ZWF0aGVyVHlwZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgY291bnRyeSxcbiAgICAgIGZlZWxzTGlrZSxcbiAgICAgIGh1bWlkaXR5LFxuICAgICAgdGVtcE1pbixcbiAgICAgIHRlbXBNYXgsXG4gICAgICB3aW5kXG4gICAgKTtcblxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICBhbGVydCgnVGhlIHNlcnZlciBjb3VsZCBub3QgZmluZCB3aGF0IHlvdSB3ZXJlIGxvb2tpbmcgZm9yLCBwbGVhc2UgdHJ5IGFnYWluJyk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlckZvcmVjYXN0KCkge1xuICBjb25zdCBhcGkgPSAnaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0PycsXG4gICAgICAgIGxhdCA9IGAmbGF0PSR7cmV0cmlldmVkQ2l0eUxhdH1gLFxuICAgICAgICBsb24gPSBgJmxvbj0ke3JldHJpZXZlZENpdHlMb259YCxcbiAgICAgICAgbGFuZ3VhZ2UgPSAnJmxhbmc9ZW4nLFxuICAgICAgICB1bml0cyA9ICcmdW5pdHM9aW1wZXJpYWwnLFxuICAgICAgICBhcGlLZXkgPSAnJmFwcGlkPTZjODljMjFiZmMxMWQ0MDNiZTQxZjQ4OWFmM2IyZWFlJyxcbiAgICAgICAgc2VhcmNoV2VhdGhlciA9IGFwaSArIGxhdCArIGxvbiArIGFwaUtleSArIGxhbmd1YWdlICsgdW5pdHM7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoIChzZWFyY2hXZWF0aGVyLCB7bW9kZTogJ2NvcnMnfSksXG4gICAgICAgICAgc2VhcmNoRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKSxcbiAgICAgICAgICBmb3JlY2FzdExpc3QgPSBzZWFyY2hEYXRhLmxpc3Q7XG5cbiAgICBidW5kbGVGb3JlY2FzdERhdGEoZm9yZWNhc3RMaXN0KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgYWxlcnQoJ1RoZSBzZXJ2ZXIgY291bGQgbm90IGZpbmQgd2hhdCB5b3Ugd2VyZSBsb29raW5nIGZvciwgcGxlYXNlIHRyeSBhZ2FpbicpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEN1cnJlbnRXZWF0aGVyKFxuICB0ZW1wLFxuICB3ZWF0aGVyVHlwZSxcbiAgZGVzY3JpcHRpb24sXG4gIGNvdW50cnksXG4gIGZlZWxzTGlrZSxcbiAgaHVtaWRpdHksXG4gIHRlbXBNaW4sXG4gIHRlbXBNYXgsXG4gIHdpbmRcbiAgKSB7XG4gICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKTtcbiAgICBsZXQgdGltZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCk7XG4gICAgY29uc3QgbG9jYXRpb25JbmZvcm1hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2NhdGlvbi1pbmZvcm1hdGlvbicpO1xuICAgIGNvbnN0IGNpdHlDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNpdHlDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdjaXR5LWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IGNpdHlTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIGNpdHlTdmcuc2V0QXR0cmlidXRlKCdpZCcsICdjaXR5LXN2ZycpO1xuICAgICAgY2l0eVN2Zy5zcmMgPSBsb2NhdGlvblN2Z0ltcG9ydDtcbiAgICBjb25zdCBjaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgY2l0eS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NpdHktbmFtZScpO1xuICAgICAgY2l0eS50ZXh0Q29udGVudCA9IGAke3JldHJpZXZlZENpdHlOYW1lfSwgJHtjb3VudHJ5fWA7XG4gICAgY29uc3Qgd2VhdGhlckRlc2NyaXB0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB3ZWF0aGVyRGVzY3JpcHRpb25Db250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICd3ZWF0aGVyLWRlc2NyaXB0aW9uLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IHdlYXRoZXJEZXNjcmlwdGlvblN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgd2VhdGhlckRlc2NyaXB0aW9uU3ZnLnNldEF0dHJpYnV0ZSgnaWQnLCAnd2VhdGhlci1kZXNjcmlwdGlvbi1zdmcnKTtcbiAgICAgIHdlYXRoZXJEZXNjcmlwdGlvblN2Zy5zcmMgPSB3ZWF0aGVyU3ZnSW1wb3J0O1xuICAgIGNvbnN0IHdlYXRoZXJEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIHdlYXRoZXJEZXNjcmlwdGlvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dlYXRoZXItZGVzY3JpcHRpb24nKTtcbiAgICAgIHdlYXRoZXJEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGAke3dlYXRoZXJUeXBlfSwgJHtkZXNjcmlwdGlvbn1gO1xuICAgIGNvbnN0IHdlYXRoZXJUZW1wZXJhdHVyZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgd2VhdGhlclRlbXBlcmF0dXJlQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnd2VhdGhlci10ZW1wZXJhdHVyZS1jb250YWluZXInKTtcbiAgICBjb25zdCB3ZWF0aGVyVGVtcGVyYXR1cmVTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIHdlYXRoZXJUZW1wZXJhdHVyZVN2Zy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dlYXRoZXItdGVtcGVyYXR1cmUtc3ZnJyk7XG4gICAgICB3ZWF0aGVyVGVtcGVyYXR1cmVTdmcuc3JjID0gdGVtcFN2Z0ltcG9ydDtcbiAgICBjb25zdCB3ZWF0aGVyVGVtcGVyYXR1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICB3ZWF0aGVyVGVtcGVyYXR1cmUuc2V0QXR0cmlidXRlKCdpZCcsICd3ZWF0aGVyLXRlbXBlcmF0dXJlJyk7XG4gICAgY29uc3QgdG9kYXlzRGF0ZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdG9kYXlzRGF0ZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3RvZGF5cy1kYXRlLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IHRvZGF5c0RhdGVTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIHRvZGF5c0RhdGVTdmcuc2V0QXR0cmlidXRlKCdpZCcsICd0b2RheXMtZGF0ZS1zdmcnKTtcbiAgICAgIHRvZGF5c0RhdGVTdmcuc3JjID0gZGF0ZVN2Z0ltcG9ydDtcbiAgICBjb25zdCB0b2RheXNEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgdG9kYXlzRGF0ZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3RvZGF5cy1kYXRlJyk7XG4gICAgICB0b2RheXNEYXRlLnRleHRDb250ZW50ID0gYCR7dG9kYXl9YDtcbiAgICBjb25zdCB0b2RheXNUaW1lQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0b2RheXNUaW1lQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAndG9kYXlzLXRpbWUtY29udGFpbmVyJyk7XG4gICAgY29uc3QgdG9kYXlzVGltZVN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgdG9kYXlzVGltZVN2Zy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3RvZGF5cy10aW1lLXN2ZycpO1xuICAgICAgdG9kYXlzVGltZVN2Zy5zcmMgPSB0aW1lU3ZnSW1wb3J0O1xuICAgIGNvbnN0IHRvZGF5c1RpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICB0b2RheXNUaW1lLnNldEF0dHJpYnV0ZSgnaWQnLCAndG9kYXlzLXRpbWUnKTtcbiAgICAgIHRvZGF5c1RpbWUudGV4dENvbnRlbnQgPSBgVXBkYXRlZDogJHt0aW1lfWA7XG5cbiAgICAvL2NoZWNrcyBpZiBjZWxzaXVzIGJ1dHRvbiBpcyBvbiBmb3IgY29udmVyc2lvblxuICAgIGNvbnN0IGNlbHNpdXNCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2Vsc2l1cy1idXR0b24nKTtcbiAgICBpZiAoY2Vsc2l1c0J1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2NlbHNpdXMtb24nKSkge1xuICAgICAgd2VhdGhlclRlbXBlcmF0dXJlLnRleHRDb250ZW50ID0gYCR7dGVtcH0gwrBDYDtcbiAgICB9IGVsc2Uge1xuICAgICAgd2VhdGhlclRlbXBlcmF0dXJlLnRleHRDb250ZW50ID0gYCR7dGVtcH0gwrBGYDtcbiAgICB9XG5cbiAgICBjaXR5Q29udGFpbmVyLmFwcGVuZENoaWxkKGNpdHlTdmcpO1xuICAgIGNpdHlDb250YWluZXIuYXBwZW5kQ2hpbGQoY2l0eSk7XG4gICAgd2VhdGhlckRlc2NyaXB0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKHdlYXRoZXJEZXNjcmlwdGlvblN2Zyk7XG4gICAgd2VhdGhlckRlc2NyaXB0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKHdlYXRoZXJEZXNjcmlwdGlvbik7XG4gICAgd2VhdGhlclRlbXBlcmF0dXJlQ29udGFpbmVyLmFwcGVuZENoaWxkKHdlYXRoZXJUZW1wZXJhdHVyZVN2Zyk7XG4gICAgd2VhdGhlclRlbXBlcmF0dXJlQ29udGFpbmVyLmFwcGVuZENoaWxkKHdlYXRoZXJUZW1wZXJhdHVyZSk7XG4gICAgdG9kYXlzRGF0ZUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RheXNEYXRlU3ZnKTtcbiAgICB0b2RheXNEYXRlQ29udGFpbmVyLmFwcGVuZENoaWxkKHRvZGF5c0RhdGUpO1xuICAgIHRvZGF5c1RpbWVDb250YWluZXIuYXBwZW5kQ2hpbGQodG9kYXlzVGltZVN2Zyk7XG4gICAgdG9kYXlzVGltZUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RheXNUaW1lKTtcbiAgICBsb2NhdGlvbkluZm9ybWF0aW9uLmFwcGVuZENoaWxkKGNpdHlDb250YWluZXIpO1xuICAgIGxvY2F0aW9uSW5mb3JtYXRpb24uYXBwZW5kQ2hpbGQod2VhdGhlckRlc2NyaXB0aW9uQ29udGFpbmVyKTtcbiAgICBsb2NhdGlvbkluZm9ybWF0aW9uLmFwcGVuZENoaWxkKHdlYXRoZXJUZW1wZXJhdHVyZUNvbnRhaW5lcik7XG4gICAgbG9jYXRpb25JbmZvcm1hdGlvbi5hcHBlbmRDaGlsZCh0b2RheXNEYXRlQ29udGFpbmVyKTtcbiAgICBsb2NhdGlvbkluZm9ybWF0aW9uLmFwcGVuZENoaWxkKHRvZGF5c1RpbWVDb250YWluZXIpO1xuXG4gICAgY29uc3QgbG9jYXRpb25FeHRyYUluZm9ybWF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvY2F0aW9uLWV4dHJhLWluZm9ybWF0aW9uJyk7XG4gICAgY29uc3Qgd2VhdGhlckZlZWxzTGlrZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgd2VhdGhlckZlZWxzTGlrZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dlYXRoZXItZmVlbHMtbGlrZS1jb250YWluZXInKTtcbiAgICBjb25zdCB3ZWF0aGVyRmVlbHNMaWtlU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICB3ZWF0aGVyRmVlbHNMaWtlU3ZnLnNldEF0dHJpYnV0ZSgnaWQnLCAnd2VhdGhlci1mZWVscy1saWtlLXN2ZycpO1xuICAgICAgd2VhdGhlckZlZWxzTGlrZVN2Zy5zcmMgPSBmZWVsc0xpa2VTdmdJbXBvcnQ7XG4gICAgY29uc3Qgd2VhdGhlckZlZWxzTGlrZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIHdlYXRoZXJGZWVsc0xpa2Uuc2V0QXR0cmlidXRlKCdpZCcsICd3ZWF0aGVyLWZlZWxzLWxpa2UnKTtcbiAgICBjb25zdCB3ZWF0aGVySHVtaWRpdHlDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHdlYXRoZXJIdW1pZGl0eUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dlYXRoZXItaHVtaWRpdHktY29udGFpbmVyJyk7XG4gICAgY29uc3Qgd2VhdGhlckh1bWlkaXR5U3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICB3ZWF0aGVySHVtaWRpdHlTdmcuc2V0QXR0cmlidXRlKCdpZCcsICd3ZWF0aGVyLWh1bWlkaXR5LXN2ZycpO1xuICAgICAgd2VhdGhlckh1bWlkaXR5U3ZnLnNyYyA9IGh1bWlkaXR5U3ZnSW1wb3J0O1xuICAgIGNvbnN0IHdlYXRoZXJIdW1pZGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIHdlYXRoZXJIdW1pZGl0eS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dlYXRoZXItaHVtaWRpdHknKTtcbiAgICAgIHdlYXRoZXJIdW1pZGl0eS50ZXh0Q29udGVudCA9IGBIdW1pZGl0eTogJHtodW1pZGl0eX0gJWA7XG4gICAgY29uc3Qgd2VhdGhlck1pbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgd2VhdGhlck1pbkNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dlYXRoZXItbWluLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IHdlYXRoZXJNaW5TdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIHdlYXRoZXJNaW5Tdmcuc2V0QXR0cmlidXRlKCdpZCcsICd3ZWF0aGVyLW1pbi1zdmcnKTtcbiAgICAgIHdlYXRoZXJNaW5Tdmcuc3JjID0gdGVtcE1pblN2Z0ltcG9ydDtcbiAgICBjb25zdCB3ZWF0aGVyTWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgd2VhdGhlck1pbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dlYXRoZXItbWluJyk7XG4gICAgY29uc3Qgd2VhdGhlck1heENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgd2VhdGhlck1heENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dlYXRoZXItbWF4LWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IHdlYXRoZXJNYXhTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIHdlYXRoZXJNYXhTdmcuc2V0QXR0cmlidXRlKCdpZCcsICd3ZWF0aGVyLW1heC1zdmcnKTtcbiAgICAgIHdlYXRoZXJNYXhTdmcuc3JjID0gdGVtcE1heFN2Z0ltcG9ydDtcbiAgICBjb25zdCB3ZWF0aGVyTWF4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgd2VhdGhlck1heC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dlYXRoZXItbWF4Jyk7XG4gICAgY29uc3Qgd2luZFNwZWVkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB3aW5kU3BlZWRDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICd3aW5kLXNwZWVkLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IHdpbmRTcGVlZFN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgd2luZFNwZWVkU3ZnLnNldEF0dHJpYnV0ZSgnaWQnLCAnd2luZC1zcGVlZC1zdmcnKTtcbiAgICAgIHdpbmRTcGVlZFN2Zy5zcmMgPSB3aW5kU3ZnSW1wb3J0O1xuICAgIGNvbnN0IHdpbmRTcGVlZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIHdpbmRTcGVlZC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dpbmQtc3BlZWQnKTtcbiAgICAgIHdpbmRTcGVlZC50ZXh0Q29udGVudCA9IGBXaW5kIFNwZWVkOiAke3dpbmR9IE1QSGA7XG5cbiAgICAvLyBjb250cm9scyBmb3IgY2Vsc2l1cyBjb252ZXJzaW9uXG4gICAgaWYgKGNlbHNpdXNCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxzaXVzLW9uJykpIHtcbiAgICAgIHdlYXRoZXJGZWVsc0xpa2UudGV4dENvbnRlbnQgPSBgRmVlbHMgTGlrZTogJHtmZWVsc0xpa2V9IMKwQ2A7XG4gICAgICB3ZWF0aGVyTWluLnRleHRDb250ZW50ID0gYExvdzogJHt0ZW1wTWlufSDCsENgO1xuICAgICAgd2VhdGhlck1heC50ZXh0Q29udGVudCA9IGBIaWdoOiAke3RlbXBNYXh9IMKwQ2A7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdlYXRoZXJGZWVsc0xpa2UudGV4dENvbnRlbnQgPSBgRmVlbHMgTGlrZTogJHtmZWVsc0xpa2V9IMKwRmA7XG4gICAgICB3ZWF0aGVyTWluLnRleHRDb250ZW50ID0gYExvdzogJHt0ZW1wTWlufSDCsEZgO1xuICAgICAgd2VhdGhlck1heC50ZXh0Q29udGVudCA9IGBIaWdoOiAke3RlbXBNYXh9IMKwRmA7XG4gICAgfVxuXG4gICAgd2VhdGhlckZlZWxzTGlrZUNvbnRhaW5lci5hcHBlbmRDaGlsZCh3ZWF0aGVyRmVlbHNMaWtlU3ZnKTtcbiAgICB3ZWF0aGVyRmVlbHNMaWtlQ29udGFpbmVyLmFwcGVuZENoaWxkKHdlYXRoZXJGZWVsc0xpa2UpO1xuICAgIHdlYXRoZXJIdW1pZGl0eUNvbnRhaW5lci5hcHBlbmRDaGlsZCh3ZWF0aGVySHVtaWRpdHlTdmcpO1xuICAgIHdlYXRoZXJIdW1pZGl0eUNvbnRhaW5lci5hcHBlbmRDaGlsZCh3ZWF0aGVySHVtaWRpdHkpO1xuICAgIHdlYXRoZXJNaW5Db250YWluZXIuYXBwZW5kQ2hpbGQod2VhdGhlck1pblN2Zyk7XG4gICAgd2VhdGhlck1pbkNvbnRhaW5lci5hcHBlbmRDaGlsZCh3ZWF0aGVyTWluKTtcbiAgICB3ZWF0aGVyTWF4Q29udGFpbmVyLmFwcGVuZENoaWxkKHdlYXRoZXJNYXhTdmcpO1xuICAgIHdlYXRoZXJNYXhDb250YWluZXIuYXBwZW5kQ2hpbGQod2VhdGhlck1heCk7XG4gICAgd2luZFNwZWVkQ29udGFpbmVyLmFwcGVuZENoaWxkKHdpbmRTcGVlZFN2Zyk7XG4gICAgd2luZFNwZWVkQ29udGFpbmVyLmFwcGVuZENoaWxkKHdpbmRTcGVlZCk7XG5cbiAgICBsb2NhdGlvbkV4dHJhSW5mb3JtYXRpb24uYXBwZW5kQ2hpbGQod2VhdGhlckZlZWxzTGlrZUNvbnRhaW5lcik7XG4gICAgbG9jYXRpb25FeHRyYUluZm9ybWF0aW9uLmFwcGVuZENoaWxkKHdlYXRoZXJIdW1pZGl0eUNvbnRhaW5lcik7XG4gICAgbG9jYXRpb25FeHRyYUluZm9ybWF0aW9uLmFwcGVuZENoaWxkKHdlYXRoZXJNaW5Db250YWluZXIpO1xuICAgIGxvY2F0aW9uRXh0cmFJbmZvcm1hdGlvbi5hcHBlbmRDaGlsZCh3ZWF0aGVyTWF4Q29udGFpbmVyKTtcbiAgICBsb2NhdGlvbkV4dHJhSW5mb3JtYXRpb24uYXBwZW5kQ2hpbGQod2luZFNwZWVkQ29udGFpbmVyKTsgICBcbn1cblxuZnVuY3Rpb24gY29udmVydERhdGUoZGF0ZSkge1xuICBkYXRlID0gbmV3IERhdGUoZGF0ZSkudG9EYXRlU3RyaW5nKCk7XG4gIHJldHVybiBkYXRlO1xufVxuXG5mdW5jdGlvbiBidW5kbGVGb3JlY2FzdERhdGEoZm9yZWNhc3RMaXN0KSB7XG4gIGNvbnN0IGNlbHNpdXNCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2Vsc2l1cy1idXR0b24nKTtcblxuICAvLyBIb3VybHkgZm9yZWNhc3QgYnVuZGxlXG4gIGNvbnN0IG5leHQyMUhvdXJzID0gZm9yZWNhc3RMaXN0LnNsaWNlKDAsIDcpO1xuICBuZXh0MjFIb3Vycy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIGNvbnN0IGRhdGUgPSBjb252ZXJ0RGF0ZShpdGVtLmR0X3R4dC5zbGljZSgwLCAxMCkpLFxuICAgICAgICAgIHRpbWUgPSBpdGVtLmR0X3R4dC5zbGljZSgxMSwgMTkpLFxuICAgICAgICAgIGh1bWlkaXR5ID0gaXRlbS5tYWluLmh1bWlkaXR5LFxuICAgICAgICAgIHdlYXRoZXJUeXBlID0gaXRlbS53ZWF0aGVyWzBdLm1haW4sXG4gICAgICAgICAgd2VhdGhlckRlc2NyaXB0aW9uID0gaXRlbS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIHdpbmRTcGVlZCA9IGl0ZW0ud2luZC5zcGVlZDtcblxuICAgIGxldCB0ZW1wID0gaXRlbS5tYWluLnRlbXA7XG5cblxuICAgIC8vY2hlY2tzIGlmIGNlbHNpdXMgYnV0dG9uIGlzIG9uIGZvciBjb252ZXJzaW9uXG4gICAgaWYgKGNlbHNpdXNCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxzaXVzLW9uJykpIHtcbiAgICAgIHRlbXAgPSBmYWhyZW5oZWl0VG9DZWxzaXVzKGl0ZW0ubWFpbi50ZW1wKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGVtcCA9IGl0ZW0ubWFpbi50ZW1wO1xuICAgIH1cblxuICAgIGFwcGVuZEhvdXJseUZvcmVjYXN0KFxuICAgICAgZGF0ZSxcbiAgICAgIHRpbWUsXG4gICAgICB0ZW1wLFxuICAgICAgaHVtaWRpdHksXG4gICAgICB3ZWF0aGVyVHlwZSxcbiAgICAgIHdlYXRoZXJEZXNjcmlwdGlvbixcbiAgICAgIHdpbmRTcGVlZFxuICAgICAgKTtcbiAgfSlcbiAgXG4gIC8vIERhaWx5IGZvcmVjYXN0IGJ1bmRsZVxuICBjb25zdCBkYWlseUZvcmVjYXN0ID0gW10sXG4gICAgICAgIG5leHREYXkgPSBmb3JlY2FzdExpc3Quc2xpY2UoNywgOCksXG4gICAgICAgIHNlY29uZERheSA9IGZvcmVjYXN0TGlzdC5zbGljZSgxNSwgMTYpLFxuICAgICAgICB0aGlyZERheSA9IGZvcmVjYXN0TGlzdC5zbGljZSgyMywgMjQpLFxuICAgICAgICBmb3VydGhEYXkgPSBmb3JlY2FzdExpc3Quc2xpY2UoMzEsIDMyKSxcbiAgICAgICAgZmlmdGhEYXkgPSBmb3JlY2FzdExpc3Quc2xpY2UoMzksIDQwKTtcblxuICBkYWlseUZvcmVjYXN0LnB1c2gobmV4dERheSwgc2Vjb25kRGF5LCB0aGlyZERheSwgZm91cnRoRGF5LCBmaWZ0aERheSk7XG4gIGRhaWx5Rm9yZWNhc3QuZm9yRWFjaChpdGVtID0+IHtcblxuICAgIGNvbnN0IGRhdGUgPSBjb252ZXJ0RGF0ZShpdGVtWzBdLmR0X3R4dC5zbGljZSgwLCAxMCkpLFxuICAgICAgICAgIHRpbWUgPSBpdGVtWzBdLmR0X3R4dC5zbGljZSgxMSwgMTkpLFxuICAgICAgICAgIGh1bWlkaXR5ID0gaXRlbVswXS5tYWluLmh1bWlkaXR5LFxuICAgICAgICAgIHdlYXRoZXJUeXBlID0gaXRlbVswXS53ZWF0aGVyWzBdLm1haW4sXG4gICAgICAgICAgd2VhdGhlckRlc2NyaXB0aW9uID0gaXRlbVswXS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIHdpbmRTcGVlZCA9IGl0ZW1bMF0ud2luZC5zcGVlZDtcblxuICAgIGxldCB0ZW1wID0gaXRlbVswXS5tYWluLnRlbXA7XG5cbiAgICAvL2NoZWNrcyBpZiBjZWxzaXVzIGJ1dHRvbiBpcyBvbiBmb3IgY29udmVyc2lvblxuICAgIGlmIChjZWxzaXVzQnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnY2Vsc2l1cy1vbicpKSB7XG4gICAgICB0ZW1wID0gZmFocmVuaGVpdFRvQ2Vsc2l1cyhpdGVtWzBdLm1haW4udGVtcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRlbXAgPSBpdGVtWzBdLm1haW4udGVtcDtcbiAgICB9XG5cbiAgICBhcHBlbmREYWlseUZvcmVjYXN0KFxuICAgICAgZGF0ZSxcbiAgICAgIHRpbWUsXG4gICAgICB0ZW1wLFxuICAgICAgaHVtaWRpdHksXG4gICAgICB3ZWF0aGVyVHlwZSxcbiAgICAgIHdlYXRoZXJEZXNjcmlwdGlvbixcbiAgICAgIHdpbmRTcGVlZFxuICAgIClcbiAgfSlcbn1cblxuZnVuY3Rpb24gYXBwZW5kSG91cmx5Rm9yZWNhc3QoXG4gIGRhdGUsXG4gIHRpbWUsXG4gIHRlbXAsXG4gIGh1bWlkaXR5LFxuICB3ZWF0aGVyVHlwZSxcbiAgd2VhdGhlckRlc2NyaXB0aW9uLFxuICB3aW5kU3BlZWRcbiAgKSB7XG4gIGNvbnN0IGZvcmVDYXN0SG91cmx5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZvcmVjYXN0LWhvdXJseScpO1xuICBjb25zdCBuZXh0SG91cmx5Rm9yZWNhc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3Quc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWhvdXJseS1mb3JlY2FzdCcpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdC5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1ob3VybHktb3BlbicpO1xuICBjb25zdCBuZXh0SG91cmx5Rm9yZWNhc3REYXRlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0RGF0ZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtaG91cmx5LWZvcmVjYXN0LWRhdGUtY29udGFpbmVyJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0RGF0ZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1ob3VybHktb3BlbicpO1xuICBjb25zdCBuZXh0SG91cmx5Rm9yZWNhc3REYXRlU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0RGF0ZVN2Zy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtaG91cmx5LWZvcmVjYXN0LWRhdGUtc3ZnJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0RGF0ZVN2Zy5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1ob3VybHktaXRlbS1vcGVuJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0RGF0ZVN2Zy5zcmMgPSBkYXRlU3ZnSW1wb3J0O1xuICBjb25zdCBuZXh0SG91cmx5Rm9yZWNhc3REYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdERhdGUuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWhvdXJseS1mb3JlY2FzdC1kYXRlJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0RGF0ZS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1ob3VybHktaXRlbS1vcGVuJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0RGF0ZS50ZXh0Q29udGVudCA9IGAke2RhdGV9YDtcbiAgY29uc3QgbmV4dEhvdXJseUZvcmVjYXN0VGltZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFRpbWVDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWhvdXJseS1mb3JlY2FzdC10aW1lLWNvbnRhaW5lcicpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFRpbWVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtaG91cmx5LW9wZW4nKTtcbiAgY29uc3QgbmV4dEhvdXJseUZvcmVjYXN0VGltZVN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFRpbWVTdmcuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWhvdXJseS1mb3JlY2FzdC10aW1lLXN2ZycpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFRpbWVTdmcuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtaG91cmx5LWl0ZW0tb3BlbicpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFRpbWVTdmcuc3JjID0gdGltZVN2Z0ltcG9ydDtcbiAgY29uc3QgbmV4dEhvdXJseUZvcmVjYXN0VGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RUaW1lLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1ob3VybHktZm9yZWNhc3QtdGltZScpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFRpbWUuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtaG91cmx5LWl0ZW0tb3BlbicpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFRpbWUudGV4dENvbnRlbnQgPSBgJHt0aW1lfWA7XG4gIGNvbnN0IG5leHRIb3VybHlGb3JlY2FzdFRlbXBDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RUZW1wQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1ob3VybHktZm9yZWNhc3QtdGVtcC1jb250YWluZXInKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RUZW1wQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWhvdXJseS1vcGVuJyk7XG4gIGNvbnN0IG5leHRIb3VybHlGb3JlY2FzdFRlbXBTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RUZW1wU3ZnLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1ob3VybHktZm9yZWNhc3QtdGVtcC1zdmcnKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RUZW1wU3ZnLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWhvdXJseS1pdGVtLW9wZW4nKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RUZW1wU3ZnLnNyYyA9IHRlbXBTdmdJbXBvcnQ7XG4gIGNvbnN0IG5leHRIb3VybHlGb3JlY2FzdFRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0VGVtcC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtaG91cmx5LWZvcmVjYXN0LXRlbXAnKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RUZW1wLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWhvdXJseS1pdGVtLW9wZW4nKTtcbiAgY29uc3QgbmV4dEhvdXJseUZvcmVjYXN0SHVtaWRpdHlDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RIdW1pZGl0eUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtaG91cmx5LWZvcmVjYXN0LWh1bWlkaXR5LWNvbnRhaW5lcicpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdEh1bWlkaXR5Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWhvdXJseS1vcGVuJyk7XG4gIGNvbnN0IG5leHRIb3VybHlGb3JlY2FzdEh1bWlkaXR5U3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0SHVtaWRpdHlTdmcuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWhvdXJseS1mb3JlY2FzdC1odW1pZGl0eS1zdmcnKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RIdW1pZGl0eVN2Zy5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1ob3VybHktaXRlbS1vcGVuJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0SHVtaWRpdHlTdmcuc3JjID0gaHVtaWRpdHlTdmdJbXBvcnQ7XG4gIGNvbnN0IG5leHRIb3VybHlGb3JlY2FzdEh1bWlkaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdEh1bWlkaXR5LnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1ob3VybHktZm9yZWNhc3QtaHVtaWRpdHknKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RIdW1pZGl0eS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1ob3VybHktaXRlbS1vcGVuJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0SHVtaWRpdHkudGV4dENvbnRlbnQgPSBgSHVtaWRpdHk6ICR7aHVtaWRpdHl9ICVgO1xuICBjb25zdCBuZXh0SG91cmx5Rm9yZWNhc3RXZWF0aGVyVHlwZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFdlYXRoZXJUeXBlQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1ob3VybHktZm9yZWNhc3Qtd2VhdGhlci10eXBlLWNvbnRhaW5lcicpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFdlYXRoZXJUeXBlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWhvdXJseS1vcGVuJyk7XG4gIGNvbnN0IG5leHRIb3VybHlGb3JlY2FzdFdlYXRoZXJUeXBlU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0V2VhdGhlclR5cGVTdmcuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWhvdXJseS1mb3JlY2FzdC13ZWF0aGVyLXR5cGUtc3ZnJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0V2VhdGhlclR5cGVTdmcuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtaG91cmx5LWl0ZW0tb3BlbicpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFdlYXRoZXJUeXBlU3ZnLnNyYyA9IHdlYXRoZXJTdmdJbXBvcnQ7XG4gIGNvbnN0IG5leHRIb3VybHlGb3JlY2FzdFdlYXRoZXJUeXBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFdlYXRoZXJUeXBlLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1ob3VybHktZm9yZWNhc3Qtd2VhdGhlci10eXBlJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0V2VhdGhlclR5cGUuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtaG91cmx5LWl0ZW0tb3BlbicpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFdlYXRoZXJUeXBlLnRleHRDb250ZW50ID0gYCR7d2VhdGhlclR5cGV9LCAke3dlYXRoZXJEZXNjcmlwdGlvbn1gO1xuICBjb25zdCBuZXh0SG91cmx5Rm9yZWNhc3RXaW5kQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0V2luZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtaG91cmx5LWZvcmVjYXN0LXdpbmQtY29udGFpbmVyJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0V2luZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1ob3VybHktb3BlbicpO1xuICBjb25zdCBuZXh0SG91cmx5Rm9yZWNhc3RXaW5kU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0V2luZFN2Zy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtaG91cmx5LWZvcmVjYXN0LXdpbmQtc3ZnJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0V2luZFN2Zy5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1ob3VybHktaXRlbS1vcGVuJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0V2luZFN2Zy5zcmMgPSB3aW5kU3ZnSW1wb3J0O1xuICBjb25zdCBuZXh0SG91cmx5Rm9yZWNhc3RXaW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFdpbmQuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWhvdXJseS1mb3JlY2FzdC13aW5kJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0V2luZC5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1ob3VybHktaXRlbS1vcGVuJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0V2luZC50ZXh0Q29udGVudCA9IGBXaW5kIFNwZWVkOiAke3dpbmRTcGVlZH0gTVBIYDtcblxuICAvL2NoZWNrcyBpZiBjZWxzaXVzIGJ1dHRvbiBpcyBvbiBmb3IgY29udmVyc2lvblxuICBjb25zdCBjZWxzaXVzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NlbHNpdXMtYnV0dG9uJyk7XG4gIGlmIChjZWxzaXVzQnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnY2Vsc2l1cy1vbicpKSB7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0VGVtcC50ZXh0Q29udGVudCA9IGAke3RlbXB9IMKwQ2A7XG4gIH0gZWxzZSB7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0VGVtcC50ZXh0Q29udGVudCA9IGAke3RlbXB9IMKwRmA7XG4gIH1cblxuICBuZXh0SG91cmx5Rm9yZWNhc3REYXRlQ29udGFpbmVyLmFwcGVuZENoaWxkKG5leHRIb3VybHlGb3JlY2FzdERhdGVTdmcpO1xuICBuZXh0SG91cmx5Rm9yZWNhc3REYXRlQ29udGFpbmVyLmFwcGVuZENoaWxkKG5leHRIb3VybHlGb3JlY2FzdERhdGUpO1xuICBuZXh0SG91cmx5Rm9yZWNhc3RUaW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKG5leHRIb3VybHlGb3JlY2FzdFRpbWVTdmcpO1xuICBuZXh0SG91cmx5Rm9yZWNhc3RUaW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKG5leHRIb3VybHlGb3JlY2FzdFRpbWUpO1xuICBuZXh0SG91cmx5Rm9yZWNhc3RUZW1wQ29udGFpbmVyLmFwcGVuZENoaWxkKG5leHRIb3VybHlGb3JlY2FzdFRlbXBTdmcpO1xuICBuZXh0SG91cmx5Rm9yZWNhc3RUZW1wQ29udGFpbmVyLmFwcGVuZENoaWxkKG5leHRIb3VybHlGb3JlY2FzdFRlbXApO1xuICBuZXh0SG91cmx5Rm9yZWNhc3RIdW1pZGl0eUNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXh0SG91cmx5Rm9yZWNhc3RIdW1pZGl0eVN2Zyk7XG4gIG5leHRIb3VybHlGb3JlY2FzdEh1bWlkaXR5Q29udGFpbmVyLmFwcGVuZENoaWxkKG5leHRIb3VybHlGb3JlY2FzdEh1bWlkaXR5KTtcbiAgbmV4dEhvdXJseUZvcmVjYXN0V2VhdGhlclR5cGVDb250YWluZXIuYXBwZW5kQ2hpbGQobmV4dEhvdXJseUZvcmVjYXN0V2VhdGhlclR5cGVTdmcpO1xuICBuZXh0SG91cmx5Rm9yZWNhc3RXZWF0aGVyVHlwZUNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXh0SG91cmx5Rm9yZWNhc3RXZWF0aGVyVHlwZSk7XG4gIG5leHRIb3VybHlGb3JlY2FzdFdpbmRDb250YWluZXIuYXBwZW5kQ2hpbGQobmV4dEhvdXJseUZvcmVjYXN0V2luZFN2Zyk7XG4gIG5leHRIb3VybHlGb3JlY2FzdFdpbmRDb250YWluZXIuYXBwZW5kQ2hpbGQobmV4dEhvdXJseUZvcmVjYXN0V2luZCk7XG5cbiAgbmV4dEhvdXJseUZvcmVjYXN0LmFwcGVuZENoaWxkKG5leHRIb3VybHlGb3JlY2FzdERhdGVDb250YWluZXIpO1xuICBuZXh0SG91cmx5Rm9yZWNhc3QuYXBwZW5kQ2hpbGQobmV4dEhvdXJseUZvcmVjYXN0VGltZUNvbnRhaW5lcik7XG4gIG5leHRIb3VybHlGb3JlY2FzdC5hcHBlbmRDaGlsZChuZXh0SG91cmx5Rm9yZWNhc3RUZW1wQ29udGFpbmVyKTtcbiAgbmV4dEhvdXJseUZvcmVjYXN0LmFwcGVuZENoaWxkKG5leHRIb3VybHlGb3JlY2FzdEh1bWlkaXR5Q29udGFpbmVyKTtcbiAgbmV4dEhvdXJseUZvcmVjYXN0LmFwcGVuZENoaWxkKG5leHRIb3VybHlGb3JlY2FzdFdlYXRoZXJUeXBlQ29udGFpbmVyKTtcbiAgbmV4dEhvdXJseUZvcmVjYXN0LmFwcGVuZENoaWxkKG5leHRIb3VybHlGb3JlY2FzdFdpbmRDb250YWluZXIpO1xuXG4gIGZvcmVDYXN0SG91cmx5LmFwcGVuZENoaWxkKG5leHRIb3VybHlGb3JlY2FzdCk7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZERhaWx5Rm9yZWNhc3QoXG4gIGRhdGUsXG4gIHRpbWUsXG4gIHRlbXAsXG4gIGh1bWlkaXR5LFxuICB3ZWF0aGVyVHlwZSxcbiAgd2VhdGhlckRlc2NyaXB0aW9uLFxuICB3aW5kU3BlZWRcbikge1xuICBjb25zdCBmb3JlQ2FzdERhaWx5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZvcmVjYXN0LWRhaWx5Jyk7XG4gIGNvbnN0IG5leHREYWlseUZvcmVjYXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3Quc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWRhaWx5LWZvcmVjYXN0Jyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3QuY2xhc3NMaXN0LmFkZCgnbmV4dC1kYWlseS1mb3JlY2FzdC1vcGVuJyk7XG4gIGNvbnN0IG5leHREYWlseUZvcmVjYXN0RGF0ZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5leHREYWlseUZvcmVjYXN0RGF0ZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtZGFpbHktZm9yZWNhc3QtZGF0ZS1jb250YWluZXInKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdERhdGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtZGFpbHktb3BlbicpO1xuICBjb25zdCBuZXh0RGFpbHlGb3JlY2FzdERhdGVTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdERhdGVTdmcuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWRhaWx5LWZvcmVjYXN0LWRhdGUtc3ZnJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3REYXRlU3ZnLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWRhaWx5LWl0ZW0tb3BlbicpO1xuICAgIG5leHREYWlseUZvcmVjYXN0RGF0ZVN2Zy5zcmMgPSBkYXRlU3ZnSW1wb3J0O1xuICBjb25zdCBuZXh0RGFpbHlGb3JlY2FzdERhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3REYXRlLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1kYWlseS1mb3JlY2FzdC1kYXRlJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3REYXRlLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWRhaWx5LWl0ZW0tb3BlbicpO1xuICAgIG5leHREYWlseUZvcmVjYXN0RGF0ZS50ZXh0Q29udGVudCA9IGAke2RhdGV9YDtcbiAgY29uc3QgbmV4dERhaWx5Rm9yZWNhc3RUaW1lQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RUaW1lQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1kYWlseS1mb3JlY2FzdC10aW1lLWNvbnRhaW5lcicpO1xuICAgIG5leHREYWlseUZvcmVjYXN0VGltZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1kYWlseS1vcGVuJyk7XG4gIGNvbnN0IG5leHREYWlseUZvcmVjYXN0VGltZVN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIG5leHREYWlseUZvcmVjYXN0VGltZVN2Zy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtZGFpbHktZm9yZWNhc3QtdGltZS1zdmcnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFRpbWVTdmcuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtZGFpbHktaXRlbS1vcGVuJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RUaW1lU3ZnLnNyYyA9IHRpbWVTdmdJbXBvcnQ7XG4gIGNvbnN0IG5leHREYWlseUZvcmVjYXN0VGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFRpbWUuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWRhaWx5LWZvcmVjYXN0LXRpbWUnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFRpbWUuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtZGFpbHktaXRlbS1vcGVuJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RUaW1lLnRleHRDb250ZW50ID0gYCR7dGltZX1gO1xuICBjb25zdCBuZXh0RGFpbHlGb3JlY2FzdFRlbXBDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFRlbXBDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWRhaWx5LWZvcmVjYXN0LXRlbXAtY29udGFpbmVyJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RUZW1wQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWRhaWx5LW9wZW4nKTtcbiAgY29uc3QgbmV4dERhaWx5Rm9yZWNhc3RUZW1wU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RUZW1wU3ZnLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1kYWlseS1mb3JlY2FzdC10ZW1wLXN2ZycpO1xuICAgIG5leHREYWlseUZvcmVjYXN0VGVtcFN2Zy5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1kYWlseS1pdGVtLW9wZW4nKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFRlbXBTdmcuc3JjID0gdGVtcFN2Z0ltcG9ydDtcbiAgY29uc3QgbmV4dERhaWx5Rm9yZWNhc3RUZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIG5leHREYWlseUZvcmVjYXN0VGVtcC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtZGFpbHktZm9yZWNhc3QtdGVtcCcpO1xuICAgIG5leHREYWlseUZvcmVjYXN0VGVtcC5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1kYWlseS1pdGVtLW9wZW4nKTtcbiAgY29uc3QgbmV4dERhaWx5Rm9yZWNhc3RIdW1pZGl0eUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5leHREYWlseUZvcmVjYXN0SHVtaWRpdHlDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWRhaWx5LWZvcmVjYXN0LWh1bWlkaXR5LWNvbnRhaW5lcicpO1xuICAgIG5leHREYWlseUZvcmVjYXN0SHVtaWRpdHlDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtZGFpbHktb3BlbicpO1xuICBjb25zdCBuZXh0RGFpbHlGb3JlY2FzdEh1bWlkaXR5U3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RIdW1pZGl0eVN2Zy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtZGFpbHktZm9yZWNhc3QtaHVtaWRpdHktc3ZnJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RIdW1pZGl0eVN2Zy5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1kYWlseS1pdGVtLW9wZW4nKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdEh1bWlkaXR5U3ZnLnNyYyA9IGh1bWlkaXR5U3ZnSW1wb3J0O1xuICBjb25zdCBuZXh0RGFpbHlGb3JlY2FzdEh1bWlkaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIG5leHREYWlseUZvcmVjYXN0SHVtaWRpdHkuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWRhaWx5LWZvcmVjYXN0LWh1bWlkaXR5Jyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RIdW1pZGl0eS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1kYWlseS1pdGVtLW9wZW4nKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdEh1bWlkaXR5LnRleHRDb250ZW50ID0gYEh1bWlkaXR5OiAke2h1bWlkaXR5fSAlYDtcbiAgY29uc3QgbmV4dERhaWx5Rm9yZWNhc3RXZWF0aGVyVHlwZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5leHREYWlseUZvcmVjYXN0V2VhdGhlclR5cGVDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWRhaWx5LWZvcmVjYXN0LXdlYXRoZXItdHlwZS1jb250YWluZXInKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFdlYXRoZXJUeXBlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWRhaWx5LW9wZW4nKTtcbiAgY29uc3QgbmV4dERhaWx5Rm9yZWNhc3RXZWF0aGVyVHlwZVN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIG5leHREYWlseUZvcmVjYXN0V2VhdGhlclR5cGVTdmcuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWRhaWx5LWZvcmVjYXN0LXdlYXRoZXItdHlwZS1zdmcnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFdlYXRoZXJUeXBlU3ZnLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWRhaWx5LWl0ZW0tb3BlbicpO1xuICAgIG5leHREYWlseUZvcmVjYXN0V2VhdGhlclR5cGVTdmcuc3JjID0gd2VhdGhlclN2Z0ltcG9ydDtcbiAgY29uc3QgbmV4dERhaWx5Rm9yZWNhc3RXZWF0aGVyVHlwZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFdlYXRoZXJUeXBlLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1kYWlseS1mb3JlY2FzdC13ZWF0aGVyLXR5cGUnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFdlYXRoZXJUeXBlLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWRhaWx5LWl0ZW0tb3BlbicpO1xuICAgIG5leHREYWlseUZvcmVjYXN0V2VhdGhlclR5cGUudGV4dENvbnRlbnQgPSBgJHt3ZWF0aGVyVHlwZX0sICR7d2VhdGhlckRlc2NyaXB0aW9ufWA7XG4gIGNvbnN0IG5leHREYWlseUZvcmVjYXN0V2luZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5leHREYWlseUZvcmVjYXN0V2luZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtZGFpbHktZm9yZWNhc3Qtd2luZC1jb250YWluZXInKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFdpbmRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtZGFpbHktb3BlbicpO1xuICBjb25zdCBuZXh0RGFpbHlGb3JlY2FzdFdpbmRTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFdpbmRTdmcuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWRhaWx5LWZvcmVjYXN0LXdpbmQtc3ZnJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RXaW5kU3ZnLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWRhaWx5LWl0ZW0tb3BlbicpO1xuICAgIG5leHREYWlseUZvcmVjYXN0V2luZFN2Zy5zcmMgPSB3aW5kU3ZnSW1wb3J0O1xuICBjb25zdCBuZXh0RGFpbHlGb3JlY2FzdFdpbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RXaW5kLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1kYWlseS1mb3JlY2FzdC13aW5kJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RXaW5kLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWRhaWx5LWl0ZW0tb3BlbicpO1xuICAgIG5leHREYWlseUZvcmVjYXN0V2luZC50ZXh0Q29udGVudCA9IGBXaW5kIFNwZWVkOiAke3dpbmRTcGVlZH0gTVBIYDtcblxuICAvL2NoZWNrcyBpZiBjZWxzaXVzIGJ1dHRvbiBpcyBvbiBmb3IgY29udmVyc2lvblxuICBjb25zdCBjZWxzaXVzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NlbHNpdXMtYnV0dG9uJyk7XG4gIGlmIChjZWxzaXVzQnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnY2Vsc2l1cy1vbicpKSB7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RUZW1wLnRleHRDb250ZW50ID0gYCR7dGVtcH0gwrBDYDtcbiAgfSBlbHNlIHtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFRlbXAudGV4dENvbnRlbnQgPSBgJHt0ZW1wfSDCsEZgO1xuICB9XG5cbiAgbmV4dERhaWx5Rm9yZWNhc3REYXRlQ29udGFpbmVyLmFwcGVuZENoaWxkKG5leHREYWlseUZvcmVjYXN0RGF0ZVN2Zyk7XG4gIG5leHREYWlseUZvcmVjYXN0RGF0ZUNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXh0RGFpbHlGb3JlY2FzdERhdGUpO1xuICBuZXh0RGFpbHlGb3JlY2FzdFRpbWVDb250YWluZXIuYXBwZW5kQ2hpbGQobmV4dERhaWx5Rm9yZWNhc3RUaW1lU3ZnKTtcbiAgbmV4dERhaWx5Rm9yZWNhc3RUaW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKG5leHREYWlseUZvcmVjYXN0VGltZSk7XG4gIG5leHREYWlseUZvcmVjYXN0VGVtcENvbnRhaW5lci5hcHBlbmRDaGlsZChuZXh0RGFpbHlGb3JlY2FzdFRlbXBTdmcpO1xuICBuZXh0RGFpbHlGb3JlY2FzdFRlbXBDb250YWluZXIuYXBwZW5kQ2hpbGQobmV4dERhaWx5Rm9yZWNhc3RUZW1wKTtcbiAgbmV4dERhaWx5Rm9yZWNhc3RIdW1pZGl0eUNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXh0RGFpbHlGb3JlY2FzdEh1bWlkaXR5U3ZnKTtcbiAgbmV4dERhaWx5Rm9yZWNhc3RIdW1pZGl0eUNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXh0RGFpbHlGb3JlY2FzdEh1bWlkaXR5KTtcbiAgbmV4dERhaWx5Rm9yZWNhc3RXZWF0aGVyVHlwZUNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXh0RGFpbHlGb3JlY2FzdFdlYXRoZXJUeXBlU3ZnKTtcbiAgbmV4dERhaWx5Rm9yZWNhc3RXZWF0aGVyVHlwZUNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXh0RGFpbHlGb3JlY2FzdFdlYXRoZXJUeXBlKTtcbiAgbmV4dERhaWx5Rm9yZWNhc3RXaW5kQ29udGFpbmVyLmFwcGVuZENoaWxkKG5leHREYWlseUZvcmVjYXN0V2luZFN2Zyk7XG4gIG5leHREYWlseUZvcmVjYXN0V2luZENvbnRhaW5lci5hcHBlbmRDaGlsZChuZXh0RGFpbHlGb3JlY2FzdFdpbmQpO1xuICBuZXh0RGFpbHlGb3JlY2FzdC5hcHBlbmRDaGlsZChuZXh0RGFpbHlGb3JlY2FzdERhdGVDb250YWluZXIpO1xuICBuZXh0RGFpbHlGb3JlY2FzdC5hcHBlbmRDaGlsZChuZXh0RGFpbHlGb3JlY2FzdFRpbWVDb250YWluZXIpO1xuICBuZXh0RGFpbHlGb3JlY2FzdC5hcHBlbmRDaGlsZChuZXh0RGFpbHlGb3JlY2FzdFRlbXBDb250YWluZXIpO1xuICBuZXh0RGFpbHlGb3JlY2FzdC5hcHBlbmRDaGlsZChuZXh0RGFpbHlGb3JlY2FzdEh1bWlkaXR5Q29udGFpbmVyKTtcbiAgbmV4dERhaWx5Rm9yZWNhc3QuYXBwZW5kQ2hpbGQobmV4dERhaWx5Rm9yZWNhc3RXZWF0aGVyVHlwZUNvbnRhaW5lcik7XG4gIG5leHREYWlseUZvcmVjYXN0LmFwcGVuZENoaWxkKG5leHREYWlseUZvcmVjYXN0V2luZENvbnRhaW5lcik7XG4gIGZvcmVDYXN0RGFpbHkuYXBwZW5kQ2hpbGQobmV4dERhaWx5Rm9yZWNhc3QpO1xufVxuXG5mdW5jdGlvbiBzaG93SG91cmx5Rm9yZWNhc3QoKSB7XG4gIGNvbnN0IGRhaWx5Rm9yZWNhc3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGFpbHktZm9yZWNhc3QtYnV0dG9uJyksXG4gICAgICAgIGhvdXJseUZvcmVjYXN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hvdXJseS1mb3JlY2FzdC1idXR0b24nKSxcbiAgICAgICAgZm9yZWNhc3REYWlseSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JlY2FzdC1kYWlseScpLFxuICAgICAgICBmb3JlY2FzdEhvdXJseSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JlY2FzdC1ob3VybHknKTtcblxuICBpZiAoZGFpbHlGb3JlY2FzdEJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2RhaWx5LWZvcmVjYXN0LWJ1dHRvbi1vbicpKSB7XG4gICAgZGFpbHlGb3JlY2FzdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdkYWlseS1mb3JlY2FzdC1idXR0b24tb24nKTtcbiAgICBkYWlseUZvcmVjYXN0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2RhaWx5LWZvcmVjYXN0LWJ1dHRvbi1vZmYnKTtcbiAgICBob3VybHlGb3JlY2FzdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdob3VybHktZm9yZWNhc3QtYnV0dG9uLW9uJyk7XG4gICAgaG91cmx5Rm9yZWNhc3RCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaG91cmx5LWZvcmVjYXN0LWJ1dHRvbi1vZmYnKTtcbiAgICBmb3JlY2FzdERhaWx5LmNsYXNzTGlzdC5yZW1vdmUoJ2ZvcmVjYXN0LWRhaWx5LW9uJyk7XG4gICAgZm9yZWNhc3REYWlseS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1kYWlseS1vZmYnKTtcbiAgICBmb3JlY2FzdEhvdXJseS5jbGFzc0xpc3QucmVtb3ZlKCdmb3JlY2FzdC1ob3VybHktb2ZmJyk7XG4gICAgZm9yZWNhc3RIb3VybHkuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtaG91cmx5LW9uJyk7XG4gIH0gZWxzZSBpZiAoaG91cmx5Rm9yZWNhc3RCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdob3VybHktZm9yZWNhc3QtYnV0dG9uLW9uJykpIHtcbiAgICByZXR1cm47XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNob3dEYWlseUZvcmVjYXN0KCkge1xuICBjb25zdCBkYWlseUZvcmVjYXN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RhaWx5LWZvcmVjYXN0LWJ1dHRvbicpLFxuICAgICAgICBob3VybHlGb3JlY2FzdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNob3VybHktZm9yZWNhc3QtYnV0dG9uJyksXG4gICAgICAgIGZvcmVjYXN0RGFpbHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9yZWNhc3QtZGFpbHknKSxcbiAgICAgICAgZm9yZWNhc3RIb3VybHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9yZWNhc3QtaG91cmx5Jyk7XG5cbiAgaWYgKGRhaWx5Rm9yZWNhc3RCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdkYWlseS1mb3JlY2FzdC1idXR0b24tb24nKSkge1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmIChob3VybHlGb3JlY2FzdEJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2hvdXJseS1mb3JlY2FzdC1idXR0b24tb24nKSkge1xuICAgIGRhaWx5Rm9yZWNhc3RCdXR0b24uY2xhc3NMaXN0LmFkZCgnZGFpbHktZm9yZWNhc3QtYnV0dG9uLW9uJyk7XG4gICAgZGFpbHlGb3JlY2FzdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdkYWlseS1mb3JlY2FzdC1idXR0b24tb2ZmJyk7XG4gICAgaG91cmx5Rm9yZWNhc3RCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaG91cmx5LWZvcmVjYXN0LWJ1dHRvbi1vbicpO1xuICAgIGhvdXJseUZvcmVjYXN0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hvdXJseS1mb3JlY2FzdC1idXR0b24tb2ZmJyk7XG4gICAgZm9yZWNhc3REYWlseS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1kYWlseS1vbicpO1xuICAgIGZvcmVjYXN0RGFpbHkuY2xhc3NMaXN0LnJlbW92ZSgnZm9yZWNhc3QtZGFpbHktb2ZmJyk7XG4gICAgZm9yZWNhc3RIb3VybHkuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtaG91cmx5LW9mZicpO1xuICAgIGZvcmVjYXN0SG91cmx5LmNsYXNzTGlzdC5yZW1vdmUoJ2ZvcmVjYXN0LWhvdXJseS1vbicpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybjtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVQcmV2aW91c0luZm9ybWF0aW9uKCkge1xuICBjb25zdCBsb2NhdGlvbkluZm9ybWF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvY2F0aW9uLWluZm9ybWF0aW9uJyksXG4gICAgICAgIGxvY2F0aW9uRXh0cmFJbmZvcm1hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2NhdGlvbi1leHRyYS1pbmZvcm1hdGlvbicpLFxuICAgICAgICBmb3JlY2FzdEhvdXJseSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JlY2FzdC1ob3VybHknKSxcbiAgICAgICAgZm9yZWNhc3REYWlseSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JlY2FzdC1kYWlseScpO1xuXG4gIHJlbW92ZUFsbENoaWxkTm9kZXMobG9jYXRpb25JbmZvcm1hdGlvbik7XG4gIHJlbW92ZUFsbENoaWxkTm9kZXMobG9jYXRpb25FeHRyYUluZm9ybWF0aW9uKTtcbiAgcmVtb3ZlQWxsQ2hpbGROb2Rlcyhmb3JlY2FzdEhvdXJseSk7XG4gIHJlbW92ZUFsbENoaWxkTm9kZXMoZm9yZWNhc3REYWlseSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUFsbENoaWxkTm9kZXMocGFyZW50KSB7XG4gIHdoaWxlIChwYXJlbnQuZmlyc3RDaGlsZCkge1xuICAgIHBhcmVudC5yZW1vdmVDaGlsZChwYXJlbnQuZmlyc3RDaGlsZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hvd0ZhaHJlbmhlaXQoKSB7XG4gIGNvbnN0IGZhaHJlbmhlaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmFocmVuaGVpdC1idXR0b24nKSxcbiAgICAgICAgY2Vsc2l1c0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjZWxzaXVzLWJ1dHRvbicpO1xuXG4gIC8vIGluZm9ybXMgdXNlciBvbiB3aGVuIHRvIGV4cGVjdCB0byBzZWUgdGhlIGNlbHNpdXMvZmFocmVuaGVpdCByZWFkaW5nIGNoYW5nZS4gSXQgb25seSBzaG93cyBpdCBvbmNlIHBlciBzZXNzaW9uXG4gIGNvbnN0IGZpcnN0QWxlcnQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdmaXJzdC1hbGVydCcpO1xuICBpZiAoZmlyc3RBbGVydCA9PT0gJ3RydWUnKSB7XG4gICAgYWxlcnQoJ1doZW4gY2hhbmdpbmcgYmV0d2VlbiBjZWxzaXVzIGFuZCBmYWhyZW5oZWl0LCB0aGUgdGVtcGVyYXR1cmUgcmVhZGluZ3Mgd2lsbCBjaGFuZ2Ugb24geW91ciBuZXh0IHNlYXJjaCcpO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2ZpcnN0LWFsZXJ0JywgJ2ZhbHNlJyk7XG4gIH1cblxuICBpZiAoZmFocmVuaGVpdEJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2ZhaHJlbmhlaXQtb24nKSkge1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmIChmYWhyZW5oZWl0QnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnZmFocmVuaGVpdC1vZmYnKSkge1xuICAgIGZhaHJlbmhlaXRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnZmFocmVuaGVpdC1vZmYnKTtcbiAgICBmYWhyZW5oZWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2ZhaHJlbmhlaXQtb24nKTtcbiAgICBjZWxzaXVzQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2NlbHNpdXMtb24nKTtcbiAgICBjZWxzaXVzQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2NlbHNpdXMtb2ZmJyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNob3dDZWxzaXVzKCkge1xuICBjb25zdCBmYWhyZW5oZWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZhaHJlbmhlaXQtYnV0dG9uJyksXG4gICAgICAgIGNlbHNpdXNCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2Vsc2l1cy1idXR0b24nKTtcblxuICAvLyBpbmZvcm1zIHVzZXIgb24gd2hlbiB0byBleHBlY3QgdG8gc2VlIHRoZSBjZWxzaXVzL2ZhaHJlbmhlaXQgcmVhZGluZyBjaGFuZ2UuIEl0IG9ubHkgc2hvd3MgaXQgb25jZSBwZXIgc2Vzc2lvblxuICBjb25zdCBmaXJzdEFsZXJ0ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnZmlyc3QtYWxlcnQnKTtcbiAgaWYgKGZpcnN0QWxlcnQgPT09ICd0cnVlJykge1xuICAgIGFsZXJ0KCdXaGVuIGNoYW5naW5nIGJldHdlZW4gY2Vsc2l1cyBhbmQgZmFocmVuaGVpdCwgdGhlIHRlbXBlcmF0dXJlIHJlYWRpbmdzIHdpbGwgY2hhbmdlIG9uIHlvdXIgbmV4dCBzZWFyY2gnKTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdmaXJzdC1hbGVydCcsICdmYWxzZScpO1xuICB9XG4gIFxuICBpZiAoY2Vsc2l1c0J1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2NlbHNpdXMtb24nKSkge1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmIChjZWxzaXVzQnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnY2Vsc2l1cy1vZmYnKSkge1xuICAgIGNlbHNpdXNCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnY2Vsc2l1cy1vZmYnKTtcbiAgICBjZWxzaXVzQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2NlbHNpdXMtb24nKTtcbiAgICBmYWhyZW5oZWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2ZhaHJlbmhlaXQtb2ZmJyk7XG4gICAgZmFocmVuaGVpdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdmYWhyZW5oZWl0LW9uJyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZhaHJlbmhlaXRUb0NlbHNpdXMobnVtYmVyKSB7XG4gIGNvbnN0IHRvdGFsID0gKG51bWJlci0zMikgKiA1LzksXG4gICAgICAgIHJvdW5kZWQgPSBNYXRoLnJvdW5kKHRvdGFsICogMTApIC8gMTA7XG5cbiAgbnVtYmVyID0gcm91bmRlZDtcbiAgcmV0dXJuIG51bWJlcjtcbn0iLCJleHBvcnQge1xuICBsb2FkTWVhc3VyZW1lbnRBbGVydFxufVxuXG5mdW5jdGlvbiBsb2FkTWVhc3VyZW1lbnRBbGVydCgpIHtcbiAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnZmlyc3QtYWxlcnQnLCAndHJ1ZScpO1xufSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2ltZ3MvbW91bnRhaW4tbGFrZS5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuL3N2Z3Mvc2VhcmNoLnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9RnJlZG9rYTp3Z2h0QDMwMCZmYW1pbHk9Um9ib3RvK01vbm86d2dodEAzMDAmZGlzcGxheT1zd2FwKTtcIl0pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIE1vbm8nLCBtb25vc3BhY2UsICdGcmVkb2thJywgc2Fucy1zZXJpZjtcXG59XFxuXFxuI2JhY2tncm91bmQge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4jaGVhZGVyIHtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTB2aDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4jaGVhZGVyLWxlZnQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiA1MHZ3O1xcbiAgaGVpZ2h0OiAxMHZoO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuI2hlYWRlci10aXRsZS1maXJzdCB7XFxuICBwYWRkaW5nLWxlZnQ6IDQlO1xcbiAgZm9udC1zaXplOiAyLjVlbTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxuICBjb2xvcjogI2YzYWM0YztcXG59XFxuXFxuI2hlYWRlci10aXRsZS1zZWNvbmQge1xcbiAgZm9udC1zaXplOiAyLjVlbTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxuICBjb2xvcjogIzQzOGNjYztcXG59XFxuXFxuI2hlYWRlci1pY29uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogNGVtO1xcbiAgaGVpZ2h0OiA0ZW07XFxuICBwYWRkaW5nLWxlZnQ6IDQlO1xcbn1cXG5cXG4jaGVhZGVyLXJpZ2h0IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogNTB2dztcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuICBwYWRkaW5nLXJpZ2h0OiA0JTtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmxhYmVsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxubGFiZWw6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMTBweDtcXG4gIHRvcDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIHdpZHRoOiAxLjVlbTtcXG4gIGJhY2tncm91bmQ6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gKyBcIikgY2VudGVyIC8gY29udGFpbiBuby1yZXBlYXQ7XFxuICBmaWx0ZXI6IGludmVydCg3OSUpIHNlcGlhKDcyJSkgc2F0dXJhdGUoOTEzJSkgaHVlLXJvdGF0ZSgzMjNkZWcpIGJyaWdodG5lc3MoMTAxJSkgY29udHJhc3QoOTElKTtcXG59XFxuXFxuI3NlYXJjaC1iYXItaW5wdXQge1xcbiAgd2lkdGg6IDE1dnc7XFxuICBoZWlnaHQ6IDV2aDtcXG4gIGZvbnQtc2l6ZTogMS41ZW07XFxuICBwYWRkaW5nLWxlZnQ6IDE2JTtcXG4gIGNvbG9yOiAjNDM4Y2NjO1xcbn1cXG5cXG4jYXBwIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDkwdmg7XFxuICBmbGV4LWZsb3c6IGNvbHVtbiBub3dyYXA7XFxuXFxufVxcblxcbiNhcHAtdG9wIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBoZWlnaHQ6IDUwdmg7XFxuICB3aWR0aDogMTAwdnc7XFxufVxcblxcbiNhcHAtdG9wLWxlZnQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiA0NXZ3O1xcbiAgaGVpZ2h0OiA1MHZoO1xcbn1cXG5cXG4jbG9jYXRpb24taW5mb3JtYXRpb24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiA0NXZ3O1xcbiAgaGVpZ2h0OiA0MHZoO1xcbiAgZmxleC1mbG93OiByb3cgd3JhcDtcXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBtYXJnaW4tdG9wOiA1JTtcXG4gIG1hcmdpbi1sZWZ0OiA1JTtcXG59XFxuXFxuI2NpdHktY29udGFpbmVyLCAjd2VhdGhlci1kZXNjcmlwdGlvbi1jb250YWluZXIsICN3ZWF0aGVyLXRlbXBlcmF0dXJlLWNvbnRhaW5lciwgI3RvZGF5cy1kYXRlLWNvbnRhaW5lciwgI3RvZGF5cy10aW1lLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDQ1dnc7XFxuICBoZWlnaHQ6IDV2aDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG4gIG1hcmdpbjogMDtcXG4gIHdpZHRoOiA0MHZ3O1xcbiAgcGFkZGluZzogMiU7XFxufVxcblxcbiNjaXR5LXN2ZywgI3dlYXRoZXItZGVzY3JpcHRpb24tc3ZnLCAjd2VhdGhlci10ZW1wZXJhdHVyZS1zdmcsICN0b2RheXMtZGF0ZS1zdmcsICN0b2RheXMtdGltZS1zdmcge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiAyLjVlbTtcXG4gIGhlaWdodDogMi41ZW07XFxuICBmaWx0ZXI6IGludmVydCg3OSUpIHNlcGlhKDcyJSkgc2F0dXJhdGUoOTEzJSkgaHVlLXJvdGF0ZSgzMjNkZWcpIGJyaWdodG5lc3MoMTAxJSkgY29udHJhc3QoOTElKTtcXG4gIHBhZGRpbmctcmlnaHQ6IDUlO1xcbn1cXG5cXG4jY2l0eS1uYW1lLCAjd2VhdGhlci10ZW1wZXJhdHVyZSwgI3RvZGF5cy10aW1lLCAjd2VhdGhlci1kZXNjcmlwdGlvbiwgI3RvZGF5cy1kYXRlIHtcXG4gIGZvbnQtc2l6ZTogMmVtO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG4gIGNvbG9yOiAjZjNhYzRjO1xcbn1cXG5cXG4jYXBwLXRvcC1yaWdodCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDQ1dnc7XFxuICBoZWlnaHQ6IDUwdmg7XFxufVxcblxcbiNsb2NhdGlvbi1leHRyYS1pbmZvcm1hdGlvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDQ1dnc7XFxuICBoZWlnaHQ6IDQwdmg7XFxuICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1hcmdpbi10b3A6IDUlO1xcbiAgbWFyZ2luLWxlZnQ6IDE2LjUlO1xcbn1cXG5cXG4jd2VhdGhlci1mZWVscy1saWtlLWNvbnRhaW5lciwgI3dlYXRoZXItaHVtaWRpdHktY29udGFpbmVyLCAjd2VhdGhlci1taW4tY29udGFpbmVyLCAjd2VhdGhlci1tYXgtY29udGFpbmVyLCAjd2luZC1zcGVlZC1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiA0NXZ3O1xcbiAgaGVpZ2h0OiA1dmg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MCwgMjQyLCAyNDAsIDAuOSk7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAyJTtcXG59XFxuXFxuI3dlYXRoZXItZmVlbHMtbGlrZS1zdmcsICN3ZWF0aGVyLWh1bWlkaXR5LXN2ZywgI3dlYXRoZXItbWluLXN2ZywgI3dlYXRoZXItbWF4LXN2ZywgI3dpbmQtc3BlZWQtc3ZnLCAjbmV4dC1kYWlseS1mb3JlY2FzdC13ZWF0aGVyLXR5cGUtc3ZnLCAjbmV4dC1ob3VybHktZm9yZWNhc3Qtd2VhdGhlci10eXBlLXN2ZyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDIuNWVtO1xcbiAgaGVpZ2h0OiAyLjVlbTtcXG4gIGZpbHRlcjogaW52ZXJ0KDU0JSkgc2VwaWEoMzQlKSBzYXR1cmF0ZSg4NjElKSBodWUtcm90YXRlKDE2NmRlZykgYnJpZ2h0bmVzcyg4OCUpIGNvbnRyYXN0KDg4JSk7XFxuICBwYWRkaW5nLXJpZ2h0OiA1JTtcXG59XFxuXFxuI3dlYXRoZXItZmVlbHMtbGlrZSwgI3dlYXRoZXItaHVtaWRpdHksICN3ZWF0aGVyLW1pbiwgI3dlYXRoZXItbWF4LCAjd2luZC1zcGVlZCB7XFxuICBmb250LXNpemU6IDJlbTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxuICBjb2xvcjogIzQzOGNjYztcXG59XFxuXFxuI2FwcC1ib3R0b20ge1xcbiAgZGlzcGxheTpmbGV4O1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiA1MHZoO1xcbiAgZmxleC1mbG93OiBjb2x1bW4gbm93cmFwO1xcbiAgYWxpZ24tY29udGVudDogZmxleC1zdGFydDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG4jaW5mb3JtYXRpb24tc3dpdGNoZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiAxMHZ3O1xcbiAgaGVpZ2h0OiAzLjV2aDtcXG4gIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBwYWRkaW5nLWxlZnQ6IDIuNzUlO1xcbn1cXG5cXG4jZGFpbHktZm9yZWNhc3QtYnV0dG9uLCAjaG91cmx5LWZvcmVjYXN0LWJ1dHRvbiwgI2ZhaHJlbmhlaXQtYnV0dG9uLCAjY2Vsc2l1cy1idXR0b24ge1xcbiAgd2lkdGg6IDh2dztcXG4gIGhlaWdodDogMy41dmg7XFxuICBmb250LXNpemU6IDFlbTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxuICBib3JkZXItcmFkaXVzOiAxMCU7XFxuICBtYXJnaW4tbGVmdDogMyU7XFxufVxcblxcbiNmYWhyZW5oZWl0LWJ1dHRvbiB7XFxuICBtYXJnaW4tbGVmdDogMXZ3O1xcbn1cXG5cXG4uZGFpbHktZm9yZWNhc3QtYnV0dG9uLW9mZiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG4gIGNvbG9yOiAjZjNhYzRjO1xcbn1cXG5cXG4uZGFpbHktZm9yZWNhc3QtYnV0dG9uLW9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmM2FjNGM7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG4gIGNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC44KTs7XFxufVxcblxcbi5ob3VybHktZm9yZWNhc3QtYnV0dG9uLW9mZiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG4gIGNvbG9yOiAjNDM4Y2NjO1xcbn1cXG5cXG4uaG91cmx5LWZvcmVjYXN0LWJ1dHRvbi1vbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDM4Y2NjO1xcbiAgY29sb3I6IHJnYigyNDAsIDI0MiwgMjQwLCAwLjgpO1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiKDI0MCwgMjQyLCAyNDAsIDAuOSk7XFxufVxcblxcbi5jZWxzaXVzLW9mZiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG4gIGNvbG9yOiAjNDM4Y2NjO1xcbn1cXG5cXG4uZmFocmVuaGVpdC1vZmYge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MCwgMjQyLCAyNDAsIDAuOSk7XFxuICBjb2xvcjogI2YzYWM0YztcXG59XFxuXFxuLmNlbHNpdXMtb24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQzOGNjYztcXG4gIGNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC44KTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYigyNDAsIDI0MiwgMjQwLCAwLjkpO1xcbn1cXG5cXG4uZmFocmVuaGVpdC1vbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjNhYzRjO1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiKDI0MCwgMjQyLCAyNDAsIDAuOSk7XFxuICBjb2xvcjogcmdiKDI0MCwgMjQyLCAyNDAsIDAuOCk7O1xcbn1cXG5cXG4uZm9yZWNhc3QtaG91cmx5LW9mZiB7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICBkaXNwbGF5OiBub25lO1xcbiAgd2lkdGg6IDA7XFxuICBoZWlnaHQ6IDA7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi5mb3JlY2FzdC1kYWlseS1vZmYge1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHdpZHRoOiAwO1xcbiAgaGVpZ2h0OiAwO1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4uZm9yZWNhc3QtZGFpbHktb24ge1xcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDM2LjV2aDtcXG4gIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxufVxcblxcbi5uZXh0LWRhaWx5LWZvcmVjYXN0LW9wZW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTh2dztcXG4gIGhlaWdodDogMzB2aDtcXG4gIGZvbnQtc2l6ZTogMC44ZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG4gIG1hcmdpbjogMC41JTtcXG59XFxuXFxuLmZvcmVjYXN0LWRhaWx5LW9wZW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTh2dztcXG4gIGhlaWdodDogNXZoO1xcbn1cXG5cXG4uZm9yZWNhc3QtZGFpbHktaXRlbS1vcGVuIHtcXG4gIG1hcmdpbjogMDtcXG4gIG1hcmdpbi1sZWZ0OiA1JTtcXG4gIGNvbG9yOiAjNDM4Y2NjO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG59XFxuXFxuI25leHQtZGFpbHktZm9yZWNhc3QtZGF0ZS1zdmcsICNuZXh0LWRhaWx5LWZvcmVjYXN0LXRpbWUtc3ZnLCAjbmV4dC1kYWlseS1mb3JlY2FzdC10ZW1wLXN2ZywgI25leHQtZGFpbHktZm9yZWNhc3QtaHVtaWRpdHktc3ZnLCAjbmV4dC1kYWlseS1mb3JlY2FzdC13ZWF0aGVyLXR5cGUtc3ZnLCAjbmV4dC1kYWlseS1mb3JlY2FzdC13aW5kLXN2ZyB7XFxuICBmaWx0ZXI6IGludmVydCg3OSUpIHNlcGlhKDcyJSkgc2F0dXJhdGUoOTEzJSkgaHVlLXJvdGF0ZSgzMjNkZWcpIGJyaWdodG5lc3MoMTAxJSkgY29udHJhc3QoOTElKTtcXG59XFxuXFxuLmZvcmVjYXN0LWhvdXJseS1vbiB7XFxuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMzYuNXZoO1xcbiAgZmxleC1mbG93OiByb3cgbm93cmFwO1xcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG59XFxuXFxuI25leHQtaG91cmx5LWZvcmVjYXN0IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWZsb3c6IGNvbHVtbiBub3dyYXA7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgd2lkdGg6IDEzLjV2dztcXG4gIGhlaWdodDogMzJ2aDtcXG4gIGZvbnQtc2l6ZTogMC44NWVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MCwgMjQyLCAyNDAsIDAuOSk7XFxuICBtYXJnaW46IDAuMjUlO1xcbn1cXG5cXG4uZm9yZWNhc3QtaG91cmx5LW9wZW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTJ2dztcXG4gIGhlaWdodDogNXZoO1xcbn1cXG5cXG4uZm9yZWNhc3QtaG91cmx5LWl0ZW0tb3BlbiB7XFxuICBtYXJnaW46IDA7XFxuICBtYXJnaW4tbGVmdDogNSU7XFxuICBjb2xvcjogIzQzOGNjYztcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxufVxcblxcbiNuZXh0LWhvdXJseS1mb3JlY2FzdC1kYXRlLXN2ZywgI25leHQtaG91cmx5LWZvcmVjYXN0LXRpbWUtc3ZnLCAjbmV4dC1ob3VybHktZm9yZWNhc3QtdGVtcC1zdmcsICNuZXh0LWhvdXJseS1mb3JlY2FzdC1odW1pZGl0eS1zdmcsICNuZXh0LWhvdXJseS1mb3JlY2FzdC13ZWF0aGVyLXR5cGUtc3ZnLCAjbmV4dC1ob3VybHktZm9yZWNhc3Qtd2luZC1zdmcge1xcbiAgZmlsdGVyOiBpbnZlcnQoNzklKSBzZXBpYSg3MiUpIHNhdHVyYXRlKDkxMyUpIGh1ZS1yb3RhdGUoMzIzZGVnKSBicmlnaHRuZXNzKDEwMSUpIGNvbnRyYXN0KDkxJSk7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBRUE7RUFDRSw0REFBNEQ7QUFDOUQ7O0FBRUE7RUFDRSx5REFBaUQ7RUFDakQsc0JBQXNCO0VBQ3RCLFlBQVk7RUFDWixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxZQUFZO0VBQ1osWUFBWTtFQUNaLGFBQWE7RUFDYixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsV0FBVztFQUNYLFlBQVk7RUFDWixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFVBQVU7RUFDVixXQUFXO0VBQ1gsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7RUFDWCx5QkFBeUI7RUFDekIsaUJBQWlCO0VBQ2pCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLE1BQU07RUFDTixTQUFTO0VBQ1QsWUFBWTtFQUNaLDhFQUErRDtFQUMvRCwrRkFBK0Y7QUFDakc7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsV0FBVztFQUNYLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixZQUFZO0VBQ1osWUFBWTtFQUNaLHdCQUF3Qjs7QUFFMUI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsWUFBWTtFQUNaLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7RUFDYixXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7RUFDWCxZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLHFCQUFx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Y0FBYztFQUNkLHFCQUFxQjtFQUNyQixxQkFBcUI7RUFDckIsdUJBQXVCO0VBQ3ZCLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYix3QkFBd0I7RUFDeEIsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLHlDQUF5QztFQUN6QyxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxhQUFhO0VBQ2IscUJBQXFCO0VBQ3JCLDJCQUEyQjtFQUMzQixtQkFBbUI7RUFDbkIsV0FBVztFQUNYLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFNBQVM7RUFDVCxlQUFlO0VBQ2YsY0FBYztFQUNkLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLCtGQUErRjtBQUNqR1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1GcmVkb2thOndnaHRAMzAwJmZhbWlseT1Sb2JvdG8rTW9ubzp3Z2h0QDMwMCZkaXNwbGF5PXN3YXAnKTtcXG5cXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIE1vbm8nLCBtb25vc3BhY2UsICdGcmVkb2thJywgc2Fucy1zZXJpZjtcXG59XFxuXFxuI2JhY2tncm91bmQge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcuL2ltZ3MvbW91bnRhaW4tbGFrZS5qcGcnKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4jaGVhZGVyIHtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTB2aDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4jaGVhZGVyLWxlZnQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiA1MHZ3O1xcbiAgaGVpZ2h0OiAxMHZoO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuI2hlYWRlci10aXRsZS1maXJzdCB7XFxuICBwYWRkaW5nLWxlZnQ6IDQlO1xcbiAgZm9udC1zaXplOiAyLjVlbTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxuICBjb2xvcjogI2YzYWM0YztcXG59XFxuXFxuI2hlYWRlci10aXRsZS1zZWNvbmQge1xcbiAgZm9udC1zaXplOiAyLjVlbTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxuICBjb2xvcjogIzQzOGNjYztcXG59XFxuXFxuI2hlYWRlci1pY29uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogNGVtO1xcbiAgaGVpZ2h0OiA0ZW07XFxuICBwYWRkaW5nLWxlZnQ6IDQlO1xcbn1cXG5cXG4jaGVhZGVyLXJpZ2h0IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogNTB2dztcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuICBwYWRkaW5nLXJpZ2h0OiA0JTtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmxhYmVsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxubGFiZWw6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMTBweDtcXG4gIHRvcDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIHdpZHRoOiAxLjVlbTtcXG4gIGJhY2tncm91bmQ6IHVybChcXFwiLi9zdmdzL3NlYXJjaC5zdmdcXFwiKSBjZW50ZXIgLyBjb250YWluIG5vLXJlcGVhdDtcXG4gIGZpbHRlcjogaW52ZXJ0KDc5JSkgc2VwaWEoNzIlKSBzYXR1cmF0ZSg5MTMlKSBodWUtcm90YXRlKDMyM2RlZykgYnJpZ2h0bmVzcygxMDElKSBjb250cmFzdCg5MSUpO1xcbn1cXG5cXG4jc2VhcmNoLWJhci1pbnB1dCB7XFxuICB3aWR0aDogMTV2dztcXG4gIGhlaWdodDogNXZoO1xcbiAgZm9udC1zaXplOiAxLjVlbTtcXG4gIHBhZGRpbmctbGVmdDogMTYlO1xcbiAgY29sb3I6ICM0MzhjY2M7XFxufVxcblxcbiNhcHAge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogOTB2aDtcXG4gIGZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcXG5cXG59XFxuXFxuI2FwcC10b3Age1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGhlaWdodDogNTB2aDtcXG4gIHdpZHRoOiAxMDB2dztcXG59XFxuXFxuI2FwcC10b3AtbGVmdCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDQ1dnc7XFxuICBoZWlnaHQ6IDUwdmg7XFxufVxcblxcbiNsb2NhdGlvbi1pbmZvcm1hdGlvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDQ1dnc7XFxuICBoZWlnaHQ6IDQwdmg7XFxuICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1hcmdpbi10b3A6IDUlO1xcbiAgbWFyZ2luLWxlZnQ6IDUlO1xcbn1cXG5cXG4jY2l0eS1jb250YWluZXIsICN3ZWF0aGVyLWRlc2NyaXB0aW9uLWNvbnRhaW5lciwgI3dlYXRoZXItdGVtcGVyYXR1cmUtY29udGFpbmVyLCAjdG9kYXlzLWRhdGUtY29udGFpbmVyLCAjdG9kYXlzLXRpbWUtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogNDV2dztcXG4gIGhlaWdodDogNXZoO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDAsIDI0MiwgMjQwLCAwLjkpO1xcbiAgbWFyZ2luOiAwO1xcbiAgd2lkdGg6IDQwdnc7XFxuICBwYWRkaW5nOiAyJTtcXG59XFxuXFxuI2NpdHktc3ZnLCAjd2VhdGhlci1kZXNjcmlwdGlvbi1zdmcsICN3ZWF0aGVyLXRlbXBlcmF0dXJlLXN2ZywgI3RvZGF5cy1kYXRlLXN2ZywgI3RvZGF5cy10aW1lLXN2ZyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDIuNWVtO1xcbiAgaGVpZ2h0OiAyLjVlbTtcXG4gIGZpbHRlcjogaW52ZXJ0KDc5JSkgc2VwaWEoNzIlKSBzYXR1cmF0ZSg5MTMlKSBodWUtcm90YXRlKDMyM2RlZykgYnJpZ2h0bmVzcygxMDElKSBjb250cmFzdCg5MSUpO1xcbiAgcGFkZGluZy1yaWdodDogNSU7XFxufVxcblxcbiNjaXR5LW5hbWUsICN3ZWF0aGVyLXRlbXBlcmF0dXJlLCAjdG9kYXlzLXRpbWUsICN3ZWF0aGVyLWRlc2NyaXB0aW9uLCAjdG9kYXlzLWRhdGUge1xcbiAgZm9udC1zaXplOiAyZW07XFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcbiAgY29sb3I6ICNmM2FjNGM7XFxufVxcblxcbiNhcHAtdG9wLXJpZ2h0IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogNDV2dztcXG4gIGhlaWdodDogNTB2aDtcXG59XFxuXFxuI2xvY2F0aW9uLWV4dHJhLWluZm9ybWF0aW9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogNDV2dztcXG4gIGhlaWdodDogNDB2aDtcXG4gIGZsZXgtZmxvdzogcm93IHdyYXA7XFxuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWFyZ2luLXRvcDogNSU7XFxuICBtYXJnaW4tbGVmdDogMTYuNSU7XFxufVxcblxcbiN3ZWF0aGVyLWZlZWxzLWxpa2UtY29udGFpbmVyLCAjd2VhdGhlci1odW1pZGl0eS1jb250YWluZXIsICN3ZWF0aGVyLW1pbi1jb250YWluZXIsICN3ZWF0aGVyLW1heC1jb250YWluZXIsICN3aW5kLXNwZWVkLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDQ1dnc7XFxuICBoZWlnaHQ6IDV2aDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDIlO1xcbn1cXG5cXG4jd2VhdGhlci1mZWVscy1saWtlLXN2ZywgI3dlYXRoZXItaHVtaWRpdHktc3ZnLCAjd2VhdGhlci1taW4tc3ZnLCAjd2VhdGhlci1tYXgtc3ZnLCAjd2luZC1zcGVlZC1zdmcsICNuZXh0LWRhaWx5LWZvcmVjYXN0LXdlYXRoZXItdHlwZS1zdmcsICNuZXh0LWhvdXJseS1mb3JlY2FzdC13ZWF0aGVyLXR5cGUtc3ZnIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogMi41ZW07XFxuICBoZWlnaHQ6IDIuNWVtO1xcbiAgZmlsdGVyOiBpbnZlcnQoNTQlKSBzZXBpYSgzNCUpIHNhdHVyYXRlKDg2MSUpIGh1ZS1yb3RhdGUoMTY2ZGVnKSBicmlnaHRuZXNzKDg4JSkgY29udHJhc3QoODglKTtcXG4gIHBhZGRpbmctcmlnaHQ6IDUlO1xcbn1cXG5cXG4jd2VhdGhlci1mZWVscy1saWtlLCAjd2VhdGhlci1odW1pZGl0eSwgI3dlYXRoZXItbWluLCAjd2VhdGhlci1tYXgsICN3aW5kLXNwZWVkIHtcXG4gIGZvbnQtc2l6ZTogMmVtO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG4gIGNvbG9yOiAjNDM4Y2NjO1xcbn1cXG5cXG4jYXBwLWJvdHRvbSB7XFxuICBkaXNwbGF5OmZsZXg7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDUwdmg7XFxuICBmbGV4LWZsb3c6IGNvbHVtbiBub3dyYXA7XFxuICBhbGlnbi1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxufVxcblxcbiNpbmZvcm1hdGlvbi1zd2l0Y2hlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDEwdnc7XFxuICBoZWlnaHQ6IDMuNXZoO1xcbiAgZmxleC1mbG93OiByb3cgbm93cmFwO1xcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHBhZGRpbmctbGVmdDogMi43NSU7XFxufVxcblxcbiNkYWlseS1mb3JlY2FzdC1idXR0b24sICNob3VybHktZm9yZWNhc3QtYnV0dG9uLCAjZmFocmVuaGVpdC1idXR0b24sICNjZWxzaXVzLWJ1dHRvbiB7XFxuICB3aWR0aDogOHZ3O1xcbiAgaGVpZ2h0OiAzLjV2aDtcXG4gIGZvbnQtc2l6ZTogMWVtO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDEwJTtcXG4gIG1hcmdpbi1sZWZ0OiAzJTtcXG59XFxuXFxuI2ZhaHJlbmhlaXQtYnV0dG9uIHtcXG4gIG1hcmdpbi1sZWZ0OiAxdnc7XFxufVxcblxcbi5kYWlseS1mb3JlY2FzdC1idXR0b24tb2ZmIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDAsIDI0MiwgMjQwLCAwLjkpO1xcbiAgY29sb3I6ICNmM2FjNGM7XFxufVxcblxcbi5kYWlseS1mb3JlY2FzdC1idXR0b24tb24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YzYWM0YztcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYigyNDAsIDI0MiwgMjQwLCAwLjkpO1xcbiAgY29sb3I6IHJnYigyNDAsIDI0MiwgMjQwLCAwLjgpOztcXG59XFxuXFxuLmhvdXJseS1mb3JlY2FzdC1idXR0b24tb2ZmIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDAsIDI0MiwgMjQwLCAwLjkpO1xcbiAgY29sb3I6ICM0MzhjY2M7XFxufVxcblxcbi5ob3VybHktZm9yZWNhc3QtYnV0dG9uLW9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0MzhjY2M7XFxuICBjb2xvcjogcmdiKDI0MCwgMjQyLCAyNDAsIDAuOCk7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG59XFxuXFxuLmNlbHNpdXMtb2ZmIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDAsIDI0MiwgMjQwLCAwLjkpO1xcbiAgY29sb3I6ICM0MzhjY2M7XFxufVxcblxcbi5mYWhyZW5oZWl0LW9mZiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG4gIGNvbG9yOiAjZjNhYzRjO1xcbn1cXG5cXG4uY2Vsc2l1cy1vbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDM4Y2NjO1xcbiAgY29sb3I6IHJnYigyNDAsIDI0MiwgMjQwLCAwLjgpO1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiKDI0MCwgMjQyLCAyNDAsIDAuOSk7XFxufVxcblxcbi5mYWhyZW5oZWl0LW9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmM2FjNGM7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG4gIGNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC44KTs7XFxufVxcblxcbi5mb3JlY2FzdC1ob3VybHktb2ZmIHtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICB3aWR0aDogMDtcXG4gIGhlaWdodDogMDtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuLmZvcmVjYXN0LWRhaWx5LW9mZiB7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICBkaXNwbGF5OiBub25lO1xcbiAgd2lkdGg6IDA7XFxuICBoZWlnaHQ6IDA7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi5mb3JlY2FzdC1kYWlseS1vbiB7XFxuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMzYuNXZoO1xcbiAgZmxleC1mbG93OiByb3cgbm93cmFwO1xcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG59XFxuXFxuLm5leHQtZGFpbHktZm9yZWNhc3Qtb3BlbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1mbG93OiBjb2x1bW4gbm93cmFwO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHdpZHRoOiAxOHZ3O1xcbiAgaGVpZ2h0OiAzMHZoO1xcbiAgZm9udC1zaXplOiAwLjhlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDAsIDI0MiwgMjQwLCAwLjkpO1xcbiAgbWFyZ2luOiAwLjUlO1xcbn1cXG5cXG4uZm9yZWNhc3QtZGFpbHktb3BlbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1mbG93OiByb3cgbm93cmFwO1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHdpZHRoOiAxOHZ3O1xcbiAgaGVpZ2h0OiA1dmg7XFxufVxcblxcbi5mb3JlY2FzdC1kYWlseS1pdGVtLW9wZW4ge1xcbiAgbWFyZ2luOiAwO1xcbiAgbWFyZ2luLWxlZnQ6IDUlO1xcbiAgY29sb3I6ICM0MzhjY2M7XFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcbn1cXG5cXG4jbmV4dC1kYWlseS1mb3JlY2FzdC1kYXRlLXN2ZywgI25leHQtZGFpbHktZm9yZWNhc3QtdGltZS1zdmcsICNuZXh0LWRhaWx5LWZvcmVjYXN0LXRlbXAtc3ZnLCAjbmV4dC1kYWlseS1mb3JlY2FzdC1odW1pZGl0eS1zdmcsICNuZXh0LWRhaWx5LWZvcmVjYXN0LXdlYXRoZXItdHlwZS1zdmcsICNuZXh0LWRhaWx5LWZvcmVjYXN0LXdpbmQtc3ZnIHtcXG4gIGZpbHRlcjogaW52ZXJ0KDc5JSkgc2VwaWEoNzIlKSBzYXR1cmF0ZSg5MTMlKSBodWUtcm90YXRlKDMyM2RlZykgYnJpZ2h0bmVzcygxMDElKSBjb250cmFzdCg5MSUpO1xcbn1cXG5cXG4uZm9yZWNhc3QtaG91cmx5LW9uIHtcXG4gIHZpc2liaWxpdHk6IHZpc2libGU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAzNi41dmg7XFxuICBmbGV4LWZsb3c6IHJvdyBub3dyYXA7XFxuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG4jbmV4dC1ob3VybHktZm9yZWNhc3Qge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTMuNXZ3O1xcbiAgaGVpZ2h0OiAzMnZoO1xcbiAgZm9udC1zaXplOiAwLjg1ZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG4gIG1hcmdpbjogMC4yNSU7XFxufVxcblxcbi5mb3JlY2FzdC1ob3VybHktb3BlbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1mbG93OiByb3cgbm93cmFwO1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHdpZHRoOiAxMnZ3O1xcbiAgaGVpZ2h0OiA1dmg7XFxufVxcblxcbi5mb3JlY2FzdC1ob3VybHktaXRlbS1vcGVuIHtcXG4gIG1hcmdpbjogMDtcXG4gIG1hcmdpbi1sZWZ0OiA1JTtcXG4gIGNvbG9yOiAjNDM4Y2NjO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG59XFxuXFxuI25leHQtaG91cmx5LWZvcmVjYXN0LWRhdGUtc3ZnLCAjbmV4dC1ob3VybHktZm9yZWNhc3QtdGltZS1zdmcsICNuZXh0LWhvdXJseS1mb3JlY2FzdC10ZW1wLXN2ZywgI25leHQtaG91cmx5LWZvcmVjYXN0LWh1bWlkaXR5LXN2ZywgI25leHQtaG91cmx5LWZvcmVjYXN0LXdlYXRoZXItdHlwZS1zdmcsICNuZXh0LWhvdXJseS1mb3JlY2FzdC13aW5kLXN2ZyB7XFxuICBmaWx0ZXI6IGludmVydCg3OSUpIHNlcGlhKDcyJSkgc2F0dXJhdGUoOTEzJSkgaHVlLXJvdGF0ZSgzMjNkZWcpIGJyaWdodG5lc3MoMTAxJSkgY29udHJhc3QoOTElKTtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTsgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG5cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9IC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcblxuXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCB7IFxuICBnZXRDaXR5LFxuICByZW1vdmVQcmV2aW91c0luZm9ybWF0aW9uLFxuICBzaG93SG91cmx5Rm9yZWNhc3QsXG4gIHNob3dEYWlseUZvcmVjYXN0LFxuICBzaG93RmFocmVuaGVpdCxcbiAgc2hvd0NlbHNpdXNcbiB9IGZyb20gJy4vc2NyaXB0cy9hcHAuanMnO1xuXG5pbXBvcnQgeyBsb2FkTWVhc3VyZW1lbnRBbGVydCB9IGZyb20gJy4vc2NyaXB0cy9zZXNzaW9uU3RvcmFnZS5qcyc7XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIGdldENpdHkoKTtcbiAgbG9hZE1lYXN1cmVtZW50QWxlcnQoKTtcbn1cblxuKGZ1bmN0aW9uIGF0dGFjaEV2ZW50TGlzdGVuZXJzKCkge1xuICBjb25zdCBob3VybHlCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaG91cmx5LWZvcmVjYXN0LWJ1dHRvbicpO1xuICAgIGhvdXJseUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dIb3VybHlGb3JlY2FzdCk7XG5cbiAgY29uc3QgZGFpbHlCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGFpbHktZm9yZWNhc3QtYnV0dG9uJyk7XG4gICAgZGFpbHlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93RGFpbHlGb3JlY2FzdCk7XG5cbiAgY29uc3QgZmFocmVuaGVpdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmYWhyZW5oZWl0LWJ1dHRvbicpO1xuICAgIGZhaHJlbmhlaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93RmFocmVuaGVpdCk7XG4gIFxuICBjb25zdCBjZWxzaXVzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NlbHNpdXMtYnV0dG9uJyk7XG4gICAgY2Vsc2l1c0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dDZWxzaXVzKTtcblxuICBjb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtYmFyLWlucHV0Jyk7XG4gICAgc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICByZW1vdmVQcmV2aW91c0luZm9ybWF0aW9uKCk7XG4gICAgICAgIGdldENpdHkoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9KVxufSkoKTsiXSwibmFtZXMiOlsiZ2V0Q2l0eSIsInJlbW92ZVByZXZpb3VzSW5mb3JtYXRpb24iLCJzaG93SG91cmx5Rm9yZWNhc3QiLCJzaG93RGFpbHlGb3JlY2FzdCIsInNob3dGYWhyZW5oZWl0Iiwic2hvd0NlbHNpdXMiLCJkYXRlU3ZnSW1wb3J0IiwiZmVlbHNMaWtlU3ZnSW1wb3J0IiwiaHVtaWRpdHlTdmdJbXBvcnQiLCJsb2NhdGlvblN2Z0ltcG9ydCIsInRlbXBNYXhTdmdJbXBvcnQiLCJ0ZW1wTWluU3ZnSW1wb3J0IiwidGVtcFN2Z0ltcG9ydCIsInRpbWVTdmdJbXBvcnQiLCJ3ZWF0aGVyU3ZnSW1wb3J0Iiwid2luZFN2Z0ltcG9ydCIsInJldHJpZXZlZENpdHlOYW1lIiwicmV0cmlldmVkQ2l0eUxhdCIsInJldHJpZXZlZENpdHlMb24iLCJjaXR5SW5wdXQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwidmFsdWUiLCJkZWZhdWx0Q2l0eSIsImxlbmd0aCIsImFwaSIsImFtb3VudFRvUmV0cmlldmUiLCJhcGlLZXkiLCJzZWFyY2hDaXR5IiwicmVzcG9uc2UiLCJmZXRjaCIsInNlYXJjaERhdGEiLCJqc29uIiwibG9jYWxfbmFtZXMiLCJlbiIsImxhdCIsImxvbiIsImdldFRvZGF5c1dlYXRoZXIiLCJnZXRXZWF0aGVyRm9yZWNhc3QiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJhbGVydCIsInVuaXRzIiwic2VhcmNoV2VhdGhlciIsIm1vZGUiLCJ3ZWF0aGVyVHlwZSIsIndlYXRoZXIiLCJtYWluIiwiZGVzY3JpcHRpb24iLCJjb3VudHJ5Iiwic3lzIiwiaHVtaWRpdHkiLCJ3aW5kIiwic3BlZWQiLCJ0ZW1wIiwiZmVlbHNMaWtlIiwidGVtcE1pbiIsInRlbXBNYXgiLCJjZWxzaXVzQnV0dG9uIiwicXVlcnlTZWxlY3RvciIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiZmFocmVuaGVpdFRvQ2Vsc2l1cyIsImZlZWxzX2xpa2UiLCJ0ZW1wX21pbiIsInRlbXBfbWF4IiwiYXBwZW5kQ3VycmVudFdlYXRoZXIiLCJsYW5ndWFnZSIsImZvcmVjYXN0TGlzdCIsImxpc3QiLCJidW5kbGVGb3JlY2FzdERhdGEiLCJ0b2RheSIsIkRhdGUiLCJ0b0RhdGVTdHJpbmciLCJ0aW1lIiwidG9Mb2NhbGVUaW1lU3RyaW5nIiwibG9jYXRpb25JbmZvcm1hdGlvbiIsImNpdHlDb250YWluZXIiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiY2l0eVN2ZyIsInNyYyIsImNpdHkiLCJ0ZXh0Q29udGVudCIsIndlYXRoZXJEZXNjcmlwdGlvbkNvbnRhaW5lciIsIndlYXRoZXJEZXNjcmlwdGlvblN2ZyIsIndlYXRoZXJEZXNjcmlwdGlvbiIsIndlYXRoZXJUZW1wZXJhdHVyZUNvbnRhaW5lciIsIndlYXRoZXJUZW1wZXJhdHVyZVN2ZyIsIndlYXRoZXJUZW1wZXJhdHVyZSIsInRvZGF5c0RhdGVDb250YWluZXIiLCJ0b2RheXNEYXRlU3ZnIiwidG9kYXlzRGF0ZSIsInRvZGF5c1RpbWVDb250YWluZXIiLCJ0b2RheXNUaW1lU3ZnIiwidG9kYXlzVGltZSIsImFwcGVuZENoaWxkIiwibG9jYXRpb25FeHRyYUluZm9ybWF0aW9uIiwid2VhdGhlckZlZWxzTGlrZUNvbnRhaW5lciIsIndlYXRoZXJGZWVsc0xpa2VTdmciLCJ3ZWF0aGVyRmVlbHNMaWtlIiwid2VhdGhlckh1bWlkaXR5Q29udGFpbmVyIiwid2VhdGhlckh1bWlkaXR5U3ZnIiwid2VhdGhlckh1bWlkaXR5Iiwid2VhdGhlck1pbkNvbnRhaW5lciIsIndlYXRoZXJNaW5TdmciLCJ3ZWF0aGVyTWluIiwid2VhdGhlck1heENvbnRhaW5lciIsIndlYXRoZXJNYXhTdmciLCJ3ZWF0aGVyTWF4Iiwid2luZFNwZWVkQ29udGFpbmVyIiwid2luZFNwZWVkU3ZnIiwid2luZFNwZWVkIiwiY29udmVydERhdGUiLCJkYXRlIiwibmV4dDIxSG91cnMiLCJzbGljZSIsImZvckVhY2giLCJpdGVtIiwiZHRfdHh0IiwiYXBwZW5kSG91cmx5Rm9yZWNhc3QiLCJkYWlseUZvcmVjYXN0IiwibmV4dERheSIsInNlY29uZERheSIsInRoaXJkRGF5IiwiZm91cnRoRGF5IiwiZmlmdGhEYXkiLCJwdXNoIiwiYXBwZW5kRGFpbHlGb3JlY2FzdCIsImZvcmVDYXN0SG91cmx5IiwibmV4dEhvdXJseUZvcmVjYXN0IiwiYWRkIiwibmV4dEhvdXJseUZvcmVjYXN0RGF0ZUNvbnRhaW5lciIsIm5leHRIb3VybHlGb3JlY2FzdERhdGVTdmciLCJuZXh0SG91cmx5Rm9yZWNhc3REYXRlIiwibmV4dEhvdXJseUZvcmVjYXN0VGltZUNvbnRhaW5lciIsIm5leHRIb3VybHlGb3JlY2FzdFRpbWVTdmciLCJuZXh0SG91cmx5Rm9yZWNhc3RUaW1lIiwibmV4dEhvdXJseUZvcmVjYXN0VGVtcENvbnRhaW5lciIsIm5leHRIb3VybHlGb3JlY2FzdFRlbXBTdmciLCJuZXh0SG91cmx5Rm9yZWNhc3RUZW1wIiwibmV4dEhvdXJseUZvcmVjYXN0SHVtaWRpdHlDb250YWluZXIiLCJuZXh0SG91cmx5Rm9yZWNhc3RIdW1pZGl0eVN2ZyIsIm5leHRIb3VybHlGb3JlY2FzdEh1bWlkaXR5IiwibmV4dEhvdXJseUZvcmVjYXN0V2VhdGhlclR5cGVDb250YWluZXIiLCJuZXh0SG91cmx5Rm9yZWNhc3RXZWF0aGVyVHlwZVN2ZyIsIm5leHRIb3VybHlGb3JlY2FzdFdlYXRoZXJUeXBlIiwibmV4dEhvdXJseUZvcmVjYXN0V2luZENvbnRhaW5lciIsIm5leHRIb3VybHlGb3JlY2FzdFdpbmRTdmciLCJuZXh0SG91cmx5Rm9yZWNhc3RXaW5kIiwiZm9yZUNhc3REYWlseSIsIm5leHREYWlseUZvcmVjYXN0IiwibmV4dERhaWx5Rm9yZWNhc3REYXRlQ29udGFpbmVyIiwibmV4dERhaWx5Rm9yZWNhc3REYXRlU3ZnIiwibmV4dERhaWx5Rm9yZWNhc3REYXRlIiwibmV4dERhaWx5Rm9yZWNhc3RUaW1lQ29udGFpbmVyIiwibmV4dERhaWx5Rm9yZWNhc3RUaW1lU3ZnIiwibmV4dERhaWx5Rm9yZWNhc3RUaW1lIiwibmV4dERhaWx5Rm9yZWNhc3RUZW1wQ29udGFpbmVyIiwibmV4dERhaWx5Rm9yZWNhc3RUZW1wU3ZnIiwibmV4dERhaWx5Rm9yZWNhc3RUZW1wIiwibmV4dERhaWx5Rm9yZWNhc3RIdW1pZGl0eUNvbnRhaW5lciIsIm5leHREYWlseUZvcmVjYXN0SHVtaWRpdHlTdmciLCJuZXh0RGFpbHlGb3JlY2FzdEh1bWlkaXR5IiwibmV4dERhaWx5Rm9yZWNhc3RXZWF0aGVyVHlwZUNvbnRhaW5lciIsIm5leHREYWlseUZvcmVjYXN0V2VhdGhlclR5cGVTdmciLCJuZXh0RGFpbHlGb3JlY2FzdFdlYXRoZXJUeXBlIiwibmV4dERhaWx5Rm9yZWNhc3RXaW5kQ29udGFpbmVyIiwibmV4dERhaWx5Rm9yZWNhc3RXaW5kU3ZnIiwibmV4dERhaWx5Rm9yZWNhc3RXaW5kIiwiZGFpbHlGb3JlY2FzdEJ1dHRvbiIsImhvdXJseUZvcmVjYXN0QnV0dG9uIiwiZm9yZWNhc3REYWlseSIsImZvcmVjYXN0SG91cmx5IiwicmVtb3ZlIiwicmVtb3ZlQWxsQ2hpbGROb2RlcyIsInBhcmVudCIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImZhaHJlbmhlaXRCdXR0b24iLCJmaXJzdEFsZXJ0Iiwic2Vzc2lvblN0b3JhZ2UiLCJnZXRJdGVtIiwic2V0SXRlbSIsIm51bWJlciIsInRvdGFsIiwicm91bmRlZCIsIk1hdGgiLCJyb3VuZCIsImxvYWRNZWFzdXJlbWVudEFsZXJ0Iiwid2luZG93Iiwib25sb2FkIiwiYXR0YWNoRXZlbnRMaXN0ZW5lcnMiLCJob3VybHlCdXR0b24iLCJhZGRFdmVudExpc3RlbmVyIiwiZGFpbHlCdXR0b24iLCJzZWFyY2hJbnB1dCIsImUiLCJrZXlDb2RlIl0sInNvdXJjZVJvb3QiOiIifQ==