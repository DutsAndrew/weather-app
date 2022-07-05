window.onload = () => {
  getCity();
}

(function attachEventListeners() {
  const hourlyButton = document.querySelector('#hourly-forecast-button');
    hourlyButton.addEventListener('click', showHourlyForecast);

  const dailyButton = document.querySelector('#daily-forecast-button');
    dailyButton.addEventListener('click', showDailyForecast);
})();

let retrievedCityName;
let retrievedCityLat;
let retrievedCityLon;

async function getCity() {
  let api = 'http://api.openweathermap.org/geo/1.0/direct?';
  let city = 'q=Reykjavík';
  let amountToRetrieve = '&limit=1';
  let language = '&lang=en';
  let apiKey = '&appid=6c89c21bfc11d403be41f489af3b2eae';
  let searchCity = api + city + amountToRetrieve + language + apiKey;

  try {
    const response = await fetch (searchCity, {mode: 'cors'});
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
  let api = 'https://api.openweathermap.org/data/2.5/weather?';
  let lat = `&lat=${retrievedCityLat}`;
  let lon = `&lon=${retrievedCityLon}`;
  let language = '&lang=en';
  let units = '&units=imperial';
  let apiKey = '&appid=6c89c21bfc11d403be41f489af3b2eae';
  let searchWeather = api + lat + lon + apiKey + language + units;

  try {
    const response = await fetch (searchWeather, {mode: 'cors'});
    const searchData = await response.json();
    
    // variables for information to be appended to the DOM for weather display
    let temp = searchData.main.temp;
    let weatherType = searchData.weather[0].main;
    let description = searchData.weather[0].description;
    let country = searchData.sys.country;
    let feelsLike = searchData.main.feels_like;
    let humidity = searchData.main.humidity;
    let tempMin = searchData.main.temp_min;
    let tempMax = searchData.main.temp_max;
    let wind = searchData.wind.speed;
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
  let api = 'https://api.openweathermap.org/data/2.5/forecast?';
  let lat = `&lat=${retrievedCityLat}`;
  let lon = `&lon=${retrievedCityLon}`;
  let language = '&lang=en';
  let units = '&units=imperial';
  let apiKey = '&appid=6c89c21bfc11d403be41f489af3b2eae';
  let searchWeather = api + lat + lon + apiKey + language + units;

  try {
    const response = await fetch (searchWeather, {mode: 'cors'});
    const searchData = await response.json();
    let forecastList = searchData.list;
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
    let cityContainer = document.createElement('div');
      cityContainer.setAttribute('id', 'city-container');
    let citySvg = document.createElement('img');
      citySvg.setAttribute('id', 'city-svg');
      citySvg.src = 'svgs/location.svg';
    let city = document.createElement('p');
      city.setAttribute('id', 'city-name');
      city.textContent = `${retrievedCityName}, ${country}`;
    let weatherDescriptionContainer = document.createElement('div');
      weatherDescriptionContainer.setAttribute('id', 'weather-description-container');
    let weatherDescriptionSvg = document.createElement('img');
      weatherDescriptionSvg.setAttribute('id', 'weather-description-svg');
      // weatherDescriptionSvg.src = FIND AWAY TO ALTERNATE SVG BASED ON WEATHER MAIN/DESCRIPTION FROM API
    let weatherDescription = document.createElement('p');
      weatherDescription.setAttribute('id', 'weather-description');
      weatherDescription.textContent = `${weatherType}, ${description}`;
    let weatherTemperatureContainer = document.createElement('div');
      weatherTemperatureContainer.setAttribute('id', 'weather-temperature-container');
    let weatherTemperatureSvg = document.createElement('img');
      weatherTemperatureSvg.setAttribute('id', 'weather-temperature-svg');
      weatherTemperatureSvg.src = 'svgs/temp.svg';
    let weatherTemperature = document.createElement('p');
      weatherTemperature.setAttribute('id', 'weather-temperature');
      weatherTemperature.textContent = `${temp} °F`;
    let todaysDateContainer = document.createElement('div');
      todaysDateContainer.setAttribute('id', 'todays-date-container');
    let todaysDateSvg = document.createElement('img');
      todaysDateSvg.setAttribute('id', 'todays-date-svg');
      todaysDateSvg.src = 'svgs/date.svg';
    let todaysDate = document.createElement('p');
      todaysDate.setAttribute('id', 'todays-date');
      todaysDate.textContent = `${today}`;
    let todaysTimeContainer = document.createElement('div');
      todaysTimeContainer.setAttribute('id', 'todays-time-container');
    let todaysTimeSvg = document.createElement('img');
      todaysTimeSvg.setAttribute('id', 'todays-time-svg');
      todaysTimeSvg.src = 'svgs/time.svg';
    let todaysTime = document.createElement('p');
      todaysTime.setAttribute('id', 'todays-time');
      todaysTime.textContent = `Updated: ${time}`;

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
      weatherFeelsLikeSvg.src = 'svgs/feels-like.svg';
    let weatherFeelsLike = document.createElement('p');
      weatherFeelsLike.setAttribute('id', 'weather-feels-like');
      weatherFeelsLike.textContent = `Feels Like: ${feelsLike} °F`;
    let weatherHumidityContainer = document.createElement('div');
      weatherHumidityContainer.setAttribute('id', 'weather-humidity-container');
    let weatherHumiditySvg = document.createElement('img');
      weatherHumiditySvg.setAttribute('id', 'weather-humidity-svg');
      weatherHumiditySvg.src = 'svgs/humidity.svg';
    let weatherHumidity = document.createElement('p');
      weatherHumidity.setAttribute('id', 'weather-humidity');
      weatherHumidity.textContent = `Humidity: ${humidity} %`;
    let weatherMinContainer = document.createElement('div');
      weatherMinContainer.setAttribute('id', 'weather-min-container');
    let weatherMinSvg = document.createElement('img');
      weatherMinSvg.setAttribute('id', 'weather-min-svg');
      weatherMinSvg.src = 'svgs/temp-min.svg';
    let weatherMin = document.createElement('p');
      weatherMin.setAttribute('id', 'weather-min');
      weatherMin.textContent = `Temperature Low: ${tempMin} °F`;
    let weatherMaxContainer = document.createElement('div');
      weatherMaxContainer.setAttribute('id', 'weather-max-container');
    let weatherMaxSvg = document.createElement('img');
      weatherMaxSvg.setAttribute('id', 'weather-max-svg');
      weatherMaxSvg.src = 'svgs/temp-max.svg';
    let weatherMax = document.createElement('p');
      weatherMax.setAttribute('id', 'weather-max');
      weatherMax.textContent = `Temperature High: ${tempMax} °F`;
    let windSpeedContainer = document.createElement('div');
      windSpeedContainer.setAttribute('id', 'wind-speed-container');
    let windSpeedSvg = document.createElement('img');
      windSpeedSvg.setAttribute('id', 'wind-speed-svg');
      windSpeedSvg.src = 'svgs/wind.svg';
    let windSpeed = document.createElement('p');
      windSpeed.setAttribute('id', 'wind-speed');
      windSpeed.textContent = `Wind Speed: ${wind} MPH`;

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

  // Hourly forecast bundle
  let next21Hours = forecastList.slice(0, 7);
  next21Hours.forEach(item => {
    let date = convertDate(item.dt_txt.slice(0, 10));
    let time = item.dt_txt.slice(11, 19);
    let temp = item.main.temp;
    let humidity = item.main.humidity;
    let weatherType = item.weather[0].main;
    let weatherDescription = item.weather[0].description;
    let windSpeed = item.wind.speed;

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
  let dailyForecast = [];
  let nextDay = forecastList.slice(7, 8);
  let secondDay = forecastList.slice(15, 16)
  let thirdDay = forecastList.slice(23, 24);
  let fourthDay = forecastList.slice(31, 32);
  let fifthDay = forecastList.slice(39, 40);
  dailyForecast.push(nextDay, secondDay, thirdDay, fourthDay, fifthDay);
  dailyForecast.forEach(item => {
    let date = convertDate(item[0].dt_txt.slice(0, 10));
    let time = item[0].dt_txt.slice(11, 19);
    let temp = item[0].main.temp;
    let humidity = item[0].main.humidity;
    let weatherType = item[0].weather[0].main;
    let weatherDescription = item[0].weather[0].description;
    let windSpeed = item[0].wind.speed;

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
  let nextForecast = document.createElement('div');
    nextForecast.setAttribute('id', 'next-forecast');
    nextForecast.classList.add('forecast-hourly-closed');
  let nextForecastDateContainer = document.createElement('div');
    nextForecastDateContainer.setAttribute('id', 'next-forecast-date-container');
    nextForecastDateContainer.classList.add('forecast-hourly-closed');
  let nextForecastDateSvg = document.createElement('img');
    nextForecastDateSvg.setAttribute('id', 'next-forecast-date-svg');
    nextForecastDateSvg.classList.add('forecast-hourly-item-closed');
    nextForecastDateSvg.src = 'svgs/date.svg';
  let nextForecastDate = document.createElement('p');
    nextForecastDate.setAttribute('id', 'next-forecast-date');
    nextForecastDate.classList.add('forecast-hourly-item-closed');
    nextForecastDate.textContent = `${date}`;
  let nextForecastTimeContainer = document.createElement('div');
    nextForecastTimeContainer.setAttribute('id', 'next-forecast-time-container');
    nextForecastTimeContainer.classList.add('forecast-hourly-closed');
  let nextForecastTimeSvg = document.createElement('img');
    nextForecastTimeSvg.setAttribute('id', 'next-forecast-time-svg');
    nextForecastTimeSvg.classList.add('forecast-hourly-item-closed');
    nextForecastTimeSvg.src = 'svgs/time.svg';
  let nextForecastTime = document.createElement('p');
    nextForecastTime.setAttribute('id', 'next-forecast-time');
    nextForecastTime.classList.add('forecast-hourly-item-closed');
    nextForecastTime.textContent = `${time}`;
  let nextForecastTempContainer = document.createElement('div');
    nextForecastTempContainer.setAttribute('id', 'next-forecast-temp-container');
    nextForecastTempContainer.classList.add('forecast-hourly-closed');
  let nextForecastTempSvg = document.createElement('img');
    nextForecastTempSvg.setAttribute('id', 'next-forecast-temp-svg');
    nextForecastTempSvg.classList.add('forecast-hourly-item-closed');
    nextForecastTempSvg.src = 'svgs/temp.svg';
  let nextForecastTemp = document.createElement('p');
    nextForecastTemp.setAttribute('id', 'next-forecast-temp');
    nextForecastTemp.classList.add('forecast-hourly-item-closed');
    nextForecastTemp.textContent = `${temp} °F`;
  let nextForecastHumidityContainer = document.createElement('div');
    nextForecastHumidityContainer.setAttribute('id', 'next-forecast-humidity-container');
    nextForecastHumidityContainer.classList.add('forecast-hourly-closed');
  let nextForecastHumiditySvg = document.createElement('img');
    nextForecastHumiditySvg.setAttribute('id', 'next-forecast-humidity-svg');
    nextForecastHumiditySvg.classList.add('forecast-hourly-item-closed');
    nextForecastHumiditySvg.src = 'svgs/humidity.svg';
  let nextForecastHumidity = document.createElement('p');
    nextForecastHumidity.setAttribute('id', 'next-forecast-humidity');
    nextForecastHumidity.classList.add('forecast-hourly-item-closed');
    nextForecastHumidity.textContent = `Humidity: ${humidity} %`;
  let nextForecastWeatherTypeContainer = document.createElement('div');
    nextForecastWeatherTypeContainer.setAttribute('id', 'next-forecast-weather-type-container');
    nextForecastWeatherTypeContainer.classList.add('forecast-hourly-closed');
  let nextForecastWeatherTypeSvg = document.createElement('img');
    nextForecastWeatherTypeSvg.setAttribute('id', 'next-forecast-weather-type-svg');
    nextForecastWeatherTypeSvg.classList.add('forecast-hourly-item-closed');
    nextForecastWeatherTypeSvg.src = '';
  let nextForecastWeatherType = document.createElement('p');
    nextForecastWeatherType.setAttribute('id', 'next-forecast-weather-type');
    nextForecastWeatherType.classList.add('forecast-hourly-item-closed');
    nextForecastWeatherType.textContent = `${weatherType}, ${weatherDescription}`;
  let nextForecastWindContainer = document.createElement('div');
    nextForecastWindContainer.setAttribute('id', 'next-forecast-wind-container');
    nextForecastWindContainer.classList.add('forecast-hourly-closed');
  let nextForecastWindSvg = document.createElement('img');
    nextForecastWindSvg.setAttribute('id', 'next-forecast-wind-svg');
    nextForecastWindSvg.classList.add('forecast-hourly-item-closed');
    nextForecastWindSvg.src = 'svgs/wind.svg';
  let nextForecastWind = document.createElement('p');
    nextForecastWind.setAttribute('id', 'next-forecast-wind');
    nextForecastWind.classList.add('forecast-hourly-item-closed');
    nextForecastWind.textContent = `Wind Speed: ${windSpeed} MPH`;

  nextForecastDateContainer.appendChild(nextForecastDateSvg);
  nextForecastDateContainer.appendChild(nextForecastDate);
  nextForecastTimeContainer.appendChild(nextForecastTimeSvg);
  nextForecastTimeContainer.appendChild(nextForecastTime);
  nextForecastTempContainer.appendChild(nextForecastTempSvg);
  nextForecastTempContainer.appendChild(nextForecastTemp);
  nextForecastHumidityContainer.appendChild(nextForecastHumiditySvg);
  nextForecastHumidityContainer.appendChild(nextForecastHumidity);
  nextForecastWeatherTypeContainer.appendChild(nextForecastWeatherTypeSvg);
  nextForecastWeatherTypeContainer.appendChild(nextForecastWeatherType);
  nextForecastWindContainer.appendChild(nextForecastWindSvg);
  nextForecastWindContainer.appendChild(nextForecastWind);

  nextForecast.appendChild(nextForecastDateContainer);
  nextForecast.appendChild(nextForecastTimeContainer);
  nextForecast.appendChild(nextForecastTempContainer);
  nextForecast.appendChild(nextForecastHumidityContainer);
  nextForecast.appendChild(nextForecastWeatherTypeContainer);
  nextForecast.appendChild(nextForecastWindContainer);

  foreCastHourly.appendChild(nextForecast);
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
  console.log(date, time, temp, humidity, weatherType, weatherDescription, windSpeed);
  const foreCastDaily = document.querySelector('#forecast-daily');
}

function showHourlyForecast() {
  console.log('hourly forecast is being requested');
}

function showDailyForecast() {
  console.log('daily forecast is being requested');
}