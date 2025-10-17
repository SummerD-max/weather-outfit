import type { User } from "../types/User";
import type { ClothingItem } from "../types/WarDrobe";
import { supabase } from "./supabase";

// 添加新衣物
export const addClothingItem = async (item: Omit<ClothingItem, "id">) => {
  const { data, error } = await supabase
    .from("wardrobe")
    .insert([item])
    .select()
    .single();

  if (error) {
    console.error("Error adding clothing item:", error);
    throw new Error(error.message);
  }

  return data;
};

// 删除衣物
export const removeClothingItem = async (id: ClothingItem["id"]) => {
  const { error } = await supabase.from("wardrobe").delete().eq("id", id);

  if (error) {
    console.error("Error removing clothing item:", error);
    throw new Error(error.message);
  }

  return id; // 返回被删除的ID，方便在UI端处理
};

// 假设你有一个名为 'wardrobe' 的表
export const getWardrobe = async (userId: User["userId"]) => {
  const { data, error } = await supabase
    .from("wardrobe")
    .select("*")
    .eq("userId", userId);

  if (error) {
    console.error("Error fetching wardrobe:", error);
    throw new Error(error.message);
  }

  return data as ClothingItem[];
};
