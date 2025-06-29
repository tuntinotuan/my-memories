import { useTyping } from "@/contexts/TypingStates";
import { TypeOfTypingManyWordProps } from "../../modules/types";
import { showWordResultsWhenTypedLastWord } from "./wordResults";
import { startTyping } from "./startTyping";
import { cursorPositionPerTyped } from "./cursorPositionPerTyped";
import { finishedPerWord } from "./finishedPerWord";

export function useKeyDown(
  types: TypeOfTypingManyWordProps,
  text: string,
  newArrWords: any,
  setCursorPosition: any,
  setText: any,
  lastInRowIndexes: any,
  setRowTyped: any,
  rowCount: any,
  rowTyped: any,
  heightFlexible: any,
  setHeightFlexible: any,
  cursorPosition: any
) {
  const {
    countNextWord,
    setCountNextWord,
    setShowResults,
    setSecondsOfManyWords,
    setCursorIsTyping,
    setIsCountDown,
  } = useTyping();
  const handleOnKeyDown = (e: any) => {
    startTyping(
      types,
      setCursorIsTyping,
      setSecondsOfManyWords,
      setIsCountDown
    );

    showWordResultsWhenTypedLastWord(
      types,
      newArrWords,
      text,
      countNextWord,
      setSecondsOfManyWords,
      setShowResults
    );

    finishedPerWord(
      e,
      types,
      text,
      newArrWords,
      countNextWord,
      setCursorPosition,
      setText,
      setCountNextWord,
      lastInRowIndexes,
      setRowTyped,
      rowCount,
      rowTyped,
      setHeightFlexible,
      heightFlexible,
      setSecondsOfManyWords,
      setShowResults
    );
    cursorPositionPerTyped(
      e,
      newArrWords,
      countNextWord,
      text,
      setCursorPosition,
      cursorPosition
    );
  };
  return { handleOnKeyDown };
}
