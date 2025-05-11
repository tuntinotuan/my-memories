import TypingWord from "./components/TypingWord";
import { getTextWidth } from "@/utils/stringFs";
import { useEffect, useRef, useState } from "react";
import { typingwords } from "@/api/typing/typing.data.structure";
import TypingOverlayBlur from "./TypingOverlayBlur";
import { creationNewArrWithQuantityBigger } from "@/utils/arrFs";
import { typingWordsTypes } from "@/api/typing/typing.type";
import { useTyping } from "@/contexts/TypingStates";

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
    resetRunningManyWords,
    setCursorIsTyping,
    setIsCountDown,
    resetCountDownIsInitial,
    secondsOfTimeWords,
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
  useEffect(() => {
    setNewArrWords(
      creationNewArrWithQuantityBigger(refWords.current, wordAmount)
    );
    setCursorPosition(0);
    setText("");
    setCountNextWord(0);
    setHeightFlexible(0);
    setRowTyped(0);
    setSecondsOfManyWords(false);
    resetRunningManyWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordAmount]);
  useEffect(() => {
    setNewArrWords(
      creationNewArrWithQuantityBigger(
        refWords.current,
        types === "words" ? wordAmount : wordTime * 2.5
      )
    );
    setCursorPosition(0);
    setText("");
    setCountNextWord(0);
    setHeightFlexible(0);
    setRowTyped(0);
    setIsCountDown(false);
    resetCountDownIsInitial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordTime]);
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
  // Show results for time type
  useEffect(() => {
    if (secondsOfTimeWords === 0 && types === "time") {
      setIsCountDown(false);
      setShowResults(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsOfTimeWords]);
  const handleChangeInput = (e: any) => {
    if (e.target.value === " ") return;
    setText(e.target.value.trim());
  };
  const handleOnKeyDown = (e: any) => {
    // Run count down time
    setCursorIsTyping(true);
    if (types === "words") setSecondsOfManyWords(true);
    if (types === "time") setIsCountDown(true);

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
      if (countNextWord + 1 === wordAmount && types === "words") {
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
