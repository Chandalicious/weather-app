function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

let cityName = document.getElementById("cityName");
let humidity = document.getElementById("humidity");
let pressure = document.getElementById("pressure");
let wind = document.getElementById("wind");
let temperature = document.getElementById("temperature");
let weatherCondition = document.getElementById("weatherCondition");

fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=Lusaka&appid=97c6081e1178cd0cfd3787251e60b441&units=metric`
)
  .then((response) => {
    return response.json();
  })
  .then((jsonData) => {
    console.log(jsonData);
    weatherCondition.innerHTML = jsonData.weather[0].description;
    humidity.innerHTML = jsonData.main.humidity + "%";
    wind.innerHTML = jsonData.wind.speed + "km/h";
    cityName.innerHTML = jsonData.name;
    pressure.innerHTML = jsonData.main.pressure + "Pa";
    temperature.innerHTML = jsonData.main.temp;
  })
  .catch((error) => {
    console.log(error);
  });
function changetoCelcius() {
  let CelciusTemperature = (temperature.value() * 6) / 5 + 32;
  temperature.innerHTML = Math.round(CelciusTemperature);
}
function changetoFahrenheit() {
  let fahrenheitTemperature = (temperature.value() * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}
let form = document.querySelector("#city-form");
form.addEventListener("submit", cityLookUp);

let locationButton = document.querySelector("#currentLocation");
locationButton.addEventListener("click", handlePosition);

function handlePosition() {
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

function getCurrentLocation(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=97c6081e1178cd0cfd3787251e60b441`
  )
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      console.log(jsonData);
      weatherCondition.innerHTML = jsonData.weather[0].description;
      humidity.innerHTML = jsonData.main.humidity + "%";
      wind.innerHTML = jsonData.wind.speed + "km/h";
      cityName.innerHTML = jsonData.name;
      pressure.innerHTML = jsonData.main.pressure + "Pa";
      temperature.innerHTML = jsonData.main.temp;
    })
    .catch((error) => {
      console.log(error);
    });
}

function cityLookUp(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchCity");

  let searchCity = cityInput.value; //document.getElementById("searchCity").value;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=97c6081e1178cd0cfd3787251e60b441`
  )
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      console.log(jsonData);
      weatherCondition.innerHTML = jsonData.weather[0].description;
      humidity.innerHTML = jsonData.main.humidity + "%";
      wind.innerHTML = jsonData.wind.speed + "km/h";
      cityName.innerHTML = jsonData.name;
      pressure.innerHTML = jsonData.main.pressure + "Pa";
      temperature.innerHTML = jsonData.main.temp;
    })
    .catch((error) => {
      console.log(error);
    });
}
