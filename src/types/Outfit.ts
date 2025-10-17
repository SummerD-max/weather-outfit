import type { ClothingItem } from "./WarDrobe";

export type Outfit = {
  top: ClothingItem;
  bottom: ClothingItem;
  outerwear?: ClothingItem;
  accessory?: ClothingItem;
  message?: string; // 推荐理由或提示信息
};
