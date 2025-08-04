import { TypeOfTypingManyWordProps } from "../../modules/types";

export function showWordResultsWhenTypedLastWord(
  types: TypeOfTypingManyWordProps,
  newArrWords: any,
  text: string,
  countNextWord: any,
  setSecondsOfManyWords: any,
  setShowResults: any
) {
  if (
    types === "words" &&
    countNextWord + 1 === newArrWords.length &&
    newArrWords[countNextWord]?.word.length <= text.length + 1
  ) {
    setSecondsOfManyWords(false);
    setShowResults(true);
  }
}
