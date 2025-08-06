import { useTyping } from "@/contexts/TypingStates";
import { RefObject, useEffect, useState } from "react";

export function useDetectLastInRows<T extends HTMLElement = HTMLElement>(
  containerRef: RefObject<T>,
  setRowCount: any
) {
  const { wordAmount, typingWordIndex, wordTime } = useTyping();
  const [lastInRowIndexes, setLastInRowIndexes] = useState<number[]>([]);

  useEffect(() => {
    const detectLastInRows = () => {
      const children = containerRef.current?.children;
      if (!children) return;

      const rowMap: Record<number, number> = {};
      const newLastIndexes: number[] = [];

      Array.from(children).forEach((child, index) => {
        const top = (child as HTMLElement).offsetTop;
        rowMap[top] = index; // the latest index on this row
      });

      newLastIndexes.push(...Object.values(rowMap));
      setLastInRowIndexes(newLastIndexes);
      const rowCount = Object.keys(rowMap).length;
      setRowCount(rowCount);
    };

    detectLastInRows();
    window.addEventListener("resize", detectLastInRows);

    return () => window.removeEventListener("resize", detectLastInRows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordAmount, typingWordIndex]);
  return { lastInRowIndexes, wordTime };
}
