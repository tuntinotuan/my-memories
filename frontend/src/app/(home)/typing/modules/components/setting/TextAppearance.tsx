import TextBoxBorderOverlay from "@/components/overlay/text.box.border.overlay";
import React, { useEffect, useState } from "react";
import { typingWordsTypes } from "@/api/typing/typing.type";
import TypingWordNew from "../TypingWordNew";
import TypingCursorNew from "../TypingCursorNew";
import RelativeOverlay from "@/components/overlay/relative.overlay";
import TypingKeyboardInput from "../TypingKeyboard";
import { calculatePositionForCursor } from "../../../func/word/calculatePositionForCursor";
import { useTyping } from "@/contexts/TypingStates";
import { getTextWidth } from "@/utils/stringFs";

const TextAppearance = () => {
  const wordList: typingWordsTypes[] = [
    {
      word: "I",
      meaning: "",
    },
    {
      word: "love",
      meaning: "",
    },
    {
      word: "you",
      meaning: "",
    },
    {
      word: "so",
      meaning: "",
    },
    {
      word: "much",
      meaning: "",
    },
  ];
  const [value, setValue] = useState("");
  const [typingWordIndex, setTypingWordIndex] = useState(0);
  const [number, setnumber] = useState(0);
  const [preTypedWord, setPreTypedWord] = useState("");
  const [resetComponents, setResetComponents] = useState(true);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [cursorWidth, setCursorWidth] = useState(14);
  const [cursorTop, setCursorTop] = useState(14);
  const { rect, setRect } = useTyping();

  const handleOnChange = (e: any) => {
    if (e.target.value === " ") return;
    setValue(e.target.value);
  };
  const fullText = "I love you so much".split("");
  // useEffect(() => {
  //   const cursorPositionIncrease = getTextWidth(
  //     fullText[value ? value.length : 0],
  //     `24px monospace`
  //   );
  //   const cursorNextWidth =
  //     fullText[typingWordIndex + 1] === " "
  //       ? 14
  //       : getTextWidth(fullText[typingWordIndex + 1], `24px monospace`);
  //   if (number >= fullText.length) {
  //     handleResetWordComponents();
  //     setnumber(0);
  //     setTypingWordIndex(0);
  //     setValue("");
  //     setCursorWidth(16);
  //     setCursorPosition(0);
  //     return;
  //   }
  //   const timeout = setTimeout(() => {
  //     if (fullText[number] !== " ") {
  //       setValue((pre) => pre + fullText[number]);
  //       setCursorPosition((pre) => pre + cursorNextWidth);
  //       setCursorWidth(cursorNextWidth);
  //     } else {
  //       setPreTypedWord(value);
  //       setTypingWordIndex((pre) => pre + 1);
  //       setValue("");
  //       setCursorPosition((pre) => pre + 16);
  //       setCursorWidth(cursorNextWidth);
  //     }
  //     setnumber((pre) => pre + 1);
  //   }, 800); // Typing speed in ms
  //   return () => clearTimeout(timeout);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [number]);
  const handleOnKeyDown = (e: any) => {
    if (value.length > 0 && e.key === " ") {
      setPreTypedWord(value);
      setTypingWordIndex((pre) => pre + 1);
      setValue("");
      // setCursorPosition(cursorPosition + 16);
    }
    const { cursorPositionIncrease, cursorPositionDecrease } =
      calculatePositionForCursor(wordList[typingWordIndex], value, "24px");
    if (value.length >= 0 && e.key === "Backspace") {
      // Back previous error word
      if (!value && preTypedWord !== wordList[typingWordIndex - 1].word) {
        setValue(preTypedWord + preTypedWord.at(-1));
        setTypingWordIndex((pre) => pre - 1);
        setPreTypedWord(
          typingWordIndex > 1 ? wordList[typingWordIndex - 2].word : ""
        );
      } else {
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
        // setCursorPosition(cursorPosition + cursorPositionIncrease);
        // setCursorWidth(cursorPositionIncrease);
      }
    }
  };

  const handleResetWordComponents = () => {
    setResetComponents(false);
    setValue("");
    setTypingWordIndex(0);
    setPreTypedWord("");
    setCursorPosition(0);
    setTimeout(() => {
      setResetComponents(true);
    }, 1);
  };

  useEffect(() => {
    console.log(`rect..... of wordId${typingWordIndex}`, rect);
    if (rect) {
      setCursorPosition(rect.left);
      setCursorTop(rect.bottom);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rect]);

  return (
    <TextBoxBorderOverlay className="w-full" title="Text appearance">
      <TypingKeyboardInput
        value={value}
        handleOnKeyDown={handleOnKeyDown}
        handleOnChange={handleOnChange}
      ></TypingKeyboardInput>
      <button onClick={handleResetWordComponents}>reset text</button>
      {/* {typingWordIndex > 0 && wordList[typingWordIndex - 1].word}
      {typingWordIndex} {preTypedWord} */}
      <div className="relative flex flex-wrap w-max mx-auto gap-4 transition-all">
        <TypingCursorNew
          cursorPosition={cursorPosition}
          cursorWidth={cursorWidth}
          cursorTop={cursorTop}
          styles="underline"
        ></TypingCursorNew>
        {resetComponents &&
          wordList.map((word, index) => (
            <TypingWordNew
              key={index}
              typingWordIndex={typingWordIndex}
              wordIndex={index}
              currentTyping={word}
              text={value}
              textSize="text-2xl"
              setCursorPosition={setCursorPosition}
            ></TypingWordNew>
          ))}
        {!resetComponents && (
          <TypingWordNew
            typingWordIndex={typingWordIndex}
            wordIndex={0}
            currentTyping={{ word: "a", meaning: "" }}
            text={value}
            textSize="text-2xl"
            setCursorPosition={setCursorPosition}
          ></TypingWordNew>
        )}
      </div>
      <div>
        <div className="flex gap-10">
          Cursor shape:
          <RelativeOverlay>
            <TypingCursorNew
              cursorPosition={0}
              cursorWidth={16}
            ></TypingCursorNew>
          </RelativeOverlay>
          <RelativeOverlay>
            <TypingCursorNew
              cursorPosition={0}
              cursorWidth={16}
            ></TypingCursorNew>
          </RelativeOverlay>
          <RelativeOverlay>
            <TypingCursorNew
              cursorPosition={0}
              cursorWidth={16}
            ></TypingCursorNew>
          </RelativeOverlay>
        </div>
      </div>
    </TextBoxBorderOverlay>
  );
};

export default TextAppearance;
