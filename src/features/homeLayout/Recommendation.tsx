import { HiArrowDown } from "react-icons/hi";
import SpinnerInside from "../../ui/SpinnerInside";
import { recommendOutfit } from "../outfit/outfitLogic";
import { useSettings } from "../setting/useSettings";
import { useWardrobe } from "../wardrobe/useWardrobe";
import { useWeather } from "../weather/useWeather";
import ClothingCard from "./ClothingCard";

function Recommendation() {
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const { wardrobe, isLoading: isLoadingWardrobe } = useWardrobe();
  const { weather, isLoading: isLoadingWeather } = useWeather(); // useWeather 现在返回完整的 WeatherData

  const isLoading = isLoadingSettings || isLoadingWardrobe || isLoadingWeather;
  const weatherInfo = weather?.current;

  // 适配新的 WeatherData 结构以兼容旧的 recommendOutfit 函数
  // 我们从完整的 weather 对象中提取所需的信息
  const simplifiedWeatherForLogic = weather
    ? {
        temperature: weatherInfo?.temp_c,
        feelsLike: weatherInfo?.feelslike_c,
        condition: weatherInfo?.condition.text,
        windSpeed: weatherInfo?.wind_kph,
      }
    : null;

  const recommendation =
    settings && wardrobe && simplifiedWeatherForLogic
      ? recommendOutfit(simplifiedWeatherForLogic, wardrobe, settings)
      : null;

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <h2 className="mb-10 text-2xl font-semibold text-gray-900">
        <span className="rounded-full bg-green-600 px-4 py-2 text-gray-100">
          Recommendation
        </span>
      </h2>
      {isLoading && <SpinnerInside />}
      {!isLoading && recommendation && (
        <div className="space-y-3">
          <p className="grid grid-cols-6 items-center rounded-lg text-xl font-semibold">
            <span className="col-span-5 text-green-600">
              {recommendation.message}
            </span>
            <span className="col-span-1 cursor-pointer justify-self-center rounded-full bg-green-500 p-2 text-white transition-transform duration-200 hover:translate-y-1">
              <HiArrowDown size={26} />
            </span>
          </p>
          <div className="space-y-2">
            <ClothingCard item={recommendation.top} />
            <ClothingCard item={recommendation.bottom} />
            {recommendation.outerwear && (
              <ClothingCard item={recommendation.outerwear} />
            )}
            {recommendation.accessory && (
              <ClothingCard item={recommendation.accessory} />
            )}
          </div>
        </div>
      )}
      {!isLoading && !recommendation && (
        <p className="text-center text-gray-500">
          无法生成推荐，请检查您的衣柜和设置是否完整。
        </p>
      )}
    </div>
  );
}

export default Recommendation;
