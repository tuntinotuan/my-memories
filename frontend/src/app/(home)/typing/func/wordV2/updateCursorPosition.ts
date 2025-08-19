import { useTyping } from "@/contexts/TypingStates";
import { useEffect } from "react";

export function useUpdateCursorPosition(
  newArrWords: any,
  rect: any,
  setCurrentText: any,
  setCursorPosition: any
) {
  const { typingSettingLocal, typingWordIndex } = useTyping();
  useEffect(() => {
    typingWordIndex < newArrWords.length &&
      setCurrentText(newArrWords[typingWordIndex].word.split("")[0]);
    if (rect) {
      setCursorPosition(rect.left);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rect, typingSettingLocal]);
}
