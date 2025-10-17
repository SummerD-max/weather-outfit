import { useEffect, useRef } from "react";

export function useOutsideClick(callback: () => void) {
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(
    function () {
      function handleClickOutside(event: MouseEvent) {
        if (!windowRef.current?.contains(event.target as Node)) {
          callback();
        }
      }
      document.addEventListener("click", handleClickOutside);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    },
    [callback],
  );

  return windowRef;
}
