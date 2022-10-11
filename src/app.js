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
    let lat = coordinates.lat;
    let lon = coordinates.lon;
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
    console.log(apiUrl);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 7 && index > 0) {
      forecastHTML =
        forecastHTML +
        `  <div class="col-2"> 
    <div class="weatherForecastDate">${formatDay(forecastDay.dt)}</div>
    <img src="images/snow.png" alt="" width="40" class="imageForecast" id="imageForecast">
    <div class="weatherForecastTemperature"><span class="weatherForecastTemperatureMax"> <span class="weather-forecast-temperature-max"> ${Math.round(
      forecastDay.temp.max
    )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span></div>
  </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

  let clearnessForElement = document.querySelector("#imageForecast");
  let clearness = response.data.weather[0].main;
  console.log(clearness);

  if (clearness === "Clouds") {
    clearnessForElement.setAttribute("src", `images/cloudy.png`);
  }
  if (clearness === "Clear") {
    clearnessForElement.setAttribute("src", `images/sunny.png`);
  }
  if (clearness === "Rain") {
    clearnessForElement.setAttribute("src", `images/rainy.png`);
  }
  if (clearness === "Thunderstorm") {
    clearnessForElement.setAttribute("src", `images/thunderstorm.png`);
  }
  if (clearness === "Snow") {
    clearnessForElement.setAttribute("src", `images/snow.png`);
  }
  if (clearness === "Mist") {
    clearnessForElement.setAttribute("src", `images/mist.png`);
  }
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
