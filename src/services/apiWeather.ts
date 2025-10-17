import type { WeatherData } from "../types/WeatherData";

// OpenWeatherMap API 配置
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // 从环境变量获取 API key
const BASE_URL = import.meta.env.VITE_WEATHER_API_URL;

// console.log(API_KEY, BASE_URL);

// 从 OpenWeatherMap 获取天气数据的函数
async function fetchWeather(q: string): Promise<WeatherData> {
  if (!API_KEY) {
    throw new Error(
      "API key is not configured. Please add VITE_OPENWEATHER_API_KEY to your .env.local file.",
    );
  }

  try {
    const response = await fetch(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${q}`,
    );
    if (!response.ok) {
      throw new Error(
        `Weather API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    console.log(data);

    return data as WeatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("无法获取天气数据，请检查网络连接或 API 配置。");
  }
}

export { fetchWeather };
