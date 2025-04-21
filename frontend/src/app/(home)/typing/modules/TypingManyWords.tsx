import TypingWord from "./components/TypingWord";
import { getTextWidth } from "@/utils/stringFs";
import { useEffect, useRef, useState } from "react";
import { typingwords } from "@/api/typing/typing.data.structure";
import TypingOverlayBlur from "./TypingOverlayBlur";
import { creationNewArrWithQuantityBigger } from "@/utils/arrFs";
import { typingWordsTypes } from "@/api/typing/typing.type";
import { useTyping } from "@/contexts/TypingStates";

export const TypingManyWords = () => {
  const [text, setText] = useState<string>("");
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [countNextWord, setCountNextWord] = useState(0);
  const { wordAmount } = useTyping();
  const [heightFlexible, setHeightFlexible] = useState(0);
  const [rowCount, setRowCount] = useState<number>(0);

  const refWords = useRef(
    creationNewArrWithQuantityBigger(typingwords, wordAmount)
  );
  const [newArrWords, setNewArrWords] = useState<typingWordsTypes[]>(
    refWords.current
  );
  console.log("rowCount", rowCount);
  useEffect(() => {
    setNewArrWords(
      creationNewArrWithQuantityBigger(refWords.current, wordAmount)
    );
    setCursorPosition(0);
    setText("");
    setCountNextWord(0);
    setHeightFlexible(0);
  }, [wordAmount]);
  const containerRef = useRef<HTMLLabelElement>(null);
  const [lastInRowIndexes, setLastInRowIndexes] = useState<number[]>([]);
  useEffect(() => {
    const detectLastInRows = () => {
      const children = containerRef.current?.children;
      if (!children) return;

      const rowMap: Record<number, number> = {};
      const newLastIndexes: number[] = [];

      Array.from(children).forEach((child, index) => {
        const top = (child as HTMLElement).offsetTop;
        rowMap[top] = index; // the latest index on this row
      });

      newLastIndexes.push(...Object.values(rowMap));
      setLastInRowIndexes(newLastIndexes);
      const rowCount = Object.keys(rowMap).length;
      setRowCount(rowCount);
    };

    detectLastInRows();
    window.addEventListener("resize", detectLastInRows);

    return () => window.removeEventListener("resize", detectLastInRows);
  }, [wordAmount, countNextWord]);

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
      text.length >= newArrWords[countNextWord].word.length &&
      countNextWord + 1 !== newArrWords.length
    ) {
      setCursorPosition(0);
      setText("");
      setCountNextWord(countNextWord + 1);
      if (lastInRowIndexes.includes(countNextWord) && rowCount > 3) {
        console.log("last indexxxx", lastInRowIndexes.includes(countNextWord));
        setHeightFlexible(heightFlexible + 48);
      }
    }
    const textWidthIncrease = getTextWidth(
      newArrWords[countNextWord].word[text ? text.length : 0],
      "24px monospace"
    );
    const textWidthDecrease = getTextWidth(
      newArrWords[countNextWord].word[text ? text.length - 1 : 0],
      "24px monospace"
    );
    if (
      text.length < newArrWords[countNextWord].word.length &&
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey &&
      e.key !== " "
    ) {
      e.key !== "Backspace" &&
        setCursorPosition(cursorPosition + textWidthIncrease);
    }
    if (e.key === "Backspace" && text.length > 0)
      setCursorPosition(cursorPosition - textWidthDecrease);
  };
  return (
    <>
      <label className={`flex items-start max-h-[130px] overflow-hidden`}>
        <label
          ref={containerRef}
          className="flex flex-wrap gap-4 transition-all"
          style={{ transform: `translateY(-${heightFlexible}px)` }}
        >
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
              textSize="text-2xl"
            ></TypingWord>
          ))}
        </label>
      </label>
      <TypingOverlayBlur
        htmlFor={`typingCursorId${countNextWord}`}
      ></TypingOverlayBlur>
    </>
  );
};
