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
if (month === "October" || month === "November" || month === "September") {
  document.getElementById("imageWeather").src = "images/fall.png";
}
if (month === "December" || month === "January" || month === "February") {
  document.getElementById("imageWeather").src = "images/winter.png";
}
if (
  month === "March" ||
  month === "April" ||
  month === "May" ||
  month === "June" ||
  month === "July" ||
  month === "August"
) {
  document.getElementById("imageWeather").src = "images/Weather.png";
}

let lastUpdate = document.querySelector("#lastUpdate");
lastUpdate.innerHTML = `Last update: ${hours}:${minutes}`;
let todayDate = document.querySelector("#todayTime");
todayDate.innerHTML = ` ${month} ${date}, ${day}`;
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

  function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "a2a8582acba62566c4fd2c9a487348b8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    //api.openweathermap.org/data/3.0/onecall?lat=&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
  }

  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#nowTemperature");
    temperatureElement.innerHTML = `${temperature}`;
    celsiusTemperature = response.data.main.temp;
    let humidity = response.data.main.humidity;
    let humidityElement = document.querySelector("#nowHumidity");
    let wind = response.data.wind.speed;
    humidityElement.innerHTML = `Humidity: ${humidity}%, wind: 2 m/s`;

    let clearnessElement = document.querySelector("#clearness");
    let clearness = response.data.weather[0].main;

    if (clearness === "Clouds") {
      clearnessElement.setAttribute("src", `images/cloudy.png`);
    }
    if (clearness === "Clear") {
      clearnessElement.setAttribute("src", `images/sunny.png`);
    }
    if (clearness === "Rain") {
      clearnessElement.setAttribute("src", `images/rainy.png`);
    }
    if (clearness === "Thunderstorm") {
      clearnessElement.setAttribute("src", `images/thunderstorm.png`);
    }
    if (clearness === "Snow") {
      clearnessElement.setAttribute("src", `images/snow.png`);
    }
    if (clearness === "Mist") {
      clearnessElement.setAttribute("src", `images/mist.png`);
    }
    getForecast(response.data.coord);
  }

  axios.get(`${apiUrl}&appid=${apiKey}&units=metric`).then(showTemperature);
}
let buttonSearch = document.querySelector("#buttonSearch");
buttonSearch.addEventListener("click", nowTemperature, showDate);
let form = document.querySelector("#form");
form.addEventListener("submit", nowTemperature, showDate);

function displayForecast(response) {
  console.log(response.data.list);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `  <div class="col-2"> 
    <div class="weatherForecastDate">${day}</div>
    <img src="images/snow.png" alt="" width="40" class="imageForecast">
    <div class="weatherForecastTemperature"><span class="weatherForecastTemperatureMax">18°</span><span class="weatherForecastTemperatureMin">12°</span></div>
  </div>
`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showLocTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#nowTemperature");
  temperatureElement.innerHTML = `${temperature}`;
  celsiusTemperature = response.data.main.temp;
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#nowHumidity");
  let wind = response.data.wind.speed;
  humidityElement.innerHTML = `Humidity: ${humidity}%, wind: 2 m/s`;
  let cityElement = document.querySelector("#city");
  let city = response.data.name;
  cityElement.innerHTML = `${city}`;

  let clearnessElement = document.querySelector("#clearness");
  let clearness = response.data.weather[0].main;

  if (clearness === "Clouds") {
    clearnessElement.setAttribute("src", `images/cloudy.png`);
  }
  if (clearness === "Clear") {
    clearnessElement.setAttribute("src", `images/sunny.png`);
  }
  if (clearness === "Rain") {
    clearnessElement.setAttribute("src", `images/rainy.png`);
  }
  if (clearness === "Thunderstorm") {
    clearnessElement.setAttribute("src", `images/thunderstorm.png`);
  }
  if (clearness === "Snow") {
    clearnessElement.setAttribute("src", `images/snow.png`);
  }
  if (clearness === "Mist") {
    clearnessElement.setAttribute("src", `images/mist.png`);
  }
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
function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#nowTemperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#nowTemperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemperature = null;

let button = document.querySelector("#buttonLocation");
button.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", showCelsiusTemperature);
