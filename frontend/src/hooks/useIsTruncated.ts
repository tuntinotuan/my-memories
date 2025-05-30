// hooks/useIsTruncated.ts
import { useEffect, useRef, useState } from "react";

export function useIsTruncated<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const check = () => {
      const el = ref.current;
      if (el) {
        setIsTruncated(el.scrollWidth > el.clientWidth);
      }
    };

    check(); // initial check
    window.addEventListener("resize", check);

    return () => {
      window.removeEventListener("resize", check);
    };
  }, []);

  return { ref, isTruncated };
}
