import { useState, useEffect, useRef } from "react";

// 1. 定义我们的字幕内容
const subtitles = [
  { id: 1, text: "Hello", color: "text-purple-500" },
  { id: 2, text: "My name is", color: "text-blue-500" },
  { id: 3, text: "Barry", color: "text-yellow-500" },
  { id: 4, text: "Welcome to my page.", color: "text-green-500" },
];

function SelfIntroduction() {
  // 2. 使用 state 来追踪当前应该激活哪个字幕的 id
  const [activeIndex, setActiveIndex] = useState(-1);

  // 创建 refs 来引用每个触发动画的“哨兵”div
  const triggerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // 3. 使用 IntersectionObserver API 来高效地检测元素是否进入视口
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 当一个哨兵 div 进入或离开视口时
          if (entry.isIntersecting) {
            // 从元素的 dataset 中获取其对应的 id
            const id = parseInt(entry.target.getAttribute("data-id") || "-1");
            setActiveIndex(id);
          }
        });
      },
      {
        // 4. 关键：当哨兵 div 的中心点到达视口的垂直中心时，触发事件
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      },
    );

    // 5. 观察所有哨兵 div
    triggerRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    // 组件卸载时停止观察，防止内存泄漏
    return () => {
      triggerRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    <div className="relative">
      {/* 6. 这是我们的粘性 "舞台"，它会一直固定在屏幕上 */}
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* 我们在这里渲染所有的字幕，但通过 CSS 控制它们的显隐和位置 */}
        {subtitles.map((item) => (
          <span
            key={item.id}
            className={`absolute text-4xl font-bold transition-all duration-500 ease-in-out ${item.color} ${
              activeIndex === item.id
                ? "translate-y-0 opacity-100" // 激活状态：在中心，完全可见
                : "translate-y-16 opacity-0" // 非激活状态：在下方，完全透明
            }`}
          >
            {item.text}
          </span>
        ))}
      </div>

      {/* 7. 这是我们的隐形“哨兵”div，用来触发动画 */}
      {/* 它们的高度决定了每个字幕停留的时间 */}
      <div className="relative">
        {subtitles.map((item, index) => (
          <div
            key={item.id}
            // 将 ref 添加到数组中
            ref={(el) => (triggerRefs.current[index] = el)}
            // 将 id 存储在 data-id 中，以便在回调中获取
            data-id={item.id}
            // 每个哨兵占据一个屏幕的高度
            className="h-screen"
          ></div>
        ))}
      </div>
    </div>
  );
}

export default SelfIntroduction;
