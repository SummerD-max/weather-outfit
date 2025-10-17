import type { WeatherData } from "./WeatherData";

export type SimplifiedWeatherForLogic = {
  temperature: WeatherData["current"]["temp_c"];
  feelsLike: WeatherData["current"]["feelslike_c"];
  condition: WeatherData["current"]["condition"]["text"];
  windSpeed: WeatherData["current"]["wind_kph"];
};
