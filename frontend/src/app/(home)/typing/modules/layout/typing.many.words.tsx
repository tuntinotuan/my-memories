import TypingWord from "../components/TypingWord";
import { useRef, useState } from "react";
import TypingOverlayBlur from "./typing.overlay.blur";
import { creationNewArrWithQuantityBigger } from "@/utils/arrFs";
import { typingWordsTypes } from "@/api/typing/typing.type";
import { useTyping } from "@/contexts/TypingStates";
import { useTimeShowResults } from "../../func/wordOlderV1/timeResults";
import { useDetectLastInRows } from "../../func/wordOlderV1/detectLastInRows";
import { useCursorMoveNextWord } from "../../func/wordOlderV1/cursorMoveNextWord";
import { useResetAfterWordOrTimeSettingChange } from "../../func/wordOlderV1/resetAfterWordOrTimeSettingChange";
import { TypeOfTypingManyWordProps } from "../types";
import { useKeyDown } from "../../func/wordOlderV1/handleOnKeyDown";

type TypingManyWordsProps = {
  types: TypeOfTypingManyWordProps;
  data: typingWordsTypes[];
};

export const TypingManyWords = ({ types, data }: TypingManyWordsProps) => {
  const { wordAmount, countNextWord, wordTime, typingStyles } = useTyping();
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

  useCursorMoveNextWord();
  const { lastInRowIndexes } = useDetectLastInRows(containerRef, setRowCount);
  useTimeShowResults(types);
  const handleChangeInput = (e: any) => {
    if (e.target.value === " ") return;
    setText(e.target.value.trim());
  };
  const { handleOnKeyDown } = useKeyDown(
    types,
    text,
    newArrWords,
    setCursorPosition,
    setText,
    lastInRowIndexes,
    setRowTyped,
    rowCount,
    rowTyped,
    heightFlexible,
    setHeightFlexible,
    cursorPosition
  );
  useResetAfterWordOrTimeSettingChange(
    types,
    refWords,
    setNewArrWords,
    setText,
    setCursorPosition,
    setHeightFlexible,
    setRowTyped
  );
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
              fontSize="24px"
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
