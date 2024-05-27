let raindropPositions = [];

export const initializeRaindrops = (count, canvasWidth, canvasHeight) => {
  raindropPositions = [];
  for (let i = 0; i < count; i++) {
    raindropPositions.push({
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      speed: 2 + Math.random() * 3,
      length: 10 + Math.random() * 10,
    });
  }
};

export const drawRain = (ctx, width, height) => {
  ctx.strokeStyle = "rgba(100,136,234, 0.3)";
  ctx.lineWidth = 2;

  raindropPositions.forEach((raindrop) => {
    ctx.beginPath();
    ctx.moveTo(raindrop.x, raindrop.y);
    ctx.lineTo(raindrop.x, raindrop.y + raindrop.length);
    ctx.stroke();

    raindrop.y += raindrop.speed;
    if (raindrop.y > height) {
      raindrop.y = -raindrop.length;
      raindrop.x = Math.random() * width;
    }
  });
};
