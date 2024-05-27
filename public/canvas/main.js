// Import necessary functions
import { getBaseWeather, getWeather } from "../../api.js";
import { useLocation } from "../../location.js";
import { WeatherDetails } from "./WeatherDetails.js";
import { setCanvasBackground } from "./backgroundHandler.js";
import { drawCloudySky, initializeClouds } from "./cloudHandler.js";
import { drawMoon } from "./moon.js";
import { drawRain, initializeRaindrops } from "./rainHandler.js";
import { drawSun } from "./sun.js";
import { drawWeatherInfo } from "./weatherInfo.js";

const canvas = document.getElementById("weatherCanvas");
const ctx = canvas.getContext("2d");
const weatherDetailsDiv = document.getElementById("weather-details");

const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = 250; // Adjust height as needed
};

const drawWeather = async () => {
  useLocation(
    async (location) => {
      document.getElementById(
        "location"
      ).textContent = `Latitude: ${location.lat}, Longitude: ${location.lon}`;
      try {
        const weather = await getWeather(location.lat, location.lon);
        const baseWeather = await getBaseWeather(location.lat, location.lon);

        initializeWeatherEffects(weather);
        render(weather);

        // Display weather details using the WeatherDetails component
        const weatherDetailsElement = WeatherDetails(weather, baseWeather);
        weatherDetailsDiv.innerHTML = ""; // Clear previous contents
        weatherDetailsDiv.appendChild(weatherDetailsElement);
      } catch (error) {
        document.getElementById("error").textContent = error.message;
      }
    },
    (error) => {
      document.getElementById("error").textContent =
        "Geolocation error: " + error;
    }
  );
};

const initializeWeatherEffects = (weather) => {
  switch (weather.current.weather[0].main) {
    case "Clear":
      drawSun(ctx, canvas.width, canvas.height, new Date().getHours());
      break;
    case "Rain":
      initializeRaindrops(100, canvas.width, canvas.height);
      break;
    case "Clouds":
      initializeClouds(3, canvas.width, canvas.height);
      break;
    default:
      break;
  }
};

const render = (weather) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setCanvasBackground(ctx, canvas.width, canvas.height, weather);

  const currentHour = new Date().getHours();
  const isDayTime = currentHour >= 6 && currentHour < 18;

  if (isDayTime) {
    drawSun(ctx, canvas.width, canvas.height, currentHour);
  } else {
    drawMoon(ctx, canvas.width, canvas.height, currentHour);
  }

  switch (weather.current.weather[0].main) {
    case "Clear":
      break;
    case "Rain":
      drawRain(ctx, canvas.width, canvas.height);
      break;
    case "Clouds":
      drawCloudySky(ctx, canvas.width, canvas.height);
      break;
    default:
      break;
  }

  drawWeatherInfo(ctx, canvas.width, canvas.height, weather);

  requestAnimationFrame(() => render(weather));
};

const init = () => {
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  drawWeather();
};

window.onload = init;
