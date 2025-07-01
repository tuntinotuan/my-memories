import { typingWordsTypes } from "@/api/typing/typing.type";
import { getTextWidth } from "@/utils/stringFs";

export function onlyHandleOnKeyDown(
  text: string,
  setText: any,
  currentTyping: any,
  setCurrentTyping: any,
  setCursorPosition: any,
  cursorPosition: any,
  typingwordsRandom: typingWordsTypes[],
  refCountIndexArray: any,
  refNextWord: any
) {
  const handleOnKeyDown = (e: any) => {
    if (e.key === " " && text.length >= currentTyping.word.length) {
      setCurrentTyping(typingwordsRandom[refCountIndexArray.current]);
      setCursorPosition(0);
      setText("");
      refNextWord.current = refNextWord.current + 1;
      if (typingwordsRandom[refCountIndexArray.current + 1] !== undefined) {
        refCountIndexArray.current = refCountIndexArray.current + 1;
      } else {
        refCountIndexArray.current = 1;
        setCurrentTyping(typingwordsRandom[0]);
      }
    }
    const textWidthIncrease = getTextWidth(
      currentTyping.word[text ? text.length : 0],
      "36px monospace"
    );
    const textWidthDecrease = getTextWidth(
      currentTyping.word[text ? text.length - 1 : 0],
      "36px monospace"
    );
    if (
      text.length < currentTyping.word.length &&
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey &&
      e.key !== " "
    ) {
      e.key !== "Backspace" &&
        setCursorPosition(cursorPosition + textWidthIncrease);
    }
    if (e.key === "Backspace" && text.length > 0)
      setCursorPosition(cursorPosition - textWidthDecrease);
  };

  return { handleOnKeyDown };
}
