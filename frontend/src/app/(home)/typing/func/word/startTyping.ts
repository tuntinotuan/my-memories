import { TypeOfTypingManyWordProps } from "../../modules/types";

export function startTyping(
  types: TypeOfTypingManyWordProps,
  setCursorIsTyping: any,
  setSecondsOfManyWords: any,
  setIsCountDown: any
) {
  setCursorIsTyping(true);
  if (types === "words") setSecondsOfManyWords(true);
  if (types === "time") setIsCountDown(true);
}
