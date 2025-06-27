import { getTextWidth } from "@/utils/stringFs";

export function cursorPositionPerTyped(
  newArrWords: any,
  countNextWord: any,
  text: string
) {
  const cursorPositionIncrease = getTextWidth(
    newArrWords[countNextWord].word[text ? text.length : 0],
    "24px monospace"
  );
  const cursorPositionDecrease = getTextWidth(
    newArrWords[countNextWord].word[text ? text.length - 1 : 0],
    "24px monospace"
  );
  return { cursorPositionIncrease, cursorPositionDecrease };
}
