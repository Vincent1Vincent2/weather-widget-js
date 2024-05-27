let apiKey = "57aac439a7d812655ac1ee1eb29ce261";
let baseURL = "https://api.openweathermap.org/data/2.5/weather";
let extendedURL = "https://api.openweathermap.org/data/3.0/onecall";

if (!apiKey || !baseURL || !extendedURL) {
  throw new Error(
    "Environment variables API_KEY, BASE_URL, and EXTENDED_URL must be set"
  );
}

export const getWeather = async (lat, lon) => {
  const response = await fetch(
    `${extendedURL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return response.json();
};

export const getBaseWeather = async (lat, lon) => {
  const response = await fetch(
    `${baseURL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return response.json();
};

export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
