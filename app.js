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
  let nextHourlyForecast = document.createElement('div');
    nextHourlyForecast.setAttribute('id', 'next-hourly-forecast');
    nextHourlyForecast.classList.add('forecast-hourly-closed');
  let nextHourlyForecastDateContainer = document.createElement('div');
    nextHourlyForecastDateContainer.setAttribute('id', 'next-hourly-forecast-date-container');
    nextHourlyForecastDateContainer.classList.add('forecast-hourly-closed');
  let nextHourlyForecastDateSvg = document.createElement('img');
    nextHourlyForecastDateSvg.setAttribute('id', 'next-hourly-forecast-date-svg');
    nextHourlyForecastDateSvg.classList.add('forecast-hourly-item-closed');
    nextHourlyForecastDateSvg.src = 'svgs/date.svg';
  let nextHourlyForecastDate = document.createElement('p');
    nextHourlyForecastDate.setAttribute('id', 'next-hourly-forecast-date');
    nextHourlyForecastDate.classList.add('forecast-hourly-item-closed');
    nextHourlyForecastDate.textContent = `${date}`;
  let nextHourlyForecastTimeContainer = document.createElement('div');
    nextHourlyForecastTimeContainer.setAttribute('id', 'next-hourly-forecast-time-container');
    nextHourlyForecastTimeContainer.classList.add('forecast-hourly-closed');
  let nextHourlyForecastTimeSvg = document.createElement('img');
    nextHourlyForecastTimeSvg.setAttribute('id', 'next-hourly-forecast-time-svg');
    nextHourlyForecastTimeSvg.classList.add('forecast-hourly-item-closed');
    nextHourlyForecastTimeSvg.src = 'svgs/time.svg';
  let nextHourlyForecastTime = document.createElement('p');
    nextHourlyForecastTime.setAttribute('id', 'next-hourly-forecast-time');
    nextHourlyForecastTime.classList.add('forecast-hourly-item-closed');
    nextHourlyForecastTime.textContent = `${time}`;
  let nextHourlyForecastTempContainer = document.createElement('div');
    nextHourlyForecastTempContainer.setAttribute('id', 'next-hourly-forecast-temp-container');
    nextHourlyForecastTempContainer.classList.add('forecast-hourly-closed');
  let nextHourlyForecastTempSvg = document.createElement('img');
    nextHourlyForecastTempSvg.setAttribute('id', 'next-hourly-forecast-temp-svg');
    nextHourlyForecastTempSvg.classList.add('forecast-hourly-item-closed');
    nextHourlyForecastTempSvg.src = 'svgs/temp.svg';
  let nextHourlyForecastTemp = document.createElement('p');
    nextHourlyForecastTemp.setAttribute('id', 'next-hourly-forecast-temp');
    nextHourlyForecastTemp.classList.add('forecast-hourly-item-closed');
    nextHourlyForecastTemp.textContent = `${temp} °F`;
  let nextHourlyForecastHumidityContainer = document.createElement('div');
    nextHourlyForecastHumidityContainer.setAttribute('id', 'next-hourly-forecast-humidity-container');
    nextHourlyForecastHumidityContainer.classList.add('forecast-hourly-closed');
  let nextHourlyForecastHumiditySvg = document.createElement('img');
    nextHourlyForecastHumiditySvg.setAttribute('id', 'next-hourly-forecast-humidity-svg');
    nextHourlyForecastHumiditySvg.classList.add('forecast-hourly-item-closed');
    nextHourlyForecastHumiditySvg.src = 'svgs/humidity.svg';
  let nextHourlyForecastHumidity = document.createElement('p');
    nextHourlyForecastHumidity.setAttribute('id', 'next-hourly-forecast-humidity');
    nextHourlyForecastHumidity.classList.add('forecast-hourly-item-closed');
    nextHourlyForecastHumidity.textContent = `Humidity: ${humidity} %`;
  let nextHourlyForecastWeatherTypeContainer = document.createElement('div');
    nextHourlyForecastWeatherTypeContainer.setAttribute('id', 'next-hourly-forecast-weather-type-container');
    nextHourlyForecastWeatherTypeContainer.classList.add('forecast-hourly-closed');
  let nextHourlyForecastWeatherTypeSvg = document.createElement('img');
    nextHourlyForecastWeatherTypeSvg.setAttribute('id', 'next-hourly-forecast-weather-type-svg');
    nextHourlyForecastWeatherTypeSvg.classList.add('forecast-hourly-item-closed');
    nextHourlyForecastWeatherTypeSvg.src = '';
  let nextHourlyForecastWeatherType = document.createElement('p');
    nextHourlyForecastWeatherType.setAttribute('id', 'next-hourly-forecast-weather-type');
    nextHourlyForecastWeatherType.classList.add('forecast-hourly-item-closed');
    nextHourlyForecastWeatherType.textContent = `${weatherType}, ${weatherDescription}`;
  let nextHourlyForecastWindContainer = document.createElement('div');
    nextHourlyForecastWindContainer.setAttribute('id', 'next-hourly-forecast-wind-container');
    nextHourlyForecastWindContainer.classList.add('forecast-hourly-closed');
  let nextHourlyForecastWindSvg = document.createElement('img');
    nextHourlyForecastWindSvg.setAttribute('id', 'next-hourly-forecast-wind-svg');
    nextHourlyForecastWindSvg.classList.add('forecast-hourly-item-closed');
    nextHourlyForecastWindSvg.src = 'svgs/wind.svg';
  let nextHourlyForecastWind = document.createElement('p');
    nextHourlyForecastWind.setAttribute('id', 'next-hourly-forecast-wind');
    nextHourlyForecastWind.classList.add('forecast-hourly-item-closed');
    nextHourlyForecastWind.textContent = `Wind Speed: ${windSpeed} MPH`;

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
  let nextDailyForecast = document.createElement('div');
    nextDailyForecast.setAttribute('id', 'next-daily-forecast');
    nextDailyForecast.classList.add('next-daily-forecast-open');
    let nextDailyForecastDateContainer = document.createElement('div');
    nextDailyForecastDateContainer.setAttribute('id', 'next-daily-forecast-date-container');
    nextDailyForecastDateContainer.classList.add('forecast-daily-open');
  let nextDailyForecastDateSvg = document.createElement('img');
    nextDailyForecastDateSvg.setAttribute('id', 'next-daily-forecast-date-svg');
    nextDailyForecastDateSvg.classList.add('forecast-daily-item-open');
    nextDailyForecastDateSvg.src = 'svgs/date.svg';
  let nextDailyForecastDate = document.createElement('p');
    nextDailyForecastDate.setAttribute('id', 'next-daily-forecast-date');
    nextDailyForecastDate.classList.add('forecast-daily-item-open');
    nextDailyForecastDate.textContent = `${date}`;
  let nextDailyForecastTimeContainer = document.createElement('div');
    nextDailyForecastTimeContainer.setAttribute('id', 'next-daily-forecast-time-container');
    nextDailyForecastTimeContainer.classList.add('forecast-daily-open');
  let nextDailyForecastTimeSvg = document.createElement('img');
    nextDailyForecastTimeSvg.setAttribute('id', 'next-daily-forecast-time-svg');
    nextDailyForecastTimeSvg.classList.add('forecast-daily-item-open');
    nextDailyForecastTimeSvg.src = 'svgs/time.svg';
  let nextDailyForecastTime = document.createElement('p');
    nextDailyForecastTime.setAttribute('id', 'next-daily-forecast-time');
    nextDailyForecastTime.classList.add('forecast-daily-item-open');
    nextDailyForecastTime.textContent = `${time}`;
  let nextDailyForecastTempContainer = document.createElement('div');
    nextDailyForecastTempContainer.setAttribute('id', 'next-daily-forecast-temp-container');
    nextDailyForecastTempContainer.classList.add('forecast-daily-open');
  let nextDailyForecastTempSvg = document.createElement('img');
    nextDailyForecastTempSvg.setAttribute('id', 'next-daily-forecast-temp-svg');
    nextDailyForecastTempSvg.classList.add('forecast-daily-item-open');
    nextDailyForecastTempSvg.src = 'svgs/temp.svg';
  let nextDailyForecastTemp = document.createElement('p');
    nextDailyForecastTemp.setAttribute('id', 'next-daily-forecast-temp');
    nextDailyForecastTemp.classList.add('forecast-daily-item-open');
    nextDailyForecastTemp.textContent = `${temp} °F`;
  let nextDailyForecastHumidityContainer = document.createElement('div');
    nextDailyForecastHumidityContainer.setAttribute('id', 'next-daily-forecast-humidity-container');
    nextDailyForecastHumidityContainer.classList.add('forecast-daily-open');
  let nextDailyForecastHumiditySvg = document.createElement('img');
    nextDailyForecastHumiditySvg.setAttribute('id', 'next-daily-forecast-humidity-svg');
    nextDailyForecastHumiditySvg.classList.add('forecast-daily-item-open');
    nextDailyForecastHumiditySvg.src = 'svgs/humidity.svg';
  let nextDailyForecastHumidity = document.createElement('p');
    nextDailyForecastHumidity.setAttribute('id', 'next-daily-forecast-humidity');
    nextDailyForecastHumidity.classList.add('forecast-daily-item-open');
    nextDailyForecastHumidity.textContent = `Humidity: ${humidity} %`;
  let nextDailyForecastWeatherTypeContainer = document.createElement('div');
    nextDailyForecastWeatherTypeContainer.setAttribute('id', 'next-daily-forecast-weather-type-container');
    nextDailyForecastWeatherTypeContainer.classList.add('forecast-daily-open');
  let nextDailyForecastWeatherTypeSvg = document.createElement('img');
    nextDailyForecastWeatherTypeSvg.setAttribute('id', 'next-daily-forecast-weather-type-svg');
    nextDailyForecastWeatherTypeSvg.classList.add('forecast-daily-item-open');
    nextDailyForecastWeatherTypeSvg.src = '';
  let nextDailyForecastWeatherType = document.createElement('p');
    nextDailyForecastWeatherType.setAttribute('id', 'next-daily-forecast-weather-type');
    nextDailyForecastWeatherType.classList.add('forecast-daily-item-open');
    nextDailyForecastWeatherType.textContent = `${weatherType}, ${weatherDescription}`;
  let nextDailyForecastWindContainer = document.createElement('div');
    nextDailyForecastWindContainer.setAttribute('id', 'next-daily-forecast-wind-container');
    nextDailyForecastWindContainer.classList.add('forecast-daily-open');
  let nextDailyForecastWindSvg = document.createElement('img');
    nextDailyForecastWindSvg.setAttribute('id', 'next-daily-forecast-wind-svg');
    nextDailyForecastWindSvg.classList.add('forecast-daily-item-open');
    nextDailyForecastWindSvg.src = 'svgs/wind.svg';
  let nextDailyForecastWind = document.createElement('p');
    nextDailyForecastWind.setAttribute('id', 'next-daily-forecast-wind');
    nextDailyForecastWind.classList.add('forecast-daily-item-open');
    nextDailyForecastWind.textContent = `Wind Speed: ${windSpeed} MPH`;

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
  console.log('hourly forecast is being requested');
}

function showDailyForecast() {
  console.log('daily forecast is being requested');
}