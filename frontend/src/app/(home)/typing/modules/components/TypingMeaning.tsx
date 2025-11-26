import React from "react";

type TypingMeaningProps = {
  children: React.ReactNode;
  textSizeX?: number;
  defaultSize?: number;
};

const TypingMeaning = ({
  children,
  textSizeX = 1,
  defaultSize = 24,
}: TypingMeaningProps) => {
  return (
    <span
      className="text-2xl text-typingTextHover"
      style={
        defaultSize
          ? {
              fontSize: textSizeX * defaultSize,
              lineHeight: 1,
            }
          : {}
      }
    >
      {children}
    </span>
  );
};

export default TypingMeaning;
