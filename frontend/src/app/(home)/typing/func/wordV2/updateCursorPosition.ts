import { useTyping } from "@/contexts/TypingStates";
import { getTextWidth } from "@/utils/stringFs";
import { useEffect } from "react";
import { resetTypingStatesV2 } from "./resetTypingStates";

export function useUpdateCursorPosition(
  newArrWords: any,
  rect: any,
  setCurrentText: any,
  setCursorPosition: any,
  moreCursorPosition?: any,
  setCursorWidth?: any,
  setHydrated?: any,
  setValue?: any,
  setHeightFlexible?: any,
  setRowTyped?: any
) {
  const {
    typingSettingLocal,
    typingWordIndex,
    typingFontsize,
    typingFontsizeX,
    setTypingWordIndex,
  } = useTyping();
  useEffect(() => {
    typingWordIndex < newArrWords.length &&
      setCurrentText(newArrWords[typingWordIndex].word.split("")[0]);
    if (rect) {
      setCursorPosition(rect.left + (moreCursorPosition || 0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rect, typingSettingLocal]);
  useEffect(() => {
    setHydrated &&
      resetTypingStatesV2({
        setHydrated,
        setCursorPosition,
        setValue,
        setTypingWordIndex,
        setHeightFlexible,
        setRowTyped,
      });
    setCursorWidth &&
      setCursorWidth(
        getTextWidth(
          newArrWords[typingWordIndex]?.word?.split("")[0],
          `${typingFontsize * typingFontsizeX}px monospace`
        )
      );
  }, [typingFontsizeX]);
}
