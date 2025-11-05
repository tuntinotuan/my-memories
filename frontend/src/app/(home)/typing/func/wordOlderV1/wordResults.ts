import { useEffect } from "react";
import { TypeOfTypingManyWordProps } from "../../modules/types";

export function useShowWordResultsWhenTypedLastWord(
  types: TypeOfTypingManyWordProps,
  newArrWords: any,
  text: string,
  countNextWord: any,
  setSecondsOfManyWords: any,
  setShowResults: any
) {
  // if (
  //   types === "words" &&
  //   countNextWord + 1 === newArrWords.length &&
  //   // newArrWords[countNextWord]?.word.length <= text.length + 1 &&
  //   text === newArrWords[countNextWord]?.word
  // ) {
  //   setSecondsOfManyWords(false);
  //   setShowResults(true);
  // }
  useEffect(() => {
    if (
      types === "words" &&
      countNextWord + 1 === newArrWords.length &&
      text === newArrWords[countNextWord]?.word &&
      text
    ) {
      setSecondsOfManyWords(false);
      setShowResults(true);
    }
  }, [text]);
}
