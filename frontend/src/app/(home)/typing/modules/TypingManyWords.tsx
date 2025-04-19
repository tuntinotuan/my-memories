import TypingWord from "./components/TypingWord";
import { getTextWidth } from "@/utils/stringFs";
import { useEffect, useRef, useState } from "react";
import { typingwords } from "@/api/typing/typing.data.structure";
import { shuffleArray } from "@/api/card/utils/f";
import TypingOverlayBlur from "./TypingOverlayBlur";
import { useTyping } from "@/contexts/typingStates";
import { typingWordsTypes } from "@/api/typing/typing.type";

export const TypingManyWords = () => {
  const [text, setText] = useState<string>("");
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [countNextWord, setCountNextWord] = useState(0);
  const { wordAmount } = useTyping();

  const refWords = useRef(shuffleArray(typingwords, "short"));
  const newWords: typingWordsTypes[] = Array.from(
    { length: wordAmount },
    () => {
      const randomIndex = Math.floor(Math.random() * refWords.current.length);
      return refWords.current[randomIndex];
    }
  );
  console.log("newWords", newWords);
  useEffect(() => {
    document.getElementById(`typingCursorId${countNextWord}`)?.focus();
  }, [countNextWord]);
  const handleChangeInput = (e: any) => {
    if (e.target.value === " ") return;
    setText(e.target.value.trim());
  };
  const handleOnKeyDown = (e: any) => {
    if (e.key === " " && text.length === newWords[countNextWord].word.length) {
      setCursorPosition(0);
      setText("");
      setCountNextWord(
        countNextWord + 1 !== newWords.length ? countNextWord + 1 : 0
      );
    }
    const textWidthIncrease = getTextWidth(
      newWords[countNextWord].word[text ? text.length : 0],
      "36px monospace"
    );
    console.log("textWidthIncrease", textWidthIncrease);
    const textWidthDecrease = getTextWidth(
      newWords[countNextWord].word[text ? text.length - 1 : 0],
      "36px monospace"
    );
    if (
      text.length < newWords[countNextWord].word.length &&
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
  console.log("newWords", newWords);
  console.log("next", countNextWord);
  return (
    <>
      <label className="flex flex-wrap gap-4">
        {newWords.map((word, index) => (
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
