import React, { useEffect, useRef, useState } from "react";
import { typingWordsTypes } from "@/api/typing/typing.type";
import { useTyping } from "@/contexts/TypingStates";
type TypingWordNewProps = {
  currentTyping: typingWordsTypes;
  text: string;
  setRect: (val: any) => void;
  typingWordIndex?: number;
  wordIndex?: number;
  textSize?: string;
  setCursorPosition: any;
  lastInRowIndexes?: any;
  setRowTyped?: any;
  rowCount?: any;
  rowTyped?: any;
  setHeightFlexible?: any;
  heightFlexible?: any;
};

const TypingWordNew = ({
  setRect,
  typingWordIndex,
  textSize,
  wordIndex,
  currentTyping,
  text,
  setCursorPosition,
  lastInRowIndexes,
  setRowTyped,
  rowCount,
  rowTyped,
  setHeightFlexible,
  heightFlexible,
}: TypingWordNewProps) => {
  const [newText, setNewText] = useState<string>(text);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (typingWordIndex === wordIndex) {
      setNewText(text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  useEffect(() => {
    async function processTypingWordIndexChange() {
      (await lastInRowIndexes?.includes(typingWordIndex)) &&
        setRowTyped(rowTyped + 1);
      if (
        typingWordIndex &&
        lastInRowIndexes.includes(typingWordIndex - 1) &&
        rowCount > 3 &&
        rowTyped > 0 &&
        rowTyped + 2 < rowCount
      ) {
        await setHeightFlexible(heightFlexible + 48);
      }
    }
    processTypingWordIndexChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typingWordIndex]);
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
        textSize ? textSize : "text-4xl"
      } ${
        typingWordIndex !== wordIndex &&
        currentTyping.word !== newText &&
        newText !== ""
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
