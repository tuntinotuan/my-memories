import { useTypingTheme } from "@/contexts/typingThemeStates";
import React, { useEffect, useRef } from "react";

type ThemeItemProps = {
  currentTheme: string;
  item: string;
  index: number;
  onClick: () => void;
  size?: number;
};

const ThemeItem = ({
  currentTheme,
  item,
  index,
  onClick,
  size = 16,
}: ThemeItemProps) => {
  const { themPopup } = useTypingTheme();
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    item === currentTheme && themPopup && divRef.current?.focus();
  }, [themPopup]);

  return (
    <div
      ref={divRef}
      tabIndex={index + 1}
      key={item}
      autoFocus={item === currentTheme}
      className={`${item} flex items-center gap-1 bg-typingBg hover:scale-105 focus:scale-105 rounded-full transition-all ${
        item === currentTheme
          ? "border-primaryColor shadow-sm focus:outline-none shadow-primaryColor scale-105"
          : "border-gray-200 cursor-pointer"
      }`}
      style={{ padding: size / 2, borderWidth: size / 8 }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick();
      }}
    >
      <div
        className="rounded-full bg-typingColorActive"
        style={{ width: size, height: size }}
      ></div>
      <div
        className="rounded-full bg-typingTextNormal"
        style={{ width: size, height: size }}
      ></div>
      <div
        className="rounded-full bg-typingTextCorrect"
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
};

export default ThemeItem;
