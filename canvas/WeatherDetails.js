import { getWeatherIconUrl } from "../api.js";

export const formatTemperature = (temp) => {
  return Math.floor(temp);
};

export const formatHour = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const hour = date.getHours();
  const currentHour = new Date().getHours();

  return hour === currentHour ? "Now" : hour.toString().padStart(2, "0");
};

export function WeatherDetails(weather, baseWeather) {
  const detailsContainer = document.createElement("div");
  detailsContainer.className = "weather-details";

  let showHourly = false;
  let showDaily = false;

  const toggleHourly = () => {
    showHourly = !showHourly;
    showDaily = false;
    updateView();
  };

  const toggleDaily = () => {
    showDaily = !showDaily;
    showHourly = false;
    updateView();
  };

  const updateView = () => {
    detailsContainer.innerHTML = ""; // Clear previous contents

    const hourlyButton = document.createElement("button");
    hourlyButton.textContent = `Hourly ${showHourly ? "▲" : "▼"}`;
    hourlyButton.className = "toggle-button";
    hourlyButton.style.top = "155px";
    hourlyButton.style.left = "2%";
    hourlyButton.onclick = toggleHourly;
    detailsContainer.appendChild(hourlyButton);

    if (showHourly) {
      const hourlyForecastContainer = document.createElement("div");
      hourlyForecastContainer.className = "forecast-container";
      hourlyForecastContainer.classList.add("hourly-forecast");
      weather.hourly.slice(0, 24).forEach((hour, index) => {
        const hourElement = document.createElement("div");
        hourElement.className = "hourly-item";
        hourElement.textContent = `Hour ${index}: ${hour.temp}°C`;
        hourlyForecastContainer.appendChild(hourElement);
      });
      detailsContainer.appendChild(hourlyForecastContainer);
    }

    const dailyButton = document.createElement("button");
    dailyButton.textContent = `Advance ${showDaily ? "▲" : "▼"}`;
    dailyButton.className = "toggle-button";
    dailyButton.style.top = "200px";
    dailyButton.style.left = "2%";
    dailyButton.onclick = toggleDaily;
    detailsContainer.appendChild(dailyButton);

    if (showDaily) {
      const dailyForecastContainer = document.createElement("div");
      dailyForecastContainer.className = "forecast-container";
      dailyForecastContainer.classList.add("daily-forecast");
      weather.daily.slice(0, 7).forEach((day, index) => {
        const dayElement = document.createElement("div");
        dayElement.className = "daily-item";
        dayElement.innerHTML = `
          <div>${new Date(day.dt * 1000).toLocaleDateString("en-US", {
            weekday: "short",
          })}</div>
          <img src="${getWeatherIconUrl(day.weather[0].icon)}" alt="${
          day.weather[0].description
        }" />
          <div class="minMax">
            <div>${formatTemperature(day.temp.min)}°</div>
            <span class="temp"></span>
            <div>${formatTemperature(day.temp.max)}°</div>
          </div>
        `;
        dailyForecastContainer.appendChild(dayElement);
      });
      detailsContainer.appendChild(dailyForecastContainer);

      const advanceInfoSection = document.createElement("section");
      advanceInfoSection.className = "advanceInfo";

      const uvElement = document.createElement("div");
      uvElement.className = "uv";
      uvElement.innerHTML = `
        <span>
          <h5>UV-INDEX</h5>
          <p>${weather.daily[0].uvi}</p>
        </span>
        <p>${weather.daily[0].summary}</p>
      `;
      advanceInfoSection.appendChild(uvElement);

      const sunsetElement = document.createElement("div");
      sunsetElement.className = "sunSet";
      sunsetElement.innerHTML = `
        <span>
          <h4>Sunset</h4>
          <p>${formatHour(weather.daily[0].sunset)}</p>
        </span>
      `;
      advanceInfoSection.appendChild(sunsetElement);

      const feelsLikeElement = document.createElement("div");
      feelsLikeElement.className = "feelsLike";
      feelsLikeElement.innerHTML = `
        <span>
          <h5>Feels like</h5>
          <p>${formatTemperature(weather.daily[0].feels_like.day)}°</p>
        </span>
      `;
      advanceInfoSection.appendChild(feelsLikeElement);

      const windElement = document.createElement("div");
      windElement.className = "wind";
      windElement.innerHTML = `
        <span>
          <h5>Wind</h5>
          <p>${weather.daily[0].wind_speed} m/s</p>
        </span>
      `;
      advanceInfoSection.appendChild(windElement);

      detailsContainer.appendChild(advanceInfoSection);
    }
  };

  updateView();
  return detailsContainer;
}
