import { useTyping } from "@/contexts/TypingStates";
import { getTextWidth } from "@/utils/stringFs";
import { useEffect } from "react";

export function useUpdateTextAndWidthIntoCursor(
  currentTyping: any,
  rect: any,
  setCurrentText: any,
  setCursorWidth: any
) {
  const { typingSettingLocal, typingFontsize, typingFontsizeX, fontFamily } =
    useTyping();
  useEffect(() => {
    setCursorWidth(
      getTextWidth(
        currentTyping.word[0],
        `${typingFontsize * typingFontsizeX}px ${fontFamily?.name}`
      )
    );
    setCurrentText(currentTyping.word.split("")[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rect, typingSettingLocal]);
}
