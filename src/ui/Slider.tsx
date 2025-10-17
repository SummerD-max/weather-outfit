import { useCallback, useEffect, useState } from "react";
import type { Image } from "../types/Image";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

type SliderProps = {
  images: Image[];
};

function Slider({ images }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const gotoPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, images.length]);

  const gotoNext = useCallback(() => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, images.length]);

  useEffect(
    function () {
      function handleKeyDown(e: KeyboardEvent) {
        if (e.key === "ArrowLeft") {
          gotoPrevious();
        } else if (e.key === "ArrowRight") {
          gotoNext();
        }
      }

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    },
    [gotoNext, gotoPrevious],
  );

  if (!images) return null;

  if (images.length === 0) return null;

  return (
    <div className="relative w-lg overflow-hidden">
      <div
        className="flex w-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img) => (
          <div className="flex w-full flex-none justify-center" key={img.url}>
            <img src={img.url} alt={img.alt} className="h-64 max-w-[384px]" />
          </div>
        ))}
      </div>

      <button
        className="absolute top-1/2 left-0 -translate-y-1/2 cursor-pointer rounded-full bg-gray-200 p-2 transition duration-300 hover:bg-gray-300 hover:opacity-75"
        onClick={gotoPrevious}
      >
        <HiArrowLeft size={24} />
      </button>
      <button
        className="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer rounded-full bg-gray-200 p-2 transition duration-300 hover:bg-gray-300 hover:opacity-75"
        onClick={gotoNext}
      >
        <HiArrowRight size={24} />
      </button>
    </div>
  );
}

export default Slider;
