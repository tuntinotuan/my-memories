import { typingwords } from "@/api/typing/typing.data.structure";
import React, { useEffect, useRef, useState } from "react";

const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

export default function FlexRowWrap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lastInRowIndexes, setLastInRowIndexes] = useState<number[]>([]);

  useEffect(() => {
    const detectLastInRows = () => {
      const children = containerRef.current?.children;
      if (!children) return;
      console.log("children", children);
      const rowMap: Record<number, number> = {};
      const newLastIndexes: number[] = [];

      Array.from(children).forEach((child, index) => {
        const top = (child as HTMLElement).offsetTop;
        console.log("top", top);
        console.log("index", index);
        rowMap[top] = index; // the latest index on this row
        console.log("rowMap[top]", rowMap[top]);
      });

      newLastIndexes.push(...Object.values(rowMap));
      setLastInRowIndexes(newLastIndexes);
    };

    detectLastInRows();
    window.addEventListener("resize", detectLastInRows);

    return () => window.removeEventListener("resize", detectLastInRows);
  }, []);

  return (
    <div ref={containerRef} className="flex-container">
      {typingwords.map((item, index) => {
        const isLastInRow = lastInRowIndexes.includes(index);
        return (
          <div
            key={index}
            className={`flex-item ${isLastInRow ? "last-in-row" : ""}`}
          >
            {item.meaning}
          </div>
        );
      })}
    </div>
  );
}
