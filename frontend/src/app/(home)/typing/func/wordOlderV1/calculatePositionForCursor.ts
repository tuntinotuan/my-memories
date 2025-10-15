import { useTyping } from "@/contexts/TypingStates";
import { getTextWidth } from "@/utils/stringFs";

export function calculatePositionForCursor(
  currentTyping: any,
  text: string,
  fontSize: string,
  fontFamily: any
) {
  const cursorPositionIncrease = getTextWidth(
    currentTyping?.word[text ? text.length : 0],
    `${fontSize} ${fontFamily?.name}`
  );
  const cursorPositionDecrease = getTextWidth(
    currentTyping?.word[text ? text.length - 1 : 0],
    `${fontSize} ${fontFamily?.name}`
  );
  // newArrWords[countNextWord]
  return { cursorPositionIncrease, cursorPositionDecrease };
}
