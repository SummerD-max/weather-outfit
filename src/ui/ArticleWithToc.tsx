import { useState, useEffect, useRef } from "react";

// 模拟的文章内容数据结构
const articleContent = [
  { type: "heading", level: 2, text: "Introduction", id: "introduction" },
  {
    type: "paragraph",
    text: "Welcome to this comprehensive guide. Here we will explore various topics in detail, providing insights and practical examples.",
  },
  {
    type: "paragraph",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
  },
  {
    type: "heading",
    level: 2,
    text: "Chapter 1: The Basics",
    id: "chapter-1-the-basics",
  },
  {
    type: "paragraph",
    text: "Before diving deep, it's crucial to understand the fundamentals. This chapter covers the essential concepts that form the foundation of our subject.",
  },
  {
    type: "paragraph",
    text: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.",
  },
  {
    type: "paragraph",
    text: "Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
  },
  {
    type: "heading",
    level: 2,
    text: "Chapter 2: Advanced Techniques",
    id: "chapter-2-advanced-techniques",
  },
  {
    type: "paragraph",
    text: "With the basics covered, we can now move on to more advanced techniques. These methods will allow you to tackle complex problems with elegance and efficiency.",
  },
  {
    type: "paragraph",
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    type: "heading",
    level: 2,
    text: "Conclusion",
    id: "conclusion",
  },
  {
    type: "paragraph",
    text: "In conclusion, we have journeyed from the basics to advanced topics. We hope this guide has been informative and empowering. Happy coding!",
  },
];

// 提取目录项
const tableOfContents = articleContent.filter(
  (item) => item.type === "heading",
);

function ArticleWithToc() {
  // 1. 使用 state 追踪当前高亮的目录项 ID
  const [activeId, setActiveId] = useState("");
  // 使用 ref 来存储对每个 section 元素的引用
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    // 2. 创建 IntersectionObserver 来观察 sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 当一个 section 进入视口时，更新 activeId
            setActiveId(entry.target.id);
          }
        });
      },
      // 3. 配置选项：当 section 顶部进入视口上半部分时触发
      { rootMargin: "0px 0px -80% 0px", threshold: 0 },
    );

    // 4. 观察所有被引用的 section 元素
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    // 5. 组件卸载时停止观察，防止内存泄漏
    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-4 gap-12">
        {/* 文章内容区域 */}
        <article className="col-span-3">
          <div className="prose prose-lg max-w-none">
            {articleContent.map((item, index) => {
              if (item.type === "heading") {
                return (
                  <h2
                    key={item.id}
                    id={item.id}
                    // 将 DOM 元素与 ref 关联
                    ref={(el) => (sectionRefs.current[item.id!] = el)}
                    className="text-2xl" // 确保跳转时标题不会被顶部导航栏遮挡
                  >
                    {item.text}
                  </h2>
                );
              }
              return <p key={index}>{item.text}</p>;
            })}
          </div>
        </article>

        {/* 目录区域 */}
        <aside className="col-span-1">
          <div className="sticky top-20">
            <h3 className="mb-4 font-semibold">Table of Contents</h3>
            <ul className="space-y-2">
              {tableOfContents.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`transition-colors duration-200 hover:text-blue-500 ${
                      activeId === item.id
                        ? "font-bold text-blue-600" // 高亮样式
                        : "text-gray-500"
                    }`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
      <div className="h-screen"></div>
    </>
  );
}

export default ArticleWithToc;
