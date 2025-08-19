import { getTextWidth } from "@/utils/stringFs";

export function calculatePositionForCursor(
  currentTyping: any,
  text: string,
  fontSize: string
) {
  const cursorPositionIncrease = getTextWidth(
    currentTyping?.word[text ? text.length : 0],
    `${fontSize} monospace`
  );
  const cursorPositionDecrease = getTextWidth(
    currentTyping?.word[text ? text.length - 1 : 0],
    `${fontSize} monospace`
  );
  // newArrWords[countNextWord]
  return { cursorPositionIncrease, cursorPositionDecrease };
}
