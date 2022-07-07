/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _scripts_app_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/app.js */ \"./src/scripts/app.js\");\n/* harmony import */ var _scripts_sessionStorage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/sessionStorage.js */ \"./src/scripts/sessionStorage.js\");\n\n\n__webpack_require__(\"./src/svgs sync recursive \\\\.(png%7Csvg%7Cjpg%7Cgif)$\");\n\n\n\n\n\nwindow.onload = function () {\n  (0,_scripts_app_js__WEBPACK_IMPORTED_MODULE_1__.getCity)();\n  (0,_scripts_sessionStorage_js__WEBPACK_IMPORTED_MODULE_2__.loadMeasurementAlert)();\n};\n\n(function attachEventListeners() {\n  const hourlyButton = document.querySelector('#hourly-forecast-button');\n  hourlyButton.addEventListener('click', _scripts_app_js__WEBPACK_IMPORTED_MODULE_1__.showHourlyForecast);\n  const dailyButton = document.querySelector('#daily-forecast-button');\n  dailyButton.addEventListener('click', _scripts_app_js__WEBPACK_IMPORTED_MODULE_1__.showDailyForecast);\n  const fahrenheitButton = document.querySelector('#fahrenheit-button');\n  fahrenheitButton.addEventListener('click', _scripts_app_js__WEBPACK_IMPORTED_MODULE_1__.showFahrenheit);\n  const celsiusButton = document.querySelector('#celsius-button');\n  celsiusButton.addEventListener('click', _scripts_app_js__WEBPACK_IMPORTED_MODULE_1__.showCelsius);\n  const searchInput = document.querySelector('#search-bar-input');\n  searchInput.addEventListener('keypress', function (e) {\n    if (e.keyCode === 13) {\n      (0,_scripts_app_js__WEBPACK_IMPORTED_MODULE_1__.removePreviousInformation)();\n      (0,_scripts_app_js__WEBPACK_IMPORTED_MODULE_1__.getCity)();\n    } else {\n      return;\n    }\n  });\n})();\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ }),

/***/ "./src/scripts/app.js":
/*!****************************!*\
  !*** ./src/scripts/app.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getCity\": () => (/* binding */ getCity),\n/* harmony export */   \"removePreviousInformation\": () => (/* binding */ removePreviousInformation),\n/* harmony export */   \"showCelsius\": () => (/* binding */ showCelsius),\n/* harmony export */   \"showDailyForecast\": () => (/* binding */ showDailyForecast),\n/* harmony export */   \"showFahrenheit\": () => (/* binding */ showFahrenheit),\n/* harmony export */   \"showHourlyForecast\": () => (/* binding */ showHourlyForecast)\n/* harmony export */ });\n\nlet retrievedCityName;\nlet retrievedCityLat;\nlet retrievedCityLon;\n\nasync function getCity() {\n  let corsBypass = 'https://cors-everywhere-me.herokuapp.com/';\n  let searchedCity = document.getElementById('search-bar-input').value;\n  let defaultCity = 'Reykjavík';\n\n  if (searchedCity.length === 0) {\n    searchedCity = defaultCity;\n  }\n\n  let citySearch = 'q=';\n  let api = 'http://api.openweathermap.org/geo/1.0/direct?';\n  let amountToRetrieve = '&limit=1';\n  let language = '&lang=en';\n  let apiKey = '&appid=6c89c21bfc11d403be41f489af3b2eae';\n  let searchCity = corsBypass + api + citySearch + searchedCity + amountToRetrieve + language + apiKey;\n\n  try {\n    const response = await fetch(searchCity, {\n      mode: 'cors'\n    });\n    const searchData = await response.json();\n    retrievedCityName = searchData[0].local_names.en;\n    retrievedCityLat = searchData[0].lat;\n    retrievedCityLon = searchData[0].lon;\n    getTodaysWeather();\n    getWeatherForecast();\n  } catch (error) {\n    console.log(error);\n    alert('The server could not find what you were looking for, please try again');\n  }\n}\n\nasync function getTodaysWeather() {\n  let corsBypass = 'https://cors-everywhere-me.herokuapp.com/';\n  let api = 'https://api.openweathermap.org/data/2.5/weather?';\n  let lat = \"&lat=\".concat(retrievedCityLat);\n  let lon = \"&lon=\".concat(retrievedCityLon);\n  let language = '&lang=en';\n  let units = '&units=imperial';\n  let apiKey = '&appid=6c89c21bfc11d403be41f489af3b2eae';\n  let searchWeather = corsBypass + api + lat + lon + apiKey + language + units;\n\n  try {\n    const response = await fetch(searchWeather, {\n      mode: 'cors'\n    });\n    const searchData = await response.json(); // variables for information to be appended to the DOM for weather display\n\n    let temp;\n    let weatherType = searchData.weather[0].main;\n    let description = searchData.weather[0].description;\n    let country = searchData.sys.country;\n    let feelsLike;\n    let humidity = searchData.main.humidity;\n    let tempMin;\n    let tempMax;\n    let wind = searchData.wind.speed; //checks if celsius button is on for conversion\n\n    const celsiusButton = document.querySelector('#celsius-button');\n\n    if (celsiusButton.classList.contains('celsius-on')) {\n      temp = fahrenheitToCelsius(searchData.main.temp);\n      feelsLike = fahrenheitToCelsius(searchData.main.feels_like);\n      tempMin = fahrenheitToCelsius(searchData.main.temp_min);\n      tempMax = fahrenheitToCelsius(searchData.main.temp_max);\n    } else {\n      temp = searchData.main.temp;\n      feelsLike = searchData.main.feels_like;\n      tempMin = searchData.main.temp_min;\n      tempMax = searchData.main.temp_max;\n    }\n\n    appendCurrentWeather(temp, weatherType, description, country, feelsLike, humidity, tempMin, tempMax, wind);\n  } catch (error) {\n    console.log(error);\n    alert('The server could not find what you were looking for, please try again');\n  }\n}\n\nasync function getWeatherForecast() {\n  let corsBypass = 'https://cors-everywhere-me.herokuapp.com/';\n  let api = 'https://api.openweathermap.org/data/2.5/forecast?';\n  let lat = \"&lat=\".concat(retrievedCityLat);\n  let lon = \"&lon=\".concat(retrievedCityLon);\n  let language = '&lang=en';\n  let units = '&units=imperial';\n  let apiKey = '&appid=6c89c21bfc11d403be41f489af3b2eae';\n  let searchWeather = corsBypass + api + lat + lon + apiKey + language + units;\n\n  try {\n    const response = await fetch(searchWeather, {\n      mode: 'cors'\n    });\n    const searchData = await response.json();\n    let forecastList = searchData.list;\n    bundleForecastData(forecastList);\n  } catch (error) {\n    console.log(error);\n    alert('The server could not find what you were looking for, please try again');\n  }\n}\n\nfunction appendCurrentWeather(temp, weatherType, description, country, feelsLike, humidity, tempMin, tempMax, wind) {\n  let today = new Date().toDateString();\n  let time = new Date().toLocaleTimeString();\n  const locationInformation = document.querySelector('#location-information');\n  let cityContainer = document.createElement('div');\n  cityContainer.setAttribute('id', 'city-container');\n  let citySvg = document.createElement('img');\n  citySvg.setAttribute('id', 'city-svg');\n  citySvg.src = '/src/svgs/location.svg';\n  let city = document.createElement('p');\n  city.setAttribute('id', 'city-name');\n  city.textContent = \"\".concat(retrievedCityName, \", \").concat(country);\n  let weatherDescriptionContainer = document.createElement('div');\n  weatherDescriptionContainer.setAttribute('id', 'weather-description-container');\n  let weatherDescriptionSvg = document.createElement('img');\n  weatherDescriptionSvg.setAttribute('id', 'weather-description-svg');\n  weatherDescriptionSvg.src = '/src/svgs/weather.svg';\n  let weatherDescription = document.createElement('p');\n  weatherDescription.setAttribute('id', 'weather-description');\n  weatherDescription.textContent = \"\".concat(weatherType, \", \").concat(description);\n  let weatherTemperatureContainer = document.createElement('div');\n  weatherTemperatureContainer.setAttribute('id', 'weather-temperature-container');\n  let weatherTemperatureSvg = document.createElement('img');\n  weatherTemperatureSvg.setAttribute('id', 'weather-temperature-svg');\n  weatherTemperatureSvg.src = '/src/svgs/temp.svg';\n  let weatherTemperature = document.createElement('p');\n  weatherTemperature.setAttribute('id', 'weather-temperature');\n  let todaysDateContainer = document.createElement('div');\n  todaysDateContainer.setAttribute('id', 'todays-date-container');\n  let todaysDateSvg = document.createElement('img');\n  todaysDateSvg.setAttribute('id', 'todays-date-svg');\n  todaysDateSvg.src = '/src/svgs/date.svg';\n  let todaysDate = document.createElement('p');\n  todaysDate.setAttribute('id', 'todays-date');\n  todaysDate.textContent = \"\".concat(today);\n  let todaysTimeContainer = document.createElement('div');\n  todaysTimeContainer.setAttribute('id', 'todays-time-container');\n  let todaysTimeSvg = document.createElement('img');\n  todaysTimeSvg.setAttribute('id', 'todays-time-svg');\n  todaysTimeSvg.src = '/src/svgs/time.svg';\n  let todaysTime = document.createElement('p');\n  todaysTime.setAttribute('id', 'todays-time');\n  todaysTime.textContent = \"Updated: \".concat(time); //checks if celsius button is on for conversion\n\n  const celsiusButton = document.querySelector('#celsius-button');\n\n  if (celsiusButton.classList.contains('celsius-on')) {\n    weatherTemperature.textContent = \"\".concat(temp, \" \\xB0C\");\n  } else {\n    weatherTemperature.textContent = \"\".concat(temp, \" \\xB0F\");\n  }\n\n  cityContainer.appendChild(citySvg);\n  cityContainer.appendChild(city);\n  weatherDescriptionContainer.appendChild(weatherDescriptionSvg);\n  weatherDescriptionContainer.appendChild(weatherDescription);\n  weatherTemperatureContainer.appendChild(weatherTemperatureSvg);\n  weatherTemperatureContainer.appendChild(weatherTemperature);\n  todaysDateContainer.appendChild(todaysDateSvg);\n  todaysDateContainer.appendChild(todaysDate);\n  todaysTimeContainer.appendChild(todaysTimeSvg);\n  todaysTimeContainer.appendChild(todaysTime);\n  locationInformation.appendChild(cityContainer);\n  locationInformation.appendChild(weatherDescriptionContainer);\n  locationInformation.appendChild(weatherTemperatureContainer);\n  locationInformation.appendChild(todaysDateContainer);\n  locationInformation.appendChild(todaysTimeContainer);\n  const locationExtraInformation = document.querySelector('#location-extra-information');\n  let weatherFeelsLikeContainer = document.createElement('div');\n  weatherFeelsLikeContainer.setAttribute('id', 'weather-feels-like-container');\n  let weatherFeelsLikeSvg = document.createElement('img');\n  weatherFeelsLikeSvg.setAttribute('id', 'weather-feels-like-svg');\n  weatherFeelsLikeSvg.src = '/src/svgs/feels-like.svg';\n  let weatherFeelsLike = document.createElement('p');\n  weatherFeelsLike.setAttribute('id', 'weather-feels-like');\n  let weatherHumidityContainer = document.createElement('div');\n  weatherHumidityContainer.setAttribute('id', 'weather-humidity-container');\n  let weatherHumiditySvg = document.createElement('img');\n  weatherHumiditySvg.setAttribute('id', 'weather-humidity-svg');\n  weatherHumiditySvg.src = '/src/svgs/humidity.svg';\n  let weatherHumidity = document.createElement('p');\n  weatherHumidity.setAttribute('id', 'weather-humidity');\n  weatherHumidity.textContent = \"Humidity: \".concat(humidity, \" %\");\n  let weatherMinContainer = document.createElement('div');\n  weatherMinContainer.setAttribute('id', 'weather-min-container');\n  let weatherMinSvg = document.createElement('img');\n  weatherMinSvg.setAttribute('id', 'weather-min-svg');\n  weatherMinSvg.src = '/src/svgs/temp-min.svg';\n  let weatherMin = document.createElement('p');\n  weatherMin.setAttribute('id', 'weather-min');\n  let weatherMaxContainer = document.createElement('div');\n  weatherMaxContainer.setAttribute('id', 'weather-max-container');\n  let weatherMaxSvg = document.createElement('img');\n  weatherMaxSvg.setAttribute('id', 'weather-max-svg');\n  weatherMaxSvg.src = '/src/svgs/temp-max.svg';\n  let weatherMax = document.createElement('p');\n  weatherMax.setAttribute('id', 'weather-max');\n  let windSpeedContainer = document.createElement('div');\n  windSpeedContainer.setAttribute('id', 'wind-speed-container');\n  let windSpeedSvg = document.createElement('img');\n  windSpeedSvg.setAttribute('id', 'wind-speed-svg');\n  windSpeedSvg.src = '/src/svgs/wind.svg';\n  let windSpeed = document.createElement('p');\n  windSpeed.setAttribute('id', 'wind-speed');\n  windSpeed.textContent = \"Wind Speed: \".concat(wind, \" MPH\"); // controls for celsius conversion\n\n  if (celsiusButton.classList.contains('celsius-on')) {\n    weatherFeelsLike.textContent = \"Feels Like: \".concat(feelsLike, \" \\xB0C\");\n    weatherMin.textContent = \"Low: \".concat(tempMin, \" \\xB0C\");\n    weatherMax.textContent = \"High: \".concat(tempMax, \" \\xB0C\");\n  } else {\n    weatherFeelsLike.textContent = \"Feels Like: \".concat(feelsLike, \" \\xB0F\");\n    weatherMin.textContent = \"Low: \".concat(tempMin, \" \\xB0F\");\n    weatherMax.textContent = \"High: \".concat(tempMax, \" \\xB0F\");\n  }\n\n  weatherFeelsLikeContainer.appendChild(weatherFeelsLikeSvg);\n  weatherFeelsLikeContainer.appendChild(weatherFeelsLike);\n  weatherHumidityContainer.appendChild(weatherHumiditySvg);\n  weatherHumidityContainer.appendChild(weatherHumidity);\n  weatherMinContainer.appendChild(weatherMinSvg);\n  weatherMinContainer.appendChild(weatherMin);\n  weatherMaxContainer.appendChild(weatherMaxSvg);\n  weatherMaxContainer.appendChild(weatherMax);\n  windSpeedContainer.appendChild(windSpeedSvg);\n  windSpeedContainer.appendChild(windSpeed);\n  locationExtraInformation.appendChild(weatherFeelsLikeContainer);\n  locationExtraInformation.appendChild(weatherHumidityContainer);\n  locationExtraInformation.appendChild(weatherMinContainer);\n  locationExtraInformation.appendChild(weatherMaxContainer);\n  locationExtraInformation.appendChild(windSpeedContainer);\n}\n\nfunction convertDate(date) {\n  date = new Date(date).toDateString();\n  return date;\n}\n\nfunction bundleForecastData(forecastList) {\n  const celsiusButton = document.querySelector('#celsius-button'); // Hourly forecast bundle\n\n  let next21Hours = forecastList.slice(0, 7);\n  next21Hours.forEach(function (item) {\n    let date = convertDate(item.dt_txt.slice(0, 10));\n    let time = item.dt_txt.slice(11, 19);\n    let temp = item.main.temp;\n    let humidity = item.main.humidity;\n    let weatherType = item.weather[0].main;\n    let weatherDescription = item.weather[0].description;\n    let windSpeed = item.wind.speed; //checks if celsius button is on for conversion\n\n    if (celsiusButton.classList.contains('celsius-on')) {\n      temp = fahrenheitToCelsius(item.main.temp);\n    } else {\n      temp = item.main.temp;\n    }\n\n    appendHourlyForecast(date, time, temp, humidity, weatherType, weatherDescription, windSpeed);\n  }); // Daily forecast bundle\n\n  let dailyForecast = [];\n  let nextDay = forecastList.slice(7, 8);\n  let secondDay = forecastList.slice(15, 16);\n  let thirdDay = forecastList.slice(23, 24);\n  let fourthDay = forecastList.slice(31, 32);\n  let fifthDay = forecastList.slice(39, 40);\n  dailyForecast.push(nextDay, secondDay, thirdDay, fourthDay, fifthDay);\n  dailyForecast.forEach(function (item) {\n    let date = convertDate(item[0].dt_txt.slice(0, 10));\n    let time = item[0].dt_txt.slice(11, 19);\n    let temp = item[0].main.temp;\n    let humidity = item[0].main.humidity;\n    let weatherType = item[0].weather[0].main;\n    let weatherDescription = item[0].weather[0].description;\n    let windSpeed = item[0].wind.speed; //checks if celsius button is on for conversion\n\n    if (celsiusButton.classList.contains('celsius-on')) {\n      temp = fahrenheitToCelsius(item[0].main.temp);\n    } else {\n      temp = item[0].main.temp;\n    }\n\n    appendDailyForecast(date, time, temp, humidity, weatherType, weatherDescription, windSpeed);\n  });\n}\n\nfunction appendHourlyForecast(date, time, temp, humidity, weatherType, weatherDescription, windSpeed) {\n  const foreCastHourly = document.querySelector('#forecast-hourly');\n  let nextHourlyForecast = document.createElement('div');\n  nextHourlyForecast.setAttribute('id', 'next-hourly-forecast');\n  nextHourlyForecast.classList.add('forecast-hourly-open');\n  let nextHourlyForecastDateContainer = document.createElement('div');\n  nextHourlyForecastDateContainer.setAttribute('id', 'next-hourly-forecast-date-container');\n  nextHourlyForecastDateContainer.classList.add('forecast-hourly-open');\n  let nextHourlyForecastDateSvg = document.createElement('img');\n  nextHourlyForecastDateSvg.setAttribute('id', 'next-hourly-forecast-date-svg');\n  nextHourlyForecastDateSvg.classList.add('forecast-hourly-item-open');\n  nextHourlyForecastDateSvg.src = '/src/svgs/date.svg';\n  let nextHourlyForecastDate = document.createElement('p');\n  nextHourlyForecastDate.setAttribute('id', 'next-hourly-forecast-date');\n  nextHourlyForecastDate.classList.add('forecast-hourly-item-open');\n  nextHourlyForecastDate.textContent = \"\".concat(date);\n  let nextHourlyForecastTimeContainer = document.createElement('div');\n  nextHourlyForecastTimeContainer.setAttribute('id', 'next-hourly-forecast-time-container');\n  nextHourlyForecastTimeContainer.classList.add('forecast-hourly-open');\n  let nextHourlyForecastTimeSvg = document.createElement('img');\n  nextHourlyForecastTimeSvg.setAttribute('id', 'next-hourly-forecast-time-svg');\n  nextHourlyForecastTimeSvg.classList.add('forecast-hourly-item-open');\n  nextHourlyForecastTimeSvg.src = '/src/svgs/time.svg';\n  let nextHourlyForecastTime = document.createElement('p');\n  nextHourlyForecastTime.setAttribute('id', 'next-hourly-forecast-time');\n  nextHourlyForecastTime.classList.add('forecast-hourly-item-open');\n  nextHourlyForecastTime.textContent = \"\".concat(time);\n  let nextHourlyForecastTempContainer = document.createElement('div');\n  nextHourlyForecastTempContainer.setAttribute('id', 'next-hourly-forecast-temp-container');\n  nextHourlyForecastTempContainer.classList.add('forecast-hourly-open');\n  let nextHourlyForecastTempSvg = document.createElement('img');\n  nextHourlyForecastTempSvg.setAttribute('id', 'next-hourly-forecast-temp-svg');\n  nextHourlyForecastTempSvg.classList.add('forecast-hourly-item-open');\n  nextHourlyForecastTempSvg.src = '/src/svgs/temp.svg';\n  let nextHourlyForecastTemp = document.createElement('p');\n  nextHourlyForecastTemp.setAttribute('id', 'next-hourly-forecast-temp');\n  nextHourlyForecastTemp.classList.add('forecast-hourly-item-open');\n  let nextHourlyForecastHumidityContainer = document.createElement('div');\n  nextHourlyForecastHumidityContainer.setAttribute('id', 'next-hourly-forecast-humidity-container');\n  nextHourlyForecastHumidityContainer.classList.add('forecast-hourly-open');\n  let nextHourlyForecastHumiditySvg = document.createElement('img');\n  nextHourlyForecastHumiditySvg.setAttribute('id', 'next-hourly-forecast-humidity-svg');\n  nextHourlyForecastHumiditySvg.classList.add('forecast-hourly-item-open');\n  nextHourlyForecastHumiditySvg.src = '/src/svgs/humidity.svg';\n  let nextHourlyForecastHumidity = document.createElement('p');\n  nextHourlyForecastHumidity.setAttribute('id', 'next-hourly-forecast-humidity');\n  nextHourlyForecastHumidity.classList.add('forecast-hourly-item-open');\n  nextHourlyForecastHumidity.textContent = \"Humidity: \".concat(humidity, \" %\");\n  let nextHourlyForecastWeatherTypeContainer = document.createElement('div');\n  nextHourlyForecastWeatherTypeContainer.setAttribute('id', 'next-hourly-forecast-weather-type-container');\n  nextHourlyForecastWeatherTypeContainer.classList.add('forecast-hourly-open');\n  let nextHourlyForecastWeatherTypeSvg = document.createElement('img');\n  nextHourlyForecastWeatherTypeSvg.setAttribute('id', 'next-hourly-forecast-weather-type-svg');\n  nextHourlyForecastWeatherTypeSvg.classList.add('forecast-hourly-item-open');\n  nextHourlyForecastWeatherTypeSvg.src = '/src/svgs/weather.svg';\n  let nextHourlyForecastWeatherType = document.createElement('p');\n  nextHourlyForecastWeatherType.setAttribute('id', 'next-hourly-forecast-weather-type');\n  nextHourlyForecastWeatherType.classList.add('forecast-hourly-item-open');\n  nextHourlyForecastWeatherType.textContent = \"\".concat(weatherType, \", \").concat(weatherDescription);\n  let nextHourlyForecastWindContainer = document.createElement('div');\n  nextHourlyForecastWindContainer.setAttribute('id', 'next-hourly-forecast-wind-container');\n  nextHourlyForecastWindContainer.classList.add('forecast-hourly-open');\n  let nextHourlyForecastWindSvg = document.createElement('img');\n  nextHourlyForecastWindSvg.setAttribute('id', 'next-hourly-forecast-wind-svg');\n  nextHourlyForecastWindSvg.classList.add('forecast-hourly-item-open');\n  nextHourlyForecastWindSvg.src = '/src/svgs/wind.svg';\n  let nextHourlyForecastWind = document.createElement('p');\n  nextHourlyForecastWind.setAttribute('id', 'next-hourly-forecast-wind');\n  nextHourlyForecastWind.classList.add('forecast-hourly-item-open');\n  nextHourlyForecastWind.textContent = \"Wind Speed: \".concat(windSpeed, \" MPH\"); //checks if celsius button is on for conversion\n\n  const celsiusButton = document.querySelector('#celsius-button');\n\n  if (celsiusButton.classList.contains('celsius-on')) {\n    nextHourlyForecastTemp.textContent = \"\".concat(temp, \" \\xB0C\");\n  } else {\n    nextHourlyForecastTemp.textContent = \"\".concat(temp, \" \\xB0F\");\n  }\n\n  nextHourlyForecastDateContainer.appendChild(nextHourlyForecastDateSvg);\n  nextHourlyForecastDateContainer.appendChild(nextHourlyForecastDate);\n  nextHourlyForecastTimeContainer.appendChild(nextHourlyForecastTimeSvg);\n  nextHourlyForecastTimeContainer.appendChild(nextHourlyForecastTime);\n  nextHourlyForecastTempContainer.appendChild(nextHourlyForecastTempSvg);\n  nextHourlyForecastTempContainer.appendChild(nextHourlyForecastTemp);\n  nextHourlyForecastHumidityContainer.appendChild(nextHourlyForecastHumiditySvg);\n  nextHourlyForecastHumidityContainer.appendChild(nextHourlyForecastHumidity);\n  nextHourlyForecastWeatherTypeContainer.appendChild(nextHourlyForecastWeatherTypeSvg);\n  nextHourlyForecastWeatherTypeContainer.appendChild(nextHourlyForecastWeatherType);\n  nextHourlyForecastWindContainer.appendChild(nextHourlyForecastWindSvg);\n  nextHourlyForecastWindContainer.appendChild(nextHourlyForecastWind);\n  nextHourlyForecast.appendChild(nextHourlyForecastDateContainer);\n  nextHourlyForecast.appendChild(nextHourlyForecastTimeContainer);\n  nextHourlyForecast.appendChild(nextHourlyForecastTempContainer);\n  nextHourlyForecast.appendChild(nextHourlyForecastHumidityContainer);\n  nextHourlyForecast.appendChild(nextHourlyForecastWeatherTypeContainer);\n  nextHourlyForecast.appendChild(nextHourlyForecastWindContainer);\n  foreCastHourly.appendChild(nextHourlyForecast);\n}\n\nfunction appendDailyForecast(date, time, temp, humidity, weatherType, weatherDescription, windSpeed) {\n  const foreCastDaily = document.querySelector('#forecast-daily');\n  let nextDailyForecast = document.createElement('div');\n  nextDailyForecast.setAttribute('id', 'next-daily-forecast');\n  nextDailyForecast.classList.add('next-daily-forecast-open');\n  let nextDailyForecastDateContainer = document.createElement('div');\n  nextDailyForecastDateContainer.setAttribute('id', 'next-daily-forecast-date-container');\n  nextDailyForecastDateContainer.classList.add('forecast-daily-open');\n  let nextDailyForecastDateSvg = document.createElement('img');\n  nextDailyForecastDateSvg.setAttribute('id', 'next-daily-forecast-date-svg');\n  nextDailyForecastDateSvg.classList.add('forecast-daily-item-open');\n  nextDailyForecastDateSvg.src = '/src/svgs/date.svg';\n  let nextDailyForecastDate = document.createElement('p');\n  nextDailyForecastDate.setAttribute('id', 'next-daily-forecast-date');\n  nextDailyForecastDate.classList.add('forecast-daily-item-open');\n  nextDailyForecastDate.textContent = \"\".concat(date);\n  let nextDailyForecastTimeContainer = document.createElement('div');\n  nextDailyForecastTimeContainer.setAttribute('id', 'next-daily-forecast-time-container');\n  nextDailyForecastTimeContainer.classList.add('forecast-daily-open');\n  let nextDailyForecastTimeSvg = document.createElement('img');\n  nextDailyForecastTimeSvg.setAttribute('id', 'next-daily-forecast-time-svg');\n  nextDailyForecastTimeSvg.classList.add('forecast-daily-item-open');\n  nextDailyForecastTimeSvg.src = '/src/svgs/time.svg';\n  let nextDailyForecastTime = document.createElement('p');\n  nextDailyForecastTime.setAttribute('id', 'next-daily-forecast-time');\n  nextDailyForecastTime.classList.add('forecast-daily-item-open');\n  nextDailyForecastTime.textContent = \"\".concat(time);\n  let nextDailyForecastTempContainer = document.createElement('div');\n  nextDailyForecastTempContainer.setAttribute('id', 'next-daily-forecast-temp-container');\n  nextDailyForecastTempContainer.classList.add('forecast-daily-open');\n  let nextDailyForecastTempSvg = document.createElement('img');\n  nextDailyForecastTempSvg.setAttribute('id', 'next-daily-forecast-temp-svg');\n  nextDailyForecastTempSvg.classList.add('forecast-daily-item-open');\n  nextDailyForecastTempSvg.src = '/src/svgs/temp.svg';\n  let nextDailyForecastTemp = document.createElement('p');\n  nextDailyForecastTemp.setAttribute('id', 'next-daily-forecast-temp');\n  nextDailyForecastTemp.classList.add('forecast-daily-item-open');\n  let nextDailyForecastHumidityContainer = document.createElement('div');\n  nextDailyForecastHumidityContainer.setAttribute('id', 'next-daily-forecast-humidity-container');\n  nextDailyForecastHumidityContainer.classList.add('forecast-daily-open');\n  let nextDailyForecastHumiditySvg = document.createElement('img');\n  nextDailyForecastHumiditySvg.setAttribute('id', 'next-daily-forecast-humidity-svg');\n  nextDailyForecastHumiditySvg.classList.add('forecast-daily-item-open');\n  nextDailyForecastHumiditySvg.src = '/src/svgs/humidity.svg';\n  let nextDailyForecastHumidity = document.createElement('p');\n  nextDailyForecastHumidity.setAttribute('id', 'next-daily-forecast-humidity');\n  nextDailyForecastHumidity.classList.add('forecast-daily-item-open');\n  nextDailyForecastHumidity.textContent = \"Humidity: \".concat(humidity, \" %\");\n  let nextDailyForecastWeatherTypeContainer = document.createElement('div');\n  nextDailyForecastWeatherTypeContainer.setAttribute('id', 'next-daily-forecast-weather-type-container');\n  nextDailyForecastWeatherTypeContainer.classList.add('forecast-daily-open');\n  let nextDailyForecastWeatherTypeSvg = document.createElement('img');\n  nextDailyForecastWeatherTypeSvg.setAttribute('id', 'next-daily-forecast-weather-type-svg');\n  nextDailyForecastWeatherTypeSvg.classList.add('forecast-daily-item-open');\n  nextDailyForecastWeatherTypeSvg.src = '/src/svgs/weather.svg';\n  let nextDailyForecastWeatherType = document.createElement('p');\n  nextDailyForecastWeatherType.setAttribute('id', 'next-daily-forecast-weather-type');\n  nextDailyForecastWeatherType.classList.add('forecast-daily-item-open');\n  nextDailyForecastWeatherType.textContent = \"\".concat(weatherType, \", \").concat(weatherDescription);\n  let nextDailyForecastWindContainer = document.createElement('div');\n  nextDailyForecastWindContainer.setAttribute('id', 'next-daily-forecast-wind-container');\n  nextDailyForecastWindContainer.classList.add('forecast-daily-open');\n  let nextDailyForecastWindSvg = document.createElement('img');\n  nextDailyForecastWindSvg.setAttribute('id', 'next-daily-forecast-wind-svg');\n  nextDailyForecastWindSvg.classList.add('forecast-daily-item-open');\n  nextDailyForecastWindSvg.src = '/src/svgs/wind.svg';\n  let nextDailyForecastWind = document.createElement('p');\n  nextDailyForecastWind.setAttribute('id', 'next-daily-forecast-wind');\n  nextDailyForecastWind.classList.add('forecast-daily-item-open');\n  nextDailyForecastWind.textContent = \"Wind Speed: \".concat(windSpeed, \" MPH\"); //checks if celsius button is on for conversion\n\n  const celsiusButton = document.querySelector('#celsius-button');\n\n  if (celsiusButton.classList.contains('celsius-on')) {\n    nextDailyForecastTemp.textContent = \"\".concat(temp, \" \\xB0C\");\n  } else {\n    nextDailyForecastTemp.textContent = \"\".concat(temp, \" \\xB0F\");\n  }\n\n  nextDailyForecastDateContainer.appendChild(nextDailyForecastDateSvg);\n  nextDailyForecastDateContainer.appendChild(nextDailyForecastDate);\n  nextDailyForecastTimeContainer.appendChild(nextDailyForecastTimeSvg);\n  nextDailyForecastTimeContainer.appendChild(nextDailyForecastTime);\n  nextDailyForecastTempContainer.appendChild(nextDailyForecastTempSvg);\n  nextDailyForecastTempContainer.appendChild(nextDailyForecastTemp);\n  nextDailyForecastHumidityContainer.appendChild(nextDailyForecastHumiditySvg);\n  nextDailyForecastHumidityContainer.appendChild(nextDailyForecastHumidity);\n  nextDailyForecastWeatherTypeContainer.appendChild(nextDailyForecastWeatherTypeSvg);\n  nextDailyForecastWeatherTypeContainer.appendChild(nextDailyForecastWeatherType);\n  nextDailyForecastWindContainer.appendChild(nextDailyForecastWindSvg);\n  nextDailyForecastWindContainer.appendChild(nextDailyForecastWind);\n  nextDailyForecast.appendChild(nextDailyForecastDateContainer);\n  nextDailyForecast.appendChild(nextDailyForecastTimeContainer);\n  nextDailyForecast.appendChild(nextDailyForecastTempContainer);\n  nextDailyForecast.appendChild(nextDailyForecastHumidityContainer);\n  nextDailyForecast.appendChild(nextDailyForecastWeatherTypeContainer);\n  nextDailyForecast.appendChild(nextDailyForecastWindContainer);\n  foreCastDaily.appendChild(nextDailyForecast);\n}\n\nfunction showHourlyForecast() {\n  const dailyForecastButton = document.querySelector('#daily-forecast-button');\n  const hourlyForecastButton = document.querySelector('#hourly-forecast-button');\n  const forecastDaily = document.querySelector('#forecast-daily');\n  const forecastHourly = document.querySelector('#forecast-hourly');\n\n  if (dailyForecastButton.classList.contains('daily-forecast-button-on')) {\n    dailyForecastButton.classList.remove('daily-forecast-button-on');\n    dailyForecastButton.classList.add('daily-forecast-button-off');\n    hourlyForecastButton.classList.add('hourly-forecast-button-on');\n    hourlyForecastButton.classList.remove('hourly-forecast-button-off');\n    forecastDaily.classList.remove('forecast-daily-on');\n    forecastDaily.classList.add('forecast-daily-off');\n    forecastHourly.classList.remove('forecast-hourly-off');\n    forecastHourly.classList.add('forecast-hourly-on');\n  } else if (hourlyForecastButton.classList.contains('hourly-forecast-button-on')) {\n    return;\n  } else {\n    return;\n  }\n}\n\nfunction showDailyForecast() {\n  const dailyForecastButton = document.querySelector('#daily-forecast-button');\n  const hourlyForecastButton = document.querySelector('#hourly-forecast-button');\n  const forecastDaily = document.querySelector('#forecast-daily');\n  const forecastHourly = document.querySelector('#forecast-hourly');\n\n  if (dailyForecastButton.classList.contains('daily-forecast-button-on')) {\n    return;\n  } else if (hourlyForecastButton.classList.contains('hourly-forecast-button-on')) {\n    dailyForecastButton.classList.add('daily-forecast-button-on');\n    dailyForecastButton.classList.remove('daily-forecast-button-off');\n    hourlyForecastButton.classList.remove('hourly-forecast-button-on');\n    hourlyForecastButton.classList.add('hourly-forecast-button-off');\n    forecastDaily.classList.add('forecast-daily-on');\n    forecastDaily.classList.remove('forecast-daily-off');\n    forecastHourly.classList.add('forecast-hourly-off');\n    forecastHourly.classList.remove('forecast-hourly-on');\n  } else {\n    return;\n  }\n}\n\nfunction removePreviousInformation() {\n  const locationInformation = document.querySelector('#location-information');\n  const locationExtraInformation = document.querySelector('#location-extra-information');\n  const forecastHourly = document.querySelector('#forecast-hourly');\n  const forecastDaily = document.querySelector('#forecast-daily');\n  removeAllChildNodes(locationInformation);\n  removeAllChildNodes(locationExtraInformation);\n  removeAllChildNodes(forecastHourly);\n  removeAllChildNodes(forecastDaily);\n}\n\nfunction removeAllChildNodes(parent) {\n  while (parent.firstChild) {\n    parent.removeChild(parent.firstChild);\n  }\n}\n\nfunction showFahrenheit() {\n  const fahrenheitButton = document.querySelector('#fahrenheit-button');\n  const celsiusButton = document.querySelector('#celsius-button'); // informs user on when to expect to see the celsius/fahrenheit reading change. It only shows it once per session\n\n  let firstAlert = sessionStorage.getItem('first-alert');\n\n  if (firstAlert === 'true') {\n    alert('When changing between celsius and fahrenheit, the temperature readings will change on your next search');\n    sessionStorage.setItem('first-alert', 'false');\n  }\n\n  if (fahrenheitButton.classList.contains('fahrenheit-on')) {\n    return;\n  } else if (fahrenheitButton.classList.contains('fahrenheit-off')) {\n    fahrenheitButton.classList.remove('fahrenheit-off');\n    fahrenheitButton.classList.add('fahrenheit-on');\n    celsiusButton.classList.remove('celsius-on');\n    celsiusButton.classList.add('celsius-off');\n  } else {\n    return;\n  }\n}\n\nfunction showCelsius() {\n  const fahrenheitButton = document.querySelector('#fahrenheit-button');\n  const celsiusButton = document.querySelector('#celsius-button'); // informs user on when to expect to see the celsius/fahrenheit reading change. It only shows it once per session\n\n  let firstAlert = sessionStorage.getItem('first-alert');\n\n  if (firstAlert === 'true') {\n    alert('When changing between celsius and fahrenheit, the temperature readings will change on your next search');\n    sessionStorage.setItem('first-alert', 'false');\n  }\n\n  if (celsiusButton.classList.contains('celsius-on')) {\n    return;\n  } else if (celsiusButton.classList.contains('celsius-off')) {\n    celsiusButton.classList.remove('celsius-off');\n    celsiusButton.classList.add('celsius-on');\n    fahrenheitButton.classList.add('fahrenheit-off');\n    fahrenheitButton.classList.remove('fahrenheit-on');\n  } else {\n    return;\n  }\n}\n\nfunction fahrenheitToCelsius(number) {\n  let total = (number - 32) * 5 / 9;\n  let rounded = Math.round(total * 10) / 10;\n  number = rounded;\n  return number;\n}\n\n//# sourceURL=webpack://weather-app/./src/scripts/app.js?");

/***/ }),

/***/ "./src/scripts/sessionStorage.js":
/*!***************************************!*\
  !*** ./src/scripts/sessionStorage.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loadMeasurementAlert\": () => (/* binding */ loadMeasurementAlert)\n/* harmony export */ });\n\n\nfunction loadMeasurementAlert() {\n  sessionStorage.setItem('first-alert', 'true');\n}\n\n//# sourceURL=webpack://weather-app/./src/scripts/sessionStorage.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);\n// Imports\n\n\n\nvar ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! imgs/mountain-lake.jpg */ \"./src/imgs/mountain-lake.jpg\"), __webpack_require__.b);\nvar ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! svgs/search.svg */ \"./src/svgs/search.svg\"), __webpack_require__.b);\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n___CSS_LOADER_EXPORT___.push([module.id, \"@import url(https://fonts.googleapis.com/css2?family=Fredoka:wght@300&family=Roboto+Mono:wght@300&display=swap);\"]);\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);\nvar ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"body {\\n  font-family: 'Roboto Mono', monospace, 'Fredoka', sans-serif;\\n}\\n\\n#background {\\n  background-image: url(\" + ___CSS_LOADER_URL_REPLACEMENT_0___ + \");\\n  background-size: cover;\\n  width: 100vw;\\n  height: 100vh;\\n}\\n\\n#header {\\n  width: 100vw;\\n  height: 10vh;\\n  display: flex;\\n  align-items: center;\\n}\\n\\n#header-left {\\n  display: flex;\\n  width: 50vw;\\n  height: 10vh;\\n  align-items: center;\\n}\\n\\n#header-title-first {\\n  padding-left: 4%;\\n  font-size: 2.5em;\\n  font-weight: bolder;\\n  color: #f3ac4c;\\n}\\n\\n#header-title-second {\\n  font-size: 2.5em;\\n  font-weight: bolder;\\n  color: #438ccc;\\n}\\n\\n#header-icon {\\n  display: flex;\\n  width: 4em;\\n  height: 4em;\\n  padding-left: 4%;\\n}\\n\\n#header-right {\\n  display: flex;\\n  width: 50vw;\\n  justify-content: flex-end;\\n  padding-right: 4%;\\n  align-items: center;\\n}\\n\\nlabel {\\n  position: relative;\\n}\\n\\nlabel:before {\\n  content: \\\"\\\";\\n  position: absolute;\\n  left: 10px;\\n  top: 0;\\n  bottom: 0;\\n  width: 1.5em;\\n  background: url(\" + ___CSS_LOADER_URL_REPLACEMENT_1___ + \") center / contain no-repeat;\\n  filter: invert(79%) sepia(72%) saturate(913%) hue-rotate(323deg) brightness(101%) contrast(91%);\\n}\\n\\n#search-bar-input {\\n  width: 15vw;\\n  height: 5vh;\\n  font-size: 1.5em;\\n  padding-left: 16%;\\n  color: #438ccc;\\n}\\n\\n#app {\\n  display: flex;\\n  width: 100vw;\\n  height: 90vh;\\n  flex-flow: column nowrap;\\n\\n}\\n\\n#app-top {\\n  display: flex;\\n  height: 50vh;\\n  width: 100vw;\\n}\\n\\n#app-top-left {\\n  display: flex;\\n  width: 45vw;\\n  height: 50vh;\\n}\\n\\n#location-information {\\n  display: flex;\\n  width: 45vw;\\n  height: 40vh;\\n  flex-flow: row wrap;\\n  align-content: center;\\n  justify-content: flex-start;\\n  align-items: center;\\n  margin-top: 5%;\\n  margin-left: 5%;\\n}\\n\\n#city-container, #weather-description-container, #weather-temperature-container, #todays-date-container, #todays-time-container {\\n  display: flex;\\n  width: 45vw;\\n  height: 5vh;\\n  align-items: center;\\n  background-color: rgb(240, 242, 240, 0.9);\\n  margin: 0;\\n  width: 40vw;\\n  padding: 2%;\\n}\\n\\n#city-svg, #weather-description-svg, #weather-temperature-svg, #todays-date-svg, #todays-time-svg {\\n  display: flex;\\n  width: 2.5em;\\n  height: 2.5em;\\n  filter: invert(79%) sepia(72%) saturate(913%) hue-rotate(323deg) brightness(101%) contrast(91%);\\n  padding-right: 5%;\\n}\\n\\n#city-name, #weather-temperature, #todays-time, #weather-description, #todays-date {\\n  font-size: 2em;\\n  font-weight: bolder;\\n  color: #f3ac4c;\\n}\\n\\n#app-top-right {\\n  display: flex;\\n  width: 45vw;\\n  height: 50vh;\\n}\\n\\n#location-extra-information {\\n  display: flex;\\n  width: 45vw;\\n  height: 40vh;\\n  flex-flow: row wrap;\\n  align-content: center;\\n  justify-content: flex-start;\\n  align-items: center;\\n  margin-top: 5%;\\n  margin-left: 16.5%;\\n}\\n\\n#weather-feels-like-container, #weather-humidity-container, #weather-min-container, #weather-max-container, #wind-speed-container {\\n  display: flex;\\n  width: 45vw;\\n  height: 5vh;\\n  align-items: center;\\n  background-color: rgb(240, 242, 240, 0.9);\\n  margin: 0;\\n  padding: 2%;\\n}\\n\\n#weather-feels-like-svg, #weather-humidity-svg, #weather-min-svg, #weather-max-svg, #wind-speed-svg, #next-daily-forecast-weather-type-svg, #next-hourly-forecast-weather-type-svg {\\n  display: flex;\\n  width: 2.5em;\\n  height: 2.5em;\\n  filter: invert(54%) sepia(34%) saturate(861%) hue-rotate(166deg) brightness(88%) contrast(88%);\\n  padding-right: 5%;\\n}\\n\\n#weather-feels-like, #weather-humidity, #weather-min, #weather-max, #wind-speed {\\n  font-size: 2em;\\n  font-weight: bolder;\\n  color: #438ccc;\\n}\\n\\n#app-bottom {\\n  display:flex;\\n  width: 100vw;\\n  height: 50vh;\\n  flex-flow: column nowrap;\\n  align-content: flex-start;\\n  justify-content: flex-start;\\n  align-items: flex-start;\\n}\\n\\n#information-switcher {\\n  display: flex;\\n  width: 10vw;\\n  height: 3.5vh;\\n  flex-flow: row nowrap;\\n  align-content: center;\\n  justify-content: flex-start;\\n  align-items: center;\\n  padding-left: 2.75%;\\n}\\n\\n#daily-forecast-button, #hourly-forecast-button, #fahrenheit-button, #celsius-button {\\n  width: 8vw;\\n  height: 3.5vh;\\n  font-size: 1em;\\n  font-weight: bolder;\\n  border-radius: 10%;\\n  margin-left: 3%;\\n}\\n\\n#fahrenheit-button {\\n  margin-left: 1vw;\\n}\\n\\n.daily-forecast-button-off {\\n  background-color: rgb(240, 242, 240, 0.9);\\n  color: #f3ac4c;\\n}\\n\\n.daily-forecast-button-on {\\n  background-color: #f3ac4c;\\n  border: 1px solid rgb(240, 242, 240, 0.9);\\n  color: rgb(240, 242, 240, 0.8);;\\n}\\n\\n.hourly-forecast-button-off {\\n  background-color: rgb(240, 242, 240, 0.9);\\n  color: #438ccc;\\n}\\n\\n.hourly-forecast-button-on {\\n  background-color: #438ccc;\\n  color: rgb(240, 242, 240, 0.8);\\n  border: 1px solid rgb(240, 242, 240, 0.9);\\n}\\n\\n.celsius-off {\\n  background-color: rgb(240, 242, 240, 0.9);\\n  color: #438ccc;\\n}\\n\\n.fahrenheit-off {\\n  background-color: rgb(240, 242, 240, 0.9);\\n  color: #f3ac4c;\\n}\\n\\n.celsius-on {\\n  background-color: #438ccc;\\n  color: rgb(240, 242, 240, 0.8);\\n  border: 1px solid rgb(240, 242, 240, 0.9);\\n}\\n\\n.fahrenheit-on {\\n  background-color: #f3ac4c;\\n  border: 1px solid rgb(240, 242, 240, 0.9);\\n  color: rgb(240, 242, 240, 0.8);;\\n}\\n\\n.forecast-hourly-off {\\n  visibility: hidden;\\n  display: none;\\n  width: 0;\\n  height: 0;\\n  margin: 0;\\n}\\n\\n.forecast-daily-off {\\n  visibility: hidden;\\n  display: none;\\n  width: 0;\\n  height: 0;\\n  margin: 0;\\n}\\n\\n.forecast-daily-on {\\n  visibility: visible;\\n  display: flex;\\n  width: 100vw;\\n  height: 36.5vh;\\n  flex-flow: row nowrap;\\n  align-content: center;\\n  justify-content: center;\\n  align-items: flex-start;\\n}\\n\\n.next-daily-forecast-open {\\n  display: flex;\\n  flex-flow: column nowrap;\\n  align-items: center;\\n  width: 18vw;\\n  height: 30vh;\\n  font-size: 0.8em;\\n  background-color: rgb(240, 242, 240, 0.9);\\n  margin: 0.5%;\\n}\\n\\n.forecast-daily-open {\\n  display: flex;\\n  flex-flow: row nowrap;\\n  justify-content: flex-start;\\n  align-items: center;\\n  width: 18vw;\\n  height: 5vh;\\n}\\n\\n.forecast-daily-item-open {\\n  margin: 0;\\n  margin-left: 5%;\\n  color: #438ccc;\\n  font-weight: bolder;\\n}\\n\\n#next-daily-forecast-date-svg, #next-daily-forecast-time-svg, #next-daily-forecast-temp-svg, #next-daily-forecast-humidity-svg, #next-daily-forecast-weather-type-svg, #next-daily-forecast-wind-svg {\\n  filter: invert(79%) sepia(72%) saturate(913%) hue-rotate(323deg) brightness(101%) contrast(91%);\\n}\\n\\n.forecast-hourly-on {\\n  visibility: visible;\\n  display: flex;\\n  width: 100vw;\\n  height: 36.5vh;\\n  flex-flow: row nowrap;\\n  align-content: center;\\n  justify-content: center;\\n  align-items: flex-start;\\n}\\n\\n#next-hourly-forecast {\\n  display: flex;\\n  flex-flow: column nowrap;\\n  align-items: center;\\n  width: 13.5vw;\\n  height: 32vh;\\n  font-size: 0.85em;\\n  background-color: rgb(240, 242, 240, 0.9);\\n  margin: 0.25%;\\n}\\n\\n.forecast-hourly-open {\\n  display: flex;\\n  flex-flow: row nowrap;\\n  justify-content: flex-start;\\n  align-items: center;\\n  width: 12vw;\\n  height: 5vh;\\n}\\n\\n.forecast-hourly-item-open {\\n  margin: 0;\\n  margin-left: 5%;\\n  color: #438ccc;\\n  font-weight: bolder;\\n}\\n\\n#next-hourly-forecast-date-svg, #next-hourly-forecast-time-svg, #next-hourly-forecast-temp-svg, #next-hourly-forecast-humidity-svg, #next-hourly-forecast-weather-type-svg, #next-hourly-forecast-wind-svg {\\n  filter: invert(79%) sepia(72%) saturate(913%) hue-rotate(323deg) brightness(101%) contrast(91%);\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://weather-app/./src/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n\n      content += cssWithMappingToString(item);\n\n      if (needLayer) {\n        content += \"}\";\n      }\n\n      if (item[2]) {\n        content += \"}\";\n      }\n\n      if (item[4]) {\n        content += \"}\";\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://weather-app/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    options = {};\n  }\n\n  if (!url) {\n    return url;\n  }\n\n  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them\n\n  if (/^['\"].*['\"]$/.test(url)) {\n    url = url.slice(1, -1);\n  }\n\n  if (options.hash) {\n    url += options.hash;\n  } // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n\n\n  if (/[\"'() \\t\\n]|(%20)/.test(url) || options.needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, \"\\\\n\"), \"\\\"\");\n  }\n\n  return url;\n};\n\n//# sourceURL=webpack://weather-app/./node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://weather-app/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./src/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://weather-app/./src/style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://weather-app/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://weather-app/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://weather-app/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://weather-app/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://weather-app/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://weather-app/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/svgs sync recursive \\.(png%7Csvg%7Cjpg%7Cgif)$":
/*!***************************************************!*\
  !*** ./src/svgs/ sync \.(png%7Csvg%7Cjpg%7Cgif)$ ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./date.svg\": \"./src/svgs/date.svg\",\n\t\"./feels-like.svg\": \"./src/svgs/feels-like.svg\",\n\t\"./humidity.svg\": \"./src/svgs/humidity.svg\",\n\t\"./location.svg\": \"./src/svgs/location.svg\",\n\t\"./logo.png\": \"./src/svgs/logo.png\",\n\t\"./search.svg\": \"./src/svgs/search.svg\",\n\t\"./temp-max.svg\": \"./src/svgs/temp-max.svg\",\n\t\"./temp-min.svg\": \"./src/svgs/temp-min.svg\",\n\t\"./temp.svg\": \"./src/svgs/temp.svg\",\n\t\"./time.svg\": \"./src/svgs/time.svg\",\n\t\"./weather.svg\": \"./src/svgs/weather.svg\",\n\t\"./wind.svg\": \"./src/svgs/wind.svg\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/svgs sync recursive \\\\.(png%7Csvg%7Cjpg%7Cgif)$\";\n\n//# sourceURL=webpack://weather-app/./src/svgs/_sync_\\.(png%257Csvg%257Cjpg%257Cgif)$?");

/***/ }),

/***/ "./src/imgs/mountain-lake.jpg":
/*!************************************!*\
  !*** ./src/imgs/mountain-lake.jpg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"55efb9776634d0d95de5.jpg\";\n\n//# sourceURL=webpack://weather-app/./src/imgs/mountain-lake.jpg?");

/***/ }),

/***/ "./src/svgs/date.svg":
/*!***************************!*\
  !*** ./src/svgs/date.svg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"0330c6889cb95fe5ad10.svg\";\n\n//# sourceURL=webpack://weather-app/./src/svgs/date.svg?");

/***/ }),

/***/ "./src/svgs/feels-like.svg":
/*!*********************************!*\
  !*** ./src/svgs/feels-like.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"99a60685c883de448609.svg\";\n\n//# sourceURL=webpack://weather-app/./src/svgs/feels-like.svg?");

/***/ }),

/***/ "./src/svgs/humidity.svg":
/*!*******************************!*\
  !*** ./src/svgs/humidity.svg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"800d006a543de33d7e3d.svg\";\n\n//# sourceURL=webpack://weather-app/./src/svgs/humidity.svg?");

/***/ }),

/***/ "./src/svgs/location.svg":
/*!*******************************!*\
  !*** ./src/svgs/location.svg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"f2fee57a7f55047a4bdb.svg\";\n\n//# sourceURL=webpack://weather-app/./src/svgs/location.svg?");

/***/ }),

/***/ "./src/svgs/logo.png":
/*!***************************!*\
  !*** ./src/svgs/logo.png ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"71fd7a0d8c5296820f49.png\";\n\n//# sourceURL=webpack://weather-app/./src/svgs/logo.png?");

/***/ }),

/***/ "./src/svgs/search.svg":
/*!*****************************!*\
  !*** ./src/svgs/search.svg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"230bea6ac20a05aaa7b1.svg\";\n\n//# sourceURL=webpack://weather-app/./src/svgs/search.svg?");

/***/ }),

/***/ "./src/svgs/temp-max.svg":
/*!*******************************!*\
  !*** ./src/svgs/temp-max.svg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"e72f3d0c9aceac6fd34e.svg\";\n\n//# sourceURL=webpack://weather-app/./src/svgs/temp-max.svg?");

/***/ }),

/***/ "./src/svgs/temp-min.svg":
/*!*******************************!*\
  !*** ./src/svgs/temp-min.svg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"ec578bd37716e31c100c.svg\";\n\n//# sourceURL=webpack://weather-app/./src/svgs/temp-min.svg?");

/***/ }),

/***/ "./src/svgs/temp.svg":
/*!***************************!*\
  !*** ./src/svgs/temp.svg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"2bf150cbb30a63043a8c.svg\";\n\n//# sourceURL=webpack://weather-app/./src/svgs/temp.svg?");

/***/ }),

/***/ "./src/svgs/time.svg":
/*!***************************!*\
  !*** ./src/svgs/time.svg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"73ffa0631c8be363df0a.svg\";\n\n//# sourceURL=webpack://weather-app/./src/svgs/time.svg?");

/***/ }),

/***/ "./src/svgs/weather.svg":
/*!******************************!*\
  !*** ./src/svgs/weather.svg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"6cb8238507668441d7ee.svg\";\n\n//# sourceURL=webpack://weather-app/./src/svgs/weather.svg?");

/***/ }),

/***/ "./src/svgs/wind.svg":
/*!***************************!*\
  !*** ./src/svgs/wind.svg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"d9ca25c3d652e3566b0d.svg\";\n\n//# sourceURL=webpack://weather-app/./src/svgs/wind.svg?");

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
/******/ 		__webpack_require__.p = "/weather-app";
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;