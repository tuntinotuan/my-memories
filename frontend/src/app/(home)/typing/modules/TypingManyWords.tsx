import TypingWord from "./components/TypingWord";
import { getTextWidth } from "@/utils/stringFs";
import { useEffect, useRef, useState } from "react";
import { typingwords } from "@/api/typing/typing.data.structure";
import { shuffleArray } from "@/api/card/utils/f";
import TypingOverlayBlur from "./TypingOverlayBlur";

export const TypingManyWords = () => {
  const [text, setText] = useState<string>("");
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [countNextWord, setCountNextWord] = useState(0);
  const refWords = useRef(shuffleArray(typingwords, "short"));

  useEffect(() => {
    document.getElementById(`typingCursorId${countNextWord}`)?.focus();
  }, [countNextWord]);
  const handleChangeInput = (e: any) => {
    if (e.target.value === " ") return;
    setText(e.target.value.trim());
  };
  const handleOnKeyDown = (e: any) => {
    if (
      e.key === " " &&
      text.length === refWords.current[countNextWord].word.length
    ) {
      setCursorPosition(0);
      setText("");
      setCountNextWord(
        countNextWord + 1 !== refWords.current.length ? countNextWord + 1 : 0
      );
    }
    const textWidthIncrease = getTextWidth(
      refWords.current[countNextWord].word[text ? text.length : 0],
      "36px monospace"
    );
    console.log("textWidthIncrease", textWidthIncrease);
    const textWidthDecrease = getTextWidth(
      refWords.current[countNextWord].word[text ? text.length - 1 : 0],
      "36px monospace"
    );
    if (
      text.length < refWords.current[countNextWord].word.length &&
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey
    ) {
      e.key !== "Backspace" &&
        setCursorPosition(cursorPosition + textWidthIncrease);
    }
    if (e.key === "Backspace" && text.length > 0)
      setCursorPosition(cursorPosition - textWidthDecrease);
  };
  console.log("refWords.current", refWords.current);
  console.log("next", countNextWord);
  return (
    <>
      <label className="flex flex-wrap gap-4">
        {refWords.current.map((word, index) => (
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
      <TypingOverlayBlur
        htmlFor={`typingCursorId${countNextWord}`}
      ></TypingOverlayBlur>
    </>
  );
};
