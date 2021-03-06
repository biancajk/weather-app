let currentDate = document.querySelector(".current-date");
let currentTime = new Date();
let date = currentTime.getDate();
let year = currentTime.getFullYear();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[currentTime.getMonth()];
currentDate.innerHTML = `${date} ${month} ${year}`;
let weekdayElement = document.querySelector(".current-day");
let currentDay = new Date();
let day = currentDay.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
weekdayElement.innerHTML = `${days[day]}`;
function showCity(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let inputCity = document.querySelector("#enter-city");
  h1.innerHTML = inputCity.value;
  searchCity(inputCity.value);
}
let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", showCity);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("#current-temperature");
  h2.innerHTML = temperature;
}
function searchCity(city) {
  let apiKey = "604a0860a7678715cd8fffed2efc4cf1";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}
function showWeather(response) {
  let currentTemperatureElement = document.querySelector("h2");
  let currentTemperature = Math.round(response.data.main.temp);
  let currentCity = document.querySelector("h1");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  let windElement = document.querySelector("#wind-speed");
  currentCity.innerHTML = response.data.name;
  currentTemperatureElement.innerHTML = `${currentTemperature}°C`;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);

  celsiusTemperature = response.data.main.temp;
}
function showPosition(position) {
  let apiKey = "604a0860a7678715cd8fffed2efc4cf1";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocationButton = document.querySelector(".fas.fa-map-marker-alt");
currentLocationButton.addEventListener("click", getCurrentLocation);


function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active)");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);