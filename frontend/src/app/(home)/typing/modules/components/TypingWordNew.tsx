import React, { useEffect, useState } from "react";
import TypingCursor from "./TypingCursor";
import { typingWordsTypes } from "@/api/typing/typing.type";
import { useTyping } from "@/contexts/TypingStates";
type TypingWordNewProps = {
  currentTyping: typingWordsTypes;
  text: string;
  next?: number;
  wordIndex?: number;
  textSize?: string;
  fontSize?: string;
};

const TypingWordNew = ({
  next,
  textSize,
  wordIndex,
  currentTyping,
  text,
  fontSize,
}: TypingWordNewProps) => {
  const [newText, setNewText] = useState<string>(text);
  const { wordAmount } = useTyping();
  // const [cursorWidth, setCursorWidth] = useState(0);

  useEffect(() => {
    setNewText("");
  }, [wordAmount]);
  useEffect(() => {
    if (next === wordIndex) {
      setNewText(text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <div
      className={`flex items-center text-typingTextNormal cursor-default select-none ${
        textSize ? textSize : "text-4xl"
      } ${
        next !== wordIndex && currentTyping.word !== newText && newText !== ""
          ? "underline decoration-typingTextWrong"
          : ""
      }`}
    >
      {currentTyping.word.split("").map((item: string, index: number) => (
        <div
          key={index}
          className={`${
            currentTyping.word[index] === newText.split("")[index]
              ? "text-typingTextCorrect correct"
              : newText.split("")[index] !== undefined
              ? "text-typingTextWrong wrong"
              : ""
          }`}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default TypingWordNew;
