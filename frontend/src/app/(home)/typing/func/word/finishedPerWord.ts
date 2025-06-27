import { TypeOfTypingManyWordProps } from "../../modules/types";

export function finishedPerWord(
  e: any,
  types: TypeOfTypingManyWordProps,
  text: string,
  newArrWords: any,
  countNextWord: any,
  setCursorPosition: any,
  setText: any,
  setCountNextWord: any,
  lastInRowIndexes: any,
  setRowTyped: any,
  rowCount: any,
  rowTyped: any,
  setHeightFlexible: any,
  heightFlexible: any,
  setSecondsOfManyWords: any,
  setShowResults: any
) {
  if (e.key === " " && text.length > 0 && countNextWord <= newArrWords.length) {
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
}
