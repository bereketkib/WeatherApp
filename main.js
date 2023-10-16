const apiKey = '9e88fb2dfcd04bbcb6c130517231310';
const apiUrl = 'https://api.weatherapi.com/v1/current.json?';

const weatherForm = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const loading = document.getElementById('loading');
const exactLocation = document.getElementById('exactLocation');
const weather = document.getElementById('weather');
const close = document.getElementById('close');
const errorDisplay = document.getElementById('errorDisplay');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  errorDisplay.style.display = 'none';
  weather.style.display = 'none';
  exactLocation.style.display = 'none';
  const location = locationInput.value;
  getWeatherData(location);
  weatherForm.reset();
});

close.addEventListener('click', () => {
  errorDisplay.style.display = 'none';
})

function showLoading() {
  loading.style.display = 'block';
}

function hideLoading() {
  loading.style.display = 'none';
}

async function getWeatherData(location) {
  showLoading();
  try {
    const response = await fetch(`${apiUrl}key=${apiKey}&q=${location}`);
    const data = await response.json();
    const date = formatDate(data);
    populateLocation(data, date);
    populateWeather(data);
    hideLoading();
  } catch (error) { 
    handleError(); 
    hideLoading();
  }
}

function handleError() {
  errorDisplay.style.display = 'block';
  exactLocation.style.display = 'none';
  weather.style.display = 'none';
}

function populateLocation(data, dateTime) {
    const country = document.getElementById('country');
    const date = document.getElementById('date');
    const lat = document.getElementById('lat');
    const lon = document.getElementById('lon');

    country.textContent = `${data.location.name}, ${data.location.country}`;
    date.textContent = dateTime;
    lat.innerHTML = `Latitude <br><span class='value'>${data.location.lat}</span>`;
    lon.innerHTML = `Longtitude <br><span class='value'>${data.location.lon}</span>`;
    exactLocation.style.display = 'block';
}

function populateWeather(data) {
    const icon = document.getElementById('icon');
    const time = document.getElementById('time');
    const text = document.getElementById('text');
    const temperature = document.getElementById('temperature');
    const feelslike = document.getElementById('feelslike');
    const humidity = document.getElementById('humidity');
    const precipitation = document.getElementById('precipitation');
    const pressure = document.getElementById('pressure');
    const wind = document.getElementById('wind');

    icon.src = data.current.condition.icon;
    if (data.current.is_day == 1) {
        time.textContent = 'Day time'
    } else {
        time.textContent = 'Night time';
    }
    text.textContent = data.current.condition.text;
    temperature.innerHTML = `Temperature <br><span class='value'>${data.current.temp_c} &deg;C / ${data.current.temp_f} &deg;F</span>`;
    feelslike.innerHTML = `Feels like <br><span class='value'>${data.current.feelslike_c} &deg;C / ${data.current.feelslike_f} &deg;F</span>`;
    humidity.innerHTML = `Humidity <br><span class='value'>${data.current.humidity}%</span>`;
    precipitation.innerHTML = `Precipitation <br><span class='value'>${data.current.precip_in} in / ${data.current.precip_mm} mm</span>`;
    pressure.innerHTML = `Pressure <br><span class='value'>${data.current.pressure_in} inHg / ${data.current.pressure_mb} mb</span>`;
    wind.innerHTML = `Wind <br><span class='value'>${data.current.wind_kph} kph / ${data.current.wind_mph} mph at ${data.current.wind_degree} &deg;</span>`;
    weather.style.display = 'block';
}

function formatDate(data) {
    const localtimeString = data.location.localtime;
    const localTime = new Date(localtimeString);

    const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
    };

    const formattedLocalTime = localTime.toLocaleString("en-US", options);
    return formattedLocalTime;
}
