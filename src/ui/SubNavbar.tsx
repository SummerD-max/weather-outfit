import { useState } from "react";

type SubNavbarProps = {
  activeColor?: "yellow" | "blue" | "green"; // 限制颜色为支持的类型
};

// 1. 创建一个颜色映射对象，包含所有完整的类名
const colorVariants = {
  yellow: {
    text: "text-yellow-500",
    hover: "hover:text-yellow-500",
    bg: "bg-yellow-500",
  },
  blue: {
    text: "text-blue-500",
    hover: "hover:text-blue-500",
    bg: "bg-blue-500",
  },
  green: {
    text: "text-green-500",
    hover: "hover:text-green-500",
    bg: "bg-green-500",
  },
};

function SubNavbar({ activeColor = "yellow" }: SubNavbarProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const width = 80;
  const underlineStyle = {
    left: `${activeIndex * width}px`,
    width: `${width}px`,
  };

  // 2. 从映射中获取当前激活的颜色类集合
  const colors = colorVariants[activeColor];

  return (
    <>
      {/* 3. 将 relative 定位应用到 <nav> 元素上 */}
      <nav className="flex justify-center gap-2">
        <div className="relative">
          {/* 4. 在 className 中使用完整的类名 */}
          <button
            className={`mb-2 cursor-pointer text-center font-semibold ${colors.hover} ${activeIndex === 0 ? colors.text : "text-gray-500"}`}
            style={{ width: `${width}px` }}
            onClick={() => setActiveIndex(0)}
          >
            1
          </button>
          <button
            className={`mb-2 cursor-pointer text-center font-semibold ${colors.hover} ${activeIndex === 1 ? colors.text : "text-gray-500"}`}
            style={{ width: `${width}px` }}
            onClick={() => setActiveIndex(1)}
          >
            2
          </button>
          <button
            className={`mb-2 cursor-pointer text-center font-semibold ${colors.hover} ${activeIndex === 2 ? colors.text : "text-gray-500"}`}
            style={{ width: `${width}px` }}
            onClick={() => setActiveIndex(2)}
          >
            3
          </button>
          {/* 5. 下划线现在是 <nav> 的直接子元素 */}
          <div
            className={`absolute bottom-0 h-1 rounded transition-all duration-300 ease-in-out ${colors.bg}`}
            style={underlineStyle}
          ></div>
        </div>
      </nav>
      <div className="mt-5">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam
        corrupti at quos itaque eaque id consequatur quae, odit maiores quidem
        inventore odio, laborum libero officia unde vel officiis excepturi
        pariatur.
      </div>
    </>
  );
}

export default SubNavbar;
