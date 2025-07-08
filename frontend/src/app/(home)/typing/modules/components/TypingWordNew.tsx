import React, { useEffect, useRef, useState } from "react";
import { typingWordsTypes } from "@/api/typing/typing.type";
type TypingWordNewProps = {
  currentTyping: typingWordsTypes;
  text: string;
  typingWordIndex?: number;
  wordIndex?: number;
  textSize?: string;
};

const TypingWordNew = ({
  typingWordIndex,
  textSize,
  wordIndex,
  currentTyping,
  text,
}: TypingWordNewProps) => {
  const [newText, setNewText] = useState<string>(text);
  const ref = useRef<HTMLDivElement | null>(null);
  // const [rect, setRect] = useState<DOMRect>();
  useEffect(() => {
    if (typingWordIndex === wordIndex) {
      setNewText(text);
      // setRect(ref.current?.getBoundingClientRect());
      // console.log("rect.....", rect);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, typingWordIndex]);

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
