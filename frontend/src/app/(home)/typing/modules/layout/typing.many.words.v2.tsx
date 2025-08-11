import { useEffect, useRef, useState } from "react";
import TypingOverlayBlur from "./typing.overlay.blur";
import { creationNewArrWithQuantityBigger } from "@/utils/arrFs";
import { typingWordsTypes } from "@/api/typing/typing.type";
import { useTyping } from "@/contexts/TypingStates";
import { TypeOfTypingManyWordProps } from "../types";
import TypingWordNew from "../components/TypingWordNew";
import TypingCursorNew from "../components/TypingCursorNew";
import TypingKeyboardInput from "../components/TypingKeyboard";
import { useDetectLastInRows } from "../../func/wordOlderV1/detectLastInRows";
import { useTimeShowResults } from "../../func/wordOlderV1/timeResults";
import { calculatePositionForCursor } from "../../func/wordOlderV1/calculatePositionForCursor";
import { useResetAfterWordOrTimeSettingChange } from "../../func/wordOlderV1/resetAfterWordOrTimeSettingChange";
import { useHydrate } from "../../func/useHydrate";
import { useResetTypingStatesAfterWordOrTimeSettingChangeV2 } from "../../func/wordV2/resetAfterWordOrTimeSettingChangeV2";

type TypingManyWordsV2Props = {
  types: TypeOfTypingManyWordProps;
  data: typingWordsTypes[];
};

export const TypingManyWordsV2 = ({ types, data }: TypingManyWordsV2Props) => {
  const {
    wordAmount,
    wordTime,
    typingStyles,
    typingSettingLocal,
    hideOverlay,
    setHideOverlay,
    setCursorIsTyping,
    cursorIsTyping,
    setSecondsOfManyWords,
    resetRunningManyWords,
    setIsCountDown,
    resetCountDownIsInitial,
    setTypingWordIndex,
    typingWordIndex,
  } = useTyping();

  const [cursorPosition, setCursorPosition] = useState<number>(0);

  const [rowCount, setRowCount] = useState<number>(0);
  const [rowTyped, setRowTyped] = useState<number>(0);
  const [heightFlexible, setHeightFlexible] = useState(0);

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
  const { lastInRowIndexes } = useDetectLastInRows(containerRef, setRowCount);
  useTimeShowResults(types);
  const [value, setValue] = useState("");
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [cursorWidth, setCursorWidth] = useState(14);
  const [currentText, setCurrentText] = useState("");
  const [preTypedWord, setPreTypedWord] = useState("");

  const handleOnChange = (e: any) => {
    if (e.target.value === " ") return;
    setValue(e.target.value);
  };
  const handleOnKeyDown = (e: any) => {
    setCursorIsTyping(true);
    if (value.length > 0 && e.key === " ") {
      setPreTypedWord(value);
      // value !== wordList[typingWordIndex].word &&
      //   setPreCursorPosition(cursorPosition);
      setTypingWordIndex((pre: number) => pre + 1);
      setValue("");
      // rect && setCursorPosition(rect.left);

      // words dynamic per row
      // if (
      //   lastInRowIndexes.includes(typingWordIndex) &&
      //   rowCount > 3 &&
      //   rowTyped > 0 &&
      //   rowTyped + 2 < rowCount
      // ) {
      //   setTimeout(() => {
      //     setHeightFlexible(heightFlexible + 48);
      //   }, 100);
      // }
    }
    const { cursorPositionIncrease, cursorPositionDecrease } =
      calculatePositionForCursor(newArrWords[typingWordIndex], value, "24px");
    if (value.length >= 0 && e.key === "Backspace") {
      // Back previous error word
      if (!value && preTypedWord !== newArrWords[typingWordIndex - 1].word) {
        // setPreCursorPosition(cursorPosition);
        setValue(preTypedWord + preTypedWord.at(-1));
        setTypingWordIndex((pre: number) => pre - 1);
        setPreTypedWord(
          typingWordIndex > 1 ? newArrWords[typingWordIndex - 2].word : ""
        );
        setCursorPosition(0);
      } else {
        value.length > 0 &&
          setCursorPosition((pre) => pre - cursorPositionDecrease);
      }
    }
    if (
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey &&
      e.key !== " "
    ) {
      if (e.key !== "Backspace") {
        setCursorPosition(cursorPosition + cursorPositionIncrease);
        setCursorWidth(cursorPositionIncrease);
        setCurrentText(
          newArrWords[typingWordIndex].word.split("")[value.length + 1]
        );
      }
    }
  };
  useEffect(() => {
    setCurrentText(newArrWords[typingWordIndex].word.split("")[0]);
    if (rect) {
      setCursorPosition(rect.left);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rect, typingSettingLocal]);
  // useEffect(() => {
  //   lastInRowIndexes.includes(typingWordIndex) && setRowTyped(rowTyped + 1);
  //   if (
  //     lastInRowIndexes.includes(typingWordIndex - 1) &&
  //     rowCount > 3 &&
  //     rowTyped > 0 &&
  //     rowTyped + 2 < rowCount
  //   ) {
  //     setHeightFlexible(heightFlexible + 48);
  //   }
  // }, [typingWordIndex]);
  const { hydrated, setHydrated } = useHydrate();
  // const resetTypingV2States = () => {
  //   setHydrated(false);
  //   setTimeout(() => {
  //     setHydrated(true);
  //   }, 0);
  //   setCursorPosition(0);
  //   setValue("");
  //   setTypingWordIndex(0);
  //   setHeightFlexible(0);
  //   setRowTyped(0);
  // };
  // useEffect(() => {
  //   resetTypingV2States();
  //   setNewArrWords(
  //     creationNewArrWithQuantityBigger(refWords.current, wordAmount)
  //   );
  //   setSecondsOfManyWords(false);
  //   resetRunningManyWords();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [wordAmount]);
  // useEffect(() => {
  //   resetTypingV2States();
  //   setNewArrWords(
  //     creationNewArrWithQuantityBigger(
  //       refWords.current,
  //       types === "words" ? wordAmount : wordTime * 2.5
  //     )
  //   );
  //   setIsCountDown(false);
  //   resetCountDownIsInitial();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [wordTime]);
  useResetTypingStatesAfterWordOrTimeSettingChangeV2(
    types,
    refWords,
    setNewArrWords,
    setValue,
    setCursorPosition,
    setHeightFlexible,
    setRowTyped,
    setHydrated
  );
  if (!hydrated) return null;
  return (
    <>
      {rowCount} | {rowTyped} | {typingWordIndex}|
      {`${lastInRowIndexes.includes(typingWordIndex)}`}
      <TypingKeyboardInput
        id="typingKeyboardId"
        hiddenInput
        value={value}
        handleOnKeyDown={handleOnKeyDown}
        handleOnChange={handleOnChange}
        onBlur={() => {
          setHideOverlay(false);
          setCursorIsTyping(false);
        }}
      ></TypingKeyboardInput>
      <TypingCursorNew
        cssPosition="fixed"
        rect={rect}
        cursorPosition={cursorPosition}
        cursorWidth={cursorWidth}
        currentText={currentText}
        styles={typingSettingLocal?.cursorShape}
        showCursor={hideOverlay}
        isTyping={cursorIsTyping}
        transitionY={heightFlexible}
      ></TypingCursorNew>
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
            <TypingWordNew
              key={index}
              setRect={setRect}
              typingWordIndex={typingWordIndex}
              wordIndex={index}
              currentTyping={word}
              text={value}
              textSize="text-2xl"
              setCursorPosition={setCursorPosition}
              lastInRowIndexes={lastInRowIndexes}
              setRowTyped={setRowTyped}
              rowCount={rowCount}
              rowTyped={rowTyped}
              setHeightFlexible={setHeightFlexible}
              heightFlexible={heightFlexible}
            ></TypingWordNew>
          ))}
        </label>
      </label>
      <TypingOverlayBlur htmlFor={`typingKeyboardId`}></TypingOverlayBlur>
    </>
  );
};
