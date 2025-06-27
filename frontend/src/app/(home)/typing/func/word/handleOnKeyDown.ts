import { useTyping } from "@/contexts/TypingStates";
import { TypeOfTypingManyWordProps } from "../../modules/types";
import { getTextWidth } from "@/utils/stringFs";
import { showWordResultsWhenTypedLastWord } from "./wordResults";
import { startTyping } from "./startTyping";
import { cursorPositionPerTyped } from "./cursorPositionPerTyped";

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
    // const textWidthIncrease = getTextWidth(
    //   newArrWords[countNextWord].word[text ? text.length : 0],
    //   "24px monospace"
    // );
    // const textWidthDecrease = getTextWidth(
    //   newArrWords[countNextWord].word[text ? text.length - 1 : 0],
    //   "24px monospace"
    // );
    const { cursorPositionIncrease, cursorPositionDecrease } =
      cursorPositionPerTyped(newArrWords, countNextWord, text);
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
        setCursorPosition(cursorPosition + cursorPositionIncrease);
    }
    if (e.key === "Backspace" && text.length > 0)
      setCursorPosition(cursorPosition - cursorPositionDecrease);
  };
  return { handleOnKeyDown };
}
