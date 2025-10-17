import { useEffect, useRef } from "react";

type FloatingScrollButtonProps = {
  targetRef: React.RefObject<HTMLElement | null>;
  onAfterScroll?: () => void;
  children: React.ReactNode;
};

function FloatingScrollButton({
  targetRef,
  onAfterScroll,
  children,
}: FloatingScrollButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(
    function () {
      const targetElement = targetRef?.current;
      const buttonElement = buttonRef?.current;

      if (!targetElement || !buttonElement) return;

      const intersectionObserve = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const isTargetVisible = entry.isIntersecting;
          buttonElement.style.opacity = isTargetVisible ? "0" : "100";
        });
      });
      intersectionObserve.observe(targetElement);

      return () => {
        intersectionObserve.disconnect();
      };
    },
    [targetRef],
  );

  const handleScrollToTarget = () => {
    if (!targetRef?.current) return;
    targetRef?.current.scrollIntoView({ behavior: "smooth", block: "start" });
    onAfterScroll?.();
  };

  return (
    <button
      className="fixed right-15 bottom-20 cursor-pointer rounded-full bg-blue-500/75 px-4 py-2 text-gray-50 shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl"
      ref={buttonRef}
      onClick={handleScrollToTarget}
    >
      {children}
    </button>
  );
}

export default FloatingScrollButton;
