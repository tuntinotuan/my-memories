import TextBoxBorderOverlay from "@/components/overlay/text.box.border.overlay";
import React, { useEffect, useState } from "react";
import { typingWordsTypes } from "@/api/typing/typing.type";
import TypingWordNew from "../TypingWordNew";
import TypingCursorNew from "../TypingCursorNew";
import RelativeOverlay from "@/components/overlay/relative.overlay";
import TypingKeyboardInput from "../TypingKeyboard";

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

  const handleOnChange = (e: any) => {
    if (e.target.value === " ") return;
    setValue(e.target.value);
  };
  const fullText = "I love you so much".split("");
  useEffect(() => {
    if (number >= fullText.length) return;
    // for (let i = 0; i < fullText.length; i++) {
    const timeout = setTimeout(() => {
      if (fullText[number] !== " ") {
        setValue((pre) => pre + fullText[number]);
      } else {
        setPreTypedWord(value);
        setTypingWordIndex((pre) => pre + 1);
        setValue("");
      }
      setnumber((pre) => pre + 1);
      console.log("setTimeout running", number);
    }, 1000); // Typing speed in ms
    return () => clearTimeout(timeout);
    // }
  }, [number]);
  const handleOnKeyDown = (e: any) => {
    if (value.length > 0 && e.key === " ") {
      setPreTypedWord(value);
      setTypingWordIndex((pre) => pre + 1);
      setValue("");
    }
    if (value.length >= 0 && e.key === "Backspace") {
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
    }
  };

  return (
    <TextBoxBorderOverlay className="w-full" title="Text appearance">
      <TypingKeyboardInput
        value={value}
        handleOnKeyDown={handleOnKeyDown}
        handleOnChange={handleOnChange}
      ></TypingKeyboardInput>
      {/* {typingWordIndex > 0 && wordList[typingWordIndex - 1].word}
      {typingWordIndex} {preTypedWord} */}
      <div className="flex flex-wrap justify-center gap-4 transition-all">
        <TypingCursorNew cursorPosition={0} cursorWidth={16}></TypingCursorNew>
        {wordList.map((word, index) => (
          <TypingWordNew
            key={index}
            typingWordIndex={typingWordIndex}
            wordIndex={index}
            currentTyping={word}
            text={value}
            textSize="text-2xl"
          ></TypingWordNew>
        ))}
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
