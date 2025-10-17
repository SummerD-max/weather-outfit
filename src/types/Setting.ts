// 定义 Settings 类型，这应该与你的数据库表结构匹配
export type Setting = {
  id: number;
  location: string;
  style: "casual" | "sporty" | "formal" | "elegant";
  temperatureUnit: "celsius" | "fahrenheit";
  // ... any other setting fields
  userId: string | undefined; // 假设你有一个 userId 字段来关联用户
};
