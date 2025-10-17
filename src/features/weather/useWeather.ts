import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../../services/apiWeather";
import type { WeatherData } from "../../types/WeatherData";
import { useSettings } from "../setting/useSettings";

export function useWeather(position?: { latitude: number; longitude: number }) {
  const { settings } = useSettings();
  const positionStr = `${position?.latitude},${position?.longitude}`;
  const city = settings?.location; // Every user should have a setting

  const {
    data: weather,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<WeatherData>({
    queryKey: ["weather", (position && positionStr) || city],
    queryFn: () => {
      return fetchWeather((position && positionStr) || city!);
    },
    enabled: !!city, // 只有当 city 存在时才查询
    staleTime: 1000 * 60 * 10, // 10 分钟内数据视为新鲜
    gcTime: 1000 * 60 * 30, // 30 分钟后清除缓存
  });

  return {
    weather,
    isLoading,
    isError,
    error,
    refetch,
  };
}
