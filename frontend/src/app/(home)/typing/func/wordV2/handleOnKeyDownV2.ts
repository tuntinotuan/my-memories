import { useTyping } from "@/contexts/TypingStates";
import { calculatePositionForCursor } from "../wordOlderV1/calculatePositionForCursor";
import { startTyping } from "../wordOlderV1/startTyping";
import { showWordResultsWhenTypedLastWord } from "../wordOlderV1/wordResults";
import { getTextWidth } from "@/utils/stringFs";

export function useKeyDownV2(
  types: any,
  value: string,
  setValue: any,
  setPreTypedWord: any,
  newArrWords: any,
  setCursorPosition: any,
  cursorPosition: any,
  setCursorWidth: any,
  setCurrentText: any,
  preTypedWord: any,
  setMoreYTransition: any,
  lastInRowIndexes: any,
  rowCount: any,
  rowTyped: any,
  setRowTyped: any,
  setHeightFlexible: any,
  heightFlexible: any,
  setMoreCursorPosition: any
) {
  const {
    typingWordIndex,
    setTypingWordIndex,
    setShowResults,
    setSecondsOfManyWords,
    setCursorIsTyping,
    setIsCountDown,
  } = useTyping();
  const handleOnKeyDown = (e: any) => {
    startTyping(
      types,
      setCursorIsTyping,
      setSecondsOfManyWords,
      setIsCountDown
    );
    setCursorIsTyping(true);

    showWordResultsWhenTypedLastWord(
      types,
      newArrWords,
      value,
      typingWordIndex,
      setSecondsOfManyWords,
      setShowResults
    );

    if (value.length > 0 && e.key === " ") {
      setMoreYTransition(0);
      setPreTypedWord(value);
      // value !== wordList[typingWordIndex].word &&
      //   setPreCursorPosition(cursorPosition);
      setTypingWordIndex((pre: number) => pre + 1);
      setValue("");
      setMoreCursorPosition(0);

      // words dynamic per row
      lastInRowIndexes.includes(typingWordIndex) && setRowTyped(rowTyped + 1);
      if (
        lastInRowIndexes.includes(typingWordIndex) &&
        rowCount > 3 &&
        rowTyped > 0 &&
        rowTyped + 2 < rowCount
      ) {
        setMoreYTransition(48);
        setHeightFlexible(heightFlexible + 48);
      }
    }
    const { cursorPositionIncrease, cursorPositionDecrease } =
      calculatePositionForCursor(newArrWords[typingWordIndex], value, "24px");
    const newMoreCursorPosition = getTextWidth(preTypedWord, `24px monospace`);
    if (value.length >= 0 && e.key === "Backspace") {
      // Back previous error word
      if (
        !value &&
        preTypedWord &&
        preTypedWord !== newArrWords[typingWordIndex - 1]?.word
      ) {
        // setPreCursorPosition(cursorPosition);
        setValue(preTypedWord + preTypedWord.at(-1));
        setTypingWordIndex((pre: number) => pre - 1);
        setPreTypedWord(
          typingWordIndex > 1 ? newArrWords[typingWordIndex - 2].word : ""
        );
        setMoreCursorPosition(newMoreCursorPosition);
      } else {
        value.length > 0 &&
          setCursorPosition((pre: any) => pre - cursorPositionDecrease);
        setCurrentText(
          newArrWords[typingWordIndex].word.split("")[
            value.length === 0 ? 0 : value.length - 1
          ]
        );
      }
    }
    if (
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey &&
      e.key !== " "
    ) {
      if (
        e.key !== "Backspace" &&
        value.length < newArrWords[typingWordIndex].word.length
      ) {
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
