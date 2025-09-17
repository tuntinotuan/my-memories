import React, { useEffect, useRef, useState } from "react";
import { typingWordsTypes } from "@/api/typing/typing.type";
import { useTyping } from "@/contexts/TypingStates";
type TypingWordNewProps = {
  currentTyping: typingWordsTypes;
  text: string;
  setRect: (val: any) => void;
  typingWordIndex?: number;
  wordIndex?: number;
  textSizeX?: number;
  setCursorPosition: any;
  defaultSize?: number;
};

const TypingWordNew = ({
  setRect,
  typingWordIndex,
  wordIndex,
  currentTyping,
  text,
  textSizeX = 1,
  defaultSize = 24,
}: TypingWordNewProps) => {
  const [newText, setNewText] = useState<string>(text);
  const ref = useRef<HTMLDivElement | null>(null);

  const { textIsLowercase } = useTyping();

  useEffect(() => {
    if (typingWordIndex === wordIndex) {
      setNewText(text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  useEffect(() => {
    if (typingWordIndex === wordIndex && ref.current) {
      const newRect = ref.current.getBoundingClientRect();
      setRect(newRect);
      console.log("newRect", typingWordIndex, newRect);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typingWordIndex]);

  return (
    <div
      ref={ref}
      id={`wordId${wordIndex}`}
      className={`flex items-center text-typingTextNormal cursor-default select-none ${
        textIsLowercase ? "lowercase" : ""
      } ${
        typingWordIndex !== wordIndex &&
        (textIsLowercase
          ? currentTyping.word.toLocaleLowerCase()
          : currentTyping.word) !== newText &&
        newText !== ""
          ? "underline decoration-typingTextWrong"
          : ""
      }`}
      style={
        defaultSize
          ? {
              fontSize: textSizeX * defaultSize,
              lineHeight: 1,
            }
          : {}
      }
    >
      {currentTyping.word.split("").map((item: string, index: number) => (
        <div
          key={index}
          className={`${
            (textIsLowercase
              ? currentTyping.word[index].toLocaleLowerCase()
              : currentTyping.word[index]) === newText.split("")[index]
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
