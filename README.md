# Weather-app-Project

Weatherly is a responsive and interactive web application that provides real-time weather information for any city. Built with modern web technologies, it features dynamic backgrounds, animated icons, unit toggles, geolocation support, and light/dark mode for an engaging user experience.

Features:
Real-Time Weather Data: Fetches data from the OpenWeatherMap API.
Dynamic Backgrounds: Automatically updates backgrounds based on the searched city using Unsplash images.
Weather Icons & Emojis: Animated weather icons reflect current conditions (sunny, cloudy, rainy, etc.).
Celsius/Fahrenheit Toggle: Switch between temperature units.
Geolocation Support: Automatically fetches weather for the user’s current location.
Light/Dark Mode: Toggle between themes; preferences saved in local storage.
Smooth Animations: Fade-in effects for results and transitions for enhanced UX.
Responsive Design: Works across desktop and mobile devices.
Installation & Usage

Clone the repository:
git clone https://github.com/yourusername/weatherpulse.git

Open index.html in your web browser.
Enter a city name or use the “Use My Location” button to fetch local weather.
Toggle temperature units or switch between light and dark mode as desired.
Note: You need a free OpenWeatherMap API key. Replace the key in script.js before using the app:
const apiKey = 'YOUR_API_KEY_HERE';

Technologies Used
Frontend: HTML5, CSS3, JavaScript (ES6+)
APIs: OpenWeatherMap API, Unsplash API for city backgrounds
UX Enhancements: Dynamic animations, fade-in results, loader animations
Browser APIs: Geolocation API
Future Improvements
Embed a live spinning Earth video in the background.
Add hourly/daily forecast with charts.
Implement offline caching to improve performance.
Include multi-language support for global users.

