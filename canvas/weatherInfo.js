export const drawWeatherInfo = (ctx, width, height, weather) => {
  const currentTemp = Math.floor(weather.current.temp);
  const maxTemp = Math.floor(weather.daily[0].temp.max);
  const minTemp = Math.floor(weather.daily[0].temp.min);

  ctx.fillStyle = "black";
  ctx.font = "bold 40px Arial";
  ctx.textAlign = "center";

  ctx.fillText(weather.timezone, width / 2, height / 4);
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText(
    weather.current.weather[0].description,
    width / 2,
    height / 4 + 40
  );
  ctx.fillText(currentTemp + " °C", width / 2, height / 4 + 80);

  ctx.font = "14px Arial";
  ctx.textAlign = "right";
  ctx.textBaseline = "top";

  ctx.fillText("Max " + maxTemp.toString() + " °C", width / 1 - 15, 15);
  ctx.fillText("Min " + minTemp.toString() + " °C", width / 1 - 15, 40);
};
