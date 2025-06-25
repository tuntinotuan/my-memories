import TypingWord from "../components/TypingWord";
import { getTextWidth } from "@/utils/stringFs";
import { useEffect, useRef, useState } from "react";
import TypingOverlayBlur from "./typing.overlay.blur";
import { creationNewArrWithQuantityBigger } from "@/utils/arrFs";
import { typingWordsTypes } from "@/api/typing/typing.type";
import { useTyping } from "@/contexts/TypingStates";
import { useTimeShowResults } from "../../func/word/timeResults";
import { useDetectLastInRows } from "../../func/word/detectLastInRows";
import { useCursorMoveNextWord } from "../../func/word/cursorMoveNextWord";
import { useResetAfterWordOrTimeSettingChange } from "../../func/word/resetAfterWordOrTimeSettingChange";

export const TypingManyWords = ({
  types,
  data,
}: {
  types: "time" | "words";
  data: typingWordsTypes[];
}) => {
  const {
    wordAmount,
    countNextWord,
    setCountNextWord,
    setShowResults,
    setSecondsOfManyWords,
    setCursorIsTyping,
    setIsCountDown,
    wordTime,
    typingStyles,
  } = useTyping();
  const [text, setText] = useState<string>("");
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [heightFlexible, setHeightFlexible] = useState(0);
  const [rowCount, setRowCount] = useState<number>(0);
  const [rowTyped, setRowTyped] = useState<number>(0);
  const refWords = useRef(
    creationNewArrWithQuantityBigger(
      data,
      types === "words" ? wordAmount : wordTime * 2.5
    )
  );
  const [newArrWords, setNewArrWords] = useState<typingWordsTypes[]>(
    refWords.current
  );
  const containerRef = useRef<HTMLLabelElement>(null);
  useResetAfterWordOrTimeSettingChange(
    types,
    refWords,
    setNewArrWords,
    setText,
    setCursorPosition,
    setHeightFlexible,
    setRowTyped
  );
  useCursorMoveNextWord();
  const { lastInRowIndexes } = useDetectLastInRows(containerRef, setRowCount);
  useTimeShowResults(types);
  const handleChangeInput = (e: any) => {
    if (e.target.value === " ") return;
    setText(e.target.value.trim());
  };
  const handleOnKeyDown = (e: any) => {
    // Run count down time
    setCursorIsTyping(true);
    if (types === "words") setSecondsOfManyWords(true);
    if (types === "time") setIsCountDown(true);

    // Show Results for words type
    if (
      types === "words" &&
      countNextWord + 1 === newArrWords.length &&
      newArrWords[countNextWord]?.word.length <= text.length + 1
    ) {
      setSecondsOfManyWords(false);
      setShowResults(true);
    }

    // Finished per word
    if (
      e.key === " " &&
      text.length > 0 &&
      countNextWord <= newArrWords.length
    ) {
      setCursorPosition(0);
      setText("");
      setCountNextWord(countNextWord + 1);
      lastInRowIndexes.includes(countNextWord) && setRowTyped(rowTyped + 1);

      // words dynamic per row
      if (
        lastInRowIndexes.includes(countNextWord) &&
        rowCount > 3 &&
        rowTyped > 0 &&
        rowTyped + 2 < rowCount
      ) {
        setHeightFlexible(heightFlexible + 48);
      }

      // Show Results for words type
      if (types === "words" && countNextWord + 1 === newArrWords.length) {
        setSecondsOfManyWords(false);
        setShowResults(true);
      }
    }

    // Caculate TextWidth
    const textWidthIncrease = getTextWidth(
      newArrWords[countNextWord].word[text ? text.length : 0],
      "24px monospace"
    );
    const textWidthDecrease = getTextWidth(
      newArrWords[countNextWord].word[text ? text.length - 1 : 0],
      "24px monospace"
    );

    // Increase & Decrease cursor position
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
      {/* {`${rowCount}-${rowTyped}-${rowTyped + 2 < rowCount}`} */}
      {/* {`${countNextWord + 1 === newArrWords.length} || ${countNextWord} ||${
        newArrWords[countNextWord]?.word
      } || ${newArrWords[countNextWord]?.word.length} || ${text.length}`} */}
      <label
        className={`flex items-start h-[130px] w-full px-2 ${
          typingStyles === "time" ? "overflow-hidden" : ""
        }`}
      >
        <label
          ref={containerRef}
          className={`flex flex-wrap gap-4 transition-all`}
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
