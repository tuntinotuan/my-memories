import { calculatePositionForCursor } from "./calculatePositionForCursor";

export function cursorPositionPerTyped(
  e: any,
  newArrWords: any,
  countNextWord: any,
  text: string,
  setCursorPosition: any,
  cursorPosition: any
) {
  const { cursorPositionIncrease, cursorPositionDecrease } =
    calculatePositionForCursor(newArrWords, countNextWord, text);
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
}
