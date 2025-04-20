import TypingWord from "./components/TypingWord";
import { getTextWidth } from "@/utils/stringFs";
import { useEffect, useRef, useState } from "react";
import { typingwords } from "@/api/typing/typing.data.structure";
import TypingOverlayBlur from "./TypingOverlayBlur";
import { useTyping } from "@/contexts/typingStates";
import { creationNewArrWithQuantityBigger } from "@/utils/arrFs";
import { typingWordsTypes } from "@/api/typing/typing.type";

export const TypingManyWords = () => {
  const [text, setText] = useState<string>("");
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [countNextWord, setCountNextWord] = useState(0);
  const { wordAmount } = useTyping();

  const refWords = useRef(
    creationNewArrWithQuantityBigger(typingwords, wordAmount)
  );
  const [newArrWords, setNewArrWords] = useState<typingWordsTypes[]>(
    refWords.current
  );
  useEffect(() => {
    setNewArrWords(
      creationNewArrWithQuantityBigger(refWords.current, wordAmount)
    );
    setCursorPosition(0);
    setText("");
    setCountNextWord(0);
  }, [wordAmount]);

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
      text.length === newArrWords[countNextWord].word.length
    ) {
      setCursorPosition(0);
      setText("");
      setCountNextWord(
        countNextWord + 1 !== newArrWords.length ? countNextWord + 1 : 0
      );
    }
    const textWidthIncrease = getTextWidth(
      newArrWords[countNextWord].word[text ? text.length : 0],
      "36px monospace"
    );
    console.log("textWidthIncrease", textWidthIncrease);
    const textWidthDecrease = getTextWidth(
      newArrWords[countNextWord].word[text ? text.length - 1 : 0],
      "36px monospace"
    );
    if (
      text.length < newArrWords[countNextWord].word.length &&
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
  console.log("newArrWords", newArrWords);
  console.log("next", countNextWord);
  return (
    <>
      <label className="flex flex-wrap gap-4">
        {newArrWords.map((word, index) => (
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
