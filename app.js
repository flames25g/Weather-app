const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const country = document.getElementById("country");
const currentTempEl = document.getElementById("current-temp");

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HoursFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const minutesFormat = minutes <= 10 ? "0" + minutes : minutes;
  const ampm = hour >= 12 ? "PM" : "AM";

  timeEl.innerHTML =
    (hoursIn12HoursFormat < 10
      ? "0" + hoursIn12HoursFormat
      : hoursIn12HoursFormat) +
    ":" +
    minutesFormat +
    " " +
    `<span id="am-pm">${ampm}</span>`;

  dateEl.innerHTML = days[day] + ", " + date + " " + months[month];
}, 1000);

getWeatherData();
function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    console.log(success);

    let { latitude, longitude } = success.coords;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=41cd218c4549c273819aa70e8ad25629`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showWeatherData(data);
      });
  });
}

function showWeatherData(data) {
  let { humidity, pressure } = data.main;
  let { speed } = data.wind;
  let { sunrise, sunset } = data.sys;

  timezone.innerHTML = data.timezone;
  country.innerHTML = data.coord.lat + "N   " + data.coord.lon + "E";

  const timezoneOffset = data.timezone;
  timezone.innerHTML = timezoneOffset;

  currentWeatherItemsEl.innerHTML = `<div class="weather-item">
              <div>Humidity</div>
              <div>${humidity}%</div>
            </div>
            <div class="weather-item">
              <div>Pressure</div>
              <div>${pressure}</div>
            </div>
            <div class="weather-item">
              <div>Wind Speed</div>
              <div>${(speed * 3.6).toFixed(2)} km/h</div>
            </div>
            <div class="weather-item">
              <div>Sunrise</div>
              <div>${window.moment(sunrise * 1000).format("HH.mm a")}</div>
            </div>
            <div class="weather-item">
              <div>Sunset</div>
              <div>${window.moment(sunset * 1000).format("HH.mm a")}</div>
            </div>`;
}
