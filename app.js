window.onload = () => {
  getCity();
}

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
    appendWeatherForecast(forecastList);
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
      todaysTime.textContent = `${time}`;

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

   
   console.log(today);
}

function convertDate(date) {
  date = new Date(date).toDateString();
  return date;
}

function appendWeatherForecast(forecastList) {

  let next15Hours = forecastList.slice(0, 5);
  // Hourly forecast variables
  next15Hours.forEach(item => {
    console.log(item);
    let date = convertDate(item.dt_txt.slice(0, 10));
    let time = item.dt_txt.slice(11, 19);
    let temp = item.main.temp;
    let humidity = item.main.humidity;
    let weatherType = item.weather[0].main;
    let weatherDescription = item.weather[0].description;
    let windSpeed = item.wind.speed;
    console.log(date, time, temp, humidity, weatherType, weatherDescription, windSpeed);
  })

  // console.log(forecastList);
  // let date1 = forecastList[0].dt_txt.slice(0, 10);
  // let time1 = forecastList[0].dt_txt.slice(11, 19);
  // let weatherType1 = forecastList[0].weather[0].main;
  // let weatherDescription1 = forecastList[0].weather[0].description;
  // console.log(date1);
  // console.log(time1);

  // Daily forecast variables
}