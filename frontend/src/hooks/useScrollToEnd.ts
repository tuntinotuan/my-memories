import { useEffect } from "react";

import type { RefObject } from "react";

export function useScrollToEnd<T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T>,
  valueChange: any
): void {
  useEffect(() => {
    const scrollCur = elementRef.current;
    if (scrollCur && valueChange) {
      scrollCur.scrollTop = scrollCur.scrollHeight;
    }
  }, [valueChange, elementRef]);
}
