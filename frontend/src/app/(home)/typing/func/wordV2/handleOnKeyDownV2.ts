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
    hideOverlay,
    setHideOverlay,
  } = useTyping();
  const handleOnKeyDown = (e: any) => {
    if (!hideOverlay) {
      return null;
    }
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

    // value is => " " (spacing)
    if (value.length > 0 && e.key === " ") {
      setMoreYTransition(0);
      setPreTypedWord(value);
      // value !== wordList[typingWordIndex].word &&
      //   setPreCursorPosition(cursorPosition);
      setTypingWordIndex((pre: number) => pre + 1);
      setValue("");
      setMoreCursorPosition(0);
      // setCursorWidth(
      //   getTextWidth(
      //     newArrWords[typingWordIndex]?.word[0],
      //     `${typingFontsize * typingFontsizeX}px ${fontFamily?.name}`
      //   )
      // );

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
    const cursorWidth = getTextWidth(
      newArrWords[typingWordIndex]?.word[
        value && value.length + 1 < newArrWords[typingWordIndex]?.word.length
          ? value.length + 1
          : 0
      ],
      `${typingFontsize * typingFontsizeX}px ${fontFamily?.name}`
    );
    const cursorWidthNew = getTextWidth(
      newArrWords[typingWordIndex]?.word[value ? value.length - 1 : 0],
      `${typingFontsize * typingFontsizeX}px ${fontFamily?.name}`
    );

    const lastErrWordInArray =
      arrayOfErrPreWords.length > 0 &&
      arrayOfErrPreWords[arrayOfErrPreWords.length - 1];
    const preOriginalErrorWord =
      typingWordIndex > 0 &&
      newArrWords[typingWordIndex - 1].word.slice(0, lastErrWordInArray.length);
    const newMoreCursorPosition = getTextWidth(
      preOriginalErrorWord,
      `${typingFontsize * typingFontsizeX}px ${fontFamily.name}`
    );
    const newCaculate = typingFontsize * typingFontsizeX + wordGap;

    // value is => length >= 0 && press "Backspace" key
    if (value.length >= 0 && e.key === "Backspace") {
      // Back previous error word
      if (
        !value &&
        lastErrWordInArray &&
        lastErrWordInArray !== newArrWords[typingWordIndex - 1]?.word
      ) {
        // update correct: cursor position, height flexible after back error word
        if (lastInRowIndexes.includes(typingWordIndex - 1)) {
          if (rowTyped > 1) {
            setMoreYTransition(-newCaculate);
            setHeightFlexible(heightFlexible - newCaculate);
          }
          setRowTyped(rowTyped - 1);
        }
        //
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

    // value is => number or word
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
        setCursorWidth(cursorWidthNew);
        setCurrentText(
          newArrWords[typingWordIndex].word.split("")[value.length + 1]
        );
      }
    }
  };
  return { handleOnKeyDown };
}
