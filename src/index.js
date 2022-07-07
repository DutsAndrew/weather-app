import { 
  getCity,
  removePreviousInformation,
  showHourlyForecast,
  showDailyForecast,
  showFahrenheit,
  showCelsius
 } from './scripts/app.js';

import { loadMeasurementAlert } from './scripts/sessionStorage.js';

window.onload = () => {
  getCity();
  loadMeasurementAlert();
}

(function attachEventListeners() {
  const hourlyButton = document.querySelector('#hourly-forecast-button');
    hourlyButton.addEventListener('click', showHourlyForecast);

  const dailyButton = document.querySelector('#daily-forecast-button');
    dailyButton.addEventListener('click', showDailyForecast);

  const fahrenheitButton = document.querySelector('#fahrenheit-button');
    fahrenheitButton.addEventListener('click', showFahrenheit);
  
  const celsiusButton = document.querySelector('#celsius-button');
    celsiusButton.addEventListener('click', showCelsius);

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