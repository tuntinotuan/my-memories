import { useTyping } from "@/contexts/TypingStates";
import { creationNewArrWithQuantityBigger } from "@/utils/arrFs";
import { useEffect } from "react";

export function useResetAfterWordOrTimeSettingChange(
  types: any,
  refWords: any,
  setNewArrWords: any,
  setText: any,
  setCursorPosition: any,
  setHeightFlexible: any,
  setRowTyped: any
) {
  const {
    wordAmount,
    wordTime,
    setSecondsOfManyWords,
    resetRunningManyWords,
    setIsCountDown,
    resetCountDownIsInitial,
    setCountNextWord,
  } = useTyping();
  useEffect(() => {
    setNewArrWords(
      creationNewArrWithQuantityBigger(refWords.current, wordAmount)
    );
    setCursorPosition(0);
    setText("");
    setCountNextWord(0);
    setHeightFlexible(0);
    setRowTyped(0);
    setSecondsOfManyWords(false);
    resetRunningManyWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordAmount]);
  useEffect(() => {
    setNewArrWords(
      creationNewArrWithQuantityBigger(
        refWords.current,
        types === "words" ? wordAmount : wordTime * 2.5
      )
    );
    setCursorPosition(0);
    setText("");
    setCountNextWord(0);
    setHeightFlexible(0);
    setRowTyped(0);
    setIsCountDown(false);
    resetCountDownIsInitial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordTime]);
}
