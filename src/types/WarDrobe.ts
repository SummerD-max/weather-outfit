// 定义 ClothingItem 类型
export type ClothingItem = {
  id: number; // 假设数据库使用数字ID
  name: string;
  category: "top" | "bottom" | "outerwear" | "accessory";
  style: "casual" | "formal" | "sporty" | "vintage";
  warmth: number;
  userId: string;
};
