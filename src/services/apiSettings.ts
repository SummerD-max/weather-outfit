// 这是一个示例，你需要根据你的数据库表结构来调整

import type { Setting } from "../types/Setting";
import { supabase } from "./supabase";

// 假设你有一个名为 'settings' 的表
export const getSettings = async (
  userId: string | undefined,
): Promise<Setting> => {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("userId", userId)
    .single();

  if (error) {
    console.error("Error fetching settings:", error);
    throw new Error(error.message);
  }

  return data;
};

// 假设你有一个名为 'settings' 的表，并且只想更新它
// 注意：你需要确保你的表有行级安全策略（RLS）来保护用户数据
export type UpdateSettingsParams = {
  settingsToUpdate: Partial<Setting>;
  userId: Setting["userId"];
};

export const updateSettings = async ({
  settingsToUpdate,
  userId,
}: UpdateSettingsParams): Promise<Setting | null> => {
  const { ...updateData } = settingsToUpdate;

  const { data, error } = await supabase
    .from("settings")
    .update(updateData)
    .eq("userId", userId)
    .select()
    .single();

  if (error) {
    console.error("Error updating settings:", error);
    throw new Error(error.message);
  }

  return data;
};
