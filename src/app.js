let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
let date = now.getDate();
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
let month = months[now.getMonth()];
let todayDate = document.querySelector("#todayTime");
todayDate.innerHTML = ` ${month} ${date},${day} ${hours}:${minutes}`;

function showDate() {
  let date = `${day} ${now.getHours()}`;
}

function nowTemperature(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityInput");
  let city = document.querySelector("#city");
  city.innerHTML = `${cityInput.value}`;

  let apiKey = "a2a8582acba62566c4fd2c9a487348b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}`;
  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#nowTemperature");
    temperatureElement.innerHTML = `${temperature}`;

    let humidity = response.data.main.humidity;
    let humidityElement = document.querySelector("#nowHumidity");
    let wind = response.data.wind.speed;
    humidityElement.innerHTML = `Humidity: ${humidity}%, wind: 2 m/s`;
  }

  axios.get(`${apiUrl}&appid=${apiKey}&units=metric`).then(showTemperature);
}
let buttonSearch = document.querySelector("#buttonSearch");
buttonSearch.addEventListener("click", nowTemperature, showDate);
let form = document.querySelector("#form");
form.addEventListener("submit", nowTemperature, showDate);

function showLocTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#nowTemperature");
  temperatureElement.innerHTML = `${temperature}`;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#nowHumidity");
  let wind = response.data.wind.speed;
  humidityElement.innerHTML = `Humidity: ${humidity}%, wind: 2 m/s`;
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "a2a8582acba62566c4fd2c9a487348b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}&units=metric}`).then(showLocTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#buttonLocation");
button.addEventListener("click", getCurrentPosition);
