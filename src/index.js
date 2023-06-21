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
let dateFormat = document.getElementById("dateFormat");
let tempFromApi = 0
let iconElement = document.querySelector("#icon");

searchCity("Lusaka")

function changetoCelcius() {
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperature.innerHTML = Math.round(tempFromApi);
}


function changetoFahrenheit() {
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (tempFromApi * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}


let form = document.querySelector("#city-form");
form.addEventListener("submit", cityLookUp);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changetoFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changetoCelcius);

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

  let search = cityInput.value; //document.getElementById("searchCity").value;

  searchCity(search)

}

function searchCity(searchCity){
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=97c6081e1178cd0cfd3787251e60b441&units=metric`
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
        temperature.innerHTML = Math.round(jsonData.main.temp);
        tempFromApi = Math.round(jsonData.main.temp);
        dateFormat.innerHTML = formatDate(jsonData.dt * 1000);
          iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${jsonData.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt",jsonData.weather[0].description);

      })
      .catch((error) => {
        console.log(error);
      });
}
