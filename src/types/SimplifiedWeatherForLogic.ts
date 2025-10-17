import type { WeatherData } from "./WeatherData";

export type SimplifiedWeatherForLogic = {
  temperature: WeatherData["current"]["temp_c"] | undefined;
  feelsLike: WeatherData["current"]["feelslike_c"] | undefined;
  condition: WeatherData["current"]["condition"]["text"] | undefined;
  windSpeed: WeatherData["current"]["wind_kph"] | undefined;
};
