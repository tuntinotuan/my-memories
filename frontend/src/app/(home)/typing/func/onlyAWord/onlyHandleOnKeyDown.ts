import { typingWordsTypes } from "@/api/typing/typing.type";
import { calculatePositionForCursor } from "../word/calculatePositionForCursor";

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
    // if (currentTyping.word.length <= text.length + 1) {
    //   setCurrentTyping(typingwordsRandom[0]);
    //   setCursorPosition(0);
    //   setText("");
    //   refCountIndexArray.current = refCountIndexArray.current + 1;
    //   return;
    // }

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
    const { cursorPositionIncrease, cursorPositionDecrease } =
      calculatePositionForCursor(currentTyping, text, "36px");
    if (
      text.length < currentTyping.word.length &&
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey &&
      e.key !== " "
    ) {
      e.key !== "Backspace" &&
        setCursorPosition(cursorPosition + cursorPositionIncrease);
    }
    if (e.key === "Backspace" && text.length > 0)
      setCursorPosition(cursorPosition - cursorPositionDecrease);
  };

  return { handleOnKeyDown };
}
