import { 
  getCity,
  removePreviousInformation,
  showHourlyForecast,
  showDailyForecast,
  showFahrenheit,
  showCelsius
 } from './app.js';

window.onload = () => {
  getCity();
}

(function attachEventListeners() {
  const hourlyButton = document.querySelector('#hourly-forecast-button');
    hourlyButton.addEventListener('click', showHourlyForecast);

  const dailyButton = document.querySelector('#daily-forecast-button');
    dailyButton.addEventListener('click', showDailyForecast);

  const fahrenheitButton = document.querySelector('#fahrenheit-button');
    fahrenheitButton.addEventListener('click', showFahrenheit);
  
  const celsisusButton = document.querySelector('#celsius-button');
    celsisusButton.addEventListener('click', showCelsius);

  const searchInput = document.querySelector('#search-bar-input');
    searchInput.addEventListener('keypress', function(e) {
      if (e.keyCode === 13) {
        removePreviousInformation();
        getCity();
      } else {
        return;
      }
    })
})();