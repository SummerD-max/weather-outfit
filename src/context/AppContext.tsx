import React, { createContext, useReducer, useContext } from "react";
import type { WeatherData } from "../types/WeatherData";
import type { Outfit } from "../types/Outfit";

// 1. 定义 State 和 Action 的类型
// 服务器状态（如衣柜和设置）已被移除，由 TanStack Query 管理

type AppState = {
  weatherData: WeatherData | null;
  outfitRecommendation: Outfit | null;
};

type AppAction =
  | { type: "SET_WEATHER_DATA"; payload: WeatherData }
  | { type: "SET_OUTFIT_RECOMMENDATION"; payload: Outfit };

// 2. 创建初始状态
const initialState: AppState = {
  weatherData: null,
  outfitRecommendation: null,
};

// 3. 创建 Reducer 函数
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_WEATHER_DATA":
      return {
        ...state,
        weatherData: action.payload,
      };
    case "SET_OUTFIT_RECOMMENDATION":
      return {
        ...state,
        outfitRecommendation: action.payload,
      };
    default:
      return state;
  }
};

// 4. 创建 Context
const AppStateContext = createContext<AppState | undefined>(undefined);
const AppDispatchContext = createContext<React.Dispatch<AppAction> | undefined>(
  undefined,
);

// 5. 创建 Provider 组件
type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

// 6. 创建自定义 Hooks
export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within a AppProvider");
  }
  return context;
};

export const useAppDispatch = () => {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error("useAppDispatch must be used within a AppProvider");
  }
  return context;
};
