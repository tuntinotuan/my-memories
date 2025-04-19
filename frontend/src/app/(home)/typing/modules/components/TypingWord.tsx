import React from "react";
import TypingCursor from "./TypingCursor";
import { typingWordsTypes } from "@/api/typing/typing.type";
type TypingWordProps = {
  currentTyping: typingWordsTypes;
  text: string;
  onChange: (e: any) => void;
  onKeyDown: (e: any) => void;
  cursorPosition: number;
  next?: number;
  wordIndex?: number;
};
const TypingWord = ({
  next,
  wordIndex,
  currentTyping,
  text,
  onChange,
  onKeyDown,
  cursorPosition,
}: TypingWordProps) => {
  const cursorId: string = "typingCursorId";
  return (
    <label className="relative flex items-center text-4xl text-[#526777] cursor-pointer select-none">
      {currentTyping.word.split("").map((item: string, index: number) => (
        <div
          key={index}
          className={
            next === wordIndex
              ? `${
                  currentTyping.word[index] === text.split("")[index]
                    ? "text-white"
                    : text.split("")[index] !== undefined
                    ? "text-[#E9595A]"
                    : ""
                }`
              : ""
          }
        >
          {item}
        </div>
      ))}
      {next === wordIndex && (
        <TypingCursor
          id={next !== undefined ? cursorId + next : cursorId}
          value={text}
          onChange={onChange}
          onKeyDown={onKeyDown}
          cursorPosition={cursorPosition}
        />
      )}
    </label>
  );
};

export default TypingWord;
