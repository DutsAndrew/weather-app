/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/app.js":
/*!****************************!*\
  !*** ./src/scripts/app.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCity": () => (/* binding */ getCity),
/* harmony export */   "removePreviousInformation": () => (/* binding */ removePreviousInformation),
/* harmony export */   "showCelsius": () => (/* binding */ showCelsius),
/* harmony export */   "showDailyForecast": () => (/* binding */ showDailyForecast),
/* harmony export */   "showFahrenheit": () => (/* binding */ showFahrenheit),
/* harmony export */   "showHourlyForecast": () => (/* binding */ showHourlyForecast)
/* harmony export */ });

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
  citySvg.src = '/src/svgs/location.svg';
  let city = document.createElement('p');
  city.setAttribute('id', 'city-name');
  city.textContent = "".concat(retrievedCityName, ", ").concat(country);
  let weatherDescriptionContainer = document.createElement('div');
  weatherDescriptionContainer.setAttribute('id', 'weather-description-container');
  let weatherDescriptionSvg = document.createElement('img');
  weatherDescriptionSvg.setAttribute('id', 'weather-description-svg');
  weatherDescriptionSvg.src = '../src/svgs/weather.svg';
  let weatherDescription = document.createElement('p');
  weatherDescription.setAttribute('id', 'weather-description');
  weatherDescription.textContent = "".concat(weatherType, ", ").concat(description);
  let weatherTemperatureContainer = document.createElement('div');
  weatherTemperatureContainer.setAttribute('id', 'weather-temperature-container');
  let weatherTemperatureSvg = document.createElement('img');
  weatherTemperatureSvg.setAttribute('id', 'weather-temperature-svg');
  weatherTemperatureSvg.src = '/src/svgs/temp.svg';
  let weatherTemperature = document.createElement('p');
  weatherTemperature.setAttribute('id', 'weather-temperature');
  let todaysDateContainer = document.createElement('div');
  todaysDateContainer.setAttribute('id', 'todays-date-container');
  let todaysDateSvg = document.createElement('img');
  todaysDateSvg.setAttribute('id', 'todays-date-svg');
  todaysDateSvg.src = '/src/svgs/date.svg';
  let todaysDate = document.createElement('p');
  todaysDate.setAttribute('id', 'todays-date');
  todaysDate.textContent = "".concat(today);
  let todaysTimeContainer = document.createElement('div');
  todaysTimeContainer.setAttribute('id', 'todays-time-container');
  let todaysTimeSvg = document.createElement('img');
  todaysTimeSvg.setAttribute('id', 'todays-time-svg');
  todaysTimeSvg.src = '/src/svgs/time.svg';
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
  weatherFeelsLikeSvg.src = '/src/svgs/feels-like.svg';
  let weatherFeelsLike = document.createElement('p');
  weatherFeelsLike.setAttribute('id', 'weather-feels-like');
  let weatherHumidityContainer = document.createElement('div');
  weatherHumidityContainer.setAttribute('id', 'weather-humidity-container');
  let weatherHumiditySvg = document.createElement('img');
  weatherHumiditySvg.setAttribute('id', 'weather-humidity-svg');
  weatherHumiditySvg.src = '/src/svgs/humidity.svg';
  let weatherHumidity = document.createElement('p');
  weatherHumidity.setAttribute('id', 'weather-humidity');
  weatherHumidity.textContent = "Humidity: ".concat(humidity, " %");
  let weatherMinContainer = document.createElement('div');
  weatherMinContainer.setAttribute('id', 'weather-min-container');
  let weatherMinSvg = document.createElement('img');
  weatherMinSvg.setAttribute('id', 'weather-min-svg');
  weatherMinSvg.src = '/src/svgs/temp-min.svg';
  let weatherMin = document.createElement('p');
  weatherMin.setAttribute('id', 'weather-min');
  let weatherMaxContainer = document.createElement('div');
  weatherMaxContainer.setAttribute('id', 'weather-max-container');
  let weatherMaxSvg = document.createElement('img');
  weatherMaxSvg.setAttribute('id', 'weather-max-svg');
  weatherMaxSvg.src = '/src/svgs/temp-max.svg';
  let weatherMax = document.createElement('p');
  weatherMax.setAttribute('id', 'weather-max');
  let windSpeedContainer = document.createElement('div');
  windSpeedContainer.setAttribute('id', 'wind-speed-container');
  let windSpeedSvg = document.createElement('img');
  windSpeedSvg.setAttribute('id', 'wind-speed-svg');
  windSpeedSvg.src = '/src/svgs/wind.svg';
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
  nextHourlyForecastDateSvg.src = '/src/svgs/date.svg';
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
  nextHourlyForecastTimeSvg.src = '/src/svgs/time.svg';
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
  nextHourlyForecastTempSvg.src = '/src/svgs/temp.svg';
  let nextHourlyForecastTemp = document.createElement('p');
  nextHourlyForecastTemp.setAttribute('id', 'next-hourly-forecast-temp');
  nextHourlyForecastTemp.classList.add('forecast-hourly-item-open');
  let nextHourlyForecastHumidityContainer = document.createElement('div');
  nextHourlyForecastHumidityContainer.setAttribute('id', 'next-hourly-forecast-humidity-container');
  nextHourlyForecastHumidityContainer.classList.add('forecast-hourly-open');
  let nextHourlyForecastHumiditySvg = document.createElement('img');
  nextHourlyForecastHumiditySvg.setAttribute('id', 'next-hourly-forecast-humidity-svg');
  nextHourlyForecastHumiditySvg.classList.add('forecast-hourly-item-open');
  nextHourlyForecastHumiditySvg.src = '/src/svgs/humidity.svg';
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
  nextHourlyForecastWeatherTypeSvg.src = '/src/svgs/weather.svg';
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
  nextHourlyForecastWindSvg.src = '/src/svgs/wind.svg';
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
  nextDailyForecastDateSvg.src = '/src/svgs/date.svg';
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
  nextDailyForecastTimeSvg.src = '/src/svgs/time.svg';
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
  nextDailyForecastTempSvg.src = '/src/svgs/temp.svg';
  let nextDailyForecastTemp = document.createElement('p');
  nextDailyForecastTemp.setAttribute('id', 'next-daily-forecast-temp');
  nextDailyForecastTemp.classList.add('forecast-daily-item-open');
  let nextDailyForecastHumidityContainer = document.createElement('div');
  nextDailyForecastHumidityContainer.setAttribute('id', 'next-daily-forecast-humidity-container');
  nextDailyForecastHumidityContainer.classList.add('forecast-daily-open');
  let nextDailyForecastHumiditySvg = document.createElement('img');
  nextDailyForecastHumiditySvg.setAttribute('id', 'next-daily-forecast-humidity-svg');
  nextDailyForecastHumiditySvg.classList.add('forecast-daily-item-open');
  nextDailyForecastHumiditySvg.src = '/src/svgs/humidity.svg';
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
  nextDailyForecastWeatherTypeSvg.src = '/src/svgs/weather.svg';
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
  nextDailyForecastWindSvg.src = '/src/svgs/wind.svg';
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

"use strict";
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

"use strict";
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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";
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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

/***/ "./src/imgs sync recursive \\.(png%7Csvg%7Cjpg%7Cgif)$":
/*!***************************************************!*\
  !*** ./src/imgs/ sync \.(png%7Csvg%7Cjpg%7Cgif)$ ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./clear-skies.jpg": "./src/imgs/clear-skies.jpg",
	"./cloudy.jpg": "./src/imgs/cloudy.jpg",
	"./foggy.jpg": "./src/imgs/foggy.jpg",
	"./lightning.jpg": "./src/imgs/lightning.jpg",
	"./mountain-lake.jpg": "./src/imgs/mountain-lake.jpg",
	"./raining.jpg": "./src/imgs/raining.jpg",
	"./snowy.jpg": "./src/imgs/snowy.jpg"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/imgs sync recursive \\.(png%7Csvg%7Cjpg%7Cgif)$";

/***/ }),

/***/ "./src/svgs sync recursive \\.(png%7Csvg%7Cjpg%7Cgif)$":
/*!***************************************************!*\
  !*** ./src/svgs/ sync \.(png%7Csvg%7Cjpg%7Cgif)$ ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./date.svg": "./src/svgs/date.svg",
	"./feels-like.svg": "./src/svgs/feels-like.svg",
	"./humidity.svg": "./src/svgs/humidity.svg",
	"./location.svg": "./src/svgs/location.svg",
	"./logo.png": "./src/svgs/logo.png",
	"./search.svg": "./src/svgs/search.svg",
	"./temp-max.svg": "./src/svgs/temp-max.svg",
	"./temp-min.svg": "./src/svgs/temp-min.svg",
	"./temp.svg": "./src/svgs/temp.svg",
	"./time.svg": "./src/svgs/time.svg",
	"./weather.svg": "./src/svgs/weather.svg",
	"./wind.svg": "./src/svgs/wind.svg"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/svgs sync recursive \\.(png%7Csvg%7Cjpg%7Cgif)$";

/***/ }),

/***/ "./src/imgs/clear-skies.jpg":
/*!**********************************!*\
  !*** ./src/imgs/clear-skies.jpg ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "4143b22b2bc74223dd8a.jpg";

/***/ }),

/***/ "./src/imgs/cloudy.jpg":
/*!*****************************!*\
  !*** ./src/imgs/cloudy.jpg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "36d9f89eafea50d94f0f.jpg";

/***/ }),

/***/ "./src/imgs/foggy.jpg":
/*!****************************!*\
  !*** ./src/imgs/foggy.jpg ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "25cd0432888eacc5463b.jpg";

/***/ }),

/***/ "./src/imgs/lightning.jpg":
/*!********************************!*\
  !*** ./src/imgs/lightning.jpg ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "bbaa270b7ec9185da709.jpg";

/***/ }),

/***/ "./src/imgs/mountain-lake.jpg":
/*!************************************!*\
  !*** ./src/imgs/mountain-lake.jpg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "55efb9776634d0d95de5.jpg";

/***/ }),

/***/ "./src/imgs/raining.jpg":
/*!******************************!*\
  !*** ./src/imgs/raining.jpg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "ed40da1be7eb3712b8f8.jpg";

/***/ }),

/***/ "./src/imgs/snowy.jpg":
/*!****************************!*\
  !*** ./src/imgs/snowy.jpg ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "394681a4564d771bd4c0.jpg";

/***/ }),

/***/ "./src/svgs/date.svg":
/*!***************************!*\
  !*** ./src/svgs/date.svg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "0330c6889cb95fe5ad10.svg";

/***/ }),

/***/ "./src/svgs/feels-like.svg":
/*!*********************************!*\
  !*** ./src/svgs/feels-like.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "99a60685c883de448609.svg";

/***/ }),

/***/ "./src/svgs/humidity.svg":
/*!*******************************!*\
  !*** ./src/svgs/humidity.svg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "800d006a543de33d7e3d.svg";

/***/ }),

/***/ "./src/svgs/location.svg":
/*!*******************************!*\
  !*** ./src/svgs/location.svg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "f2fee57a7f55047a4bdb.svg";

/***/ }),

/***/ "./src/svgs/logo.png":
/*!***************************!*\
  !*** ./src/svgs/logo.png ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "71fd7a0d8c5296820f49.png";

/***/ }),

/***/ "./src/svgs/search.svg":
/*!*****************************!*\
  !*** ./src/svgs/search.svg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "230bea6ac20a05aaa7b1.svg";

/***/ }),

/***/ "./src/svgs/temp-max.svg":
/*!*******************************!*\
  !*** ./src/svgs/temp-max.svg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "e72f3d0c9aceac6fd34e.svg";

/***/ }),

/***/ "./src/svgs/temp-min.svg":
/*!*******************************!*\
  !*** ./src/svgs/temp-min.svg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "ec578bd37716e31c100c.svg";

/***/ }),

/***/ "./src/svgs/temp.svg":
/*!***************************!*\
  !*** ./src/svgs/temp.svg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "2bf150cbb30a63043a8c.svg";

/***/ }),

/***/ "./src/svgs/time.svg":
/*!***************************!*\
  !*** ./src/svgs/time.svg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "73ffa0631c8be363df0a.svg";

/***/ }),

/***/ "./src/svgs/weather.svg":
/*!******************************!*\
  !*** ./src/svgs/weather.svg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "6cb8238507668441d7ee.svg";

/***/ }),

/***/ "./src/svgs/wind.svg":
/*!***************************!*\
  !*** ./src/svgs/wind.svg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _scripts_app_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/app.js */ "./src/scripts/app.js");
/* harmony import */ var _scripts_sessionStorage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/sessionStorage.js */ "./src/scripts/sessionStorage.js");


__webpack_require__("./src/imgs sync recursive \\.(png%7Csvg%7Cjpg%7Cgif)$");

__webpack_require__("./src/svgs sync recursive \\.(png%7Csvg%7Cjpg%7Cgif)$");




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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFVBQVUsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFh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QUF1Qix5QkFBdkIsQ0FBckI7RUFDRXVJLFlBQVksQ0FBQ0MsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUMzTCwrREFBdkM7RUFFRixNQUFNNEwsV0FBVyxHQUFHbkwsUUFBUSxDQUFDMEMsYUFBVCxDQUF1Qix3QkFBdkIsQ0FBcEI7RUFDRXlJLFdBQVcsQ0FBQ0QsZ0JBQVosQ0FBNkIsT0FBN0IsRUFBc0MxTCw4REFBdEM7RUFFRixNQUFNeUssZ0JBQWdCLEdBQUdqSyxRQUFRLENBQUMwQyxhQUFULENBQXVCLG9CQUF2QixDQUF6QjtFQUNFdUgsZ0JBQWdCLENBQUNpQixnQkFBakIsQ0FBa0MsT0FBbEMsRUFBMkN6TCwyREFBM0M7RUFFRixNQUFNZ0QsYUFBYSxHQUFHekMsUUFBUSxDQUFDMEMsYUFBVCxDQUF1QixpQkFBdkIsQ0FBdEI7RUFDRUQsYUFBYSxDQUFDeUksZ0JBQWQsQ0FBK0IsT0FBL0IsRUFBd0N4TCx3REFBeEM7RUFFRixNQUFNMEwsV0FBVyxHQUFHcEwsUUFBUSxDQUFDMEMsYUFBVCxDQUF1QixtQkFBdkIsQ0FBcEI7RUFDRTBJLFdBQVcsQ0FBQ0YsZ0JBQVosQ0FBNkIsVUFBN0IsRUFBeUMsVUFBU0csQ0FBVCxFQUFZO0lBQ25ELElBQUlBLENBQUMsQ0FBQ0MsT0FBRixLQUFjLEVBQWxCLEVBQXNCO01BQ3BCaE0sMEVBQXlCO01BQ3pCRCx3REFBTztJQUNSLENBSEQsTUFHTztNQUNMO0lBQ0Q7RUFDRixDQVBEO0FBUUgsQ0F0QkQsSSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3NjcmlwdHMvYXBwLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3NjcmlwdHMvc2Vzc2lvblN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2ltZ3MvIHN5bmMgXFwuKHBuZyU3Q3N2ZyU3Q2pwZyU3Q2dpZikkIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N2Z3MvIHN5bmMgXFwuKHBuZyU3Q3N2ZyU3Q2pwZyU3Q2dpZikkIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHtcbiAgZ2V0Q2l0eSxcbiAgcmVtb3ZlUHJldmlvdXNJbmZvcm1hdGlvbixcbiAgc2hvd0hvdXJseUZvcmVjYXN0LFxuICBzaG93RGFpbHlGb3JlY2FzdCxcbiAgc2hvd0ZhaHJlbmhlaXQsXG4gIHNob3dDZWxzaXVzXG59XG5cbmxldCByZXRyaWV2ZWRDaXR5TmFtZTtcbmxldCByZXRyaWV2ZWRDaXR5TGF0O1xubGV0IHJldHJpZXZlZENpdHlMb247XG5cbmFzeW5jIGZ1bmN0aW9uIGdldENpdHkoKSB7XG4gIGxldCBjb3JzQnlwYXNzID0gJ2h0dHBzOi8vY29ycy1ldmVyeXdoZXJlLW1lLmhlcm9rdWFwcC5jb20vJztcbiAgbGV0IHNlYXJjaGVkQ2l0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gtYmFyLWlucHV0JykudmFsdWU7XG4gIGxldCBkZWZhdWx0Q2l0eSA9ICdSZXlramF2w61rJztcbiAgaWYgKHNlYXJjaGVkQ2l0eS5sZW5ndGggPT09IDApIHtcbiAgICBzZWFyY2hlZENpdHkgPSBkZWZhdWx0Q2l0eTtcbiAgfVxuICBsZXQgY2l0eVNlYXJjaCA9ICdxPSc7XG4gIGxldCBhcGkgPSAnaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZ2VvLzEuMC9kaXJlY3Q/JztcbiAgbGV0IGFtb3VudFRvUmV0cmlldmUgPSAnJmxpbWl0PTEnO1xuICBsZXQgbGFuZ3VhZ2UgPSAnJmxhbmc9ZW4nO1xuICBsZXQgYXBpS2V5ID0gJyZhcHBpZD02Yzg5YzIxYmZjMTFkNDAzYmU0MWY0ODlhZjNiMmVhZSc7XG4gIGxldCBzZWFyY2hDaXR5ID0gY29yc0J5cGFzcyArIGFwaSArIGNpdHlTZWFyY2ggKyBzZWFyY2hlZENpdHkgKyBhbW91bnRUb1JldHJpZXZlICsgbGFuZ3VhZ2UgKyBhcGlLZXk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoIChzZWFyY2hDaXR5LCB7bW9kZTogJ2NvcnMnfSk7XG4gICAgY29uc3Qgc2VhcmNoRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICByZXRyaWV2ZWRDaXR5TmFtZSA9IHNlYXJjaERhdGFbMF0ubG9jYWxfbmFtZXMuZW47XG4gICAgcmV0cmlldmVkQ2l0eUxhdCA9IHNlYXJjaERhdGFbMF0ubGF0O1xuICAgIHJldHJpZXZlZENpdHlMb24gPSBzZWFyY2hEYXRhWzBdLmxvbjtcbiAgICBnZXRUb2RheXNXZWF0aGVyKCk7XG4gICAgZ2V0V2VhdGhlckZvcmVjYXN0KCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIGFsZXJ0KCdUaGUgc2VydmVyIGNvdWxkIG5vdCBmaW5kIHdoYXQgeW91IHdlcmUgbG9va2luZyBmb3IsIHBsZWFzZSB0cnkgYWdhaW4nKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRUb2RheXNXZWF0aGVyKCkge1xuICBsZXQgY29yc0J5cGFzcyA9ICdodHRwczovL2NvcnMtZXZlcnl3aGVyZS1tZS5oZXJva3VhcHAuY29tLyc7XG4gIGxldCBhcGkgPSAnaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/JztcbiAgbGV0IGxhdCA9IGAmbGF0PSR7cmV0cmlldmVkQ2l0eUxhdH1gO1xuICBsZXQgbG9uID0gYCZsb249JHtyZXRyaWV2ZWRDaXR5TG9ufWA7XG4gIGxldCBsYW5ndWFnZSA9ICcmbGFuZz1lbic7XG4gIGxldCB1bml0cyA9ICcmdW5pdHM9aW1wZXJpYWwnO1xuICBsZXQgYXBpS2V5ID0gJyZhcHBpZD02Yzg5YzIxYmZjMTFkNDAzYmU0MWY0ODlhZjNiMmVhZSc7XG4gIGxldCBzZWFyY2hXZWF0aGVyID0gY29yc0J5cGFzcyArIGFwaSArIGxhdCArIGxvbiArIGFwaUtleSArIGxhbmd1YWdlICsgdW5pdHM7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoIChzZWFyY2hXZWF0aGVyLCB7bW9kZTogJ2NvcnMnfSk7XG4gICAgY29uc3Qgc2VhcmNoRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBcbiAgICAvLyB2YXJpYWJsZXMgZm9yIGluZm9ybWF0aW9uIHRvIGJlIGFwcGVuZGVkIHRvIHRoZSBET00gZm9yIHdlYXRoZXIgZGlzcGxheVxuICAgIGxldCB0ZW1wO1xuICAgIGxldCB3ZWF0aGVyVHlwZSA9IHNlYXJjaERhdGEud2VhdGhlclswXS5tYWluO1xuICAgIGxldCBkZXNjcmlwdGlvbiA9IHNlYXJjaERhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcbiAgICBsZXQgY291bnRyeSA9IHNlYXJjaERhdGEuc3lzLmNvdW50cnk7XG4gICAgbGV0IGZlZWxzTGlrZTtcbiAgICBsZXQgaHVtaWRpdHkgPSBzZWFyY2hEYXRhLm1haW4uaHVtaWRpdHk7XG4gICAgbGV0IHRlbXBNaW47XG4gICAgbGV0IHRlbXBNYXg7XG4gICAgbGV0IHdpbmQgPSBzZWFyY2hEYXRhLndpbmQuc3BlZWQ7XG5cbiAgICAvL2NoZWNrcyBpZiBjZWxzaXVzIGJ1dHRvbiBpcyBvbiBmb3IgY29udmVyc2lvblxuICAgIGNvbnN0IGNlbHNpdXNCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2Vsc2l1cy1idXR0b24nKTtcbiAgICBpZiAoY2Vsc2l1c0J1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2NlbHNpdXMtb24nKSkge1xuICAgICAgdGVtcCA9IGZhaHJlbmhlaXRUb0NlbHNpdXMoc2VhcmNoRGF0YS5tYWluLnRlbXApO1xuICAgICAgZmVlbHNMaWtlID0gZmFocmVuaGVpdFRvQ2Vsc2l1cyhzZWFyY2hEYXRhLm1haW4uZmVlbHNfbGlrZSk7XG4gICAgICB0ZW1wTWluID0gZmFocmVuaGVpdFRvQ2Vsc2l1cyhzZWFyY2hEYXRhLm1haW4udGVtcF9taW4pO1xuICAgICAgdGVtcE1heCA9IGZhaHJlbmhlaXRUb0NlbHNpdXMoc2VhcmNoRGF0YS5tYWluLnRlbXBfbWF4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGVtcCA9IHNlYXJjaERhdGEubWFpbi50ZW1wO1xuICAgICAgZmVlbHNMaWtlID0gc2VhcmNoRGF0YS5tYWluLmZlZWxzX2xpa2U7XG4gICAgICB0ZW1wTWluID0gc2VhcmNoRGF0YS5tYWluLnRlbXBfbWluO1xuICAgICAgdGVtcE1heCA9IHNlYXJjaERhdGEubWFpbi50ZW1wX21heDtcbiAgICB9XG5cbiAgICBhcHBlbmRDdXJyZW50V2VhdGhlcihcbiAgICAgIHRlbXAsXG4gICAgICB3ZWF0aGVyVHlwZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgY291bnRyeSxcbiAgICAgIGZlZWxzTGlrZSxcbiAgICAgIGh1bWlkaXR5LFxuICAgICAgdGVtcE1pbixcbiAgICAgIHRlbXBNYXgsXG4gICAgICB3aW5kXG4gICAgKTtcblxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICBhbGVydCgnVGhlIHNlcnZlciBjb3VsZCBub3QgZmluZCB3aGF0IHlvdSB3ZXJlIGxvb2tpbmcgZm9yLCBwbGVhc2UgdHJ5IGFnYWluJyk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlckZvcmVjYXN0KCkge1xuICBsZXQgY29yc0J5cGFzcyA9ICdodHRwczovL2NvcnMtZXZlcnl3aGVyZS1tZS5oZXJva3VhcHAuY29tLyc7XG4gIGxldCBhcGkgPSAnaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0Pyc7XG4gIGxldCBsYXQgPSBgJmxhdD0ke3JldHJpZXZlZENpdHlMYXR9YDtcbiAgbGV0IGxvbiA9IGAmbG9uPSR7cmV0cmlldmVkQ2l0eUxvbn1gO1xuICBsZXQgbGFuZ3VhZ2UgPSAnJmxhbmc9ZW4nO1xuICBsZXQgdW5pdHMgPSAnJnVuaXRzPWltcGVyaWFsJztcbiAgbGV0IGFwaUtleSA9ICcmYXBwaWQ9NmM4OWMyMWJmYzExZDQwM2JlNDFmNDg5YWYzYjJlYWUnO1xuICBsZXQgc2VhcmNoV2VhdGhlciA9IGNvcnNCeXBhc3MgKyBhcGkgKyBsYXQgKyBsb24gKyBhcGlLZXkgKyBsYW5ndWFnZSArIHVuaXRzO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCAoc2VhcmNoV2VhdGhlciwge21vZGU6ICdjb3JzJ30pO1xuICAgIGNvbnN0IHNlYXJjaERhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgbGV0IGZvcmVjYXN0TGlzdCA9IHNlYXJjaERhdGEubGlzdDtcbiAgICBidW5kbGVGb3JlY2FzdERhdGEoZm9yZWNhc3RMaXN0KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgYWxlcnQoJ1RoZSBzZXJ2ZXIgY291bGQgbm90IGZpbmQgd2hhdCB5b3Ugd2VyZSBsb29raW5nIGZvciwgcGxlYXNlIHRyeSBhZ2FpbicpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEN1cnJlbnRXZWF0aGVyKFxuICB0ZW1wLFxuICB3ZWF0aGVyVHlwZSxcbiAgZGVzY3JpcHRpb24sXG4gIGNvdW50cnksXG4gIGZlZWxzTGlrZSxcbiAgaHVtaWRpdHksXG4gIHRlbXBNaW4sXG4gIHRlbXBNYXgsXG4gIHdpbmRcbiAgKSB7XG4gICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKTtcbiAgICBsZXQgdGltZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCk7XG4gICAgY29uc3QgbG9jYXRpb25JbmZvcm1hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2NhdGlvbi1pbmZvcm1hdGlvbicpO1xuICAgIGxldCBjaXR5Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjaXR5Q29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnY2l0eS1jb250YWluZXInKTtcbiAgICBsZXQgY2l0eVN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgY2l0eVN2Zy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NpdHktc3ZnJyk7XG4gICAgICBjaXR5U3ZnLnNyYyA9ICcvc3JjL3N2Z3MvbG9jYXRpb24uc3ZnJztcbiAgICBsZXQgY2l0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIGNpdHkuc2V0QXR0cmlidXRlKCdpZCcsICdjaXR5LW5hbWUnKTtcbiAgICAgIGNpdHkudGV4dENvbnRlbnQgPSBgJHtyZXRyaWV2ZWRDaXR5TmFtZX0sICR7Y291bnRyeX1gO1xuICAgIGxldCB3ZWF0aGVyRGVzY3JpcHRpb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHdlYXRoZXJEZXNjcmlwdGlvbkNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dlYXRoZXItZGVzY3JpcHRpb24tY29udGFpbmVyJyk7XG4gICAgbGV0IHdlYXRoZXJEZXNjcmlwdGlvblN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgd2VhdGhlckRlc2NyaXB0aW9uU3ZnLnNldEF0dHJpYnV0ZSgnaWQnLCAnd2VhdGhlci1kZXNjcmlwdGlvbi1zdmcnKTtcbiAgICAgIHdlYXRoZXJEZXNjcmlwdGlvblN2Zy5zcmMgPSAnLi4vc3JjL3N2Z3Mvd2VhdGhlci5zdmcnO1xuICAgIGxldCB3ZWF0aGVyRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICB3ZWF0aGVyRGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKCdpZCcsICd3ZWF0aGVyLWRlc2NyaXB0aW9uJyk7XG4gICAgICB3ZWF0aGVyRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHt3ZWF0aGVyVHlwZX0sICR7ZGVzY3JpcHRpb259YDtcbiAgICBsZXQgd2VhdGhlclRlbXBlcmF0dXJlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB3ZWF0aGVyVGVtcGVyYXR1cmVDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICd3ZWF0aGVyLXRlbXBlcmF0dXJlLWNvbnRhaW5lcicpO1xuICAgIGxldCB3ZWF0aGVyVGVtcGVyYXR1cmVTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIHdlYXRoZXJUZW1wZXJhdHVyZVN2Zy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dlYXRoZXItdGVtcGVyYXR1cmUtc3ZnJyk7XG4gICAgICB3ZWF0aGVyVGVtcGVyYXR1cmVTdmcuc3JjID0gJy9zcmMvc3Zncy90ZW1wLnN2Zyc7XG4gICAgbGV0IHdlYXRoZXJUZW1wZXJhdHVyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIHdlYXRoZXJUZW1wZXJhdHVyZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dlYXRoZXItdGVtcGVyYXR1cmUnKTtcbiAgICBsZXQgdG9kYXlzRGF0ZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdG9kYXlzRGF0ZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3RvZGF5cy1kYXRlLWNvbnRhaW5lcicpO1xuICAgIGxldCB0b2RheXNEYXRlU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICB0b2RheXNEYXRlU3ZnLnNldEF0dHJpYnV0ZSgnaWQnLCAndG9kYXlzLWRhdGUtc3ZnJyk7XG4gICAgICB0b2RheXNEYXRlU3ZnLnNyYyA9ICcvc3JjL3N2Z3MvZGF0ZS5zdmcnO1xuICAgIGxldCB0b2RheXNEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgdG9kYXlzRGF0ZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3RvZGF5cy1kYXRlJyk7XG4gICAgICB0b2RheXNEYXRlLnRleHRDb250ZW50ID0gYCR7dG9kYXl9YDtcbiAgICBsZXQgdG9kYXlzVGltZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdG9kYXlzVGltZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3RvZGF5cy10aW1lLWNvbnRhaW5lcicpO1xuICAgIGxldCB0b2RheXNUaW1lU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICB0b2RheXNUaW1lU3ZnLnNldEF0dHJpYnV0ZSgnaWQnLCAndG9kYXlzLXRpbWUtc3ZnJyk7XG4gICAgICB0b2RheXNUaW1lU3ZnLnNyYyA9ICcvc3JjL3N2Z3MvdGltZS5zdmcnO1xuICAgIGxldCB0b2RheXNUaW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgdG9kYXlzVGltZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3RvZGF5cy10aW1lJyk7XG4gICAgICB0b2RheXNUaW1lLnRleHRDb250ZW50ID0gYFVwZGF0ZWQ6ICR7dGltZX1gO1xuXG4gICAgLy9jaGVja3MgaWYgY2Vsc2l1cyBidXR0b24gaXMgb24gZm9yIGNvbnZlcnNpb25cbiAgICBjb25zdCBjZWxzaXVzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NlbHNpdXMtYnV0dG9uJyk7XG4gICAgaWYgKGNlbHNpdXNCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxzaXVzLW9uJykpIHtcbiAgICAgIHdlYXRoZXJUZW1wZXJhdHVyZS50ZXh0Q29udGVudCA9IGAke3RlbXB9IMKwQ2A7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdlYXRoZXJUZW1wZXJhdHVyZS50ZXh0Q29udGVudCA9IGAke3RlbXB9IMKwRmA7XG4gICAgfVxuXG4gICAgY2l0eUNvbnRhaW5lci5hcHBlbmRDaGlsZChjaXR5U3ZnKTtcbiAgICBjaXR5Q29udGFpbmVyLmFwcGVuZENoaWxkKGNpdHkpO1xuICAgIHdlYXRoZXJEZXNjcmlwdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZCh3ZWF0aGVyRGVzY3JpcHRpb25TdmcpO1xuICAgIHdlYXRoZXJEZXNjcmlwdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZCh3ZWF0aGVyRGVzY3JpcHRpb24pO1xuICAgIHdlYXRoZXJUZW1wZXJhdHVyZUNvbnRhaW5lci5hcHBlbmRDaGlsZCh3ZWF0aGVyVGVtcGVyYXR1cmVTdmcpO1xuICAgIHdlYXRoZXJUZW1wZXJhdHVyZUNvbnRhaW5lci5hcHBlbmRDaGlsZCh3ZWF0aGVyVGVtcGVyYXR1cmUpO1xuICAgIHRvZGF5c0RhdGVDb250YWluZXIuYXBwZW5kQ2hpbGQodG9kYXlzRGF0ZVN2Zyk7XG4gICAgdG9kYXlzRGF0ZUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RheXNEYXRlKTtcbiAgICB0b2RheXNUaW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKHRvZGF5c1RpbWVTdmcpO1xuICAgIHRvZGF5c1RpbWVDb250YWluZXIuYXBwZW5kQ2hpbGQodG9kYXlzVGltZSk7XG4gICAgbG9jYXRpb25JbmZvcm1hdGlvbi5hcHBlbmRDaGlsZChjaXR5Q29udGFpbmVyKTtcbiAgICBsb2NhdGlvbkluZm9ybWF0aW9uLmFwcGVuZENoaWxkKHdlYXRoZXJEZXNjcmlwdGlvbkNvbnRhaW5lcik7XG4gICAgbG9jYXRpb25JbmZvcm1hdGlvbi5hcHBlbmRDaGlsZCh3ZWF0aGVyVGVtcGVyYXR1cmVDb250YWluZXIpO1xuICAgIGxvY2F0aW9uSW5mb3JtYXRpb24uYXBwZW5kQ2hpbGQodG9kYXlzRGF0ZUNvbnRhaW5lcik7XG4gICAgbG9jYXRpb25JbmZvcm1hdGlvbi5hcHBlbmRDaGlsZCh0b2RheXNUaW1lQ29udGFpbmVyKTtcblxuICAgIGNvbnN0IGxvY2F0aW9uRXh0cmFJbmZvcm1hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2NhdGlvbi1leHRyYS1pbmZvcm1hdGlvbicpO1xuICAgIGxldCB3ZWF0aGVyRmVlbHNMaWtlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB3ZWF0aGVyRmVlbHNMaWtlQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnd2VhdGhlci1mZWVscy1saWtlLWNvbnRhaW5lcicpO1xuICAgIGxldCB3ZWF0aGVyRmVlbHNMaWtlU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICB3ZWF0aGVyRmVlbHNMaWtlU3ZnLnNldEF0dHJpYnV0ZSgnaWQnLCAnd2VhdGhlci1mZWVscy1saWtlLXN2ZycpO1xuICAgICAgd2VhdGhlckZlZWxzTGlrZVN2Zy5zcmMgPSAnL3NyYy9zdmdzL2ZlZWxzLWxpa2Uuc3ZnJztcbiAgICBsZXQgd2VhdGhlckZlZWxzTGlrZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIHdlYXRoZXJGZWVsc0xpa2Uuc2V0QXR0cmlidXRlKCdpZCcsICd3ZWF0aGVyLWZlZWxzLWxpa2UnKTtcbiAgICBsZXQgd2VhdGhlckh1bWlkaXR5Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB3ZWF0aGVySHVtaWRpdHlDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICd3ZWF0aGVyLWh1bWlkaXR5LWNvbnRhaW5lcicpO1xuICAgIGxldCB3ZWF0aGVySHVtaWRpdHlTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIHdlYXRoZXJIdW1pZGl0eVN2Zy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dlYXRoZXItaHVtaWRpdHktc3ZnJyk7XG4gICAgICB3ZWF0aGVySHVtaWRpdHlTdmcuc3JjID0gJy9zcmMvc3Zncy9odW1pZGl0eS5zdmcnO1xuICAgIGxldCB3ZWF0aGVySHVtaWRpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICB3ZWF0aGVySHVtaWRpdHkuc2V0QXR0cmlidXRlKCdpZCcsICd3ZWF0aGVyLWh1bWlkaXR5Jyk7XG4gICAgICB3ZWF0aGVySHVtaWRpdHkudGV4dENvbnRlbnQgPSBgSHVtaWRpdHk6ICR7aHVtaWRpdHl9ICVgO1xuICAgIGxldCB3ZWF0aGVyTWluQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB3ZWF0aGVyTWluQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnd2VhdGhlci1taW4tY29udGFpbmVyJyk7XG4gICAgbGV0IHdlYXRoZXJNaW5TdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIHdlYXRoZXJNaW5Tdmcuc2V0QXR0cmlidXRlKCdpZCcsICd3ZWF0aGVyLW1pbi1zdmcnKTtcbiAgICAgIHdlYXRoZXJNaW5Tdmcuc3JjID0gJy9zcmMvc3Zncy90ZW1wLW1pbi5zdmcnO1xuICAgIGxldCB3ZWF0aGVyTWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgd2VhdGhlck1pbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dlYXRoZXItbWluJyk7XG4gICAgbGV0IHdlYXRoZXJNYXhDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHdlYXRoZXJNYXhDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICd3ZWF0aGVyLW1heC1jb250YWluZXInKTtcbiAgICBsZXQgd2VhdGhlck1heFN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgd2VhdGhlck1heFN2Zy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dlYXRoZXItbWF4LXN2ZycpO1xuICAgICAgd2VhdGhlck1heFN2Zy5zcmMgPSAnL3NyYy9zdmdzL3RlbXAtbWF4LnN2Zyc7XG4gICAgbGV0IHdlYXRoZXJNYXggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICB3ZWF0aGVyTWF4LnNldEF0dHJpYnV0ZSgnaWQnLCAnd2VhdGhlci1tYXgnKTtcbiAgICBsZXQgd2luZFNwZWVkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB3aW5kU3BlZWRDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICd3aW5kLXNwZWVkLWNvbnRhaW5lcicpO1xuICAgIGxldCB3aW5kU3BlZWRTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIHdpbmRTcGVlZFN2Zy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dpbmQtc3BlZWQtc3ZnJyk7XG4gICAgICB3aW5kU3BlZWRTdmcuc3JjID0gJy9zcmMvc3Zncy93aW5kLnN2Zyc7XG4gICAgbGV0IHdpbmRTcGVlZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIHdpbmRTcGVlZC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dpbmQtc3BlZWQnKTtcbiAgICAgIHdpbmRTcGVlZC50ZXh0Q29udGVudCA9IGBXaW5kIFNwZWVkOiAke3dpbmR9IE1QSGA7XG5cbiAgICAvLyBjb250cm9scyBmb3IgY2Vsc2l1cyBjb252ZXJzaW9uXG4gICAgaWYgKGNlbHNpdXNCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxzaXVzLW9uJykpIHtcbiAgICAgIHdlYXRoZXJGZWVsc0xpa2UudGV4dENvbnRlbnQgPSBgRmVlbHMgTGlrZTogJHtmZWVsc0xpa2V9IMKwQ2A7XG4gICAgICB3ZWF0aGVyTWluLnRleHRDb250ZW50ID0gYExvdzogJHt0ZW1wTWlufSDCsENgO1xuICAgICAgd2VhdGhlck1heC50ZXh0Q29udGVudCA9IGBIaWdoOiAke3RlbXBNYXh9IMKwQ2A7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdlYXRoZXJGZWVsc0xpa2UudGV4dENvbnRlbnQgPSBgRmVlbHMgTGlrZTogJHtmZWVsc0xpa2V9IMKwRmA7XG4gICAgICB3ZWF0aGVyTWluLnRleHRDb250ZW50ID0gYExvdzogJHt0ZW1wTWlufSDCsEZgO1xuICAgICAgd2VhdGhlck1heC50ZXh0Q29udGVudCA9IGBIaWdoOiAke3RlbXBNYXh9IMKwRmA7XG4gICAgfVxuXG4gICAgd2VhdGhlckZlZWxzTGlrZUNvbnRhaW5lci5hcHBlbmRDaGlsZCh3ZWF0aGVyRmVlbHNMaWtlU3ZnKTtcbiAgICB3ZWF0aGVyRmVlbHNMaWtlQ29udGFpbmVyLmFwcGVuZENoaWxkKHdlYXRoZXJGZWVsc0xpa2UpO1xuICAgIHdlYXRoZXJIdW1pZGl0eUNvbnRhaW5lci5hcHBlbmRDaGlsZCh3ZWF0aGVySHVtaWRpdHlTdmcpO1xuICAgIHdlYXRoZXJIdW1pZGl0eUNvbnRhaW5lci5hcHBlbmRDaGlsZCh3ZWF0aGVySHVtaWRpdHkpO1xuICAgIHdlYXRoZXJNaW5Db250YWluZXIuYXBwZW5kQ2hpbGQod2VhdGhlck1pblN2Zyk7XG4gICAgd2VhdGhlck1pbkNvbnRhaW5lci5hcHBlbmRDaGlsZCh3ZWF0aGVyTWluKTtcbiAgICB3ZWF0aGVyTWF4Q29udGFpbmVyLmFwcGVuZENoaWxkKHdlYXRoZXJNYXhTdmcpO1xuICAgIHdlYXRoZXJNYXhDb250YWluZXIuYXBwZW5kQ2hpbGQod2VhdGhlck1heCk7XG4gICAgd2luZFNwZWVkQ29udGFpbmVyLmFwcGVuZENoaWxkKHdpbmRTcGVlZFN2Zyk7XG4gICAgd2luZFNwZWVkQ29udGFpbmVyLmFwcGVuZENoaWxkKHdpbmRTcGVlZCk7XG5cbiAgICBsb2NhdGlvbkV4dHJhSW5mb3JtYXRpb24uYXBwZW5kQ2hpbGQod2VhdGhlckZlZWxzTGlrZUNvbnRhaW5lcik7XG4gICAgbG9jYXRpb25FeHRyYUluZm9ybWF0aW9uLmFwcGVuZENoaWxkKHdlYXRoZXJIdW1pZGl0eUNvbnRhaW5lcik7XG4gICAgbG9jYXRpb25FeHRyYUluZm9ybWF0aW9uLmFwcGVuZENoaWxkKHdlYXRoZXJNaW5Db250YWluZXIpO1xuICAgIGxvY2F0aW9uRXh0cmFJbmZvcm1hdGlvbi5hcHBlbmRDaGlsZCh3ZWF0aGVyTWF4Q29udGFpbmVyKTtcbiAgICBsb2NhdGlvbkV4dHJhSW5mb3JtYXRpb24uYXBwZW5kQ2hpbGQod2luZFNwZWVkQ29udGFpbmVyKTsgICBcbn1cblxuZnVuY3Rpb24gY29udmVydERhdGUoZGF0ZSkge1xuICBkYXRlID0gbmV3IERhdGUoZGF0ZSkudG9EYXRlU3RyaW5nKCk7XG4gIHJldHVybiBkYXRlO1xufVxuXG5mdW5jdGlvbiBidW5kbGVGb3JlY2FzdERhdGEoZm9yZWNhc3RMaXN0KSB7XG4gIGNvbnN0IGNlbHNpdXNCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2Vsc2l1cy1idXR0b24nKTtcblxuICAvLyBIb3VybHkgZm9yZWNhc3QgYnVuZGxlXG4gIGxldCBuZXh0MjFIb3VycyA9IGZvcmVjYXN0TGlzdC5zbGljZSgwLCA3KTtcbiAgbmV4dDIxSG91cnMuZm9yRWFjaChpdGVtID0+IHtcbiAgICBsZXQgZGF0ZSA9IGNvbnZlcnREYXRlKGl0ZW0uZHRfdHh0LnNsaWNlKDAsIDEwKSk7XG4gICAgbGV0IHRpbWUgPSBpdGVtLmR0X3R4dC5zbGljZSgxMSwgMTkpO1xuICAgIGxldCB0ZW1wID0gaXRlbS5tYWluLnRlbXA7XG4gICAgbGV0IGh1bWlkaXR5ID0gaXRlbS5tYWluLmh1bWlkaXR5O1xuICAgIGxldCB3ZWF0aGVyVHlwZSA9IGl0ZW0ud2VhdGhlclswXS5tYWluO1xuICAgIGxldCB3ZWF0aGVyRGVzY3JpcHRpb24gPSBpdGVtLndlYXRoZXJbMF0uZGVzY3JpcHRpb247XG4gICAgbGV0IHdpbmRTcGVlZCA9IGl0ZW0ud2luZC5zcGVlZDtcblxuICAgIC8vY2hlY2tzIGlmIGNlbHNpdXMgYnV0dG9uIGlzIG9uIGZvciBjb252ZXJzaW9uXG4gICAgaWYgKGNlbHNpdXNCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxzaXVzLW9uJykpIHtcbiAgICAgIHRlbXAgPSBmYWhyZW5oZWl0VG9DZWxzaXVzKGl0ZW0ubWFpbi50ZW1wKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGVtcCA9IGl0ZW0ubWFpbi50ZW1wO1xuICAgIH1cblxuICAgIGFwcGVuZEhvdXJseUZvcmVjYXN0KFxuICAgICAgZGF0ZSxcbiAgICAgIHRpbWUsXG4gICAgICB0ZW1wLFxuICAgICAgaHVtaWRpdHksXG4gICAgICB3ZWF0aGVyVHlwZSxcbiAgICAgIHdlYXRoZXJEZXNjcmlwdGlvbixcbiAgICAgIHdpbmRTcGVlZFxuICAgICAgKTtcbiAgfSlcbiAgXG4gIC8vIERhaWx5IGZvcmVjYXN0IGJ1bmRsZVxuICBsZXQgZGFpbHlGb3JlY2FzdCA9IFtdO1xuICBsZXQgbmV4dERheSA9IGZvcmVjYXN0TGlzdC5zbGljZSg3LCA4KTtcbiAgbGV0IHNlY29uZERheSA9IGZvcmVjYXN0TGlzdC5zbGljZSgxNSwgMTYpXG4gIGxldCB0aGlyZERheSA9IGZvcmVjYXN0TGlzdC5zbGljZSgyMywgMjQpO1xuICBsZXQgZm91cnRoRGF5ID0gZm9yZWNhc3RMaXN0LnNsaWNlKDMxLCAzMik7XG4gIGxldCBmaWZ0aERheSA9IGZvcmVjYXN0TGlzdC5zbGljZSgzOSwgNDApO1xuICBkYWlseUZvcmVjYXN0LnB1c2gobmV4dERheSwgc2Vjb25kRGF5LCB0aGlyZERheSwgZm91cnRoRGF5LCBmaWZ0aERheSk7XG4gIGRhaWx5Rm9yZWNhc3QuZm9yRWFjaChpdGVtID0+IHtcbiAgICBsZXQgZGF0ZSA9IGNvbnZlcnREYXRlKGl0ZW1bMF0uZHRfdHh0LnNsaWNlKDAsIDEwKSk7XG4gICAgbGV0IHRpbWUgPSBpdGVtWzBdLmR0X3R4dC5zbGljZSgxMSwgMTkpO1xuICAgIGxldCB0ZW1wID0gaXRlbVswXS5tYWluLnRlbXA7XG4gICAgbGV0IGh1bWlkaXR5ID0gaXRlbVswXS5tYWluLmh1bWlkaXR5O1xuICAgIGxldCB3ZWF0aGVyVHlwZSA9IGl0ZW1bMF0ud2VhdGhlclswXS5tYWluO1xuICAgIGxldCB3ZWF0aGVyRGVzY3JpcHRpb24gPSBpdGVtWzBdLndlYXRoZXJbMF0uZGVzY3JpcHRpb247XG4gICAgbGV0IHdpbmRTcGVlZCA9IGl0ZW1bMF0ud2luZC5zcGVlZDtcblxuICAgIC8vY2hlY2tzIGlmIGNlbHNpdXMgYnV0dG9uIGlzIG9uIGZvciBjb252ZXJzaW9uXG4gICAgaWYgKGNlbHNpdXNCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxzaXVzLW9uJykpIHtcbiAgICAgIHRlbXAgPSBmYWhyZW5oZWl0VG9DZWxzaXVzKGl0ZW1bMF0ubWFpbi50ZW1wKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGVtcCA9IGl0ZW1bMF0ubWFpbi50ZW1wO1xuICAgIH1cblxuICAgIGFwcGVuZERhaWx5Rm9yZWNhc3QoXG4gICAgICBkYXRlLFxuICAgICAgdGltZSxcbiAgICAgIHRlbXAsXG4gICAgICBodW1pZGl0eSxcbiAgICAgIHdlYXRoZXJUeXBlLFxuICAgICAgd2VhdGhlckRlc2NyaXB0aW9uLFxuICAgICAgd2luZFNwZWVkXG4gICAgKVxuICB9KVxufVxuXG5mdW5jdGlvbiBhcHBlbmRIb3VybHlGb3JlY2FzdChcbiAgZGF0ZSxcbiAgdGltZSxcbiAgdGVtcCxcbiAgaHVtaWRpdHksXG4gIHdlYXRoZXJUeXBlLFxuICB3ZWF0aGVyRGVzY3JpcHRpb24sXG4gIHdpbmRTcGVlZFxuICApIHtcbiAgY29uc3QgZm9yZUNhc3RIb3VybHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9yZWNhc3QtaG91cmx5Jyk7XG4gIGxldCBuZXh0SG91cmx5Rm9yZWNhc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3Quc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWhvdXJseS1mb3JlY2FzdCcpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdC5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1ob3VybHktb3BlbicpO1xuICBsZXQgbmV4dEhvdXJseUZvcmVjYXN0RGF0ZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdERhdGVDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWhvdXJseS1mb3JlY2FzdC1kYXRlLWNvbnRhaW5lcicpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdERhdGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtaG91cmx5LW9wZW4nKTtcbiAgbGV0IG5leHRIb3VybHlGb3JlY2FzdERhdGVTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3REYXRlU3ZnLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1ob3VybHktZm9yZWNhc3QtZGF0ZS1zdmcnKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3REYXRlU3ZnLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWhvdXJseS1pdGVtLW9wZW4nKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3REYXRlU3ZnLnNyYyA9ICcvc3JjL3N2Z3MvZGF0ZS5zdmcnO1xuICBsZXQgbmV4dEhvdXJseUZvcmVjYXN0RGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3REYXRlLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1ob3VybHktZm9yZWNhc3QtZGF0ZScpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdERhdGUuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtaG91cmx5LWl0ZW0tb3BlbicpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdERhdGUudGV4dENvbnRlbnQgPSBgJHtkYXRlfWA7XG4gIGxldCBuZXh0SG91cmx5Rm9yZWNhc3RUaW1lQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0VGltZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtaG91cmx5LWZvcmVjYXN0LXRpbWUtY29udGFpbmVyJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0VGltZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1ob3VybHktb3BlbicpO1xuICBsZXQgbmV4dEhvdXJseUZvcmVjYXN0VGltZVN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFRpbWVTdmcuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWhvdXJseS1mb3JlY2FzdC10aW1lLXN2ZycpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFRpbWVTdmcuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtaG91cmx5LWl0ZW0tb3BlbicpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFRpbWVTdmcuc3JjID0gJy9zcmMvc3Zncy90aW1lLnN2Zyc7XG4gIGxldCBuZXh0SG91cmx5Rm9yZWNhc3RUaW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFRpbWUuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWhvdXJseS1mb3JlY2FzdC10aW1lJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0VGltZS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1ob3VybHktaXRlbS1vcGVuJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0VGltZS50ZXh0Q29udGVudCA9IGAke3RpbWV9YDtcbiAgbGV0IG5leHRIb3VybHlGb3JlY2FzdFRlbXBDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RUZW1wQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1ob3VybHktZm9yZWNhc3QtdGVtcC1jb250YWluZXInKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RUZW1wQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWhvdXJseS1vcGVuJyk7XG4gIGxldCBuZXh0SG91cmx5Rm9yZWNhc3RUZW1wU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0VGVtcFN2Zy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtaG91cmx5LWZvcmVjYXN0LXRlbXAtc3ZnJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0VGVtcFN2Zy5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1ob3VybHktaXRlbS1vcGVuJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0VGVtcFN2Zy5zcmMgPSAnL3NyYy9zdmdzL3RlbXAuc3ZnJztcbiAgbGV0IG5leHRIb3VybHlGb3JlY2FzdFRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0VGVtcC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtaG91cmx5LWZvcmVjYXN0LXRlbXAnKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RUZW1wLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWhvdXJseS1pdGVtLW9wZW4nKTtcbiAgbGV0IG5leHRIb3VybHlGb3JlY2FzdEh1bWlkaXR5Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0SHVtaWRpdHlDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWhvdXJseS1mb3JlY2FzdC1odW1pZGl0eS1jb250YWluZXInKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RIdW1pZGl0eUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1ob3VybHktb3BlbicpO1xuICBsZXQgbmV4dEhvdXJseUZvcmVjYXN0SHVtaWRpdHlTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RIdW1pZGl0eVN2Zy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtaG91cmx5LWZvcmVjYXN0LWh1bWlkaXR5LXN2ZycpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdEh1bWlkaXR5U3ZnLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWhvdXJseS1pdGVtLW9wZW4nKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RIdW1pZGl0eVN2Zy5zcmMgPSAnL3NyYy9zdmdzL2h1bWlkaXR5LnN2Zyc7XG4gIGxldCBuZXh0SG91cmx5Rm9yZWNhc3RIdW1pZGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RIdW1pZGl0eS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtaG91cmx5LWZvcmVjYXN0LWh1bWlkaXR5Jyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0SHVtaWRpdHkuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtaG91cmx5LWl0ZW0tb3BlbicpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdEh1bWlkaXR5LnRleHRDb250ZW50ID0gYEh1bWlkaXR5OiAke2h1bWlkaXR5fSAlYDtcbiAgbGV0IG5leHRIb3VybHlGb3JlY2FzdFdlYXRoZXJUeXBlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0V2VhdGhlclR5cGVDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWhvdXJseS1mb3JlY2FzdC13ZWF0aGVyLXR5cGUtY29udGFpbmVyJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0V2VhdGhlclR5cGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtaG91cmx5LW9wZW4nKTtcbiAgbGV0IG5leHRIb3VybHlGb3JlY2FzdFdlYXRoZXJUeXBlU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0V2VhdGhlclR5cGVTdmcuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWhvdXJseS1mb3JlY2FzdC13ZWF0aGVyLXR5cGUtc3ZnJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0V2VhdGhlclR5cGVTdmcuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtaG91cmx5LWl0ZW0tb3BlbicpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFdlYXRoZXJUeXBlU3ZnLnNyYyA9ICcvc3JjL3N2Z3Mvd2VhdGhlci5zdmcnO1xuICBsZXQgbmV4dEhvdXJseUZvcmVjYXN0V2VhdGhlclR5cGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0V2VhdGhlclR5cGUuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWhvdXJseS1mb3JlY2FzdC13ZWF0aGVyLXR5cGUnKTtcbiAgICBuZXh0SG91cmx5Rm9yZWNhc3RXZWF0aGVyVHlwZS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1ob3VybHktaXRlbS1vcGVuJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0V2VhdGhlclR5cGUudGV4dENvbnRlbnQgPSBgJHt3ZWF0aGVyVHlwZX0sICR7d2VhdGhlckRlc2NyaXB0aW9ufWA7XG4gIGxldCBuZXh0SG91cmx5Rm9yZWNhc3RXaW5kQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0V2luZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtaG91cmx5LWZvcmVjYXN0LXdpbmQtY29udGFpbmVyJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0V2luZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1ob3VybHktb3BlbicpO1xuICBsZXQgbmV4dEhvdXJseUZvcmVjYXN0V2luZFN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFdpbmRTdmcuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWhvdXJseS1mb3JlY2FzdC13aW5kLXN2ZycpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFdpbmRTdmcuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtaG91cmx5LWl0ZW0tb3BlbicpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFdpbmRTdmcuc3JjID0gJy9zcmMvc3Zncy93aW5kLnN2Zyc7XG4gIGxldCBuZXh0SG91cmx5Rm9yZWNhc3RXaW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIG5leHRIb3VybHlGb3JlY2FzdFdpbmQuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWhvdXJseS1mb3JlY2FzdC13aW5kJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0V2luZC5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1ob3VybHktaXRlbS1vcGVuJyk7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0V2luZC50ZXh0Q29udGVudCA9IGBXaW5kIFNwZWVkOiAke3dpbmRTcGVlZH0gTVBIYDtcblxuICAvL2NoZWNrcyBpZiBjZWxzaXVzIGJ1dHRvbiBpcyBvbiBmb3IgY29udmVyc2lvblxuICBjb25zdCBjZWxzaXVzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NlbHNpdXMtYnV0dG9uJyk7XG4gIGlmIChjZWxzaXVzQnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnY2Vsc2l1cy1vbicpKSB7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0VGVtcC50ZXh0Q29udGVudCA9IGAke3RlbXB9IMKwQ2A7XG4gIH0gZWxzZSB7XG4gICAgbmV4dEhvdXJseUZvcmVjYXN0VGVtcC50ZXh0Q29udGVudCA9IGAke3RlbXB9IMKwRmA7XG4gIH1cblxuICBuZXh0SG91cmx5Rm9yZWNhc3REYXRlQ29udGFpbmVyLmFwcGVuZENoaWxkKG5leHRIb3VybHlGb3JlY2FzdERhdGVTdmcpO1xuICBuZXh0SG91cmx5Rm9yZWNhc3REYXRlQ29udGFpbmVyLmFwcGVuZENoaWxkKG5leHRIb3VybHlGb3JlY2FzdERhdGUpO1xuICBuZXh0SG91cmx5Rm9yZWNhc3RUaW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKG5leHRIb3VybHlGb3JlY2FzdFRpbWVTdmcpO1xuICBuZXh0SG91cmx5Rm9yZWNhc3RUaW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKG5leHRIb3VybHlGb3JlY2FzdFRpbWUpO1xuICBuZXh0SG91cmx5Rm9yZWNhc3RUZW1wQ29udGFpbmVyLmFwcGVuZENoaWxkKG5leHRIb3VybHlGb3JlY2FzdFRlbXBTdmcpO1xuICBuZXh0SG91cmx5Rm9yZWNhc3RUZW1wQ29udGFpbmVyLmFwcGVuZENoaWxkKG5leHRIb3VybHlGb3JlY2FzdFRlbXApO1xuICBuZXh0SG91cmx5Rm9yZWNhc3RIdW1pZGl0eUNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXh0SG91cmx5Rm9yZWNhc3RIdW1pZGl0eVN2Zyk7XG4gIG5leHRIb3VybHlGb3JlY2FzdEh1bWlkaXR5Q29udGFpbmVyLmFwcGVuZENoaWxkKG5leHRIb3VybHlGb3JlY2FzdEh1bWlkaXR5KTtcbiAgbmV4dEhvdXJseUZvcmVjYXN0V2VhdGhlclR5cGVDb250YWluZXIuYXBwZW5kQ2hpbGQobmV4dEhvdXJseUZvcmVjYXN0V2VhdGhlclR5cGVTdmcpO1xuICBuZXh0SG91cmx5Rm9yZWNhc3RXZWF0aGVyVHlwZUNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXh0SG91cmx5Rm9yZWNhc3RXZWF0aGVyVHlwZSk7XG4gIG5leHRIb3VybHlGb3JlY2FzdFdpbmRDb250YWluZXIuYXBwZW5kQ2hpbGQobmV4dEhvdXJseUZvcmVjYXN0V2luZFN2Zyk7XG4gIG5leHRIb3VybHlGb3JlY2FzdFdpbmRDb250YWluZXIuYXBwZW5kQ2hpbGQobmV4dEhvdXJseUZvcmVjYXN0V2luZCk7XG5cbiAgbmV4dEhvdXJseUZvcmVjYXN0LmFwcGVuZENoaWxkKG5leHRIb3VybHlGb3JlY2FzdERhdGVDb250YWluZXIpO1xuICBuZXh0SG91cmx5Rm9yZWNhc3QuYXBwZW5kQ2hpbGQobmV4dEhvdXJseUZvcmVjYXN0VGltZUNvbnRhaW5lcik7XG4gIG5leHRIb3VybHlGb3JlY2FzdC5hcHBlbmRDaGlsZChuZXh0SG91cmx5Rm9yZWNhc3RUZW1wQ29udGFpbmVyKTtcbiAgbmV4dEhvdXJseUZvcmVjYXN0LmFwcGVuZENoaWxkKG5leHRIb3VybHlGb3JlY2FzdEh1bWlkaXR5Q29udGFpbmVyKTtcbiAgbmV4dEhvdXJseUZvcmVjYXN0LmFwcGVuZENoaWxkKG5leHRIb3VybHlGb3JlY2FzdFdlYXRoZXJUeXBlQ29udGFpbmVyKTtcbiAgbmV4dEhvdXJseUZvcmVjYXN0LmFwcGVuZENoaWxkKG5leHRIb3VybHlGb3JlY2FzdFdpbmRDb250YWluZXIpO1xuXG4gIGZvcmVDYXN0SG91cmx5LmFwcGVuZENoaWxkKG5leHRIb3VybHlGb3JlY2FzdCk7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZERhaWx5Rm9yZWNhc3QoXG4gIGRhdGUsXG4gIHRpbWUsXG4gIHRlbXAsXG4gIGh1bWlkaXR5LFxuICB3ZWF0aGVyVHlwZSxcbiAgd2VhdGhlckRlc2NyaXB0aW9uLFxuICB3aW5kU3BlZWRcbikge1xuICBjb25zdCBmb3JlQ2FzdERhaWx5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZvcmVjYXN0LWRhaWx5Jyk7XG4gIGxldCBuZXh0RGFpbHlGb3JlY2FzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5leHREYWlseUZvcmVjYXN0LnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1kYWlseS1mb3JlY2FzdCcpO1xuICAgIG5leHREYWlseUZvcmVjYXN0LmNsYXNzTGlzdC5hZGQoJ25leHQtZGFpbHktZm9yZWNhc3Qtb3BlbicpO1xuICAgIGxldCBuZXh0RGFpbHlGb3JlY2FzdERhdGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdERhdGVDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWRhaWx5LWZvcmVjYXN0LWRhdGUtY29udGFpbmVyJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3REYXRlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWRhaWx5LW9wZW4nKTtcbiAgbGV0IG5leHREYWlseUZvcmVjYXN0RGF0ZVN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIG5leHREYWlseUZvcmVjYXN0RGF0ZVN2Zy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtZGFpbHktZm9yZWNhc3QtZGF0ZS1zdmcnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdERhdGVTdmcuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtZGFpbHktaXRlbS1vcGVuJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3REYXRlU3ZnLnNyYyA9ICcvc3JjL3N2Z3MvZGF0ZS5zdmcnO1xuICBsZXQgbmV4dERhaWx5Rm9yZWNhc3REYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIG5leHREYWlseUZvcmVjYXN0RGF0ZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtZGFpbHktZm9yZWNhc3QtZGF0ZScpO1xuICAgIG5leHREYWlseUZvcmVjYXN0RGF0ZS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1kYWlseS1pdGVtLW9wZW4nKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdERhdGUudGV4dENvbnRlbnQgPSBgJHtkYXRlfWA7XG4gIGxldCBuZXh0RGFpbHlGb3JlY2FzdFRpbWVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFRpbWVDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWRhaWx5LWZvcmVjYXN0LXRpbWUtY29udGFpbmVyJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RUaW1lQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWRhaWx5LW9wZW4nKTtcbiAgbGV0IG5leHREYWlseUZvcmVjYXN0VGltZVN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIG5leHREYWlseUZvcmVjYXN0VGltZVN2Zy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtZGFpbHktZm9yZWNhc3QtdGltZS1zdmcnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFRpbWVTdmcuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtZGFpbHktaXRlbS1vcGVuJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RUaW1lU3ZnLnNyYyA9ICcvc3JjL3N2Z3MvdGltZS5zdmcnO1xuICBsZXQgbmV4dERhaWx5Rm9yZWNhc3RUaW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIG5leHREYWlseUZvcmVjYXN0VGltZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtZGFpbHktZm9yZWNhc3QtdGltZScpO1xuICAgIG5leHREYWlseUZvcmVjYXN0VGltZS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1kYWlseS1pdGVtLW9wZW4nKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFRpbWUudGV4dENvbnRlbnQgPSBgJHt0aW1lfWA7XG4gIGxldCBuZXh0RGFpbHlGb3JlY2FzdFRlbXBDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFRlbXBDb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWRhaWx5LWZvcmVjYXN0LXRlbXAtY29udGFpbmVyJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RUZW1wQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWRhaWx5LW9wZW4nKTtcbiAgbGV0IG5leHREYWlseUZvcmVjYXN0VGVtcFN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIG5leHREYWlseUZvcmVjYXN0VGVtcFN2Zy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtZGFpbHktZm9yZWNhc3QtdGVtcC1zdmcnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFRlbXBTdmcuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtZGFpbHktaXRlbS1vcGVuJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RUZW1wU3ZnLnNyYyA9ICcvc3JjL3N2Z3MvdGVtcC5zdmcnO1xuICBsZXQgbmV4dERhaWx5Rm9yZWNhc3RUZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIG5leHREYWlseUZvcmVjYXN0VGVtcC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtZGFpbHktZm9yZWNhc3QtdGVtcCcpO1xuICAgIG5leHREYWlseUZvcmVjYXN0VGVtcC5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1kYWlseS1pdGVtLW9wZW4nKTtcbiAgbGV0IG5leHREYWlseUZvcmVjYXN0SHVtaWRpdHlDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdEh1bWlkaXR5Q29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1kYWlseS1mb3JlY2FzdC1odW1pZGl0eS1jb250YWluZXInKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdEh1bWlkaXR5Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWRhaWx5LW9wZW4nKTtcbiAgbGV0IG5leHREYWlseUZvcmVjYXN0SHVtaWRpdHlTdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdEh1bWlkaXR5U3ZnLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1kYWlseS1mb3JlY2FzdC1odW1pZGl0eS1zdmcnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdEh1bWlkaXR5U3ZnLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWRhaWx5LWl0ZW0tb3BlbicpO1xuICAgIG5leHREYWlseUZvcmVjYXN0SHVtaWRpdHlTdmcuc3JjID0gJy9zcmMvc3Zncy9odW1pZGl0eS5zdmcnO1xuICBsZXQgbmV4dERhaWx5Rm9yZWNhc3RIdW1pZGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdEh1bWlkaXR5LnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1kYWlseS1mb3JlY2FzdC1odW1pZGl0eScpO1xuICAgIG5leHREYWlseUZvcmVjYXN0SHVtaWRpdHkuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtZGFpbHktaXRlbS1vcGVuJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RIdW1pZGl0eS50ZXh0Q29udGVudCA9IGBIdW1pZGl0eTogJHtodW1pZGl0eX0gJWA7XG4gIGxldCBuZXh0RGFpbHlGb3JlY2FzdFdlYXRoZXJUeXBlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RXZWF0aGVyVHlwZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtZGFpbHktZm9yZWNhc3Qtd2VhdGhlci10eXBlLWNvbnRhaW5lcicpO1xuICAgIG5leHREYWlseUZvcmVjYXN0V2VhdGhlclR5cGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtZGFpbHktb3BlbicpO1xuICBsZXQgbmV4dERhaWx5Rm9yZWNhc3RXZWF0aGVyVHlwZVN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIG5leHREYWlseUZvcmVjYXN0V2VhdGhlclR5cGVTdmcuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWRhaWx5LWZvcmVjYXN0LXdlYXRoZXItdHlwZS1zdmcnKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFdlYXRoZXJUeXBlU3ZnLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWRhaWx5LWl0ZW0tb3BlbicpO1xuICAgIG5leHREYWlseUZvcmVjYXN0V2VhdGhlclR5cGVTdmcuc3JjID0gJy9zcmMvc3Zncy93ZWF0aGVyLnN2Zyc7XG4gIGxldCBuZXh0RGFpbHlGb3JlY2FzdFdlYXRoZXJUeXBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIG5leHREYWlseUZvcmVjYXN0V2VhdGhlclR5cGUuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0LWRhaWx5LWZvcmVjYXN0LXdlYXRoZXItdHlwZScpO1xuICAgIG5leHREYWlseUZvcmVjYXN0V2VhdGhlclR5cGUuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtZGFpbHktaXRlbS1vcGVuJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RXZWF0aGVyVHlwZS50ZXh0Q29udGVudCA9IGAke3dlYXRoZXJUeXBlfSwgJHt3ZWF0aGVyRGVzY3JpcHRpb259YDtcbiAgbGV0IG5leHREYWlseUZvcmVjYXN0V2luZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5leHREYWlseUZvcmVjYXN0V2luZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ25leHQtZGFpbHktZm9yZWNhc3Qtd2luZC1jb250YWluZXInKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFdpbmRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtZGFpbHktb3BlbicpO1xuICBsZXQgbmV4dERhaWx5Rm9yZWNhc3RXaW5kU3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RXaW5kU3ZnLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1kYWlseS1mb3JlY2FzdC13aW5kLXN2ZycpO1xuICAgIG5leHREYWlseUZvcmVjYXN0V2luZFN2Zy5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1kYWlseS1pdGVtLW9wZW4nKTtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFdpbmRTdmcuc3JjID0gJy9zcmMvc3Zncy93aW5kLnN2Zyc7XG4gIGxldCBuZXh0RGFpbHlGb3JlY2FzdFdpbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RXaW5kLnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dC1kYWlseS1mb3JlY2FzdC13aW5kJyk7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RXaW5kLmNsYXNzTGlzdC5hZGQoJ2ZvcmVjYXN0LWRhaWx5LWl0ZW0tb3BlbicpO1xuICAgIG5leHREYWlseUZvcmVjYXN0V2luZC50ZXh0Q29udGVudCA9IGBXaW5kIFNwZWVkOiAke3dpbmRTcGVlZH0gTVBIYDtcblxuICAvL2NoZWNrcyBpZiBjZWxzaXVzIGJ1dHRvbiBpcyBvbiBmb3IgY29udmVyc2lvblxuICBjb25zdCBjZWxzaXVzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NlbHNpdXMtYnV0dG9uJyk7XG4gIGlmIChjZWxzaXVzQnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnY2Vsc2l1cy1vbicpKSB7XG4gICAgbmV4dERhaWx5Rm9yZWNhc3RUZW1wLnRleHRDb250ZW50ID0gYCR7dGVtcH0gwrBDYDtcbiAgfSBlbHNlIHtcbiAgICBuZXh0RGFpbHlGb3JlY2FzdFRlbXAudGV4dENvbnRlbnQgPSBgJHt0ZW1wfSDCsEZgO1xuICB9XG5cbiAgbmV4dERhaWx5Rm9yZWNhc3REYXRlQ29udGFpbmVyLmFwcGVuZENoaWxkKG5leHREYWlseUZvcmVjYXN0RGF0ZVN2Zyk7XG4gIG5leHREYWlseUZvcmVjYXN0RGF0ZUNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXh0RGFpbHlGb3JlY2FzdERhdGUpO1xuICBuZXh0RGFpbHlGb3JlY2FzdFRpbWVDb250YWluZXIuYXBwZW5kQ2hpbGQobmV4dERhaWx5Rm9yZWNhc3RUaW1lU3ZnKTtcbiAgbmV4dERhaWx5Rm9yZWNhc3RUaW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKG5leHREYWlseUZvcmVjYXN0VGltZSk7XG4gIG5leHREYWlseUZvcmVjYXN0VGVtcENvbnRhaW5lci5hcHBlbmRDaGlsZChuZXh0RGFpbHlGb3JlY2FzdFRlbXBTdmcpO1xuICBuZXh0RGFpbHlGb3JlY2FzdFRlbXBDb250YWluZXIuYXBwZW5kQ2hpbGQobmV4dERhaWx5Rm9yZWNhc3RUZW1wKTtcbiAgbmV4dERhaWx5Rm9yZWNhc3RIdW1pZGl0eUNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXh0RGFpbHlGb3JlY2FzdEh1bWlkaXR5U3ZnKTtcbiAgbmV4dERhaWx5Rm9yZWNhc3RIdW1pZGl0eUNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXh0RGFpbHlGb3JlY2FzdEh1bWlkaXR5KTtcbiAgbmV4dERhaWx5Rm9yZWNhc3RXZWF0aGVyVHlwZUNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXh0RGFpbHlGb3JlY2FzdFdlYXRoZXJUeXBlU3ZnKTtcbiAgbmV4dERhaWx5Rm9yZWNhc3RXZWF0aGVyVHlwZUNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXh0RGFpbHlGb3JlY2FzdFdlYXRoZXJUeXBlKTtcbiAgbmV4dERhaWx5Rm9yZWNhc3RXaW5kQ29udGFpbmVyLmFwcGVuZENoaWxkKG5leHREYWlseUZvcmVjYXN0V2luZFN2Zyk7XG4gIG5leHREYWlseUZvcmVjYXN0V2luZENvbnRhaW5lci5hcHBlbmRDaGlsZChuZXh0RGFpbHlGb3JlY2FzdFdpbmQpO1xuICBuZXh0RGFpbHlGb3JlY2FzdC5hcHBlbmRDaGlsZChuZXh0RGFpbHlGb3JlY2FzdERhdGVDb250YWluZXIpO1xuICBuZXh0RGFpbHlGb3JlY2FzdC5hcHBlbmRDaGlsZChuZXh0RGFpbHlGb3JlY2FzdFRpbWVDb250YWluZXIpO1xuICBuZXh0RGFpbHlGb3JlY2FzdC5hcHBlbmRDaGlsZChuZXh0RGFpbHlGb3JlY2FzdFRlbXBDb250YWluZXIpO1xuICBuZXh0RGFpbHlGb3JlY2FzdC5hcHBlbmRDaGlsZChuZXh0RGFpbHlGb3JlY2FzdEh1bWlkaXR5Q29udGFpbmVyKTtcbiAgbmV4dERhaWx5Rm9yZWNhc3QuYXBwZW5kQ2hpbGQobmV4dERhaWx5Rm9yZWNhc3RXZWF0aGVyVHlwZUNvbnRhaW5lcik7XG4gIG5leHREYWlseUZvcmVjYXN0LmFwcGVuZENoaWxkKG5leHREYWlseUZvcmVjYXN0V2luZENvbnRhaW5lcik7XG4gIGZvcmVDYXN0RGFpbHkuYXBwZW5kQ2hpbGQobmV4dERhaWx5Rm9yZWNhc3QpO1xufVxuXG5mdW5jdGlvbiBzaG93SG91cmx5Rm9yZWNhc3QoKSB7XG4gIGNvbnN0IGRhaWx5Rm9yZWNhc3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGFpbHktZm9yZWNhc3QtYnV0dG9uJyk7XG4gIGNvbnN0IGhvdXJseUZvcmVjYXN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hvdXJseS1mb3JlY2FzdC1idXR0b24nKTtcbiAgY29uc3QgZm9yZWNhc3REYWlseSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JlY2FzdC1kYWlseScpO1xuICBjb25zdCBmb3JlY2FzdEhvdXJseSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JlY2FzdC1ob3VybHknKTtcblxuICBpZiAoZGFpbHlGb3JlY2FzdEJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2RhaWx5LWZvcmVjYXN0LWJ1dHRvbi1vbicpKSB7XG4gICAgZGFpbHlGb3JlY2FzdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdkYWlseS1mb3JlY2FzdC1idXR0b24tb24nKTtcbiAgICBkYWlseUZvcmVjYXN0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2RhaWx5LWZvcmVjYXN0LWJ1dHRvbi1vZmYnKTtcbiAgICBob3VybHlGb3JlY2FzdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdob3VybHktZm9yZWNhc3QtYnV0dG9uLW9uJyk7XG4gICAgaG91cmx5Rm9yZWNhc3RCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaG91cmx5LWZvcmVjYXN0LWJ1dHRvbi1vZmYnKTtcbiAgICBmb3JlY2FzdERhaWx5LmNsYXNzTGlzdC5yZW1vdmUoJ2ZvcmVjYXN0LWRhaWx5LW9uJyk7XG4gICAgZm9yZWNhc3REYWlseS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1kYWlseS1vZmYnKTtcbiAgICBmb3JlY2FzdEhvdXJseS5jbGFzc0xpc3QucmVtb3ZlKCdmb3JlY2FzdC1ob3VybHktb2ZmJyk7XG4gICAgZm9yZWNhc3RIb3VybHkuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtaG91cmx5LW9uJyk7XG4gIH0gZWxzZSBpZiAoaG91cmx5Rm9yZWNhc3RCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdob3VybHktZm9yZWNhc3QtYnV0dG9uLW9uJykpIHtcbiAgICByZXR1cm47XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNob3dEYWlseUZvcmVjYXN0KCkge1xuICBjb25zdCBkYWlseUZvcmVjYXN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RhaWx5LWZvcmVjYXN0LWJ1dHRvbicpO1xuICBjb25zdCBob3VybHlGb3JlY2FzdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNob3VybHktZm9yZWNhc3QtYnV0dG9uJyk7XG4gIGNvbnN0IGZvcmVjYXN0RGFpbHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9yZWNhc3QtZGFpbHknKTtcbiAgY29uc3QgZm9yZWNhc3RIb3VybHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9yZWNhc3QtaG91cmx5Jyk7XG5cbiAgaWYgKGRhaWx5Rm9yZWNhc3RCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdkYWlseS1mb3JlY2FzdC1idXR0b24tb24nKSkge1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmIChob3VybHlGb3JlY2FzdEJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2hvdXJseS1mb3JlY2FzdC1idXR0b24tb24nKSkge1xuICAgIGRhaWx5Rm9yZWNhc3RCdXR0b24uY2xhc3NMaXN0LmFkZCgnZGFpbHktZm9yZWNhc3QtYnV0dG9uLW9uJyk7XG4gICAgZGFpbHlGb3JlY2FzdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdkYWlseS1mb3JlY2FzdC1idXR0b24tb2ZmJyk7XG4gICAgaG91cmx5Rm9yZWNhc3RCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaG91cmx5LWZvcmVjYXN0LWJ1dHRvbi1vbicpO1xuICAgIGhvdXJseUZvcmVjYXN0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hvdXJseS1mb3JlY2FzdC1idXR0b24tb2ZmJyk7XG4gICAgZm9yZWNhc3REYWlseS5jbGFzc0xpc3QuYWRkKCdmb3JlY2FzdC1kYWlseS1vbicpO1xuICAgIGZvcmVjYXN0RGFpbHkuY2xhc3NMaXN0LnJlbW92ZSgnZm9yZWNhc3QtZGFpbHktb2ZmJyk7XG4gICAgZm9yZWNhc3RIb3VybHkuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtaG91cmx5LW9mZicpO1xuICAgIGZvcmVjYXN0SG91cmx5LmNsYXNzTGlzdC5yZW1vdmUoJ2ZvcmVjYXN0LWhvdXJseS1vbicpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybjtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVQcmV2aW91c0luZm9ybWF0aW9uKCkge1xuICBjb25zdCBsb2NhdGlvbkluZm9ybWF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvY2F0aW9uLWluZm9ybWF0aW9uJyk7XG4gIGNvbnN0IGxvY2F0aW9uRXh0cmFJbmZvcm1hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2NhdGlvbi1leHRyYS1pbmZvcm1hdGlvbicpO1xuICBjb25zdCBmb3JlY2FzdEhvdXJseSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JlY2FzdC1ob3VybHknKTtcbiAgY29uc3QgZm9yZWNhc3REYWlseSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JlY2FzdC1kYWlseScpO1xuXG4gIHJlbW92ZUFsbENoaWxkTm9kZXMobG9jYXRpb25JbmZvcm1hdGlvbik7XG4gIHJlbW92ZUFsbENoaWxkTm9kZXMobG9jYXRpb25FeHRyYUluZm9ybWF0aW9uKTtcbiAgcmVtb3ZlQWxsQ2hpbGROb2Rlcyhmb3JlY2FzdEhvdXJseSk7XG4gIHJlbW92ZUFsbENoaWxkTm9kZXMoZm9yZWNhc3REYWlseSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUFsbENoaWxkTm9kZXMocGFyZW50KSB7XG4gIHdoaWxlIChwYXJlbnQuZmlyc3RDaGlsZCkge1xuICAgIHBhcmVudC5yZW1vdmVDaGlsZChwYXJlbnQuZmlyc3RDaGlsZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hvd0ZhaHJlbmhlaXQoKSB7XG4gIGNvbnN0IGZhaHJlbmhlaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmFocmVuaGVpdC1idXR0b24nKTtcbiAgY29uc3QgY2Vsc2l1c0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjZWxzaXVzLWJ1dHRvbicpO1xuXG4gIC8vIGluZm9ybXMgdXNlciBvbiB3aGVuIHRvIGV4cGVjdCB0byBzZWUgdGhlIGNlbHNpdXMvZmFocmVuaGVpdCByZWFkaW5nIGNoYW5nZS4gSXQgb25seSBzaG93cyBpdCBvbmNlIHBlciBzZXNzaW9uXG4gIGxldCBmaXJzdEFsZXJ0ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnZmlyc3QtYWxlcnQnKTtcbiAgaWYgKGZpcnN0QWxlcnQgPT09ICd0cnVlJykge1xuICAgIGFsZXJ0KCdXaGVuIGNoYW5naW5nIGJldHdlZW4gY2Vsc2l1cyBhbmQgZmFocmVuaGVpdCwgdGhlIHRlbXBlcmF0dXJlIHJlYWRpbmdzIHdpbGwgY2hhbmdlIG9uIHlvdXIgbmV4dCBzZWFyY2gnKTtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdmaXJzdC1hbGVydCcsICdmYWxzZScpO1xuICB9XG5cbiAgaWYgKGZhaHJlbmhlaXRCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdmYWhyZW5oZWl0LW9uJykpIHtcbiAgICByZXR1cm47XG4gIH0gZWxzZSBpZiAoZmFocmVuaGVpdEJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2ZhaHJlbmhlaXQtb2ZmJykpIHtcbiAgICBmYWhyZW5oZWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhaHJlbmhlaXQtb2ZmJyk7XG4gICAgZmFocmVuaGVpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdmYWhyZW5oZWl0LW9uJyk7XG4gICAgY2Vsc2l1c0J1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdjZWxzaXVzLW9uJyk7XG4gICAgY2Vsc2l1c0J1dHRvbi5jbGFzc0xpc3QuYWRkKCdjZWxzaXVzLW9mZicpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybjtcbiAgfVxufVxuXG5mdW5jdGlvbiBzaG93Q2Vsc2l1cygpIHtcbiAgY29uc3QgZmFocmVuaGVpdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmYWhyZW5oZWl0LWJ1dHRvbicpO1xuICBjb25zdCBjZWxzaXVzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NlbHNpdXMtYnV0dG9uJyk7XG5cbiAgLy8gaW5mb3JtcyB1c2VyIG9uIHdoZW4gdG8gZXhwZWN0IHRvIHNlZSB0aGUgY2Vsc2l1cy9mYWhyZW5oZWl0IHJlYWRpbmcgY2hhbmdlLiBJdCBvbmx5IHNob3dzIGl0IG9uY2UgcGVyIHNlc3Npb25cbiAgbGV0IGZpcnN0QWxlcnQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdmaXJzdC1hbGVydCcpO1xuICBpZiAoZmlyc3RBbGVydCA9PT0gJ3RydWUnKSB7XG4gICAgYWxlcnQoJ1doZW4gY2hhbmdpbmcgYmV0d2VlbiBjZWxzaXVzIGFuZCBmYWhyZW5oZWl0LCB0aGUgdGVtcGVyYXR1cmUgcmVhZGluZ3Mgd2lsbCBjaGFuZ2Ugb24geW91ciBuZXh0IHNlYXJjaCcpO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2ZpcnN0LWFsZXJ0JywgJ2ZhbHNlJyk7XG4gIH1cbiAgXG4gIGlmIChjZWxzaXVzQnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnY2Vsc2l1cy1vbicpKSB7XG4gICAgcmV0dXJuO1xuICB9IGVsc2UgaWYgKGNlbHNpdXNCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxzaXVzLW9mZicpKSB7XG4gICAgY2Vsc2l1c0J1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdjZWxzaXVzLW9mZicpO1xuICAgIGNlbHNpdXNCdXR0b24uY2xhc3NMaXN0LmFkZCgnY2Vsc2l1cy1vbicpO1xuICAgIGZhaHJlbmhlaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnZmFocmVuaGVpdC1vZmYnKTtcbiAgICBmYWhyZW5oZWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhaHJlbmhlaXQtb24nKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm47XG4gIH1cbn1cblxuZnVuY3Rpb24gZmFocmVuaGVpdFRvQ2Vsc2l1cyhudW1iZXIpIHtcbiAgbGV0IHRvdGFsID0gKG51bWJlci0zMikgKiA1LzlcbiAgbGV0IHJvdW5kZWQgPSBNYXRoLnJvdW5kKHRvdGFsICogMTApIC8gMTA7XG4gIG51bWJlciA9IHJvdW5kZWQ7XG4gIHJldHVybiBudW1iZXI7XG59IiwiZXhwb3J0IHtcbiAgbG9hZE1lYXN1cmVtZW50QWxlcnRcbn1cblxuZnVuY3Rpb24gbG9hZE1lYXN1cmVtZW50QWxlcnQoKSB7XG4gIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2ZpcnN0LWFsZXJ0JywgJ3RydWUnKTtcbn0iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9pbWdzL21vdW50YWluLWxha2UuanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiLi9zdmdzL3NlYXJjaC5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUZyZWRva2E6d2dodEAzMDAmZmFtaWx5PVJvYm90bytNb25vOndnaHRAMzAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byBNb25vJywgbW9ub3NwYWNlLCAnRnJlZG9rYScsIHNhbnMtc2VyaWY7XFxufVxcblxcbiNiYWNrZ3JvdW5kIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIik7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuI2hlYWRlciB7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwdmg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuI2hlYWRlci1sZWZ0IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogNTB2dztcXG4gIGhlaWdodDogMTB2aDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbiNoZWFkZXItdGl0bGUtZmlyc3Qge1xcbiAgcGFkZGluZy1sZWZ0OiA0JTtcXG4gIGZvbnQtc2l6ZTogMi41ZW07XFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcbiAgY29sb3I6ICNmM2FjNGM7XFxufVxcblxcbiNoZWFkZXItdGl0bGUtc2Vjb25kIHtcXG4gIGZvbnQtc2l6ZTogMi41ZW07XFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcbiAgY29sb3I6ICM0MzhjY2M7XFxufVxcblxcbiNoZWFkZXItaWNvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDRlbTtcXG4gIGhlaWdodDogNGVtO1xcbiAgcGFkZGluZy1sZWZ0OiA0JTtcXG59XFxuXFxuI2hlYWRlci1yaWdodCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDUwdnc7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xcbiAgcGFkZGluZy1yaWdodDogNCU7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5sYWJlbCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbmxhYmVsOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDEwcHg7XFxuICB0b3A6IDA7XFxuICBib3R0b206IDA7XFxuICB3aWR0aDogMS41ZW07XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fICsgXCIpIGNlbnRlciAvIGNvbnRhaW4gbm8tcmVwZWF0O1xcbiAgZmlsdGVyOiBpbnZlcnQoNzklKSBzZXBpYSg3MiUpIHNhdHVyYXRlKDkxMyUpIGh1ZS1yb3RhdGUoMzIzZGVnKSBicmlnaHRuZXNzKDEwMSUpIGNvbnRyYXN0KDkxJSk7XFxufVxcblxcbiNzZWFyY2gtYmFyLWlucHV0IHtcXG4gIHdpZHRoOiAxNXZ3O1xcbiAgaGVpZ2h0OiA1dmg7XFxuICBmb250LXNpemU6IDEuNWVtO1xcbiAgcGFkZGluZy1sZWZ0OiAxNiU7XFxuICBjb2xvcjogIzQzOGNjYztcXG59XFxuXFxuI2FwcCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiA5MHZoO1xcbiAgZmxleC1mbG93OiBjb2x1bW4gbm93cmFwO1xcblxcbn1cXG5cXG4jYXBwLXRvcCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgaGVpZ2h0OiA1MHZoO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbn1cXG5cXG4jYXBwLXRvcC1sZWZ0IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogNDV2dztcXG4gIGhlaWdodDogNTB2aDtcXG59XFxuXFxuI2xvY2F0aW9uLWluZm9ybWF0aW9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogNDV2dztcXG4gIGhlaWdodDogNDB2aDtcXG4gIGZsZXgtZmxvdzogcm93IHdyYXA7XFxuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWFyZ2luLXRvcDogNSU7XFxuICBtYXJnaW4tbGVmdDogNSU7XFxufVxcblxcbiNjaXR5LWNvbnRhaW5lciwgI3dlYXRoZXItZGVzY3JpcHRpb24tY29udGFpbmVyLCAjd2VhdGhlci10ZW1wZXJhdHVyZS1jb250YWluZXIsICN0b2RheXMtZGF0ZS1jb250YWluZXIsICN0b2RheXMtdGltZS1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiA0NXZ3O1xcbiAgaGVpZ2h0OiA1dmg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MCwgMjQyLCAyNDAsIDAuOSk7XFxuICBtYXJnaW46IDA7XFxuICB3aWR0aDogNDB2dztcXG4gIHBhZGRpbmc6IDIlO1xcbn1cXG5cXG4jY2l0eS1zdmcsICN3ZWF0aGVyLWRlc2NyaXB0aW9uLXN2ZywgI3dlYXRoZXItdGVtcGVyYXR1cmUtc3ZnLCAjdG9kYXlzLWRhdGUtc3ZnLCAjdG9kYXlzLXRpbWUtc3ZnIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogMi41ZW07XFxuICBoZWlnaHQ6IDIuNWVtO1xcbiAgZmlsdGVyOiBpbnZlcnQoNzklKSBzZXBpYSg3MiUpIHNhdHVyYXRlKDkxMyUpIGh1ZS1yb3RhdGUoMzIzZGVnKSBicmlnaHRuZXNzKDEwMSUpIGNvbnRyYXN0KDkxJSk7XFxuICBwYWRkaW5nLXJpZ2h0OiA1JTtcXG59XFxuXFxuI2NpdHktbmFtZSwgI3dlYXRoZXItdGVtcGVyYXR1cmUsICN0b2RheXMtdGltZSwgI3dlYXRoZXItZGVzY3JpcHRpb24sICN0b2RheXMtZGF0ZSB7XFxuICBmb250LXNpemU6IDJlbTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxuICBjb2xvcjogI2YzYWM0YztcXG59XFxuXFxuI2FwcC10b3AtcmlnaHQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiA0NXZ3O1xcbiAgaGVpZ2h0OiA1MHZoO1xcbn1cXG5cXG4jbG9jYXRpb24tZXh0cmEtaW5mb3JtYXRpb24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiA0NXZ3O1xcbiAgaGVpZ2h0OiA0MHZoO1xcbiAgZmxleC1mbG93OiByb3cgd3JhcDtcXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBtYXJnaW4tdG9wOiA1JTtcXG4gIG1hcmdpbi1sZWZ0OiAxNi41JTtcXG59XFxuXFxuI3dlYXRoZXItZmVlbHMtbGlrZS1jb250YWluZXIsICN3ZWF0aGVyLWh1bWlkaXR5LWNvbnRhaW5lciwgI3dlYXRoZXItbWluLWNvbnRhaW5lciwgI3dlYXRoZXItbWF4LWNvbnRhaW5lciwgI3dpbmQtc3BlZWQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogNDV2dztcXG4gIGhlaWdodDogNXZoO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDAsIDI0MiwgMjQwLCAwLjkpO1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMiU7XFxufVxcblxcbiN3ZWF0aGVyLWZlZWxzLWxpa2Utc3ZnLCAjd2VhdGhlci1odW1pZGl0eS1zdmcsICN3ZWF0aGVyLW1pbi1zdmcsICN3ZWF0aGVyLW1heC1zdmcsICN3aW5kLXNwZWVkLXN2ZywgI25leHQtZGFpbHktZm9yZWNhc3Qtd2VhdGhlci10eXBlLXN2ZywgI25leHQtaG91cmx5LWZvcmVjYXN0LXdlYXRoZXItdHlwZS1zdmcge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiAyLjVlbTtcXG4gIGhlaWdodDogMi41ZW07XFxuICBmaWx0ZXI6IGludmVydCg1NCUpIHNlcGlhKDM0JSkgc2F0dXJhdGUoODYxJSkgaHVlLXJvdGF0ZSgxNjZkZWcpIGJyaWdodG5lc3MoODglKSBjb250cmFzdCg4OCUpO1xcbiAgcGFkZGluZy1yaWdodDogNSU7XFxufVxcblxcbiN3ZWF0aGVyLWZlZWxzLWxpa2UsICN3ZWF0aGVyLWh1bWlkaXR5LCAjd2VhdGhlci1taW4sICN3ZWF0aGVyLW1heCwgI3dpbmQtc3BlZWQge1xcbiAgZm9udC1zaXplOiAyZW07XFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcbiAgY29sb3I6ICM0MzhjY2M7XFxufVxcblxcbiNhcHAtYm90dG9tIHtcXG4gIGRpc3BsYXk6ZmxleDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogNTB2aDtcXG4gIGZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcXG4gIGFsaWduLWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG59XFxuXFxuI2luZm9ybWF0aW9uLXN3aXRjaGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogMTB2dztcXG4gIGhlaWdodDogMy41dmg7XFxuICBmbGV4LWZsb3c6IHJvdyBub3dyYXA7XFxuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgcGFkZGluZy1sZWZ0OiAyLjc1JTtcXG59XFxuXFxuI2RhaWx5LWZvcmVjYXN0LWJ1dHRvbiwgI2hvdXJseS1mb3JlY2FzdC1idXR0b24sICNmYWhyZW5oZWl0LWJ1dHRvbiwgI2NlbHNpdXMtYnV0dG9uIHtcXG4gIHdpZHRoOiA4dnc7XFxuICBoZWlnaHQ6IDMuNXZoO1xcbiAgZm9udC1zaXplOiAxZW07XFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcbiAgYm9yZGVyLXJhZGl1czogMTAlO1xcbiAgbWFyZ2luLWxlZnQ6IDMlO1xcbn1cXG5cXG4jZmFocmVuaGVpdC1idXR0b24ge1xcbiAgbWFyZ2luLWxlZnQ6IDF2dztcXG59XFxuXFxuLmRhaWx5LWZvcmVjYXN0LWJ1dHRvbi1vZmYge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MCwgMjQyLCAyNDAsIDAuOSk7XFxuICBjb2xvcjogI2YzYWM0YztcXG59XFxuXFxuLmRhaWx5LWZvcmVjYXN0LWJ1dHRvbi1vbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjNhYzRjO1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiKDI0MCwgMjQyLCAyNDAsIDAuOSk7XFxuICBjb2xvcjogcmdiKDI0MCwgMjQyLCAyNDAsIDAuOCk7O1xcbn1cXG5cXG4uaG91cmx5LWZvcmVjYXN0LWJ1dHRvbi1vZmYge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MCwgMjQyLCAyNDAsIDAuOSk7XFxuICBjb2xvcjogIzQzOGNjYztcXG59XFxuXFxuLmhvdXJseS1mb3JlY2FzdC1idXR0b24tb24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQzOGNjYztcXG4gIGNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC44KTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYigyNDAsIDI0MiwgMjQwLCAwLjkpO1xcbn1cXG5cXG4uY2Vsc2l1cy1vZmYge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MCwgMjQyLCAyNDAsIDAuOSk7XFxuICBjb2xvcjogIzQzOGNjYztcXG59XFxuXFxuLmZhaHJlbmhlaXQtb2ZmIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDAsIDI0MiwgMjQwLCAwLjkpO1xcbiAgY29sb3I6ICNmM2FjNGM7XFxufVxcblxcbi5jZWxzaXVzLW9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0MzhjY2M7XFxuICBjb2xvcjogcmdiKDI0MCwgMjQyLCAyNDAsIDAuOCk7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG59XFxuXFxuLmZhaHJlbmhlaXQtb24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YzYWM0YztcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYigyNDAsIDI0MiwgMjQwLCAwLjkpO1xcbiAgY29sb3I6IHJnYigyNDAsIDI0MiwgMjQwLCAwLjgpOztcXG59XFxuXFxuLmZvcmVjYXN0LWhvdXJseS1vZmYge1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHdpZHRoOiAwO1xcbiAgaGVpZ2h0OiAwO1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4uZm9yZWNhc3QtZGFpbHktb2ZmIHtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICB3aWR0aDogMDtcXG4gIGhlaWdodDogMDtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuLmZvcmVjYXN0LWRhaWx5LW9uIHtcXG4gIHZpc2liaWxpdHk6IHZpc2libGU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAzNi41dmg7XFxuICBmbGV4LWZsb3c6IHJvdyBub3dyYXA7XFxuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG4ubmV4dC1kYWlseS1mb3JlY2FzdC1vcGVuIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWZsb3c6IGNvbHVtbiBub3dyYXA7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgd2lkdGg6IDE4dnc7XFxuICBoZWlnaHQ6IDMwdmg7XFxuICBmb250LXNpemU6IDAuOGVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MCwgMjQyLCAyNDAsIDAuOSk7XFxuICBtYXJnaW46IDAuNSU7XFxufVxcblxcbi5mb3JlY2FzdC1kYWlseS1vcGVuIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWZsb3c6IHJvdyBub3dyYXA7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgd2lkdGg6IDE4dnc7XFxuICBoZWlnaHQ6IDV2aDtcXG59XFxuXFxuLmZvcmVjYXN0LWRhaWx5LWl0ZW0tb3BlbiB7XFxuICBtYXJnaW46IDA7XFxuICBtYXJnaW4tbGVmdDogNSU7XFxuICBjb2xvcjogIzQzOGNjYztcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxufVxcblxcbiNuZXh0LWRhaWx5LWZvcmVjYXN0LWRhdGUtc3ZnLCAjbmV4dC1kYWlseS1mb3JlY2FzdC10aW1lLXN2ZywgI25leHQtZGFpbHktZm9yZWNhc3QtdGVtcC1zdmcsICNuZXh0LWRhaWx5LWZvcmVjYXN0LWh1bWlkaXR5LXN2ZywgI25leHQtZGFpbHktZm9yZWNhc3Qtd2VhdGhlci10eXBlLXN2ZywgI25leHQtZGFpbHktZm9yZWNhc3Qtd2luZC1zdmcge1xcbiAgZmlsdGVyOiBpbnZlcnQoNzklKSBzZXBpYSg3MiUpIHNhdHVyYXRlKDkxMyUpIGh1ZS1yb3RhdGUoMzIzZGVnKSBicmlnaHRuZXNzKDEwMSUpIGNvbnRyYXN0KDkxJSk7XFxufVxcblxcbi5mb3JlY2FzdC1ob3VybHktb24ge1xcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDM2LjV2aDtcXG4gIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxufVxcblxcbiNuZXh0LWhvdXJseS1mb3JlY2FzdCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1mbG93OiBjb2x1bW4gbm93cmFwO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHdpZHRoOiAxMy41dnc7XFxuICBoZWlnaHQ6IDMydmg7XFxuICBmb250LXNpemU6IDAuODVlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDAsIDI0MiwgMjQwLCAwLjkpO1xcbiAgbWFyZ2luOiAwLjI1JTtcXG59XFxuXFxuLmZvcmVjYXN0LWhvdXJseS1vcGVuIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWZsb3c6IHJvdyBub3dyYXA7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgd2lkdGg6IDEydnc7XFxuICBoZWlnaHQ6IDV2aDtcXG59XFxuXFxuLmZvcmVjYXN0LWhvdXJseS1pdGVtLW9wZW4ge1xcbiAgbWFyZ2luOiAwO1xcbiAgbWFyZ2luLWxlZnQ6IDUlO1xcbiAgY29sb3I6ICM0MzhjY2M7XFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcbn1cXG5cXG4jbmV4dC1ob3VybHktZm9yZWNhc3QtZGF0ZS1zdmcsICNuZXh0LWhvdXJseS1mb3JlY2FzdC10aW1lLXN2ZywgI25leHQtaG91cmx5LWZvcmVjYXN0LXRlbXAtc3ZnLCAjbmV4dC1ob3VybHktZm9yZWNhc3QtaHVtaWRpdHktc3ZnLCAjbmV4dC1ob3VybHktZm9yZWNhc3Qtd2VhdGhlci10eXBlLXN2ZywgI25leHQtaG91cmx5LWZvcmVjYXN0LXdpbmQtc3ZnIHtcXG4gIGZpbHRlcjogaW52ZXJ0KDc5JSkgc2VwaWEoNzIlKSBzYXR1cmF0ZSg5MTMlKSBodWUtcm90YXRlKDMyM2RlZykgYnJpZ2h0bmVzcygxMDElKSBjb250cmFzdCg5MSUpO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUVBO0VBQ0UsNERBQTREO0FBQzlEOztBQUVBO0VBQ0UseURBQWlEO0VBQ2pELHNCQUFzQjtFQUN0QixZQUFZO0VBQ1osYUFBYTtBQUNmOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFlBQVk7RUFDWixhQUFhO0VBQ2IsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7RUFDWCxZQUFZO0VBQ1osbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNo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dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9RnJlZG9rYTp3Z2h0QDMwMCZmYW1pbHk9Um9ib3RvK01vbm86d2dodEAzMDAmZGlzcGxheT1zd2FwJyk7XFxuXFxuYm9keSB7XFxuICBmb250LWZhbWlseTogJ1JvYm90byBNb25vJywgbW9ub3NwYWNlLCAnRnJlZG9rYScsIHNhbnMtc2VyaWY7XFxufVxcblxcbiNiYWNrZ3JvdW5kIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnLi9pbWdzL21vdW50YWluLWxha2UuanBnJyk7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuI2hlYWRlciB7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwdmg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuI2hlYWRlci1sZWZ0IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogNTB2dztcXG4gIGhlaWdodDogMTB2aDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbiNoZWFkZXItdGl0bGUtZmlyc3Qge1xcbiAgcGFkZGluZy1sZWZ0OiA0JTtcXG4gIGZvbnQtc2l6ZTogMi41ZW07XFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcbiAgY29sb3I6ICNmM2FjNGM7XFxufVxcblxcbiNoZWFkZXItdGl0bGUtc2Vjb25kIHtcXG4gIGZvbnQtc2l6ZTogMi41ZW07XFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcbiAgY29sb3I6ICM0MzhjY2M7XFxufVxcblxcbiNoZWFkZXItaWNvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDRlbTtcXG4gIGhlaWdodDogNGVtO1xcbiAgcGFkZGluZy1sZWZ0OiA0JTtcXG59XFxuXFxuI2hlYWRlci1yaWdodCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDUwdnc7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xcbiAgcGFkZGluZy1yaWdodDogNCU7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5sYWJlbCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbmxhYmVsOmJlZm9yZSB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDEwcHg7XFxuICB0b3A6IDA7XFxuICBib3R0b206IDA7XFxuICB3aWR0aDogMS41ZW07XFxuICBiYWNrZ3JvdW5kOiB1cmwoXFxcIi4vc3Zncy9zZWFyY2guc3ZnXFxcIikgY2VudGVyIC8gY29udGFpbiBuby1yZXBlYXQ7XFxuICBmaWx0ZXI6IGludmVydCg3OSUpIHNlcGlhKDcyJSkgc2F0dXJhdGUoOTEzJSkgaHVlLXJvdGF0ZSgzMjNkZWcpIGJyaWdodG5lc3MoMTAxJSkgY29udHJhc3QoOTElKTtcXG59XFxuXFxuI3NlYXJjaC1iYXItaW5wdXQge1xcbiAgd2lkdGg6IDE1dnc7XFxuICBoZWlnaHQ6IDV2aDtcXG4gIGZvbnQtc2l6ZTogMS41ZW07XFxuICBwYWRkaW5nLWxlZnQ6IDE2JTtcXG4gIGNvbG9yOiAjNDM4Y2NjO1xcbn1cXG5cXG4jYXBwIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDkwdmg7XFxuICBmbGV4LWZsb3c6IGNvbHVtbiBub3dyYXA7XFxuXFxufVxcblxcbiNhcHAtdG9wIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBoZWlnaHQ6IDUwdmg7XFxuICB3aWR0aDogMTAwdnc7XFxufVxcblxcbiNhcHAtdG9wLWxlZnQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiA0NXZ3O1xcbiAgaGVpZ2h0OiA1MHZoO1xcbn1cXG5cXG4jbG9jYXRpb24taW5mb3JtYXRpb24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiA0NXZ3O1xcbiAgaGVpZ2h0OiA0MHZoO1xcbiAgZmxleC1mbG93OiByb3cgd3JhcDtcXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBtYXJnaW4tdG9wOiA1JTtcXG4gIG1hcmdpbi1sZWZ0OiA1JTtcXG59XFxuXFxuI2NpdHktY29udGFpbmVyLCAjd2VhdGhlci1kZXNjcmlwdGlvbi1jb250YWluZXIsICN3ZWF0aGVyLXRlbXBlcmF0dXJlLWNvbnRhaW5lciwgI3RvZGF5cy1kYXRlLWNvbnRhaW5lciwgI3RvZGF5cy10aW1lLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDQ1dnc7XFxuICBoZWlnaHQ6IDV2aDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG4gIG1hcmdpbjogMDtcXG4gIHdpZHRoOiA0MHZ3O1xcbiAgcGFkZGluZzogMiU7XFxufVxcblxcbiNjaXR5LXN2ZywgI3dlYXRoZXItZGVzY3JpcHRpb24tc3ZnLCAjd2VhdGhlci10ZW1wZXJhdHVyZS1zdmcsICN0b2RheXMtZGF0ZS1zdmcsICN0b2RheXMtdGltZS1zdmcge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiAyLjVlbTtcXG4gIGhlaWdodDogMi41ZW07XFxuICBmaWx0ZXI6IGludmVydCg3OSUpIHNlcGlhKDcyJSkgc2F0dXJhdGUoOTEzJSkgaHVlLXJvdGF0ZSgzMjNkZWcpIGJyaWdodG5lc3MoMTAxJSkgY29udHJhc3QoOTElKTtcXG4gIHBhZGRpbmctcmlnaHQ6IDUlO1xcbn1cXG5cXG4jY2l0eS1uYW1lLCAjd2VhdGhlci10ZW1wZXJhdHVyZSwgI3RvZGF5cy10aW1lLCAjd2VhdGhlci1kZXNjcmlwdGlvbiwgI3RvZGF5cy1kYXRlIHtcXG4gIGZvbnQtc2l6ZTogMmVtO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG4gIGNvbG9yOiAjZjNhYzRjO1xcbn1cXG5cXG4jYXBwLXRvcC1yaWdodCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDQ1dnc7XFxuICBoZWlnaHQ6IDUwdmg7XFxufVxcblxcbiNsb2NhdGlvbi1leHRyYS1pbmZvcm1hdGlvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDQ1dnc7XFxuICBoZWlnaHQ6IDQwdmg7XFxuICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1hcmdpbi10b3A6IDUlO1xcbiAgbWFyZ2luLWxlZnQ6IDE2LjUlO1xcbn1cXG5cXG4jd2VhdGhlci1mZWVscy1saWtlLWNvbnRhaW5lciwgI3dlYXRoZXItaHVtaWRpdHktY29udGFpbmVyLCAjd2VhdGhlci1taW4tY29udGFpbmVyLCAjd2VhdGhlci1tYXgtY29udGFpbmVyLCAjd2luZC1zcGVlZC1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiA0NXZ3O1xcbiAgaGVpZ2h0OiA1dmg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MCwgMjQyLCAyNDAsIDAuOSk7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAyJTtcXG59XFxuXFxuI3dlYXRoZXItZmVlbHMtbGlrZS1zdmcsICN3ZWF0aGVyLWh1bWlkaXR5LXN2ZywgI3dlYXRoZXItbWluLXN2ZywgI3dlYXRoZXItbWF4LXN2ZywgI3dpbmQtc3BlZWQtc3ZnLCAjbmV4dC1kYWlseS1mb3JlY2FzdC13ZWF0aGVyLXR5cGUtc3ZnLCAjbmV4dC1ob3VybHktZm9yZWNhc3Qtd2VhdGhlci10eXBlLXN2ZyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDIuNWVtO1xcbiAgaGVpZ2h0OiAyLjVlbTtcXG4gIGZpbHRlcjogaW52ZXJ0KDU0JSkgc2VwaWEoMzQlKSBzYXR1cmF0ZSg4NjElKSBodWUtcm90YXRlKDE2NmRlZykgYnJpZ2h0bmVzcyg4OCUpIGNvbnRyYXN0KDg4JSk7XFxuICBwYWRkaW5nLXJpZ2h0OiA1JTtcXG59XFxuXFxuI3dlYXRoZXItZmVlbHMtbGlrZSwgI3dlYXRoZXItaHVtaWRpdHksICN3ZWF0aGVyLW1pbiwgI3dlYXRoZXItbWF4LCAjd2luZC1zcGVlZCB7XFxuICBmb250LXNpemU6IDJlbTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxuICBjb2xvcjogIzQzOGNjYztcXG59XFxuXFxuI2FwcC1ib3R0b20ge1xcbiAgZGlzcGxheTpmbGV4O1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiA1MHZoO1xcbiAgZmxleC1mbG93OiBjb2x1bW4gbm93cmFwO1xcbiAgYWxpZ24tY29udGVudDogZmxleC1zdGFydDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG4jaW5mb3JtYXRpb24tc3dpdGNoZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiAxMHZ3O1xcbiAgaGVpZ2h0OiAzLjV2aDtcXG4gIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBwYWRkaW5nLWxlZnQ6IDIuNzUlO1xcbn1cXG5cXG4jZGFpbHktZm9yZWNhc3QtYnV0dG9uLCAjaG91cmx5LWZvcmVjYXN0LWJ1dHRvbiwgI2ZhaHJlbmhlaXQtYnV0dG9uLCAjY2Vsc2l1cy1idXR0b24ge1xcbiAgd2lkdGg6IDh2dztcXG4gIGhlaWdodDogMy41dmg7XFxuICBmb250LXNpemU6IDFlbTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxuICBib3JkZXItcmFkaXVzOiAxMCU7XFxuICBtYXJnaW4tbGVmdDogMyU7XFxufVxcblxcbiNmYWhyZW5oZWl0LWJ1dHRvbiB7XFxuICBtYXJnaW4tbGVmdDogMXZ3O1xcbn1cXG5cXG4uZGFpbHktZm9yZWNhc3QtYnV0dG9uLW9mZiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG4gIGNvbG9yOiAjZjNhYzRjO1xcbn1cXG5cXG4uZGFpbHktZm9yZWNhc3QtYnV0dG9uLW9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmM2FjNGM7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG4gIGNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC44KTs7XFxufVxcblxcbi5ob3VybHktZm9yZWNhc3QtYnV0dG9uLW9mZiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG4gIGNvbG9yOiAjNDM4Y2NjO1xcbn1cXG5cXG4uaG91cmx5LWZvcmVjYXN0LWJ1dHRvbi1vbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDM4Y2NjO1xcbiAgY29sb3I6IHJnYigyNDAsIDI0MiwgMjQwLCAwLjgpO1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiKDI0MCwgMjQyLCAyNDAsIDAuOSk7XFxufVxcblxcbi5jZWxzaXVzLW9mZiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG4gIGNvbG9yOiAjNDM4Y2NjO1xcbn1cXG5cXG4uZmFocmVuaGVpdC1vZmYge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MCwgMjQyLCAyNDAsIDAuOSk7XFxuICBjb2xvcjogI2YzYWM0YztcXG59XFxuXFxuLmNlbHNpdXMtb24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQzOGNjYztcXG4gIGNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC44KTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYigyNDAsIDI0MiwgMjQwLCAwLjkpO1xcbn1cXG5cXG4uZmFocmVuaGVpdC1vbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjNhYzRjO1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiKDI0MCwgMjQyLCAyNDAsIDAuOSk7XFxuICBjb2xvcjogcmdiKDI0MCwgMjQyLCAyNDAsIDAuOCk7O1xcbn1cXG5cXG4uZm9yZWNhc3QtaG91cmx5LW9mZiB7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICBkaXNwbGF5OiBub25lO1xcbiAgd2lkdGg6IDA7XFxuICBoZWlnaHQ6IDA7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi5mb3JlY2FzdC1kYWlseS1vZmYge1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHdpZHRoOiAwO1xcbiAgaGVpZ2h0OiAwO1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4uZm9yZWNhc3QtZGFpbHktb24ge1xcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDM2LjV2aDtcXG4gIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxufVxcblxcbi5uZXh0LWRhaWx5LWZvcmVjYXN0LW9wZW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZmxvdzogY29sdW1uIG5vd3JhcDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTh2dztcXG4gIGhlaWdodDogMzB2aDtcXG4gIGZvbnQtc2l6ZTogMC44ZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQwLCAyNDIsIDI0MCwgMC45KTtcXG4gIG1hcmdpbjogMC41JTtcXG59XFxuXFxuLmZvcmVjYXN0LWRhaWx5LW9wZW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTh2dztcXG4gIGhlaWdodDogNXZoO1xcbn1cXG5cXG4uZm9yZWNhc3QtZGFpbHktaXRlbS1vcGVuIHtcXG4gIG1hcmdpbjogMDtcXG4gIG1hcmdpbi1sZWZ0OiA1JTtcXG4gIGNvbG9yOiAjNDM4Y2NjO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG59XFxuXFxuI25leHQtZGFpbHktZm9yZWNhc3QtZGF0ZS1zdmcsICNuZXh0LWRhaWx5LWZvcmVjYXN0LXRpbWUtc3ZnLCAjbmV4dC1kYWlseS1mb3JlY2FzdC10ZW1wLXN2ZywgI25leHQtZGFpbHktZm9yZWNhc3QtaHVtaWRpdHktc3ZnLCAjbmV4dC1kYWlseS1mb3JlY2FzdC13ZWF0aGVyLXR5cGUtc3ZnLCAjbmV4dC1kYWlseS1mb3JlY2FzdC13aW5kLXN2ZyB7XFxuICBmaWx0ZXI6IGludmVydCg3OSUpIHNlcGlhKDcyJSkgc2F0dXJhdGUoOTEzJSkgaHVlLXJvdGF0ZSgzMjNkZWcpIGJyaWdodG5lc3MoMTAxJSkgY29udHJhc3QoOTElKTtcXG59XFxuXFxuLmZvcmVjYXN0LWhvdXJseS1vbiB7XFxuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMzYuNXZoO1xcbiAgZmxleC1mbG93OiByb3cgbm93cmFwO1xcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG59XFxuXFxuI25leHQtaG91cmx5LWZvcmVjYXN0IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWZsb3c6IGNvbHVtbiBub3dyYXA7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgd2lkdGg6IDEzLjV2dztcXG4gIGhlaWdodDogMzJ2aDtcXG4gIGZvbnQtc2l6ZTogMC44NWVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MCwgMjQyLCAyNDAsIDAuOSk7XFxuICBtYXJnaW46IDAuMjUlO1xcbn1cXG5cXG4uZm9yZWNhc3QtaG91cmx5LW9wZW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZmxvdzogcm93IG5vd3JhcDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTJ2dztcXG4gIGhlaWdodDogNXZoO1xcbn1cXG5cXG4uZm9yZWNhc3QtaG91cmx5LWl0ZW0tb3BlbiB7XFxuICBtYXJnaW46IDA7XFxuICBtYXJnaW4tbGVmdDogNSU7XFxuICBjb2xvcjogIzQzOGNjYztcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxufVxcblxcbiNuZXh0LWhvdXJseS1mb3JlY2FzdC1kYXRlLXN2ZywgI25leHQtaG91cmx5LWZvcmVjYXN0LXRpbWUtc3ZnLCAjbmV4dC1ob3VybHktZm9yZWNhc3QtdGVtcC1zdmcsICNuZXh0LWhvdXJseS1mb3JlY2FzdC1odW1pZGl0eS1zdmcsICNuZXh0LWhvdXJseS1mb3JlY2FzdC13ZWF0aGVyLXR5cGUtc3ZnLCAjbmV4dC1ob3VybHktZm9yZWNhc3Qtd2luZC1zdmcge1xcbiAgZmlsdGVyOiBpbnZlcnQoNzklKSBzZXBpYSg3MiUpIHNhdHVyYXRlKDkxMyUpIGh1ZS1yb3RhdGUoMzIzZGVnKSBicmlnaHRuZXNzKDEwMSUpIGNvbnRyYXN0KDkxJSk7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7IC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfSAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG5cblxuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCJ2YXIgbWFwID0ge1xuXHRcIi4vY2xlYXItc2tpZXMuanBnXCI6IFwiLi9zcmMvaW1ncy9jbGVhci1za2llcy5qcGdcIixcblx0XCIuL2Nsb3VkeS5qcGdcIjogXCIuL3NyYy9pbWdzL2Nsb3VkeS5qcGdcIixcblx0XCIuL2ZvZ2d5LmpwZ1wiOiBcIi4vc3JjL2ltZ3MvZm9nZ3kuanBnXCIsXG5cdFwiLi9saWdodG5pbmcuanBnXCI6IFwiLi9zcmMvaW1ncy9saWdodG5pbmcuanBnXCIsXG5cdFwiLi9tb3VudGFpbi1sYWtlLmpwZ1wiOiBcIi4vc3JjL2ltZ3MvbW91bnRhaW4tbGFrZS5qcGdcIixcblx0XCIuL3JhaW5pbmcuanBnXCI6IFwiLi9zcmMvaW1ncy9yYWluaW5nLmpwZ1wiLFxuXHRcIi4vc25vd3kuanBnXCI6IFwiLi9zcmMvaW1ncy9zbm93eS5qcGdcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9zcmMvaW1ncyBzeW5jIHJlY3Vyc2l2ZSBcXFxcLihwbmclN0NzdmclN0NqcGclN0NnaWYpJFwiOyIsInZhciBtYXAgPSB7XG5cdFwiLi9kYXRlLnN2Z1wiOiBcIi4vc3JjL3N2Z3MvZGF0ZS5zdmdcIixcblx0XCIuL2ZlZWxzLWxpa2Uuc3ZnXCI6IFwiLi9zcmMvc3Zncy9mZWVscy1saWtlLnN2Z1wiLFxuXHRcIi4vaHVtaWRpdHkuc3ZnXCI6IFwiLi9zcmMvc3Zncy9odW1pZGl0eS5zdmdcIixcblx0XCIuL2xvY2F0aW9uLnN2Z1wiOiBcIi4vc3JjL3N2Z3MvbG9jYXRpb24uc3ZnXCIsXG5cdFwiLi9sb2dvLnBuZ1wiOiBcIi4vc3JjL3N2Z3MvbG9nby5wbmdcIixcblx0XCIuL3NlYXJjaC5zdmdcIjogXCIuL3NyYy9zdmdzL3NlYXJjaC5zdmdcIixcblx0XCIuL3RlbXAtbWF4LnN2Z1wiOiBcIi4vc3JjL3N2Z3MvdGVtcC1tYXguc3ZnXCIsXG5cdFwiLi90ZW1wLW1pbi5zdmdcIjogXCIuL3NyYy9zdmdzL3RlbXAtbWluLnN2Z1wiLFxuXHRcIi4vdGVtcC5zdmdcIjogXCIuL3NyYy9zdmdzL3RlbXAuc3ZnXCIsXG5cdFwiLi90aW1lLnN2Z1wiOiBcIi4vc3JjL3N2Z3MvdGltZS5zdmdcIixcblx0XCIuL3dlYXRoZXIuc3ZnXCI6IFwiLi9zcmMvc3Zncy93ZWF0aGVyLnN2Z1wiLFxuXHRcIi4vd2luZC5zdmdcIjogXCIuL3NyYy9zdmdzL3dpbmQuc3ZnXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vc3JjL3N2Z3Mgc3luYyByZWN1cnNpdmUgXFxcXC4ocG5nJTdDc3ZnJTdDanBnJTdDZ2lmKSRcIjsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5yZXF1aXJlLmNvbnRleHQoXCIvc3JjL2ltZ3MvXCIsIHRydWUsIC9cXC4ocG5nfHN2Z3xqcGd8Z2lmKSQvKTtcbnJlcXVpcmUuY29udGV4dChcIi9zcmMvc3Zncy9cIiwgdHJ1ZSwgL1xcLihwbmd8c3ZnfGpwZ3xnaWYpJC8pO1xuXG5pbXBvcnQgeyBcbiAgZ2V0Q2l0eSxcbiAgcmVtb3ZlUHJldmlvdXNJbmZvcm1hdGlvbixcbiAgc2hvd0hvdXJseUZvcmVjYXN0LFxuICBzaG93RGFpbHlGb3JlY2FzdCxcbiAgc2hvd0ZhaHJlbmhlaXQsXG4gIHNob3dDZWxzaXVzXG4gfSBmcm9tICcuL3NjcmlwdHMvYXBwLmpzJztcblxuaW1wb3J0IHsgbG9hZE1lYXN1cmVtZW50QWxlcnQgfSBmcm9tICcuL3NjcmlwdHMvc2Vzc2lvblN0b3JhZ2UuanMnO1xuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICBnZXRDaXR5KCk7XG4gIGxvYWRNZWFzdXJlbWVudEFsZXJ0KCk7XG59XG5cbihmdW5jdGlvbiBhdHRhY2hFdmVudExpc3RlbmVycygpIHtcbiAgY29uc3QgaG91cmx5QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hvdXJseS1mb3JlY2FzdC1idXR0b24nKTtcbiAgICBob3VybHlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93SG91cmx5Rm9yZWNhc3QpO1xuXG4gIGNvbnN0IGRhaWx5QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RhaWx5LWZvcmVjYXN0LWJ1dHRvbicpO1xuICAgIGRhaWx5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd0RhaWx5Rm9yZWNhc3QpO1xuXG4gIGNvbnN0IGZhaHJlbmhlaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmFocmVuaGVpdC1idXR0b24nKTtcbiAgICBmYWhyZW5oZWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd0ZhaHJlbmhlaXQpO1xuICBcbiAgY29uc3QgY2Vsc2l1c0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjZWxzaXVzLWJ1dHRvbicpO1xuICAgIGNlbHNpdXNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93Q2Vsc2l1cyk7XG5cbiAgY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWJhci1pbnB1dCcpO1xuICAgIHNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgcmVtb3ZlUHJldmlvdXNJbmZvcm1hdGlvbigpO1xuICAgICAgICBnZXRDaXR5KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSlcbn0pKCk7Il0sIm5hbWVzIjpbImdldENpdHkiLCJyZW1vdmVQcmV2aW91c0luZm9ybWF0aW9uIiwic2hvd0hvdXJseUZvcmVjYXN0Iiwic2hvd0RhaWx5Rm9yZWNhc3QiLCJzaG93RmFocmVuaGVpdCIsInNob3dDZWxzaXVzIiwicmV0cmlldmVkQ2l0eU5hbWUiLCJyZXRyaWV2ZWRDaXR5TGF0IiwicmV0cmlldmVkQ2l0eUxvbiIsImNvcnNCeXBhc3MiLCJzZWFyY2hlZENpdHkiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwidmFsdWUiLCJkZWZhdWx0Q2l0eSIsImxlbmd0aCIsImNpdHlTZWFyY2giLCJhcGkiLCJhbW91bnRUb1JldHJpZXZlIiwibGFuZ3VhZ2UiLCJhcGlLZXkiLCJzZWFyY2hDaXR5IiwicmVzcG9uc2UiLCJmZXRjaCIsIm1vZGUiLCJzZWFyY2hEYXRhIiwianNvbiIsImxvY2FsX25hbWVzIiwiZW4iLCJsYXQiLCJsb24iLCJnZXRUb2RheXNXZWF0aGVyIiwiZ2V0V2VhdGhlckZvcmVjYXN0IiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwiYWxlcnQiLCJ1bml0cyIsInNlYXJjaFdlYXRoZXIiLCJ0ZW1wIiwid2VhdGhlclR5cGUiLCJ3ZWF0aGVyIiwibWFpbiIsImRlc2NyaXB0aW9uIiwiY291bnRyeSIsInN5cyIsImZlZWxzTGlrZSIsImh1bWlkaXR5IiwidGVtcE1pbiIsInRlbXBNYXgiLCJ3aW5kIiwic3BlZWQiLCJjZWxzaXVzQnV0dG9uIiwicXVlcnlTZWxlY3RvciIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiZmFocmVuaGVpdFRvQ2Vsc2l1cyIsImZlZWxzX2xpa2UiLCJ0ZW1wX21pbiIsInRlbXBfbWF4IiwiYXBwZW5kQ3VycmVudFdlYXRoZXIiLCJmb3JlY2FzdExpc3QiLCJsaXN0IiwiYnVuZGxlRm9yZWNhc3REYXRhIiwidG9kYXkiLCJEYXRlIiwidG9EYXRlU3RyaW5nIiwidGltZSIsInRvTG9jYWxlVGltZVN0cmluZyIsImxvY2F0aW9uSW5mb3JtYXRpb24iLCJjaXR5Q29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImNpdHlTdmciLCJzcmMiLCJjaXR5IiwidGV4dENvbnRlbnQiLCJ3ZWF0aGVyRGVzY3JpcHRpb25Db250YWluZXIiLCJ3ZWF0aGVyRGVzY3JpcHRpb25TdmciLCJ3ZWF0aGVyRGVzY3JpcHRpb24iLCJ3ZWF0aGVyVGVtcGVyYXR1cmVDb250YWluZXIiLCJ3ZWF0aGVyVGVtcGVyYXR1cmVTdmciLCJ3ZWF0aGVyVGVtcGVyYXR1cmUiLCJ0b2RheXNEYXRlQ29udGFpbmVyIiwidG9kYXlzRGF0ZVN2ZyIsInRvZGF5c0RhdGUiLCJ0b2RheXNUaW1lQ29udGFpbmVyIiwidG9kYXlzVGltZVN2ZyIsInRvZGF5c1RpbWUiLCJhcHBlbmRDaGlsZCIsImxvY2F0aW9uRXh0cmFJbmZvcm1hdGlvbiIsIndlYXRoZXJGZWVsc0xpa2VDb250YWluZXIiLCJ3ZWF0aGVyRmVlbHNMaWtlU3ZnIiwid2VhdGhlckZlZWxzTGlrZSIsIndlYXRoZXJIdW1pZGl0eUNvbnRhaW5lciIsIndlYXRoZXJIdW1pZGl0eVN2ZyIsIndlYXRoZXJIdW1pZGl0eSIsIndlYXRoZXJNaW5Db250YWluZXIiLCJ3ZWF0aGVyTWluU3ZnIiwid2VhdGhlck1pbiIsIndlYXRoZXJNYXhDb250YWluZXIiLCJ3ZWF0aGVyTWF4U3ZnIiwid2VhdGhlck1heCIsIndpbmRTcGVlZENvbnRhaW5lciIsIndpbmRTcGVlZFN2ZyIsIndpbmRTcGVlZCIsImNvbnZlcnREYXRlIiwiZGF0ZSIsIm5leHQyMUhvdXJzIiwic2xpY2UiLCJmb3JFYWNoIiwiaXRlbSIsImR0X3R4dCIsImFwcGVuZEhvdXJseUZvcmVjYXN0IiwiZGFpbHlGb3JlY2FzdCIsIm5leHREYXkiLCJzZWNvbmREYXkiLCJ0aGlyZERheSIsImZvdXJ0aERheSIsImZpZnRoRGF5IiwicHVzaCIsImFwcGVuZERhaWx5Rm9yZWNhc3QiLCJmb3JlQ2FzdEhvdXJseSIsIm5leHRIb3VybHlGb3JlY2FzdCIsImFkZCIsIm5leHRIb3VybHlGb3JlY2FzdERhdGVDb250YWluZXIiLCJuZXh0SG91cmx5Rm9yZWNhc3REYXRlU3ZnIiwibmV4dEhvdXJseUZvcmVjYXN0RGF0ZSIsIm5leHRIb3VybHlGb3JlY2FzdFRpbWVDb250YWluZXIiLCJuZXh0SG91cmx5Rm9yZWNhc3RUaW1lU3ZnIiwibmV4dEhvdXJseUZvcmVjYXN0VGltZSIsIm5leHRIb3VybHlGb3JlY2FzdFRlbXBDb250YWluZXIiLCJuZXh0SG91cmx5Rm9yZWNhc3RUZW1wU3ZnIiwibmV4dEhvdXJseUZvcmVjYXN0VGVtcCIsIm5leHRIb3VybHlGb3JlY2FzdEh1bWlkaXR5Q29udGFpbmVyIiwibmV4dEhvdXJseUZvcmVjYXN0SHVtaWRpdHlTdmciLCJuZXh0SG91cmx5Rm9yZWNhc3RIdW1pZGl0eSIsIm5leHRIb3VybHlGb3JlY2FzdFdlYXRoZXJUeXBlQ29udGFpbmVyIiwibmV4dEhvdXJseUZvcmVjYXN0V2VhdGhlclR5cGVTdmciLCJuZXh0SG91cmx5Rm9yZWNhc3RXZWF0aGVyVHlwZSIsIm5leHRIb3VybHlGb3JlY2FzdFdpbmRDb250YWluZXIiLCJuZXh0SG91cmx5Rm9yZWNhc3RXaW5kU3ZnIiwibmV4dEhvdXJseUZvcmVjYXN0V2luZCIsImZvcmVDYXN0RGFpbHkiLCJuZXh0RGFpbHlGb3JlY2FzdCIsIm5leHREYWlseUZvcmVjYXN0RGF0ZUNvbnRhaW5lciIsIm5leHREYWlseUZvcmVjYXN0RGF0ZVN2ZyIsIm5leHREYWlseUZvcmVjYXN0RGF0ZSIsIm5leHREYWlseUZvcmVjYXN0VGltZUNvbnRhaW5lciIsIm5leHREYWlseUZvcmVjYXN0VGltZVN2ZyIsIm5leHREYWlseUZvcmVjYXN0VGltZSIsIm5leHREYWlseUZvcmVjYXN0VGVtcENvbnRhaW5lciIsIm5leHREYWlseUZvcmVjYXN0VGVtcFN2ZyIsIm5leHREYWlseUZvcmVjYXN0VGVtcCIsIm5leHREYWlseUZvcmVjYXN0SHVtaWRpdHlDb250YWluZXIiLCJuZXh0RGFpbHlGb3JlY2FzdEh1bWlkaXR5U3ZnIiwibmV4dERhaWx5Rm9yZWNhc3RIdW1pZGl0eSIsIm5leHREYWlseUZvcmVjYXN0V2VhdGhlclR5cGVDb250YWluZXIiLCJuZXh0RGFpbHlGb3JlY2FzdFdlYXRoZXJUeXBlU3ZnIiwibmV4dERhaWx5Rm9yZWNhc3RXZWF0aGVyVHlwZSIsIm5leHREYWlseUZvcmVjYXN0V2luZENvbnRhaW5lciIsIm5leHREYWlseUZvcmVjYXN0V2luZFN2ZyIsIm5leHREYWlseUZvcmVjYXN0V2luZCIsImRhaWx5Rm9yZWNhc3RCdXR0b24iLCJob3VybHlGb3JlY2FzdEJ1dHRvbiIsImZvcmVjYXN0RGFpbHkiLCJmb3JlY2FzdEhvdXJseSIsInJlbW92ZSIsInJlbW92ZUFsbENoaWxkTm9kZXMiLCJwYXJlbnQiLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJmYWhyZW5oZWl0QnV0dG9uIiwiZmlyc3RBbGVydCIsInNlc3Npb25TdG9yYWdlIiwiZ2V0SXRlbSIsInNldEl0ZW0iLCJudW1iZXIiLCJ0b3RhbCIsInJvdW5kZWQiLCJNYXRoIiwicm91bmQiLCJsb2FkTWVhc3VyZW1lbnRBbGVydCIsInJlcXVpcmUiLCJjb250ZXh0Iiwid2luZG93Iiwib25sb2FkIiwiYXR0YWNoRXZlbnRMaXN0ZW5lcnMiLCJob3VybHlCdXR0b24iLCJhZGRFdmVudExpc3RlbmVyIiwiZGFpbHlCdXR0b24iLCJzZWFyY2hJbnB1dCIsImUiLCJrZXlDb2RlIl0sInNvdXJjZVJvb3QiOiIifQ==