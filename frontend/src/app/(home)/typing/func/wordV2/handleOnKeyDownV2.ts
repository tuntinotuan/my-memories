import { useTyping } from "@/contexts/TypingStates";
import { calculatePositionForCursor } from "../wordOlderV1/calculatePositionForCursor";

export function useKeyDownV2(
  value: string,
  setValue: any,
  setPreTypedWord: any,
  newArrWords: any,
  setCursorPosition: any,
  cursorPosition: any,
  setCursorWidth: any,
  setCurrentText: any,
  preTypedWord: any
) {
  const { typingWordIndex, setTypingWordIndex, setCursorIsTyping } =
    useTyping();
  const handleOnKeyDown = (e: any) => {
    setCursorIsTyping(true);
    if (value.length > 0 && e.key === " ") {
      setPreTypedWord(value);
      // value !== wordList[typingWordIndex].word &&
      //   setPreCursorPosition(cursorPosition);
      setTypingWordIndex((pre: number) => pre + 1);
      setValue("");
      // rect && setCursorPosition(rect.left);

      // words dynamic per row
      // if (
      //   lastInRowIndexes.includes(typingWordIndex) &&
      //   rowCount > 3 &&
      //   rowTyped > 0 &&
      //   rowTyped + 2 < rowCount
      // ) {
      //   setTimeout(() => {
      //     setHeightFlexible(heightFlexible + 48);
      //   }, 100);
      // }
    }
    const { cursorPositionIncrease, cursorPositionDecrease } =
      calculatePositionForCursor(newArrWords[typingWordIndex], value, "24px");
    if (value.length >= 0 && e.key === "Backspace") {
      // Back previous error word
      if (!value && preTypedWord !== newArrWords[typingWordIndex - 1].word) {
        // setPreCursorPosition(cursorPosition);
        setValue(preTypedWord + preTypedWord.at(-1));
        setTypingWordIndex((pre: number) => pre - 1);
        setPreTypedWord(
          typingWordIndex > 1 ? newArrWords[typingWordIndex - 2].word : ""
        );
        setCursorPosition(0);
      } else {
        value.length > 0 &&
          setCursorPosition((pre: any) => pre - cursorPositionDecrease);
      }
    }
    if (
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey &&
      e.key !== " "
    ) {
      if (e.key !== "Backspace") {
        setCursorPosition(cursorPosition + cursorPositionIncrease);
        setCursorWidth(cursorPositionIncrease);
        setCurrentText(
          newArrWords[typingWordIndex].word.split("")[value.length + 1]
        );
      }
    }
  };
  return { handleOnKeyDown };
}
