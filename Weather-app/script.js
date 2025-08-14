// Replace this with your OpenWeatherMap API key
const apiKey = '5e1ed6b418a0c9e4a3b83038d681820b';

const elements = {
  cityInput: document.getElementById('cityInput'),
  searchBtn: document.getElementById('searchBtn'),
  locationBtn: document.getElementById('locationBtn'),
  weatherDisplay: document.getElementById('weatherDisplay'),
  cityName: document.getElementById('cityName'),
  weatherIcon: document.getElementById('weatherIcon'),
  temperature: document.getElementById('temperature'),
  weatherDescription: document.getElementById('weatherDescription'),
  errorMessage: document.getElementById('errorMessage'),
  loader: document.getElementById('loader'),
  currentDateTime: document.getElementById('currentDateTime'),
  bgImage: document.getElementById('bgImage'),
  toggleUnitBtn: document.getElementById('toggleUnitBtn'),
  themeToggleBtn: document.getElementById('themeToggleBtn'),
};

// Unit toggle state
let currentTempCelsius = null;
let isCelsius = true;

function showError(message) {
  elements.errorMessage.textContent = message;
  elements.errorMessage.hidden = false;
  elements.weatherDisplay.hidden = true;
}

function clearError() {
  elements.errorMessage.hidden = true;
}

function updateDateTime() {
  const now = new Date();
  elements.currentDateTime.textContent = now.toLocaleString();
}

function updateBackground(city) {
  const url = `https://source.unsplash.com/1600x900/?city,${encodeURIComponent(city)}`;
  elements.bgImage.src = url;
}

function getWeatherEmoji(condition) {
  switch (condition.toLowerCase()) {
    case 'clear': return '☀️';
    case 'clouds': return '🌤️';
    case 'rain': return '🌧️';
    case 'thunderstorm': return '⛈️';
    case 'snow': return '❄️';
    case 'mist':
    case 'haze':
    case 'fog': return '🌫️';
    default: return '🌡️';
  }
}

function displayTemperature() {
  if (currentTempCelsius === null) return;
  if (isCelsius) {
    elements.temperature.textContent = `🌡️ ${Math.round(currentTempCelsius)}°C`;
    elements.toggleUnitBtn.textContent = 'Show in °F';
  } else {
    const fahrenheit = (currentTempCelsius * 9) / 5 + 32;
    elements.temperature.textContent = `🌡️ ${Math.round(fahrenheit)}°F`;
    elements.toggleUnitBtn.textContent = 'Show in °C';
  }
}

// Fetch weather data based on city name or geolocation coordinates
async function fetchWeather({ city = null, lat = null, lon = null } = {}) {
  // Show loader at the start
  elements.loader.hidden = false;
  elements.weatherDisplay.hidden = true;
  elements.errorMessage.hidden = true;

  try {
    let url = '';
    if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    } else if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    } else {
      throw new Error('No location data provided');
    }

    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) throw new Error('City not found');
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();

    const weatherMain = data.weather[0].main;
    const emoji = getWeatherEmoji(weatherMain);
    currentTempCelsius = data.main.temp;
    isCelsius = true;

    elements.cityName.textContent = `${data.name}, ${data.sys.country}`;
    displayTemperature();
    elements.weatherDescription.textContent = `${emoji} ${data.weather[0].description}`;
    elements.weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    elements.weatherIcon.alt = data.weather[0].description;

    updateBackground(data.name);

    // Smooth fade-in animation
    elements.weatherDisplay.classList.remove('visible');
    elements.weatherDisplay.hidden = false;
    requestAnimationFrame(() => {
      elements.weatherDisplay.classList.add('visible');
    });

  } catch (error) {
    showError(error.message);
  } finally {
    // Always hide loader
   elements.loader.hidden = false;
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('preferredTheme', isDark ? 'dark' : 'light');
  elements.themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
}

function loadTheme() {
  const stored = localStorage.getItem('preferredTheme');
  if (stored === 'dark') {
    document.body.classList.add('dark-mode');
    elements.themeToggleBtn.textContent = '☀️';
  } else {
    elements.themeToggleBtn.textContent = '🌙';
  }
}

function setupEventListeners() {
  elements.searchBtn.addEventListener('click', () => {
    const city = elements.cityInput.value.trim();
    if (city) {
      fetchWeather({ city });
    }
  });

  elements.locationBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
      showError('Geolocation is not supported by your browser.');
      return;
    }
    elements.loader.hidden = false;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather({ lat: position.coords.latitude, lon: position.coords.longitude });
      },
      () => {
        showError('Permission to access location was denied.');
        elements.loader.hidden = true;
      }
    );
  });

  elements.cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      elements.searchBtn.click();
    }
  });

  elements.toggleUnitBtn.addEventListener('click', () => {
    isCelsius = !isCelsius;
    displayTemperature();
  });

  elements.themeToggleBtn.addEventListener('click', toggleTheme);
}

// Initialize
function init() {
  updateDateTime();
  setInterval(updateDateTime, 1000);
  setupEventListeners();
  loadTheme();
}

document.addEventListener('DOMContentLoaded', init);
