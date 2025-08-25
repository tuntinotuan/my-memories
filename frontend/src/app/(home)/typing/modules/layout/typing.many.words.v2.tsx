import { useRef, useState } from "react";
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
import { useHydrate } from "../../func/useHydrate";
import { useResetTypingStatesAfterWordOrTimeSettingChangeV2 } from "../../func/wordV2/resetAfterWordOrTimeSettingChangeV2";
import { useKeyDownV2 } from "../../func/wordV2/handleOnKeyDownV2";
import { useUpdateCursorPosition } from "../../func/wordV2/updateCursorPosition";

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
    typingWordIndex,
  } = useTyping();

  const [cursorPosition, setCursorPosition] = useState<number>(0);

  const [rowCount, setRowCount] = useState<number>(0);
  const [rowTyped, setRowTyped] = useState<number>(0);
  const [heightFlexible, setHeightFlexible] = useState(0);

  const refWords = useRef(
    creationNewArrWithQuantityBigger(
      data,
      types === "words"
        ? typingSettingLocal?.wordAmount || wordAmount
        : typingSettingLocal?.wordTime || wordTime * 2.5
    )
  );
  const [newArrWords, setNewArrWords] = useState<typingWordsTypes[]>(
    refWords.current
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const { lastInRowIndexes } = useDetectLastInRows(containerRef, setRowCount);
  const [value, setValue] = useState("");
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [cursorWidth, setCursorWidth] = useState(14);
  const [currentText, setCurrentText] = useState("");
  const [preTypedWord, setPreTypedWord] = useState("");
  const [moreYTransition, setMoreYTransition] = useState(0);

  const handleOnChange = (e: any) => {
    if (
      e.target.value === " " ||
      e.target.value.length === newArrWords[typingWordIndex].word.length + 1
    )
      return;
    setValue(e.target.value);
  };
  const { handleOnKeyDown } = useKeyDownV2(
    types,
    value,
    setValue,
    setPreTypedWord,
    newArrWords,
    setCursorPosition,
    cursorPosition,
    setCursorWidth,
    setCurrentText,
    preTypedWord,
    setMoreYTransition,
    lastInRowIndexes,
    rowCount,
    rowTyped,
    setRowTyped,
    setHeightFlexible,
    heightFlexible
  );
  useUpdateCursorPosition(newArrWords, rect, setCurrentText, setCursorPosition);
  useTimeShowResults(types);
  const { hydrated, setHydrated } = useHydrate();
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
      {/* {rowCount} | {rowTyped} | {typingWordIndex}|
      {`${lastInRowIndexes.includes(typingWordIndex)}`} */}
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
        transitionY={moreYTransition}
      ></TypingCursorNew>
      <div
        className={`flex items-start h-[130px] w-full px-2 ${
          typingStyles === "time" ? "overflow-hidden" : ""
        }`}
      >
        <div
          ref={containerRef}
          className={`flex flex-wrap gap-4 transition-all `}
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
            ></TypingWordNew>
          ))}
        </div>
      </div>
      <TypingOverlayBlur htmlFor={`typingKeyboardId`}></TypingOverlayBlur>
    </>
  );
};
