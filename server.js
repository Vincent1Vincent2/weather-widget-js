import cors from "cors";
import "dotenv/config";
import express from "express";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 3100;

const apiKey = process.env.API_KEY;
const baseURL = process.env.BASE_URL;
const extendedURL = process.env.EXTENDED_URL;

if (!apiKey || !baseURL || !extendedURL) {
  throw new Error(
    "Environment variables API_KEY, BASE_URL, and EXTENDED_URL must be set"
  );
}
app.use(cors());

app.use(express.static("public"));

app.get("/weather", async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const response = await fetch(
      `${extendedURL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) throw new Error("Failed to fetch weather data");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/baseWeather", async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const response = await fetch(
      `${baseURL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) throw new Error("Failed to fetch weather data");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
