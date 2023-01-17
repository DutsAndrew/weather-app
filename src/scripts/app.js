export {
  getCity,
  removePreviousInformation,
  showHourlyForecast,
  showDailyForecast,
  showFahrenheit,
  showCelsius
}

import dateSvgImport from '../svgs/date.svg';
import feelsLikeSvgImport from '../svgs/feels-like.svg';
import humiditySvgImport from '../svgs/humidity.svg';
import locationSvgImport from '../svgs/location.svg';
import searchSvgImport from '../svgs/search.svg';
import tempMaxSvgImport from '../svgs/temp-max.svg';
import tempMinSvgImport from '../svgs/temp-min.svg';
import tempSvgImport from '../svgs/temp.svg';
import timeSvgImport from '../svgs/time.svg';
import weatherSvgImport from '../svgs/weather.svg';
import windSvgImport from '../svgs/wind.svg';

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
    const response = await fetch (searchCity),
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
        lat = `&lat=${retrievedCityLat}`,
        lon = `&lon=${retrievedCityLon}`,
        units = '&units=imperial',
        apiKey = '&appid=6c89c21bfc11d403be41f489af3b2eae',
        searchWeather = api + lat + lon + apiKey + units;

  try {
    const response = await fetch (searchWeather, {mode: 'cors'});
    const searchData = await response.json();
    
    // variables for information to be appended to the DOM for weather display
    const weatherType = searchData.weather[0].main,
          description = searchData.weather[0].description,
          country = searchData.sys.country,
          humidity = searchData.main.humidity,
          wind = searchData.wind.speed;

    let temp,
        feelsLike,
        tempMin,
        tempMax;  

    //checks if celsius button is on for conversion
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

    appendCurrentWeather(
      temp,
      weatherType,
      description,
      country,
      feelsLike,
      humidity,
      tempMin,
      tempMax,
      wind
    );

  } catch (error) {
    console.log(error);
    alert('The server could not find what you were looking for, please try again');
  }
}

async function getWeatherForecast() {
  const api = 'https://api.openweathermap.org/data/2.5/forecast?',
        lat = `&lat=${retrievedCityLat}`,
        lon = `&lon=${retrievedCityLon}`,
        language = '&lang=en',
        units = '&units=imperial',
        apiKey = '&appid=6c89c21bfc11d403be41f489af3b2eae',
        searchWeather = api + lat + lon + apiKey + language + units;

  try {
    const response = await fetch (searchWeather, {mode: 'cors'}),
          searchData = await response.json(),
          forecastList = searchData.list;

    bundleForecastData(forecastList);
  } catch (error) {
    console.log(error);
    alert('The server could not find what you were looking for, please try again');
  }
}

function appendCurrentWeather(
  temp,
  weatherType,
  description,
  country,
  feelsLike,
  humidity,
  tempMin,
  tempMax,
  wind
  ) {
    let today = new Date().toDateString();
    let time = new Date().toLocaleTimeString();
    const locationInformation = document.querySelector('#location-information');
    const cityContainer = document.createElement('div');
      cityContainer.setAttribute('id', 'city-container');
    const citySvg = document.createElement('img');
      citySvg.setAttribute('id', 'city-svg');
      citySvg.src = locationSvgImport;
    const city = document.createElement('p');
      city.setAttribute('id', 'city-name');
      city.textContent = `${retrievedCityName}, ${country}`;
    const weatherDescriptionContainer = document.createElement('div');
      weatherDescriptionContainer.setAttribute('id', 'weather-description-container');
    const weatherDescriptionSvg = document.createElement('img');
      weatherDescriptionSvg.setAttribute('id', 'weather-description-svg');
      weatherDescriptionSvg.src = weatherSvgImport;
    const weatherDescription = document.createElement('p');
      weatherDescription.setAttribute('id', 'weather-description');
      weatherDescription.textContent = `${weatherType}, ${description}`;
    const weatherTemperatureContainer = document.createElement('div');
      weatherTemperatureContainer.setAttribute('id', 'weather-temperature-container');
    const weatherTemperatureSvg = document.createElement('img');
      weatherTemperatureSvg.setAttribute('id', 'weather-temperature-svg');
      weatherTemperatureSvg.src = tempSvgImport;
    const weatherTemperature = document.createElement('p');
      weatherTemperature.setAttribute('id', 'weather-temperature');
    const todaysDateContainer = document.createElement('div');
      todaysDateContainer.setAttribute('id', 'todays-date-container');
    const todaysDateSvg = document.createElement('img');
      todaysDateSvg.setAttribute('id', 'todays-date-svg');
      todaysDateSvg.src = dateSvgImport;
    const todaysDate = document.createElement('p');
      todaysDate.setAttribute('id', 'todays-date');
      todaysDate.textContent = `${today}`;
    const todaysTimeContainer = document.createElement('div');
      todaysTimeContainer.setAttribute('id', 'todays-time-container');
    const todaysTimeSvg = document.createElement('img');
      todaysTimeSvg.setAttribute('id', 'todays-time-svg');
      todaysTimeSvg.src = timeSvgImport;
    const todaysTime = document.createElement('p');
      todaysTime.setAttribute('id', 'todays-time');
      todaysTime.textContent = `Updated: ${time}`;

    //checks if celsius button is on for conversion
    const celsiusButton = document.querySelector('#celsius-button');
    if (celsiusButton.classList.contains('celsius-on')) {
      weatherTemperature.textContent = `${temp} °C`;
    } else {
      weatherTemperature.textContent = `${temp} °F`;
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
      weatherFeelsLikeSvg.src = feelsLikeSvgImport;
    const weatherFeelsLike = document.createElement('p');
      weatherFeelsLike.setAttribute('id', 'weather-feels-like');
    const weatherHumidityContainer = document.createElement('div');
      weatherHumidityContainer.setAttribute('id', 'weather-humidity-container');
    const weatherHumiditySvg = document.createElement('img');
      weatherHumiditySvg.setAttribute('id', 'weather-humidity-svg');
      weatherHumiditySvg.src = humiditySvgImport;
    const weatherHumidity = document.createElement('p');
      weatherHumidity.setAttribute('id', 'weather-humidity');
      weatherHumidity.textContent = `Humidity: ${humidity} %`;
    const weatherMinContainer = document.createElement('div');
      weatherMinContainer.setAttribute('id', 'weather-min-container');
    const weatherMinSvg = document.createElement('img');
      weatherMinSvg.setAttribute('id', 'weather-min-svg');
      weatherMinSvg.src = tempMinSvgImport;
    const weatherMin = document.createElement('p');
      weatherMin.setAttribute('id', 'weather-min');
    const weatherMaxContainer = document.createElement('div');
      weatherMaxContainer.setAttribute('id', 'weather-max-container');
    const weatherMaxSvg = document.createElement('img');
      weatherMaxSvg.setAttribute('id', 'weather-max-svg');
      weatherMaxSvg.src = tempMaxSvgImport;
    const weatherMax = document.createElement('p');
      weatherMax.setAttribute('id', 'weather-max');
    const windSpeedContainer = document.createElement('div');
      windSpeedContainer.setAttribute('id', 'wind-speed-container');
    const windSpeedSvg = document.createElement('img');
      windSpeedSvg.setAttribute('id', 'wind-speed-svg');
      windSpeedSvg.src = windSvgImport;
    const windSpeed = document.createElement('p');
      windSpeed.setAttribute('id', 'wind-speed');
      windSpeed.textContent = `Wind Speed: ${wind} MPH`;

    // controls for celsius conversion
    if (celsiusButton.classList.contains('celsius-on')) {
      weatherFeelsLike.textContent = `Feels Like: ${feelsLike} °C`;
      weatherMin.textContent = `Low: ${tempMin} °C`;
      weatherMax.textContent = `High: ${tempMax} °C`;
    } else {
      weatherFeelsLike.textContent = `Feels Like: ${feelsLike} °F`;
      weatherMin.textContent = `Low: ${tempMin} °F`;
      weatherMax.textContent = `High: ${tempMax} °F`;
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
  const celsiusButton = document.querySelector('#celsius-button');

  // Hourly forecast bundle
  const next21Hours = forecastList.slice(0, 7);
  next21Hours.forEach(item => {
    const date = convertDate(item.dt_txt.slice(0, 10)),
          time = item.dt_txt.slice(11, 19),
          humidity = item.main.humidity,
          weatherType = item.weather[0].main,
          weatherDescription = item.weather[0].description,
          windSpeed = item.wind.speed;

    let temp = item.main.temp;


    //checks if celsius button is on for conversion
    if (celsiusButton.classList.contains('celsius-on')) {
      temp = fahrenheitToCelsius(item.main.temp);
    } else {
      temp = item.main.temp;
    }

    appendHourlyForecast(
      date,
      time,
      temp,
      humidity,
      weatherType,
      weatherDescription,
      windSpeed
      );
  })
  
  // Daily forecast bundle
  const dailyForecast = [],
        nextDay = forecastList.slice(7, 8),
        secondDay = forecastList.slice(15, 16),
        thirdDay = forecastList.slice(23, 24),
        fourthDay = forecastList.slice(31, 32),
        fifthDay = forecastList.slice(39, 40);

  dailyForecast.push(nextDay, secondDay, thirdDay, fourthDay, fifthDay);
  dailyForecast.forEach(item => {

    const date = convertDate(item[0].dt_txt.slice(0, 10)),
          time = item[0].dt_txt.slice(11, 19),
          humidity = item[0].main.humidity,
          weatherType = item[0].weather[0].main,
          weatherDescription = item[0].weather[0].description,
          windSpeed = item[0].wind.speed;

    let temp = item[0].main.temp;

    //checks if celsius button is on for conversion
    if (celsiusButton.classList.contains('celsius-on')) {
      temp = fahrenheitToCelsius(item[0].main.temp);
    } else {
      temp = item[0].main.temp;
    }

    appendDailyForecast(
      date,
      time,
      temp,
      humidity,
      weatherType,
      weatherDescription,
      windSpeed
    )
  })
}

function appendHourlyForecast(
  date,
  time,
  temp,
  humidity,
  weatherType,
  weatherDescription,
  windSpeed
  ) {
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
    nextHourlyForecastDateSvg.src = dateSvgImport;
  const nextHourlyForecastDate = document.createElement('p');
    nextHourlyForecastDate.setAttribute('id', 'next-hourly-forecast-date');
    nextHourlyForecastDate.classList.add('forecast-hourly-item-open');
    nextHourlyForecastDate.textContent = `${date}`;
  const nextHourlyForecastTimeContainer = document.createElement('div');
    nextHourlyForecastTimeContainer.setAttribute('id', 'next-hourly-forecast-time-container');
    nextHourlyForecastTimeContainer.classList.add('forecast-hourly-open');
  const nextHourlyForecastTimeSvg = document.createElement('img');
    nextHourlyForecastTimeSvg.setAttribute('id', 'next-hourly-forecast-time-svg');
    nextHourlyForecastTimeSvg.classList.add('forecast-hourly-item-open');
    nextHourlyForecastTimeSvg.src = timeSvgImport;
  const nextHourlyForecastTime = document.createElement('p');
    nextHourlyForecastTime.setAttribute('id', 'next-hourly-forecast-time');
    nextHourlyForecastTime.classList.add('forecast-hourly-item-open');
    nextHourlyForecastTime.textContent = `${time}`;
  const nextHourlyForecastTempContainer = document.createElement('div');
    nextHourlyForecastTempContainer.setAttribute('id', 'next-hourly-forecast-temp-container');
    nextHourlyForecastTempContainer.classList.add('forecast-hourly-open');
  const nextHourlyForecastTempSvg = document.createElement('img');
    nextHourlyForecastTempSvg.setAttribute('id', 'next-hourly-forecast-temp-svg');
    nextHourlyForecastTempSvg.classList.add('forecast-hourly-item-open');
    nextHourlyForecastTempSvg.src = tempSvgImport;
  const nextHourlyForecastTemp = document.createElement('p');
    nextHourlyForecastTemp.setAttribute('id', 'next-hourly-forecast-temp');
    nextHourlyForecastTemp.classList.add('forecast-hourly-item-open');
  const nextHourlyForecastHumidityContainer = document.createElement('div');
    nextHourlyForecastHumidityContainer.setAttribute('id', 'next-hourly-forecast-humidity-container');
    nextHourlyForecastHumidityContainer.classList.add('forecast-hourly-open');
  const nextHourlyForecastHumiditySvg = document.createElement('img');
    nextHourlyForecastHumiditySvg.setAttribute('id', 'next-hourly-forecast-humidity-svg');
    nextHourlyForecastHumiditySvg.classList.add('forecast-hourly-item-open');
    nextHourlyForecastHumiditySvg.src = humiditySvgImport;
  const nextHourlyForecastHumidity = document.createElement('p');
    nextHourlyForecastHumidity.setAttribute('id', 'next-hourly-forecast-humidity');
    nextHourlyForecastHumidity.classList.add('forecast-hourly-item-open');
    nextHourlyForecastHumidity.textContent = `Humidity: ${humidity} %`;
  const nextHourlyForecastWeatherTypeContainer = document.createElement('div');
    nextHourlyForecastWeatherTypeContainer.setAttribute('id', 'next-hourly-forecast-weather-type-container');
    nextHourlyForecastWeatherTypeContainer.classList.add('forecast-hourly-open');
  const nextHourlyForecastWeatherTypeSvg = document.createElement('img');
    nextHourlyForecastWeatherTypeSvg.setAttribute('id', 'next-hourly-forecast-weather-type-svg');
    nextHourlyForecastWeatherTypeSvg.classList.add('forecast-hourly-item-open');
    nextHourlyForecastWeatherTypeSvg.src = weatherSvgImport;
  const nextHourlyForecastWeatherType = document.createElement('p');
    nextHourlyForecastWeatherType.setAttribute('id', 'next-hourly-forecast-weather-type');
    nextHourlyForecastWeatherType.classList.add('forecast-hourly-item-open');
    nextHourlyForecastWeatherType.textContent = `${weatherType}, ${weatherDescription}`;
  const nextHourlyForecastWindContainer = document.createElement('div');
    nextHourlyForecastWindContainer.setAttribute('id', 'next-hourly-forecast-wind-container');
    nextHourlyForecastWindContainer.classList.add('forecast-hourly-open');
  const nextHourlyForecastWindSvg = document.createElement('img');
    nextHourlyForecastWindSvg.setAttribute('id', 'next-hourly-forecast-wind-svg');
    nextHourlyForecastWindSvg.classList.add('forecast-hourly-item-open');
    nextHourlyForecastWindSvg.src = windSvgImport;
  const nextHourlyForecastWind = document.createElement('p');
    nextHourlyForecastWind.setAttribute('id', 'next-hourly-forecast-wind');
    nextHourlyForecastWind.classList.add('forecast-hourly-item-open');
    nextHourlyForecastWind.textContent = `Wind Speed: ${windSpeed} MPH`;

  //checks if celsius button is on for conversion
  const celsiusButton = document.querySelector('#celsius-button');
  if (celsiusButton.classList.contains('celsius-on')) {
    nextHourlyForecastTemp.textContent = `${temp} °C`;
  } else {
    nextHourlyForecastTemp.textContent = `${temp} °F`;
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

function appendDailyForecast(
  date,
  time,
  temp,
  humidity,
  weatherType,
  weatherDescription,
  windSpeed
) {
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
    nextDailyForecastDateSvg.src = dateSvgImport;
  const nextDailyForecastDate = document.createElement('p');
    nextDailyForecastDate.setAttribute('id', 'next-daily-forecast-date');
    nextDailyForecastDate.classList.add('forecast-daily-item-open');
    nextDailyForecastDate.textContent = `${date}`;
  const nextDailyForecastTimeContainer = document.createElement('div');
    nextDailyForecastTimeContainer.setAttribute('id', 'next-daily-forecast-time-container');
    nextDailyForecastTimeContainer.classList.add('forecast-daily-open');
  const nextDailyForecastTimeSvg = document.createElement('img');
    nextDailyForecastTimeSvg.setAttribute('id', 'next-daily-forecast-time-svg');
    nextDailyForecastTimeSvg.classList.add('forecast-daily-item-open');
    nextDailyForecastTimeSvg.src = timeSvgImport;
  const nextDailyForecastTime = document.createElement('p');
    nextDailyForecastTime.setAttribute('id', 'next-daily-forecast-time');
    nextDailyForecastTime.classList.add('forecast-daily-item-open');
    nextDailyForecastTime.textContent = `${time}`;
  const nextDailyForecastTempContainer = document.createElement('div');
    nextDailyForecastTempContainer.setAttribute('id', 'next-daily-forecast-temp-container');
    nextDailyForecastTempContainer.classList.add('forecast-daily-open');
  const nextDailyForecastTempSvg = document.createElement('img');
    nextDailyForecastTempSvg.setAttribute('id', 'next-daily-forecast-temp-svg');
    nextDailyForecastTempSvg.classList.add('forecast-daily-item-open');
    nextDailyForecastTempSvg.src = tempSvgImport;
  const nextDailyForecastTemp = document.createElement('p');
    nextDailyForecastTemp.setAttribute('id', 'next-daily-forecast-temp');
    nextDailyForecastTemp.classList.add('forecast-daily-item-open');
  const nextDailyForecastHumidityContainer = document.createElement('div');
    nextDailyForecastHumidityContainer.setAttribute('id', 'next-daily-forecast-humidity-container');
    nextDailyForecastHumidityContainer.classList.add('forecast-daily-open');
  const nextDailyForecastHumiditySvg = document.createElement('img');
    nextDailyForecastHumiditySvg.setAttribute('id', 'next-daily-forecast-humidity-svg');
    nextDailyForecastHumiditySvg.classList.add('forecast-daily-item-open');
    nextDailyForecastHumiditySvg.src = humiditySvgImport;
  const nextDailyForecastHumidity = document.createElement('p');
    nextDailyForecastHumidity.setAttribute('id', 'next-daily-forecast-humidity');
    nextDailyForecastHumidity.classList.add('forecast-daily-item-open');
    nextDailyForecastHumidity.textContent = `Humidity: ${humidity} %`;
  const nextDailyForecastWeatherTypeContainer = document.createElement('div');
    nextDailyForecastWeatherTypeContainer.setAttribute('id', 'next-daily-forecast-weather-type-container');
    nextDailyForecastWeatherTypeContainer.classList.add('forecast-daily-open');
  const nextDailyForecastWeatherTypeSvg = document.createElement('img');
    nextDailyForecastWeatherTypeSvg.setAttribute('id', 'next-daily-forecast-weather-type-svg');
    nextDailyForecastWeatherTypeSvg.classList.add('forecast-daily-item-open');
    nextDailyForecastWeatherTypeSvg.src = weatherSvgImport;
  const nextDailyForecastWeatherType = document.createElement('p');
    nextDailyForecastWeatherType.setAttribute('id', 'next-daily-forecast-weather-type');
    nextDailyForecastWeatherType.classList.add('forecast-daily-item-open');
    nextDailyForecastWeatherType.textContent = `${weatherType}, ${weatherDescription}`;
  const nextDailyForecastWindContainer = document.createElement('div');
    nextDailyForecastWindContainer.setAttribute('id', 'next-daily-forecast-wind-container');
    nextDailyForecastWindContainer.classList.add('forecast-daily-open');
  const nextDailyForecastWindSvg = document.createElement('img');
    nextDailyForecastWindSvg.setAttribute('id', 'next-daily-forecast-wind-svg');
    nextDailyForecastWindSvg.classList.add('forecast-daily-item-open');
    nextDailyForecastWindSvg.src = windSvgImport;
  const nextDailyForecastWind = document.createElement('p');
    nextDailyForecastWind.setAttribute('id', 'next-daily-forecast-wind');
    nextDailyForecastWind.classList.add('forecast-daily-item-open');
    nextDailyForecastWind.textContent = `Wind Speed: ${windSpeed} MPH`;

  //checks if celsius button is on for conversion
  const celsiusButton = document.querySelector('#celsius-button');
  if (celsiusButton.classList.contains('celsius-on')) {
    nextDailyForecastTemp.textContent = `${temp} °C`;
  } else {
    nextDailyForecastTemp.textContent = `${temp} °F`;
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
        celsiusButton = document.querySelector('#celsius-button');

  // informs user on when to expect to see the celsius/fahrenheit reading change. It only shows it once per session
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
        celsiusButton = document.querySelector('#celsius-button');

  // informs user on when to expect to see the celsius/fahrenheit reading change. It only shows it once per session
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
  const total = (number-32) * 5/9,
        rounded = Math.round(total * 10) / 10;

  number = rounded;
  return number;
}