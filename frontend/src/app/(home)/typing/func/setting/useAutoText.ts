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
  setTypingWordIndex,
  textIsLowercase,
  wordGap,
  typingFontsize,
  typingFontsizeX,
}: any) {
  const [number, setnumber] = useState(0);

  const fullText = textIsLowercase
    ? "I love you so much ".toLowerCase().split("")
    : "I love you so much ".split("");
  useEffect(() => {
    if (!show) return;

    // const cursorNextWidth =
    //   fullText[number + 1] === " "
    //     ? wordGap
    //     : getTextWidth(fullText[number + 1], `${24}px monospace`);
    const cursorNextWidth = getTextWidth(
      fullText[number + 1],
      `${typingFontsize * typingFontsizeX}px monospace`
    );

    // reset automation
    if (number >= fullText.length) {
      handleResetWordComponents();
      setnumber(0);
      setCurrentText(fullText[0]);
      setCursorWidth(
        getTextWidth(
          fullText[0],
          `${typingFontsize * typingFontsizeX}px monospace`
        )
      );
      return;
    }
    // Loop
    const timeout = setTimeout(() => {
      if (fullText[number] !== " ") {
        setValue((pre: any) => pre + fullText[number]);
        setCursorPosition((pre: any) => pre + cursorNextWidth);
        setCursorWidth(
          fullText[number + 1] === " " ? wordGap : cursorNextWidth
        );
        setCurrentText(fullText[number + 1]);
      } else {
        // space " "
        setTypingWordIndex((pre: any) => pre + 1);
        setValue("");
        setCursorPosition((pre: any) => pre);
        setCursorWidth(cursorNextWidth);
        setCurrentText("");
      }
      setnumber((pre) => pre + 1);
    }, 600); // Typing speed in ms
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number, show]);
}
