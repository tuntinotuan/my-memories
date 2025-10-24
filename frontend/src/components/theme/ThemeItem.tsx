import React, { useEffect, useRef } from "react";
import GreenTickIcon from "../icons/GreenTickIcon";

type ThemeItemProps = {
  currentTheme: string;
  item: string;
  index?: number;
  onClick?: () => void;
  offHovered?: () => void;
  onHovered?: () => void;
  size?: number;
  className?: string;
  onIconTick?: boolean;
};

const ThemeItem = ({
  currentTheme,
  item,
  index,
  onClick,
  onHovered,
  offHovered,
  size = 16,
  className,
  onIconTick = false,
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
      className={`${item} flex items-center justify-between gap-1 bg-typingBg hover:scale-105 focus:scale-105 rounded-full transition-all ${
        item === currentTheme
          ? "border-primaryColor shadow-sm focus:outline-none shadow-primaryColor scale-105"
          : "border-gray-200 cursor-pointer"
      } ${className}`}
      style={{ padding: size / 2, borderWidth: size / 8 }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick && onClick();
      }}
      onMouseEnter={onHovered}
      onMouseLeave={offHovered}
    >
      <div className="flex item-center gap-1">
        {colorThreeCircles.map((item) => (
          <div
            key={item}
            className={`rounded-full ${item}`}
            style={{ width: size, height: size }}
          ></div>
        ))}
      </div>
      {item === currentTheme && onIconTick && (
        <GreenTickIcon
          className=" text-green-500"
          fontSize="inherit"
        ></GreenTickIcon>
      )}
    </div>
  );
};

export default ThemeItem;
