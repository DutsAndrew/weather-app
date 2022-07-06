/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getCity\": () => (/* binding */ getCity),\n/* harmony export */   \"removePreviousInformation\": () => (/* binding */ removePreviousInformation),\n/* harmony export */   \"showDailyForecast\": () => (/* binding */ showDailyForecast),\n/* harmony export */   \"showHourlyForecast\": () => (/* binding */ showHourlyForecast)\n/* harmony export */ });\n/* harmony import */ var _svgs_date_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./svgs/date.svg */ \"./src/svgs/date.svg\");\n/* harmony import */ var _svgs_feels_like_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./svgs/feels-like.svg */ \"./src/svgs/feels-like.svg\");\n/* harmony import */ var _svgs_humidity_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./svgs/humidity.svg */ \"./src/svgs/humidity.svg\");\n/* harmony import */ var _svgs_location_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./svgs/location.svg */ \"./src/svgs/location.svg\");\n/* harmony import */ var _svgs_search_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./svgs/search.svg */ \"./src/svgs/search.svg\");\n/* harmony import */ var _svgs_temp_max_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./svgs/temp-max.svg */ \"./src/svgs/temp-max.svg\");\n/* harmony import */ var _svgs_temp_min_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./svgs/temp-min.svg */ \"./src/svgs/temp-min.svg\");\n/* harmony import */ var _svgs_temp_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./svgs/temp.svg */ \"./src/svgs/temp.svg\");\n/* harmony import */ var _svgs_time_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./svgs/time.svg */ \"./src/svgs/time.svg\");\n/* harmony import */ var _svgs_weather_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./svgs/weather.svg */ \"./src/svgs/weather.svg\");\n/* harmony import */ var _svgs_wind_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./svgs/wind.svg */ \"./src/svgs/wind.svg\");\n\n\n\n\n\n\n\n\n\n\n\n\nlet retrievedCityName;\nlet retrievedCityLat;\nlet retrievedCityLon;\n\nasync function getCity() {\n  let corsBypass = 'https://cors-everywhere-me.herokuapp.com/';\n  let searchedCity = document.getElementById('search-bar-input').value;\n  let defaultCity = 'Reykjavík';\n\n  if (searchedCity.length === 0) {\n    searchedCity = defaultCity;\n  }\n\n  let citySearch = 'q=';\n  let api = 'http://api.openweathermap.org/geo/1.0/direct?';\n  let amountToRetrieve = '&limit=1';\n  let language = '&lang=en';\n  let apiKey = '&appid=6c89c21bfc11d403be41f489af3b2eae';\n  let searchCity = corsBypass + api + citySearch + searchedCity + amountToRetrieve + language + apiKey;\n\n  try {\n    const response = await fetch(searchCity, {\n      mode: 'cors'\n    });\n    const searchData = await response.json();\n    retrievedCityName = searchData[0].local_names.en;\n    retrievedCityLat = searchData[0].lat;\n    retrievedCityLon = searchData[0].lon;\n    getTodaysWeather();\n    getWeatherForecast();\n  } catch (error) {\n    console.log(error);\n    alert('The server could not find what you were looking for, please try again');\n  }\n}\n\nasync function getTodaysWeather() {\n  let corsBypass = 'https://cors-everywhere-me.herokuapp.com/';\n  let api = 'https://api.openweathermap.org/data/2.5/weather?';\n  let lat = \"&lat=\".concat(retrievedCityLat);\n  let lon = \"&lon=\".concat(retrievedCityLon);\n  let language = '&lang=en';\n  let units = '&units=imperial';\n  let apiKey = '&appid=6c89c21bfc11d403be41f489af3b2eae';\n  let searchWeather = corsBypass + api + lat + lon + apiKey + language + units;\n\n  try {\n    const response = await fetch(searchWeather, {\n      mode: 'cors'\n    });\n    const searchData = await response.json(); // variables for information to be appended to the DOM for weather display\n\n    let temp = searchData.main.temp;\n    let weatherType = searchData.weather[0].main;\n    let description = searchData.weather[0].description;\n    let country = searchData.sys.country;\n    let feelsLike = searchData.main.feels_like;\n    let humidity = searchData.main.humidity;\n    let tempMin = searchData.main.temp_min;\n    let tempMax = searchData.main.temp_max;\n    let wind = searchData.wind.speed;\n    appendCurrentWeather(temp, weatherType, description, country, feelsLike, humidity, tempMin, tempMax, wind);\n  } catch (error) {\n    console.log(error);\n    alert('The server could not find what you were looking for, please try again');\n  }\n}\n\nasync function getWeatherForecast() {\n  let corsBypass = 'https://cors-everywhere-me.herokuapp.com/';\n  let api = 'https://api.openweathermap.org/data/2.5/forecast?';\n  let lat = \"&lat=\".concat(retrievedCityLat);\n  let lon = \"&lon=\".concat(retrievedCityLon);\n  let language = '&lang=en';\n  let units = '&units=imperial';\n  let apiKey = '&appid=6c89c21bfc11d403be41f489af3b2eae';\n  let searchWeather = corsBypass + api + lat + lon + apiKey + language + units;\n\n  try {\n    const response = await fetch(searchWeather, {\n      mode: 'cors'\n    });\n    const searchData = await response.json();\n    let forecastList = searchData.list;\n    bundleForecastData(forecastList);\n  } catch (error) {\n    console.log(error);\n    alert('The server could not find what you were looking for, please try again');\n  }\n}\n\nfunction appendCurrentWeather(temp, weatherType, description, country, feelsLike, humidity, tempMin, tempMax, wind) {\n  let today = new Date().toDateString();\n  let time = new Date().toLocaleTimeString();\n  const locationInformation = document.querySelector('#location-information');\n  let cityContainer = document.createElement('div');\n  cityContainer.setAttribute('id', 'city-container');\n  let citySvg = document.createElement('img');\n  citySvg.setAttribute('id', 'city-svg');\n  let city = document.createElement('p');\n  city.setAttribute('id', 'city-name');\n  city.textContent = \"\".concat(retrievedCityName, \", \").concat(country);\n  let weatherDescriptionContainer = document.createElement('div');\n  weatherDescriptionContainer.setAttribute('id', 'weather-description-container');\n  let weatherDescriptionSvg = document.createElement('img');\n  weatherDescriptionSvg.setAttribute('id', 'weather-description-svg');\n  weatherDescriptionSvg.src = _svgs_weather_svg__WEBPACK_IMPORTED_MODULE_9__;\n  let weatherDescription = document.createElement('p');\n  weatherDescription.setAttribute('id', 'weather-description');\n  weatherDescription.textContent = \"\".concat(weatherType, \", \").concat(description);\n  let weatherTemperatureContainer = document.createElement('div');\n  weatherTemperatureContainer.setAttribute('id', 'weather-temperature-container');\n  let weatherTemperatureSvg = document.createElement('img');\n  weatherTemperatureSvg.setAttribute('id', 'weather-temperature-svg');\n  weatherTemperatureSvg.src = _svgs_temp_svg__WEBPACK_IMPORTED_MODULE_7__;\n  let weatherTemperature = document.createElement('p');\n  weatherTemperature.setAttribute('id', 'weather-temperature');\n  weatherTemperature.textContent = \"\".concat(temp, \" \\xB0F\");\n  let todaysDateContainer = document.createElement('div');\n  todaysDateContainer.setAttribute('id', 'todays-date-container');\n  let todaysDateSvg = document.createElement('img');\n  todaysDateSvg.setAttribute('id', 'todays-date-svg');\n  todaysDateSvg.src = _svgs_date_svg__WEBPACK_IMPORTED_MODULE_0__;\n  let todaysDate = document.createElement('p');\n  todaysDate.setAttribute('id', 'todays-date');\n  todaysDate.textContent = \"\".concat(today);\n  let todaysTimeContainer = document.createElement('div');\n  todaysTimeContainer.setAttribute('id', 'todays-time-container');\n  let todaysTimeSvg = document.createElement('img');\n  todaysTimeSvg.setAttribute('id', 'todays-time-svg');\n  todaysTimeSvg.src = _svgs_time_svg__WEBPACK_IMPORTED_MODULE_8__;\n  let todaysTime = document.createElement('p');\n  todaysTime.setAttribute('id', 'todays-time');\n  todaysTime.textContent = \"Updated: \".concat(time);\n  cityContainer.appendChild(citySvg);\n  cityContainer.appendChild(city);\n  weatherDescriptionContainer.appendChild(weatherDescriptionSvg);\n  weatherDescriptionContainer.appendChild(weatherDescription);\n  weatherTemperatureContainer.appendChild(weatherTemperatureSvg);\n  weatherTemperatureContainer.appendChild(weatherTemperature);\n  todaysDateContainer.appendChild(todaysDateSvg);\n  todaysDateContainer.appendChild(todaysDate);\n  todaysTimeContainer.appendChild(todaysTimeSvg);\n  todaysTimeContainer.appendChild(todaysTime);\n  locationInformation.appendChild(cityContainer);\n  locationInformation.appendChild(weatherDescriptionContainer);\n  locationInformation.appendChild(weatherTemperatureContainer);\n  locationInformation.appendChild(todaysDateContainer);\n  locationInformation.appendChild(todaysTimeContainer);\n  const locationExtraInformation = document.querySelector('#location-extra-information');\n  let weatherFeelsLikeContainer = document.createElement('div');\n  weatherFeelsLikeContainer.setAttribute('id', 'weather-feels-like-container');\n  let weatherFeelsLikeSvg = document.createElement('img');\n  weatherFeelsLikeSvg.setAttribute('id', 'weather-feels-like-svg');\n  weatherFeelsLikeSvg.src = _svgs_feels_like_svg__WEBPACK_IMPORTED_MODULE_1__;\n  let weatherFeelsLike = document.createElement('p');\n  weatherFeelsLike.setAttribute('id', 'weather-feels-like');\n  weatherFeelsLike.textContent = \"Feels Like: \".concat(feelsLike, \" \\xB0F\");\n  let weatherHumidityContainer = document.createElement('div');\n  weatherHumidityContainer.setAttribute('id', 'weather-humidity-container');\n  let weatherHumiditySvg = document.createElement('img');\n  weatherHumiditySvg.setAttribute('id', 'weather-humidity-svg');\n  weatherHumiditySvg.src = _svgs_humidity_svg__WEBPACK_IMPORTED_MODULE_2__;\n  let weatherHumidity = document.createElement('p');\n  weatherHumidity.setAttribute('id', 'weather-humidity');\n  weatherHumidity.textContent = \"Humidity: \".concat(humidity, \" %\");\n  let weatherMinContainer = document.createElement('div');\n  weatherMinContainer.setAttribute('id', 'weather-min-container');\n  let weatherMinSvg = document.createElement('img');\n  weatherMinSvg.setAttribute('id', 'weather-min-svg');\n  weatherMinSvg.src = _svgs_temp_min_svg__WEBPACK_IMPORTED_MODULE_6__;\n  let weatherMin = document.createElement('p');\n  weatherMin.setAttribute('id', 'weather-min');\n  weatherMin.textContent = \"Temperature Low: \".concat(tempMin, \" \\xB0F\");\n  let weatherMaxContainer = document.createElement('div');\n  weatherMaxContainer.setAttribute('id', 'weather-max-container');\n  let weatherMaxSvg = document.createElement('img');\n  weatherMaxSvg.setAttribute('id', 'weather-max-svg');\n  weatherMaxSvg.src = _svgs_temp_max_svg__WEBPACK_IMPORTED_MODULE_5__;\n  let weatherMax = document.createElement('p');\n  weatherMax.setAttribute('id', 'weather-max');\n  weatherMax.textContent = \"Temperature High: \".concat(tempMax, \" \\xB0F\");\n  let windSpeedContainer = document.createElement('div');\n  windSpeedContainer.setAttribute('id', 'wind-speed-container');\n  let windSpeedSvg = document.createElement('img');\n  windSpeedSvg.setAttribute('id', 'wind-speed-svg');\n  windSpeedSvg.src = _svgs_wind_svg__WEBPACK_IMPORTED_MODULE_10__;\n  let windSpeed = document.createElement('p');\n  windSpeed.setAttribute('id', 'wind-speed');\n  windSpeed.textContent = \"Wind Speed: \".concat(wind, \" MPH\");\n  weatherFeelsLikeContainer.appendChild(weatherFeelsLikeSvg);\n  weatherFeelsLikeContainer.appendChild(weatherFeelsLike);\n  weatherHumidityContainer.appendChild(weatherHumiditySvg);\n  weatherHumidityContainer.appendChild(weatherHumidity);\n  weatherMinContainer.appendChild(weatherMinSvg);\n  weatherMinContainer.appendChild(weatherMin);\n  weatherMaxContainer.appendChild(weatherMaxSvg);\n  weatherMaxContainer.appendChild(weatherMax);\n  windSpeedContainer.appendChild(windSpeedSvg);\n  windSpeedContainer.appendChild(windSpeed);\n  locationExtraInformation.appendChild(weatherFeelsLikeContainer);\n  locationExtraInformation.appendChild(weatherHumidityContainer);\n  locationExtraInformation.appendChild(weatherMinContainer);\n  locationExtraInformation.appendChild(weatherMaxContainer);\n  locationExtraInformation.appendChild(windSpeedContainer);\n}\n\nfunction convertDate(date) {\n  date = new Date(date).toDateString();\n  return date;\n}\n\nfunction bundleForecastData(forecastList) {\n  // Hourly forecast bundle\n  let next21Hours = forecastList.slice(0, 7);\n  next21Hours.forEach(function (item) {\n    let date = convertDate(item.dt_txt.slice(0, 10));\n    let time = item.dt_txt.slice(11, 19);\n    let temp = item.main.temp;\n    let humidity = item.main.humidity;\n    let weatherType = item.weather[0].main;\n    let weatherDescription = item.weather[0].description;\n    let windSpeed = item.wind.speed;\n    appendHourlyForecast(date, time, temp, humidity, weatherType, weatherDescription, windSpeed);\n  }); // Daily forecast bundle\n\n  let dailyForecast = [];\n  let nextDay = forecastList.slice(7, 8);\n  let secondDay = forecastList.slice(15, 16);\n  let thirdDay = forecastList.slice(23, 24);\n  let fourthDay = forecastList.slice(31, 32);\n  let fifthDay = forecastList.slice(39, 40);\n  dailyForecast.push(nextDay, secondDay, thirdDay, fourthDay, fifthDay);\n  dailyForecast.forEach(function (item) {\n    let date = convertDate(item[0].dt_txt.slice(0, 10));\n    let time = item[0].dt_txt.slice(11, 19);\n    let temp = item[0].main.temp;\n    let humidity = item[0].main.humidity;\n    let weatherType = item[0].weather[0].main;\n    let weatherDescription = item[0].weather[0].description;\n    let windSpeed = item[0].wind.speed;\n    appendDailyForecast(date, time, temp, humidity, weatherType, weatherDescription, windSpeed);\n  });\n}\n\nfunction appendHourlyForecast(date, time, temp, humidity, weatherType, weatherDescription, windSpeed) {\n  const foreCastHourly = document.querySelector('#forecast-hourly');\n  let nextHourlyForecast = document.createElement('div');\n  nextHourlyForecast.setAttribute('id', 'next-hourly-forecast');\n  nextHourlyForecast.classList.add('forecast-hourly-open');\n  let nextHourlyForecastDateContainer = document.createElement('div');\n  nextHourlyForecastDateContainer.setAttribute('id', 'next-hourly-forecast-date-container');\n  nextHourlyForecastDateContainer.classList.add('forecast-hourly-open');\n  let nextHourlyForecastDateSvg = document.createElement('img');\n  nextHourlyForecastDateSvg.setAttribute('id', 'next-hourly-forecast-date-svg');\n  nextHourlyForecastDateSvg.classList.add('forecast-hourly-item-open');\n  nextHourlyForecastDateSvg.src = _svgs_date_svg__WEBPACK_IMPORTED_MODULE_0__;\n  let nextHourlyForecastDate = document.createElement('p');\n  nextHourlyForecastDate.setAttribute('id', 'next-hourly-forecast-date');\n  nextHourlyForecastDate.classList.add('forecast-hourly-item-open');\n  nextHourlyForecastDate.textContent = \"\".concat(date);\n  let nextHourlyForecastTimeContainer = document.createElement('div');\n  nextHourlyForecastTimeContainer.setAttribute('id', 'next-hourly-forecast-time-container');\n  nextHourlyForecastTimeContainer.classList.add('forecast-hourly-open');\n  let nextHourlyForecastTimeSvg = document.createElement('img');\n  nextHourlyForecastTimeSvg.setAttribute('id', 'next-hourly-forecast-time-svg');\n  nextHourlyForecastTimeSvg.classList.add('forecast-hourly-item-open');\n  nextHourlyForecastTimeSvg.src = _svgs_time_svg__WEBPACK_IMPORTED_MODULE_8__;\n  let nextHourlyForecastTime = document.createElement('p');\n  nextHourlyForecastTime.setAttribute('id', 'next-hourly-forecast-time');\n  nextHourlyForecastTime.classList.add('forecast-hourly-item-open');\n  nextHourlyForecastTime.textContent = \"\".concat(time);\n  let nextHourlyForecastTempContainer = document.createElement('div');\n  nextHourlyForecastTempContainer.setAttribute('id', 'next-hourly-forecast-temp-container');\n  nextHourlyForecastTempContainer.classList.add('forecast-hourly-open');\n  let nextHourlyForecastTempSvg = document.createElement('img');\n  nextHourlyForecastTempSvg.setAttribute('id', 'next-hourly-forecast-temp-svg');\n  nextHourlyForecastTempSvg.classList.add('forecast-hourly-item-open');\n  nextHourlyForecastTempSvg.src = _svgs_temp_svg__WEBPACK_IMPORTED_MODULE_7__;\n  let nextHourlyForecastTemp = document.createElement('p');\n  nextHourlyForecastTemp.setAttribute('id', 'next-hourly-forecast-temp');\n  nextHourlyForecastTemp.classList.add('forecast-hourly-item-open');\n  nextHourlyForecastTemp.textContent = \"\".concat(temp, \" \\xB0F\");\n  let nextHourlyForecastHumidityContainer = document.createElement('div');\n  nextHourlyForecastHumidityContainer.setAttribute('id', 'next-hourly-forecast-humidity-container');\n  nextHourlyForecastHumidityContainer.classList.add('forecast-hourly-open');\n  let nextHourlyForecastHumiditySvg = document.createElement('img');\n  nextHourlyForecastHumiditySvg.setAttribute('id', 'next-hourly-forecast-humidity-svg');\n  nextHourlyForecastHumiditySvg.classList.add('forecast-hourly-item-open');\n  nextHourlyForecastHumiditySvg.src = _svgs_humidity_svg__WEBPACK_IMPORTED_MODULE_2__;\n  let nextHourlyForecastHumidity = document.createElement('p');\n  nextHourlyForecastHumidity.setAttribute('id', 'next-hourly-forecast-humidity');\n  nextHourlyForecastHumidity.classList.add('forecast-hourly-item-open');\n  nextHourlyForecastHumidity.textContent = \"Humidity: \".concat(humidity, \" %\");\n  let nextHourlyForecastWeatherTypeContainer = document.createElement('div');\n  nextHourlyForecastWeatherTypeContainer.setAttribute('id', 'next-hourly-forecast-weather-type-container');\n  nextHourlyForecastWeatherTypeContainer.classList.add('forecast-hourly-open');\n  let nextHourlyForecastWeatherTypeSvg = document.createElement('img');\n  nextHourlyForecastWeatherTypeSvg.setAttribute('id', 'next-hourly-forecast-weather-type-svg');\n  nextHourlyForecastWeatherTypeSvg.classList.add('forecast-hourly-item-open');\n  nextHourlyForecastWeatherTypeSvg.src = _svgs_weather_svg__WEBPACK_IMPORTED_MODULE_9__;\n  let nextHourlyForecastWeatherType = document.createElement('p');\n  nextHourlyForecastWeatherType.setAttribute('id', 'next-hourly-forecast-weather-type');\n  nextHourlyForecastWeatherType.classList.add('forecast-hourly-item-open');\n  nextHourlyForecastWeatherType.textContent = \"\".concat(weatherType, \", \").concat(weatherDescription);\n  let nextHourlyForecastWindContainer = document.createElement('div');\n  nextHourlyForecastWindContainer.setAttribute('id', 'next-hourly-forecast-wind-container');\n  nextHourlyForecastWindContainer.classList.add('forecast-hourly-open');\n  let nextHourlyForecastWindSvg = document.createElement('img');\n  nextHourlyForecastWindSvg.setAttribute('id', 'next-hourly-forecast-wind-svg');\n  nextHourlyForecastWindSvg.classList.add('forecast-hourly-item-open');\n  nextHourlyForecastWindSvg.src = _svgs_wind_svg__WEBPACK_IMPORTED_MODULE_10__;\n  let nextHourlyForecastWind = document.createElement('p');\n  nextHourlyForecastWind.setAttribute('id', 'next-hourly-forecast-wind');\n  nextHourlyForecastWind.classList.add('forecast-hourly-item-open');\n  nextHourlyForecastWind.textContent = \"Wind Speed: \".concat(windSpeed, \" MPH\");\n  nextHourlyForecastDateContainer.appendChild(nextHourlyForecastDateSvg);\n  nextHourlyForecastDateContainer.appendChild(nextHourlyForecastDate);\n  nextHourlyForecastTimeContainer.appendChild(nextHourlyForecastTimeSvg);\n  nextHourlyForecastTimeContainer.appendChild(nextHourlyForecastTime);\n  nextHourlyForecastTempContainer.appendChild(nextHourlyForecastTempSvg);\n  nextHourlyForecastTempContainer.appendChild(nextHourlyForecastTemp);\n  nextHourlyForecastHumidityContainer.appendChild(nextHourlyForecastHumiditySvg);\n  nextHourlyForecastHumidityContainer.appendChild(nextHourlyForecastHumidity);\n  nextHourlyForecastWeatherTypeContainer.appendChild(nextHourlyForecastWeatherTypeSvg);\n  nextHourlyForecastWeatherTypeContainer.appendChild(nextHourlyForecastWeatherType);\n  nextHourlyForecastWindContainer.appendChild(nextHourlyForecastWindSvg);\n  nextHourlyForecastWindContainer.appendChild(nextHourlyForecastWind);\n  nextHourlyForecast.appendChild(nextHourlyForecastDateContainer);\n  nextHourlyForecast.appendChild(nextHourlyForecastTimeContainer);\n  nextHourlyForecast.appendChild(nextHourlyForecastTempContainer);\n  nextHourlyForecast.appendChild(nextHourlyForecastHumidityContainer);\n  nextHourlyForecast.appendChild(nextHourlyForecastWeatherTypeContainer);\n  nextHourlyForecast.appendChild(nextHourlyForecastWindContainer);\n  foreCastHourly.appendChild(nextHourlyForecast);\n}\n\nfunction appendDailyForecast(date, time, temp, humidity, weatherType, weatherDescription, windSpeed) {\n  const foreCastDaily = document.querySelector('#forecast-daily');\n  let nextDailyForecast = document.createElement('div');\n  nextDailyForecast.setAttribute('id', 'next-daily-forecast');\n  nextDailyForecast.classList.add('next-daily-forecast-open');\n  let nextDailyForecastDateContainer = document.createElement('div');\n  nextDailyForecastDateContainer.setAttribute('id', 'next-daily-forecast-date-container');\n  nextDailyForecastDateContainer.classList.add('forecast-daily-open');\n  let nextDailyForecastDateSvg = document.createElement('img');\n  nextDailyForecastDateSvg.setAttribute('id', 'next-daily-forecast-date-svg');\n  nextDailyForecastDateSvg.classList.add('forecast-daily-item-open');\n  nextDailyForecastDateSvg.src = _svgs_date_svg__WEBPACK_IMPORTED_MODULE_0__;\n  let nextDailyForecastDate = document.createElement('p');\n  nextDailyForecastDate.setAttribute('id', 'next-daily-forecast-date');\n  nextDailyForecastDate.classList.add('forecast-daily-item-open');\n  nextDailyForecastDate.textContent = \"\".concat(date);\n  let nextDailyForecastTimeContainer = document.createElement('div');\n  nextDailyForecastTimeContainer.setAttribute('id', 'next-daily-forecast-time-container');\n  nextDailyForecastTimeContainer.classList.add('forecast-daily-open');\n  let nextDailyForecastTimeSvg = document.createElement('img');\n  nextDailyForecastTimeSvg.setAttribute('id', 'next-daily-forecast-time-svg');\n  nextDailyForecastTimeSvg.classList.add('forecast-daily-item-open');\n  nextDailyForecastTimeSvg.src = _svgs_time_svg__WEBPACK_IMPORTED_MODULE_8__;\n  let nextDailyForecastTime = document.createElement('p');\n  nextDailyForecastTime.setAttribute('id', 'next-daily-forecast-time');\n  nextDailyForecastTime.classList.add('forecast-daily-item-open');\n  nextDailyForecastTime.textContent = \"\".concat(time);\n  let nextDailyForecastTempContainer = document.createElement('div');\n  nextDailyForecastTempContainer.setAttribute('id', 'next-daily-forecast-temp-container');\n  nextDailyForecastTempContainer.classList.add('forecast-daily-open');\n  let nextDailyForecastTempSvg = document.createElement('img');\n  nextDailyForecastTempSvg.setAttribute('id', 'next-daily-forecast-temp-svg');\n  nextDailyForecastTempSvg.classList.add('forecast-daily-item-open');\n  nextDailyForecastTempSvg.src = _svgs_temp_svg__WEBPACK_IMPORTED_MODULE_7__;\n  let nextDailyForecastTemp = document.createElement('p');\n  nextDailyForecastTemp.setAttribute('id', 'next-daily-forecast-temp');\n  nextDailyForecastTemp.classList.add('forecast-daily-item-open');\n  nextDailyForecastTemp.textContent = \"\".concat(temp, \" \\xB0F\");\n  let nextDailyForecastHumidityContainer = document.createElement('div');\n  nextDailyForecastHumidityContainer.setAttribute('id', 'next-daily-forecast-humidity-container');\n  nextDailyForecastHumidityContainer.classList.add('forecast-daily-open');\n  let nextDailyForecastHumiditySvg = document.createElement('img');\n  nextDailyForecastHumiditySvg.setAttribute('id', 'next-daily-forecast-humidity-svg');\n  nextDailyForecastHumiditySvg.classList.add('forecast-daily-item-open');\n  nextDailyForecastHumiditySvg.src = _svgs_humidity_svg__WEBPACK_IMPORTED_MODULE_2__;\n  let nextDailyForecastHumidity = document.createElement('p');\n  nextDailyForecastHumidity.setAttribute('id', 'next-daily-forecast-humidity');\n  nextDailyForecastHumidity.classList.add('forecast-daily-item-open');\n  nextDailyForecastHumidity.textContent = \"Humidity: \".concat(humidity, \" %\");\n  let nextDailyForecastWeatherTypeContainer = document.createElement('div');\n  nextDailyForecastWeatherTypeContainer.setAttribute('id', 'next-daily-forecast-weather-type-container');\n  nextDailyForecastWeatherTypeContainer.classList.add('forecast-daily-open');\n  let nextDailyForecastWeatherTypeSvg = document.createElement('img');\n  nextDailyForecastWeatherTypeSvg.setAttribute('id', 'next-daily-forecast-weather-type-svg');\n  nextDailyForecastWeatherTypeSvg.classList.add('forecast-daily-item-open');\n  nextDailyForecastWeatherTypeSvg.src = _svgs_weather_svg__WEBPACK_IMPORTED_MODULE_9__;\n  let nextDailyForecastWeatherType = document.createElement('p');\n  nextDailyForecastWeatherType.setAttribute('id', 'next-daily-forecast-weather-type');\n  nextDailyForecastWeatherType.classList.add('forecast-daily-item-open');\n  nextDailyForecastWeatherType.textContent = \"\".concat(weatherType, \", \").concat(weatherDescription);\n  let nextDailyForecastWindContainer = document.createElement('div');\n  nextDailyForecastWindContainer.setAttribute('id', 'next-daily-forecast-wind-container');\n  nextDailyForecastWindContainer.classList.add('forecast-daily-open');\n  let nextDailyForecastWindSvg = document.createElement('img');\n  nextDailyForecastWindSvg.setAttribute('id', 'next-daily-forecast-wind-svg');\n  nextDailyForecastWindSvg.classList.add('forecast-daily-item-open');\n  nextDailyForecastWindSvg.src = _svgs_wind_svg__WEBPACK_IMPORTED_MODULE_10__;\n  let nextDailyForecastWind = document.createElement('p');\n  nextDailyForecastWind.setAttribute('id', 'next-daily-forecast-wind');\n  nextDailyForecastWind.classList.add('forecast-daily-item-open');\n  nextDailyForecastWind.textContent = \"Wind Speed: \".concat(windSpeed, \" MPH\");\n  nextDailyForecastDateContainer.appendChild(nextDailyForecastDateSvg);\n  nextDailyForecastDateContainer.appendChild(nextDailyForecastDate);\n  nextDailyForecastTimeContainer.appendChild(nextDailyForecastTimeSvg);\n  nextDailyForecastTimeContainer.appendChild(nextDailyForecastTime);\n  nextDailyForecastTempContainer.appendChild(nextDailyForecastTempSvg);\n  nextDailyForecastTempContainer.appendChild(nextDailyForecastTemp);\n  nextDailyForecastHumidityContainer.appendChild(nextDailyForecastHumiditySvg);\n  nextDailyForecastHumidityContainer.appendChild(nextDailyForecastHumidity);\n  nextDailyForecastWeatherTypeContainer.appendChild(nextDailyForecastWeatherTypeSvg);\n  nextDailyForecastWeatherTypeContainer.appendChild(nextDailyForecastWeatherType);\n  nextDailyForecastWindContainer.appendChild(nextDailyForecastWindSvg);\n  nextDailyForecastWindContainer.appendChild(nextDailyForecastWind);\n  nextDailyForecast.appendChild(nextDailyForecastDateContainer);\n  nextDailyForecast.appendChild(nextDailyForecastTimeContainer);\n  nextDailyForecast.appendChild(nextDailyForecastTempContainer);\n  nextDailyForecast.appendChild(nextDailyForecastHumidityContainer);\n  nextDailyForecast.appendChild(nextDailyForecastWeatherTypeContainer);\n  nextDailyForecast.appendChild(nextDailyForecastWindContainer);\n  foreCastDaily.appendChild(nextDailyForecast);\n}\n\nfunction showHourlyForecast() {\n  const dailyForecastButton = document.querySelector('#daily-forecast-button');\n  const hourlyForecastButton = document.querySelector('#hourly-forecast-button');\n  const forecastDaily = document.querySelector('#forecast-daily');\n  const forecastHourly = document.querySelector('#forecast-hourly');\n\n  if (dailyForecastButton.classList.contains('daily-forecast-button-on')) {\n    dailyForecastButton.classList.remove('daily-forecast-button-on');\n    dailyForecastButton.classList.add('daily-forecast-button-off');\n    hourlyForecastButton.classList.add('hourly-forecast-button-on');\n    hourlyForecastButton.classList.remove('hourly-forecast-button-off');\n    forecastDaily.classList.remove('forecast-daily-on');\n    forecastDaily.classList.add('forecast-daily-off');\n    forecastHourly.classList.remove('forecast-hourly-off');\n    forecastHourly.classList.add('forecast-hourly-on');\n  } else if (hourlyForecastButton.classList.contains('hourly-forecast-button-on')) {\n    return;\n  } else {\n    return;\n  }\n}\n\nfunction showDailyForecast() {\n  const dailyForecastButton = document.querySelector('#daily-forecast-button');\n  const hourlyForecastButton = document.querySelector('#hourly-forecast-button');\n  const forecastDaily = document.querySelector('#forecast-daily');\n  const forecastHourly = document.querySelector('#forecast-hourly');\n\n  if (dailyForecastButton.classList.contains('daily-forecast-button-on')) {\n    return;\n  } else if (hourlyForecastButton.classList.contains('hourly-forecast-button-on')) {\n    dailyForecastButton.classList.add('daily-forecast-button-on');\n    dailyForecastButton.classList.remove('daily-forecast-button-off');\n    hourlyForecastButton.classList.remove('hourly-forecast-button-on');\n    hourlyForecastButton.classList.add('hourly-forecast-button-off');\n    forecastDaily.classList.add('forecast-daily-on');\n    forecastDaily.classList.remove('forecast-daily-off');\n    forecastHourly.classList.add('forecast-hourly-off');\n    forecastHourly.classList.remove('forecast-hourly-on');\n  } else {\n    return;\n  }\n}\n\nfunction removePreviousInformation() {\n  const locationInformation = document.querySelector('#location-information');\n  const locationExtraInformation = document.querySelector('#location-extra-information');\n  const forecastHourly = document.querySelector('#forecast-hourly');\n  const forecastDaily = document.querySelector('#forecast-daily');\n  removeAllChildNodes(locationInformation);\n  removeAllChildNodes(locationExtraInformation);\n  removeAllChildNodes(forecastHourly);\n  removeAllChildNodes(forecastDaily);\n}\n\nfunction removeAllChildNodes(parent) {\n  while (parent.firstChild) {\n    parent.removeChild(parent.firstChild);\n  }\n}\n\nconst farenheitToCelsius = function (f) {\n  let total;\n  total = (f - 32) * 5 / 9;\n  let rounded = Math.round(total * 10) / 10;\n  return rounded;\n};\n\nconst celsiusToFarenheit = function (c) {\n  let total;\n  total = c * (9 / 5) + 32;\n  let rounded = Math.round(total * 10) / 10;\n  return rounded;\n};\n\n//# sourceURL=webpack://weather-app/./src/app.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.js */ \"./src/app.js\");\n\n\nwindow.onload = function () {\n  (0,_app_js__WEBPACK_IMPORTED_MODULE_0__.getCity)();\n};\n\n(function attachEventListeners() {\n  const hourlyButton = document.querySelector('#hourly-forecast-button');\n  hourlyButton.addEventListener('click', _app_js__WEBPACK_IMPORTED_MODULE_0__.showHourlyForecast);\n  const dailyButton = document.querySelector('#daily-forecast-button');\n  dailyButton.addEventListener('click', _app_js__WEBPACK_IMPORTED_MODULE_0__.showDailyForecast);\n  const searchInput = document.querySelector('#search-bar-input');\n  searchInput.addEventListener('keypress', function (e) {\n    if (e.keyCode === 13) {\n      (0,_app_js__WEBPACK_IMPORTED_MODULE_0__.removePreviousInformation)();\n      (0,_app_js__WEBPACK_IMPORTED_MODULE_0__.getCity)();\n    } else {\n      return;\n    }\n  });\n})();\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ }),

/***/ "./src/svgs/date.svg":
/*!***************************!*\
  !*** ./src/svgs/date.svg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"0330c6889cb95fe5ad10.svg\";\n\n//# sourceURL=webpack://weather-app/./src/svgs/date.svg?");

/***/ }),

/***/ "./src/svgs/feels-like.svg":
/*!*********************************!*\
  !*** ./src/svgs/feels-like.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"99a60685c883de448609.svg\";\n\n//# sourceURL=webpack://weather-app/./src/svgs/feels-like.svg?");

/***/ }),

/***/ "./src/svgs/humidity.svg":
/*!*******************************!*\
  !*** ./src/svgs/humidity.svg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"800d006a543de33d7e3d.svg\";\n\n//# sourceURL=webpack://weather-app/./src/svgs/humidity.svg?");

/***/ }),

/***/ "./src/svgs/location.svg":
/*!*******************************!*\
  !*** ./src/svgs/location.svg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"f2fee57a7f55047a4bdb.svg\";\n\n//# sourceURL=webpack://weather-app/./src/svgs/location.svg?");

/***/ }),

/***/ "./src/svgs/search.svg":
/*!*****************************!*\
  !*** ./src/svgs/search.svg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"230bea6ac20a05aaa7b1.svg\";\n\n//# sourceURL=webpack://weather-app/./src/svgs/search.svg?");

/***/ }),

/***/ "./src/svgs/temp-max.svg":
/*!*******************************!*\
  !*** ./src/svgs/temp-max.svg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"e72f3d0c9aceac6fd34e.svg\";\n\n//# sourceURL=webpack://weather-app/./src/svgs/temp-max.svg?");

/***/ }),

/***/ "./src/svgs/temp-min.svg":
/*!*******************************!*\
  !*** ./src/svgs/temp-min.svg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"ec578bd37716e31c100c.svg\";\n\n//# sourceURL=webpack://weather-app/./src/svgs/temp-min.svg?");

/***/ }),

/***/ "./src/svgs/temp.svg":
/*!***************************!*\
  !*** ./src/svgs/temp.svg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"2bf150cbb30a63043a8c.svg\";\n\n//# sourceURL=webpack://weather-app/./src/svgs/temp.svg?");

/***/ }),

/***/ "./src/svgs/time.svg":
/*!***************************!*\
  !*** ./src/svgs/time.svg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"73ffa0631c8be363df0a.svg\";\n\n//# sourceURL=webpack://weather-app/./src/svgs/time.svg?");

/***/ }),

/***/ "./src/svgs/weather.svg":
/*!******************************!*\
  !*** ./src/svgs/weather.svg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"6cb8238507668441d7ee.svg\";\n\n//# sourceURL=webpack://weather-app/./src/svgs/weather.svg?");

/***/ }),

/***/ "./src/svgs/wind.svg":
/*!***************************!*\
  !*** ./src/svgs/wind.svg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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
/******/ 			// no module.id needed
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
/************************************************************************/
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;