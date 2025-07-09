import TextBoxBorderOverlay from "@/components/overlay/text.box.border.overlay";
import React, { useEffect, useState } from "react";
import { typingWordsTypes } from "@/api/typing/typing.type";
import TypingWordNew from "../TypingWordNew";
import TypingCursorNew from "../TypingCursorNew";
import RelativeOverlay from "@/components/overlay/relative.overlay";
import TypingKeyboardInput from "../TypingKeyboard";
import { calculatePositionForCursor } from "../../../func/word/calculatePositionForCursor";
import { useTyping } from "@/contexts/TypingStates";

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
  const { rect } = useTyping();

  const handleOnChange = (e: any) => {
    if (e.target.value === " ") return;
    setValue(e.target.value);
  };
  const fullText = "I love you so much".split("");
  // useEffect(() => {
  //   if (number >= fullText.length) {
  //     handleResetWordComponents();
  //     setnumber(0);
  //     setTypingWordIndex(0);
  //     setValue("");
  //     return;
  //   }
  //   const timeout = setTimeout(() => {
  //     if (fullText[number] !== " ") {
  //       setValue((pre) => pre + fullText[number]);
  //     } else {
  //       setPreTypedWord(value);
  //       setTypingWordIndex((pre) => pre + 1);
  //       setValue("");
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
      // rect && setCursorPosition(rect.left / 2 + 16);
    }
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
    const { cursorPositionIncrease, cursorPositionDecrease } =
      calculatePositionForCursor(wordList[typingWordIndex], value, "24px");
    if (
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey &&
      e.key !== " "
    ) {
      e.key !== "Backspace" &&
        setCursorPosition(cursorPosition + cursorPositionIncrease);
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

  // useEffect(() => {
  //   const getTypingCurrentWordId = document.getElementById(
  //     `wordId${typingWordIndex}`
  //   );
  //   setRect(getTypingCurrentWordId?.getBoundingClientRect());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [typingWordIndex]);

  // useEffect(() => {
  //   console.log(`rect..... of wordId${typingWordIndex}`, rect);
  //   rect && setCursorPosition(rect.left / 2 + 16);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [typingWordIndex]);

  // console.log("rect......", rect);

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
          cursorWidth={16}
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
