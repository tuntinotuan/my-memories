import React from "react";
import TypingCursor from "./TypingCursor";
type TypingWordProps = {
  currentTyping: any;
  text: string;
  onChange: (e: any) => void;
  onKeyDown: (e: any) => void;
  cursorPosition: number;
};
const TypingWord = ({
  currentTyping,
  text,
  onChange,
  onKeyDown,
  cursorPosition,
}: TypingWordProps) => {
  return (
    <label
      htmlFor="typingCursor"
      className="relative flex items-center text-4xl text-[#526777] cursor-pointer"
    >
      {currentTyping.word.split("").map((item: string, index: number) => (
        <div
          key={index}
          className={`${
            currentTyping.word[index] === text.split("")[index]
              ? "text-white"
              : text.split("")[index] !== undefined
              ? "text-[#E9595A]"
              : ""
          }`}
        >
          {item}
        </div>
      ))}
      <TypingCursor
        value={text}
        onChange={onChange}
        onKeyDown={onKeyDown}
        cursorPosition={cursorPosition}
      />
    </label>
  );
};

export default TypingWord;
