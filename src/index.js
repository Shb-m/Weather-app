//Current Time
let now = new Date();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let currentDay = days[now.getDay()];

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
  "December",
];
let currentMonth = months[now.getMonth()];

let currentDate = now.getDate();
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${currentDay}, ${currentMonth} ${currentDate} ${currentHour}:${currentMinutes}`;

//Searching location
function showTemp(response) {
  console.log(response);
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temperature");
  currentTemp.innerHTML = `${temp} ℃`;

  let tempMin = document.querySelector("#temp-min");
  let min = Math.round(response.data.main.temp_min);
  tempMin.innerHTML = `${min}°`;

  let max = Math.round(response.data.main.temp_max);
  let tempMax = document.querySelector("#temp-max");
  tempMax.innerHTML = `${max}°`;

  let feels = Math.round(response.data.main.feels_like);
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `${feels}°`;
}

function showCity(event) {
  event.preventDefault();
  let currentCityInput = document.querySelector("#current-city-input");
  let currentCity = document.querySelector("#current-city");
  if (currentCityInput.value) {
    currentCity.innerHTML =
      `${currentCityInput.value}`.trim().toLowerCase().charAt(0).toUpperCase() +
      `${currentCityInput.value}`.trim().slice(1);
  } else {
    currentCity.innerHTML = null;
    alert("Enter a city");
  }
  let apiKey = "bc2cd97eaa209e7d22d8f3c84081655f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showCurrentTemp(response) {
  console.log(response);
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML =
    `${response.data.name}`.trim().toLowerCase().charAt(0).toUpperCase() +
    `${response.data.name}`.trim().slice(1);

  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temperature");
  currentTemp.innerHTML = `${temp} ℃`;

  let tempMin = document.querySelector("#temp-min");
  let min = Math.round(response.data.main.temp_min);
  tempMin.innerHTML = `${min}°`;

  let max = Math.round(response.data.main.temp_max);
  let tempMax = document.querySelector("#temp-max");
  tempMax.innerHTML = `${max}°`;

  let feels = Math.round(response.data.main.feels_like);
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `${feels}°`;
}

function showCurrentPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(longitude);
  let apiKey = "bc2cd97eaa209e7d22d8f3c84081655f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemp);
}
function showCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

/*let appForm = document.querySelector("#app-form");
appForm.addEventListener("submit", showCity);*/

var form = document.getElementById("search-button");
document.getElementById("search-button").addEventListener("click", showCity);
document
  .getElementById("current-button")
  .addEventListener("click", showCurrentCity);
