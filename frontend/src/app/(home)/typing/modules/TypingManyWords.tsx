import { typingWordsTypes } from "@/api/typing/typing.type";
import TypingWord from "./components/TypingWord";
import { getTextWidth } from "@/utils/stringFs";
import { useEffect, useRef, useState } from "react";
import { typingwords } from "@/api/typing/typing.data.structure";

type TypingManyWordsProps = {
  words: typingWordsTypes[];
};

export const TypingManyWords = ({ words }: TypingManyWordsProps) => {
  const [text, setText] = useState<string>("");
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [countNextWord, setCountNextWord] = useState(0);
  const handleChangeInput = (e: any) => {
    if (e.target.value === " ") return;
    setText(e.target.value.trim());
  };

  const handleOnKeyDown = (e: any) => {
    if (e.key === " " && text.length === words[countNextWord].word.length) {
      setCursorPosition(0);
      setText("");
      setCountNextWord(countNextWord + 1);
    }
    const textWidthIncrease = getTextWidth(
      words[countNextWord].word[text ? text.length : 0],
      "36px Arial"
    );
    const textWidthDecrease = getTextWidth(
      words[countNextWord].word[text ? text.length - 1 : 0],
      "36px Arial"
    );
    if (
      text.length < words[countNextWord].word.length &&
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey
    ) {
      e.key !== "Backspace" &&
        setCursorPosition(cursorPosition + textWidthIncrease + 1.5);
    }
    if (e.key === "Backspace" && text.length > 0)
      setCursorPosition(cursorPosition - textWidthDecrease - 1.5);
  };
  console.log("words", words);
  console.log("next", countNextWord);
  return (
    <label
      htmlFor={`typingCursorId${countNextWord}`}
      className="flex flex-wrap gap-4"
    >
      {words.map((word, index) => (
        <TypingWord
          key={index}
          next={countNextWord}
          wordIndex={index}
          currentTyping={word}
          text={text}
          onChange={handleChangeInput}
          onKeyDown={handleOnKeyDown}
          cursorPosition={cursorPosition}
        ></TypingWord>
      ))}
    </label>
  );
};
