import { useTyping } from "@/contexts/TypingStates";
import { creationNewArrWithQuantityBigger } from "@/utils/arrFs";
import { useEffect } from "react";

export function useResetAfterWordOrTimeSettingChange(
  types: any,
  refWords: any,
  setNewArrWords: any,
  setValue: any,
  setCursorPosition: any,
  setHeightFlexible: any,
  setRowTyped: any,
  setTypingWordIndex: any
) {
  const {
    wordAmount,
    wordTime,
    setSecondsOfManyWords,
    resetRunningManyWords,
    setIsCountDown,
    resetCountDownIsInitial,
  } = useTyping();
  useEffect(() => {
    setNewArrWords(
      creationNewArrWithQuantityBigger(refWords.current, wordAmount)
    );
    setCursorPosition(0);
    setValue("");
    setTypingWordIndex(0);
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
    setValue("");
    setTypingWordIndex(0);
    setHeightFlexible(0);
    setRowTyped(0);
    setIsCountDown(false);
    resetCountDownIsInitial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordTime]);
}
