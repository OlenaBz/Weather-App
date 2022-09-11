function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#nowTemperature");
  temperatureElement.innerHTML = `${temperature}`;
}
let apiKey = "ebd45fdbc0cbc42c7b17f64eef930b5d";
let city = "Kyiv";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(`${apiUrl}`).then(showTemperature);
