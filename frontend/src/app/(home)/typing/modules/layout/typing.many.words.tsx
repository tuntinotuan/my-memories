import TypingWord from "../components/TypingWord";
import { useEffect, useRef, useState } from "react";
import TypingOverlayBlur from "./typing.overlay.blur";
import { creationNewArrWithQuantityBigger } from "@/utils/arrFs";
import { typingWordsTypes } from "@/api/typing/typing.type";
import { useTyping } from "@/contexts/TypingStates";
import { useTimeShowResults } from "../../func/word/timeResults";
import { useDetectLastInRows } from "../../func/word/detectLastInRows";
import { useCursorMoveNextWord } from "../../func/word/cursorMoveNextWord";
import { useResetAfterWordOrTimeSettingChange } from "../../func/word/resetAfterWordOrTimeSettingChange";
import { TypeOfTypingManyWordProps } from "../types";
import { useKeyDown } from "../../func/word/handleOnKeyDown";
import TypingWordNew from "../components/TypingWordNew";
import TypingCursorNew from "../components/TypingCursorNew";
import TypingKeyboardInput from "../components/TypingKeyboard";
import { calculatePositionForCursor } from "../../func/word/calculatePositionForCursor";

type TypingManyWordsProps = {
  types: TypeOfTypingManyWordProps;
  data: typingWordsTypes[];
};

export const TypingManyWords = ({ types, data }: TypingManyWordsProps) => {
  const {
    wordAmount,
    countNextWord,
    wordTime,
    typingStyles,
    typingSettingLocal,
    hideOverlay,
    setHideOverlay,
    setCursorIsTyping,
    cursorIsTyping,
  } = useTyping();
  const [text, setText] = useState<string>("");

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
  // const { handleOnKeyDown } = useKeyDown(
  //   types,
  //   text,
  //   newArrWords,
  //   setCursorPosition,
  //   setText,
  //   lastInRowIndexes,
  //   setRowTyped,
  //   rowCount,
  //   rowTyped,
  //   heightFlexible,
  //   setHeightFlexible,
  //   cursorPosition
  // );
  const [typingWordIndex, setTypingWordIndex] = useState(0);
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
      setTypingWordIndex((pre) => pre + 1);
      setValue("");
      // rect && setCursorPosition(rect.left);
    }
    const { cursorPositionIncrease, cursorPositionDecrease } =
      calculatePositionForCursor(newArrWords[typingWordIndex], value, "24px");
    if (value.length >= 0 && e.key === "Backspace") {
      // Back previous error word
      if (!value && preTypedWord !== newArrWords[typingWordIndex - 1].word) {
        // setPreCursorPosition(cursorPosition);
        setValue(preTypedWord + preTypedWord.at(-1));
        setTypingWordIndex((pre) => pre - 1);
        setPreTypedWord(
          typingWordIndex > 1 ? newArrWords[typingWordIndex - 2].word : ""
        );
        // setCursorPosition(preCursorPosition);
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
  }, [rect]);
  return (
    <>
      {/* {`${rowCount}-${rowTyped}-${rowTyped + 2 < rowCount}`} */}
      {/* {`${countNextWord + 1 === newArrWords.length} || ${countNextWord} ||${
        newArrWords[countNextWord]?.word
      } || ${newArrWords[countNextWord]?.word.length} || ${text.length}`} */}
      {/* <label
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
              fontSize="24px"
            ></TypingWord>
          ))}
        </label>
      </label>
      <TypingOverlayBlur
        htmlFor={`typingCursorId${countNextWord}`}
      ></TypingOverlayBlur> */}
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
            ></TypingWordNew>
          ))}
        </label>
      </label>
      <TypingOverlayBlur htmlFor={`typingKeyboardId`}></TypingOverlayBlur>
    </>
  );
};
