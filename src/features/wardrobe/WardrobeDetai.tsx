import { useEffect, useRef } from "react";
import WardrobeHeader from "./WardrobeHeader";
import AddClothingForm from "./AddClothingForm";
import WardrobeList from "./WardrobeList";
import FloatingScrollButton from "../../ui/FloatingScrollButton";

function WardrobeDetail() {
  const addFormRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(function () {
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === addFormRef.current) {
          const button = buttonRef.current;
          if (button) {
            button.style.opacity = entry.isIntersecting ? "0" : "100";
          }
        }
      });
    });

    if (addFormRef.current) {
      intersectionObserver.observe(addFormRef.current);
    }

    return () => {
      intersectionObserver.disconnect();
    };
  }, []);

  const handleFocusInput = () => {
    addFormRef?.current?.querySelector("input")?.focus();
  };

  return (
    <div className="space-y-8">
      <WardrobeHeader />

      <div ref={addFormRef} className="scroll-mt-20">
        <AddClothingForm />
      </div>

      <div>
        <WardrobeList />
      </div>

      <FloatingScrollButton
        targetRef={addFormRef}
        onAfterScroll={handleFocusInput}
      >
        Continue adding some clothes
      </FloatingScrollButton>
    </div>
  );
}

export default WardrobeDetail;
