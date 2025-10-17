import type { Outfit } from "../../types/Outfit";
import type { Setting } from "../../types/Setting";
import type { SimplifiedWeatherForLogic } from "../../types/SimplifiedWeatherForLogic";
import type { ClothingItem } from "../../types/WarDrobe";

/**
 * 根据天气和衣柜推荐一套服装
 * @param weather - 当前天气数据
 * @param wardrobe - 用户的衣柜列表
 * @param settings - 用户的偏好设置
 * @returns 推荐的服装组合或null
 */
export const recommendOutfit = (
  weather: SimplifiedWeatherForLogic,
  wardrobe: ClothingItem[],
  settings: Setting,
): Outfit | null => {
  // 1. 根据温度确定保暖度范围
  let requiredWarmth = 5; // 默认保暖度
  if (weather.temperature < 10) {
    requiredWarmth = 9; // 很冷
  } else if (weather.temperature < 18) {
    requiredWarmth = 7; // 微冷
  } else if (weather.temperature < 25) {
    requiredWarmth = 4; // 温暖
  } else {
    requiredWarmth = 2; // 炎热
  }

  // 2. 筛选符合风格和类别的衣物
  const tops = wardrobe.filter(
    (item) => item.category === "top" && item.style === settings.style,
  );
  const bottoms = wardrobe.filter(
    (item) => item.category === "bottom" && item.style === settings.style,
  );
  const outwears = wardrobe.filter(
    (item) => item.category === "outerwear" && item.style === settings.style,
  );

  // 寻找最接近所需保暖度的组合
  const findBestMatch = (items: ClothingItem[], targetWarmth: number) => {
    if (items.length === 0) return undefined;
    return items.reduce((prev, curr) =>
      Math.abs(curr.warmth - targetWarmth) <
      Math.abs(prev.warmth - targetWarmth)
        ? curr
        : prev,
    );
  };

  const recommendedTop = findBestMatch(tops, requiredWarmth);
  const recommendedBottom = findBestMatch(bottoms, requiredWarmth);

  if (!recommendedTop || !recommendedBottom) {
    return null; // 缺少核心衣物，无法推荐
  }

  const recommendation: Outfit = {
    top: recommendedTop,
    bottom: recommendedBottom,
    message: `Based on today's weather, we recommend this ${settings.style} style outfit for you.`,
  };

  // 3. 根据需要决定是否添加外套
  const combinedWarmth = (recommendedTop.warmth + recommendedBottom.warmth) / 2;
  if (requiredWarmth > 6 && combinedWarmth < 7) {
    const recommendedOuterwear = findBestMatch(outwears, requiredWarmth - 1);
    if (recommendedOuterwear) {
      recommendation.outerwear = recommendedOuterwear;
      recommendation.message += ` It's a bit chilly outside, don't forget to wear a coat.`;
    }
  }

  return recommendation;
};
