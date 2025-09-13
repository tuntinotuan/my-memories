import { getTextWidth } from "@/utils/stringFs";
import { useEffect, useState } from "react";

export function useAutoText({
  show,
  value,
  typingWordIndex,
  handleResetWordComponents,
  setCurrentText,
  setValue,
  setCursorPosition,
  setCursorWidth,
  setPreTypedWord,
  setTypingWordIndex,
  textIsLowercase,
}: any) {
  const [number, setnumber] = useState(0);

  const fullText = textIsLowercase
    ? "I love you so much ".toLowerCase().split("")
    : "I love you so much ".split("");
  useEffect(() => {
    if (!show) return;
    const cursorNextWidth =
      fullText[typingWordIndex + 1] === " "
        ? 14
        : getTextWidth(fullText[typingWordIndex + 1], `24px monospace`);
    // reset automation
    if (number >= fullText.length) {
      handleResetWordComponents();
      setnumber(0);
      setCurrentText(fullText[0]);
      return;
    }
    const timeout = setTimeout(() => {
      if (fullText[number] !== " ") {
        setValue((pre: any) => pre + fullText[number]);
        setCursorPosition((pre: any) => pre + cursorNextWidth);
        setCursorWidth(cursorNextWidth);
        setCurrentText(fullText[number + 1]);
      } else {
        // space " "
        setPreTypedWord(value);
        setTypingWordIndex((pre: any) => pre + 1);
        setValue("");
        setCursorPosition((pre: any) => pre + 16);
        setCursorWidth(cursorNextWidth);
        setCurrentText("");
      }
      setnumber((pre) => pre + 1);
    }, 600); // Typing speed in ms
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number, show]);
}
