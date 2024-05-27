export const drawMoon = (ctx, width, height, currentHour) => {
  const moonX = (width / 24) * currentHour;
  const moonY =
    height / 2 - (Math.cos((Math.PI * currentHour) / 12) * height) / 3;
  const radius = 40;

  ctx.fillStyle = "lightgray";
  ctx.beginPath();
  ctx.arc(moonX, moonY, radius, 0, Math.PI * 2, true);
  ctx.fill();
};
