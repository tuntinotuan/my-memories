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
  setMoreCursorPosition: any,
  setArrayOfErrPreWords: any,
  arrayOfErrPreWords: any,
  wordGap: any,
  typingFontsizeX: any,
  typingFontsize: any
) {
  const {
    typingWordIndex,
    setTypingWordIndex,
    setShowResults,
    setSecondsOfManyWords,
    setCursorIsTyping,
    setIsCountDown,
    fontFamily,
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
        const newCaculate = typingFontsize * typingFontsizeX + wordGap;
        setMoreYTransition(newCaculate);
        setHeightFlexible(heightFlexible + newCaculate);
      }

      // list of error previous words
      if (value === newArrWords[typingWordIndex]?.word) {
        setArrayOfErrPreWords([]);
      } else {
        setArrayOfErrPreWords((pre: string[]) => [...pre, value]);
      }
    }
    const { cursorPositionIncrease, cursorPositionDecrease } =
      calculatePositionForCursor(
        newArrWords[typingWordIndex],
        value,
        `${typingFontsize * typingFontsizeX}px`,
        fontFamily
      );
    const lastErrWordInArray =
      arrayOfErrPreWords.length > 0 &&
      arrayOfErrPreWords[arrayOfErrPreWords.length - 1];
    const newMoreCursorPosition = getTextWidth(
      lastErrWordInArray,
      `${typingFontsize * typingFontsizeX}px ${fontFamily.name}`
    );
    const newCaculate = typingFontsize * typingFontsizeX + wordGap;

    if (value.length >= 0 && e.key === "Backspace") {
      // Back previous error word
      if (
        !value &&
        lastErrWordInArray &&
        lastErrWordInArray !== newArrWords[typingWordIndex - 1]?.word
      ) {
        // setPreCursorPosition(cursorPosition);
        // setValue(preTypedWord + preTypedWord.at(-1));
        // setPreTypedWord(
        //   typingWordIndex > 1 ? newArrWords[typingWordIndex - 2].word : ""
        // );
        setMoreYTransition(-newCaculate);
        setHeightFlexible(heightFlexible - newCaculate);
        lastInRowIndexes.includes(typingWordIndex - 1) &&
          setRowTyped(rowTyped - 1);

        setTypingWordIndex((pre: number) => pre - 1);
        setMoreCursorPosition(newMoreCursorPosition);
        //
        setValue(lastErrWordInArray + lastErrWordInArray.at(-1));
        const newArr = arrayOfErrPreWords.slice(0, -1);
        setArrayOfErrPreWords(newArr);
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
