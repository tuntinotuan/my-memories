import { useEffect } from "react";

export function useUpdateSettingCursorPosition({
  setCurrentText,
  wordList,
  typingWordIndex,
  rect,
  setCursorPosition,
}: any) {
  useEffect(() => {
    // initials
    setCurrentText(wordList[typingWordIndex].word.split("")[0]); // first text into block
    if (rect) {
      setCursorPosition(rect.left);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rect]);
}
