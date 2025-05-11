import React, { useEffect, useState } from "react";
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
    const correct = document.getElementsByClassName("correct");
    console.log("correct", correct.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <div
      className={`relative flex items-center text-typingTextNormal cursor-default select-none lowercase ${
        textSize ? textSize : "text-4xl"
      } ${
        next !== wordIndex &&
        currentTyping.word.toLocaleLowerCase() !== newText &&
        newText !== ""
          ? "underline decoration-typingTextWrong"
          : ""
      }`}
    >
      {currentTyping.word
        .toLocaleLowerCase()
        .split("")
        .map((item: string, index: number) => (
          <div
            key={index}
            className={`${
              currentTyping.word.toLocaleLowerCase()[index] ===
              newText.split("")[index]
                ? "text-typingTextCorrect correct"
                : newText.split("")[index] !== undefined
                ? "text-typingTextWrong wrong"
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

      {/* {next !== undefined && wordIndex !== undefined && (
        <div
          className={`absolute top-0 bottom-0 -right-4 w-[2px] rounded h-full bg-typingColorActive transition-all ${
            next - 1 === wordIndex ? "dynamicCursor" : "opacity-0"
          }`}
          style={
            next - 1 === wordIndex ? { right: -16 } : { left: cursorPosition }
          }
        ></div>
      )} */}
    </div>
  );
};

export default TypingWord;
