import { useEffect, useRef, useState } from "react";

const useClickOutSide = <T extends HTMLElement>(callback?: () => void) => {
  const [outside, setOutside] = useState(false);
  const ref = useRef<T | null | any>(null);

  useEffect(() => {
    const globalClick = (e: MouseEvent) => {
      if (ref?.current && !ref.current.contains(e.target as Node)) {
        setOutside(true);
        if (callback) {
          callback();
        }
      } else {
        setOutside(false);
      }
    };
    console.log("click");
    window.addEventListener("click", globalClick);

    return () => {
      window.removeEventListener("click", globalClick);
    };
  }, []);

  return { ref, outside };
};

export default useClickOutSide;
