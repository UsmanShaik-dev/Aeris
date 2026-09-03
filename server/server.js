import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* =========================================================
   GEMINI
========================================================= */

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateAIResponse(message, retries = 3) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",

        contents: `
You are Aeris, a friendly and intelligent AI travel assistant.

Your job is to help users:
- Plan trips
- Discover destinations
- Create day-by-day itineraries
- Recommend experiences
- Suggest activities
- Give practical travel advice
- Help with budgets and trip duration
- Answer travel-related questions

PERSONALITY:
- Friendly
- Helpful
- Natural
- Concise
- Excited about travel
- Never overly robotic

When creating itineraries, organize them clearly by day.

When recommending destinations, explain briefly why they suit the user's request.

Do not make up dangerous or highly specific claims.
If you are unsure about something, say so.

User message:
${message}
        `,
      });

      return response.text;
    } catch (error) {
      console.error(
        `Gemini attempt ${attempt + 1} failed:`,
        error.status || error.message,
      );

      if (error.status === 503 && attempt < retries - 1) {
        const delay = 1500 * (attempt + 1);

        console.log(`Retrying Gemini in ${delay}ms...`);

        await new Promise((resolve) => setTimeout(resolve, delay));

        continue;
      }

      throw error;
    }
  }
}

/* =========================================================
   CHAT ROUTE
========================================================= */

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const reply = await generateAIResponse(message);

    res.json({
      reply,
    });
  } catch (error) {
    console.error("Gemini error:", error);

    if (error.status === 503) {
      return res.status(503).json({
        error: "Aeris is temporarily busy. Please try again in a moment.",
      });
    }

    res.status(500).json({
      error: "Failed to get AI response",
    });
  }
});

/* =========================================================
   WEATHER ROUTE
========================================================= */

app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city || "Bengaluru";

    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "OpenWeather API key is missing",
      });
    }

    /* -------------------------------------------------------
       STEP 1
       Convert city name → latitude / longitude
    ------------------------------------------------------- */

    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        city,
      )}&limit=1&appid=${apiKey}`,
    );

    if (!geoResponse.ok) {
      const errorText = await geoResponse.text();

      console.error(
        "OpenWeather Geocoding Error:",
        geoResponse.status,
        errorText,
      );

      throw new Error(`OpenWeather geocoding failed: ${geoResponse.status}`);
    }

    const locations = await geoResponse.json();

    if (!locations.length) {
      return res.status(404).json({
        error: "Location not found",
      });
    }

    const location = locations[0];

    /* -------------------------------------------------------
       STEP 2
       Get current weather
    ------------------------------------------------------- */

    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${apiKey}`,
    );

    if (!weatherResponse.ok) {
      throw new Error("Failed to fetch weather");
    }

    const weather = await weatherResponse.json();

    /* -------------------------------------------------------
       STEP 3
       Send only what frontend needs
    ------------------------------------------------------- */

    res.json({
      city: location.name,
      country: location.country,
      countryCode: location.country,

      latitude: location.lat,
      longitude: location.lon,

      temperature: Math.round(weather.main.temp),

      feelsLike: Math.round(weather.main.feels_like),

      condition: weather.weather?.[0]?.description || "Unknown",

      weatherMain: weather.weather?.[0]?.main || "Unknown",

      icon: weather.weather?.[0]?.icon || null,

      high: Math.round(weather.main.temp_max),

      low: Math.round(weather.main.temp_min),

      humidity: weather.main.humidity,

      windSpeed: weather.wind.speed,

      timezone: weather.timezone,
    });
  } catch (error) {
    console.error("Weather API error:", error);

    res.status(500).json({
      error: "Unable to fetch weather",
    });
  }
});

/* =========================================================
   SERVER
========================================================= */

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Aeris AI server running on http://localhost:${PORT}`);
});
