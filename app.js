window.onload = () => {
  getCity();
}

let retrievedCityName;
let retrievedCityLat;
let retrievedCityLon;

async function getCity() {
  let api = 'http://api.openweathermap.org/geo/1.0/direct?';
  let city = 'q=Reykjavík'
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
    appendCurrentWeather(
      temp,
      weatherType,
      description,
      country,
      feelsLike,
      humidity,
      tempMin,
      tempMax
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
    console.log(searchData);
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
  tempMax
  ) {
    const locationInformation = document.querySelector('#location-information');
    let city = document.createElement('p');
      city.setAttribute('id', 'city-name');
      city.textContent = `${retrievedCityName}, ${country}`;
    let weatherDescription = document.createElement('p');
      weatherDescription.setAttribute('id', 'weather-description');
      weatherDescription.textContent = `${weatherType}, ${description}`;
    let weatherTemperature = document.createElement('p');
      weatherTemperature.setAttribute('id', 'weather-temperature');
      weatherTemperature.textContent = `${temp} °F`;

    locationInformation.appendChild(city);
    locationInformation.appendChild(weatherDescription);
    locationInformation.appendChild(weatherTemperature);

    const locationExtraInformation = document.querySelector('#location-extra-information');
    let weatherFeelsLike = document.createElement('p');
      weatherFeelsLike.setAttribute('id', 'weather-feels-like');
      weatherFeelsLike.textContent = `Feels Like: ${feelsLike}`;
    let weatherHumidity = document.createElement('p');
      weatherHumidity.setAttribute('id', 'weather-humidity');
      weatherHumidity.textContent = `Humidity: ${humidity}`;
    let weatherMin = document.createElement('p');
      weatherMin.setAttribute('id', 'weather-min');
      weatherMin.textContent = `Temperature Low: ${tempMin}`;
    let weatherMax = document.createElement('p');
      weatherMax.setAttribute('id', 'weather-max');
      weatherMax.textContent = `Temperature High: ${tempMax}`;

    locationExtraInformation.appendChild(weatherFeelsLike);
    locationExtraInformation.appendChild(weatherHumidity);
    locationExtraInformation.appendChild(weatherMin);
    locationExtraInformation.appendChild(weatherMax);
}