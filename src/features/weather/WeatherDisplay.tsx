import { FaSun, FaTemperatureHigh, FaTint, FaWind } from "react-icons/fa";
import SpinnerInside from "../../ui/SpinnerInside";
import { useSettings } from "../setting/useSettings";
import { useWeather } from "./useWeather";
import { HiSun } from "react-icons/hi";

function WeatherDisplay() {
  const { weather, isLoading: isLoadingWeather, error } = useWeather();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const isLoading = isLoadingWeather || isLoadingSettings;

  const weatherInfo = weather?.current;
  const isCelsius = settings?.temperatureUnit === "celsius";
  const unitSymbol = isCelsius ? "°C" : "°F";

  if (isLoading) return <SpinnerInside />;
  if (error) {
    return (
      <div className="flex flex-col rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">
          Current weather
        </h2>
        <p className="text-gray-600">Failed to fetch weather data.</p>
      </div>
    );
  }

  const {
    temp_c,
    temp_f,
    feelslike_c,
    feelslike_f,
    wind_kph,
    uv,
    wind_mph,
    humidity,
    last_updated,
    condition: { text },
  } = weatherInfo!;

  const displayTemp = isCelsius ? temp_c : temp_f;
  const displayFeelsLike = isCelsius ? feelslike_c : feelslike_f;
  const displayWindSpeed = isCelsius ? `${wind_kph} kph` : `${wind_mph} mph`;

  return (
    <div className="flex flex-col rounded-xl bg-white p-6 shadow-lg">
      <h2 className="mb-10 flex items-center gap-2 text-2xl font-semibold text-gray-100">
        <span>
          <HiSun className="text-sky-500" size={48} />
        </span>
        <span className="rounded-full bg-sky-500 px-4 py-2">
          Current weather
        </span>
      </h2>
      {!isLoading && weather && (
        <div className="flex flex-1 flex-col justify-between">
          {/* 主要天气 */}
          <div className="flex items-center justify-around text-center">
            <div className="flex items-center">
              <div>
                <p className="text-5xl font-bold text-blue-600">
                  {Math.round(Number(displayTemp))}
                  <span className="text-3xl">{unitSymbol}</span>
                </p>
                <p className="text-lg font-semibold text-gray-700 uppercase">
                  {text}
                </p>
              </div>
            </div>
          </div>

          {/* 详细信息网格 */}
          <div className="mt-6 grid grid-cols-2 gap-4 text-center">
            <div className="rounded-lg bg-gray-50 p-3">
              <FaTemperatureHigh
                className="mx-auto mb-1 text-lg text-blue-500"
                aria-label="体感温度"
              />
              <p className="font-semibold text-gray-800">体感温度</p>
              <p className="text-gray-600">
                {Math.round(Number(displayFeelsLike))}
                {unitSymbol}
              </p>
            </div>
            <div className="rounded-lg bg-gray-50 p-3">
              <FaWind
                className="mx-auto mb-1 text-lg text-blue-500"
                aria-label="风速"
              />
              <p className="font-semibold text-gray-800">风速</p>
              <p className="text-gray-600">{displayWindSpeed}</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-3">
              <FaTint
                className="mx-auto mb-1 text-lg text-blue-500"
                aria-label="湿度"
              />
              <p className="font-semibold text-gray-800">湿度</p>
              <p className="text-gray-600">{humidity}%</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-3">
              <FaSun
                className="mx-auto mb-1 text-lg text-blue-500"
                aria-label="UV指数"
              />
              <p className="font-semibold text-gray-800">UV指数</p>
              <p className="text-gray-600">{uv}</p>
            </div>
          </div>
          <p className="mt-4 text-right text-xs text-gray-400">
            最后更新于: {last_updated.split(" ")[1]}
          </p>
        </div>
      )}
    </div>
  );
}

export default WeatherDisplay;
