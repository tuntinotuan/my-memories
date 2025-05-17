import React from "react";

type ThemeItemProps = {
  currentTheme: string;
  item: string;
  index?: number;
  onClick?: () => void;
  size?: number;
};

const ThemeItem = ({
  currentTheme,
  item,
  index,
  onClick,
  size = 16,
}: ThemeItemProps) => {
  const colorThreeCircles = [
    "bg-typingColorActive",
    "bg-typingTextNormal",
    "bg-typingTextCorrect",
  ];
  return (
    <div
      tabIndex={index || -1 + 1}
      id={item === currentTheme ? "current-theme-active" : ""}
      className={`${item} flex items-center gap-1 bg-typingBg hover:scale-105 focus:scale-105 rounded-full transition-all ${
        item === currentTheme
          ? "border-primaryColor shadow-sm focus:outline-none shadow-primaryColor scale-105"
          : "border-gray-200 cursor-pointer"
      }`}
      style={{ padding: size / 2, borderWidth: size / 8 }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick && onClick();
      }}
    >
      {colorThreeCircles.map((item) => (
        <div
          key={item}
          className={`rounded-full ${item}`}
          style={{ width: size, height: size }}
        ></div>
      ))}
    </div>
  );
};

export default ThemeItem;
