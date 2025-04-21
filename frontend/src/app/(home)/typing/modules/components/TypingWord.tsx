import React, { useEffect, useRef, useState } from "react";
import TypingCursor from "./TypingCursor";
import { typingWordsTypes } from "@/api/typing/typing.type";
import { useTyping } from "@/contexts/TypingStates";
type TypingWordProps = {
  currentTyping: typingWordsTypes;
  text: string;
  onChange: (e: any) => void;
  onKeyDown: (e: any) => void;
  cursorPosition: number;
  next?: number;
  wordIndex?: number;
  textSize?: string;
};
const TypingWord = ({
  next,
  textSize,
  wordIndex,
  currentTyping,
  text,
  onChange,
  onKeyDown,
  cursorPosition,
}: TypingWordProps) => {
  const cursorId: string = "typingCursorId";
  const [newText, setNewText] = useState<string>(text);
  const { wordAmount } = useTyping();
  useEffect(() => {
    setNewText("");
  }, [wordAmount]);
  useEffect(() => {
    if (next === wordIndex) {
      setNewText(text);
    }
    // get correct key word
    // const correct = document.getElementsByClassName("correct");
    // console.log("correct", correct.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <div
      className={`relative flex items-center  text-[#526777] cursor-default select-none ${
        textSize ? textSize : "text-4xl"
      }`}
    >
      {currentTyping.word.split("").map((item: string, index: number) => (
        <div
          key={index}
          className={`${
            currentTyping.word[index] === newText.split("")[index]
              ? "text-white correct"
              : newText.split("")[index] !== undefined
              ? "text-[#E9595A] wrong"
              : ""
          }`}
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
    </div>
  );
};

export default TypingWord;
