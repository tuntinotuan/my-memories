import { useTyping } from "@/contexts/TypingStates";
import { creationNewArrWithQuantityBigger } from "@/utils/arrFs";
import { useEffect } from "react";
import { resetTypingStatesV2 } from "./resetTypingStates";

export function useResetTypingStatesAfterWordOrTimeSettingChangeV2(
  types: any,
  refWords: any,
  setNewArrWords: any,
  setValue: any,
  setCursorPosition: any,
  setHeightFlexible: any,
  setRowTyped: any,
  setHydrated: any
) {
  const {
    wordAmount,
    wordTime,
    setSecondsOfManyWords,
    resetRunningManyWords,
    setIsCountDown,
    resetCountDownIsInitial,
    setTypingWordIndex,
    setHideOverlay,
  } = useTyping();
  useEffect(() => {
    document.getElementById("typingKeyboardId")?.focus();
    setHideOverlay(true);
    resetTypingStatesV2({
      setHydrated,
      setCursorPosition,
      setValue,
      setTypingWordIndex,
      setHeightFlexible,
      setRowTyped,
    });
    setNewArrWords(
      creationNewArrWithQuantityBigger(refWords.current, wordAmount)
    );
    setSecondsOfManyWords(false);
    resetRunningManyWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordAmount]);
  useEffect(() => {
    document.getElementById("typingKeyboardId")?.focus();
    setHideOverlay(true);
    resetTypingStatesV2({
      setHydrated,
      setCursorPosition,
      setValue,
      setTypingWordIndex,
      setHeightFlexible,
      setRowTyped,
    });
    setNewArrWords(
      creationNewArrWithQuantityBigger(
        refWords.current,
        types === "words" ? wordAmount : wordTime * 2.5
      )
    );
    setIsCountDown(false);
    resetCountDownIsInitial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordTime]);
}
