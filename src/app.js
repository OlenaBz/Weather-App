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
  }

  axios.get(`${apiUrl}&appid=${apiKey}&units=metric`).then(showTemperature);
}
let buttonSearch = document.querySelector("#buttonSearch");
buttonSearch.addEventListener("click", nowTemperature);
let form = document.querySelector("#form");
form.addEventListener("submit", nowTemperature);
