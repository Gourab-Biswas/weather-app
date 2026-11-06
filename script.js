let cityName = document.querySelector(".cityname");
let dateTime = document.querySelector(".datetime");
let weatherForcast = document.querySelector(".weather-forcast");
let weatherIcon = document.querySelector(".weather-icon");
let weatherTemp = document.querySelector(".weather-temp");
let weatherMin = document.querySelector(".weather-min");
let weatherMax = document.querySelector(".weather-max");

let inputField = document.getElementById("inputField")

let feelsLike = document.querySelector(".feelsLike");
let humidity = document.querySelector(".humidity");
let winds = document.querySelector(".wind");
let pressure = document.querySelector(".pressure");

let city = "kolkata";


let fetchCityName = (code) => {
  return new Intl.DisplayNames([code], { type: "region" }).of(code);
};
let getTime = (dt) => {
  let newDate = new Date(dt * 1000);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(newDate);
};

document.querySelector(".weather-search").addEventListener("submit",(e)=>{
    e.preventDefault()

    let x = inputField.value
    x = x.toLowerCase()
    city = x
    inputField.value = ""
    weatherData()

})

let weatherData = async () => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=5173737aa9d0f9276aae9160e43fc910`;
  try {
    let res = await fetch(weatherUrl);
    let data = await res.json();
    console.log(data);
    let { sys, main, weather, wind, name, dt } = data;

    cityName.textContent = `${name}, ${fetchCityName(sys.country)}`;

    weatherForcast.textContent = weather[0].main;
    dateTime.innerHTML = getTime(dt);
    weatherIcon.innerHTML = `<img src= "http://openweathermap.org/img/wn/${weather[0].icon}@2x.png">`;
    weatherTemp.innerHTML = `${Math.floor(main.temp)}&degC`;
    weatherMin.innerHTML = `Min: ${main.temp_min.toFixed()}&degC`;
    weatherMax.innerHTML = `Max: ${main.temp_max.toFixed()}&degC`;

    feelsLike.innerHTML = `${main.feels_like}&degC`;
    humidity.innerHTML = `${main.humidity}%`;
    winds.innerHTML = `${wind.speed} m/s`;
    pressure.innerHTML = `${main.pressure} mbar`;
  } catch (error) {}
};

document.body.addEventListener("load", weatherData());
