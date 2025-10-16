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
    typingWordIndex,
    setTypingWordIndex,
    setShowResults,
    setSecondsOfManyWords,
    setCursorIsTyping,
    setIsCountDown,
    fontFamily,
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
      typingWordIndex,
      setSecondsOfManyWords,
      setShowResults
    );

    finishedPerWord(
      e,
      types,
      text,
      newArrWords,
      typingWordIndex,
      setCursorPosition,
      setText,
      setTypingWordIndex,
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
      typingWordIndex,
      text,
      setCursorPosition,
      cursorPosition,
      fontFamily
    );
  };
  return { handleOnKeyDown };
}
