import { useEffect, useRef } from "react";

export function useBlob() {
  // 1. 创建一个 ref 来引用光标 div
  const blobRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(function () {
    const mainEl = mainRef.current;
    const blobEl = blobRef.current;
    if (!mainEl || !blobEl) return;

    function handleMouseMove(e: MouseEvent) {
      if (blobEl) {
        blobEl.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    }

    function handleMouseLeave() {
      if (blobEl) {
        blobEl.style.opacity = "0";
      }
    }

    function handleMouseEnter() {
      if (blobRef.current) {
        blobRef.current.style.opacity = "0.3";
      }
    }

    mainEl.addEventListener("mousemove", handleMouseMove);
    mainEl.addEventListener("mouseleave", handleMouseLeave);
    mainEl.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      mainEl.removeEventListener("mousemove", handleMouseMove);
      mainEl.removeEventListener("mouseleave", handleMouseLeave);
      mainEl.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return { blobRef, mainRef };
}
