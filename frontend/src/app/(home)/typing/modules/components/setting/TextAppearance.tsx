import TextBoxBorderOverlay from "@/components/overlay/text.box.border.overlay";
import React, { useEffect, useState } from "react";
import { typingWordsTypes } from "@/api/typing/typing.type";
import TypingWordNew from "../TypingWordNew";
import TypingCursorNew from "../TypingCursorNew";
import RelativeOverlay from "@/components/overlay/relative.overlay";
import TypingKeyboardInput from "../TypingKeyboard";
import { useTyping } from "@/contexts/TypingStates";
import { CursorStyles } from "../../types";
import { useAutoText } from "../../../func/setting/useAutoText";
import { useLayoutStates } from "@/contexts/layoutStates";
import { calculatePositionForCursor } from "../../../func/wordOlderV1/calculatePositionForCursor";
import TextAndContentOverlay from "./TextAndContentOverlay";

const TextAppearance = ({ show }: any) => {
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
  const [preTypedWord, setPreTypedWord] = useState("");
  const [preCursorPosition, setPreCursorPosition] = useState(0);
  const [resetComponents, setResetComponents] = useState(true);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [cursorWidth, setCursorWidth] = useState(14);
  const [currentText, setCurrentText] = useState("");
  const {
    rect,
    setRect,
    setCursorShape,
    typingSettingLocal,
    textIsLowercase,
    setTextIsLowercase,
  } = useTyping();
  const { showTypingSetting } = useLayoutStates();

  const listCursorShape: {
    styles: CursorStyles;
    cursorWidth: number;
    cursorHeight?: number;
    onClick: () => void;
    className: string;
  }[] = [
    {
      styles: "line",
      cursorWidth: 2,
      cursorHeight: 25,
      onClick: () => setCursorShape("line"),
      className:
        "flex items-center justify-center hover:animate-bounce p-3 transition-all cursor-pointer",
    },
    {
      styles: "underline",
      cursorWidth: 16,
      onClick: () => setCursorShape("underline"),
      className:
        "flex items-center justify-center hover:animate-bounce p-3 transition-all cursor-pointer",
    },
    {
      styles: "box",
      cursorWidth: 16,
      cursorHeight: 25,
      onClick: () => setCursorShape("box"),
      className:
        "flex items-center justify-center hover:animate-bounce p-3 transition-all cursor-pointer",
    },
    {
      styles: "block",
      cursorWidth: 16,
      cursorHeight: 25,
      onClick: () => setCursorShape("block"),
      className:
        "flex items-center justify-center hover:animate-bounce p-3 transition-all cursor-pointer",
    },
  ];

  const handleOnChange = (e: any) => {
    if (e.target.value === " ") return;
    setValue(e.target.value);
  };
  const handleOnKeyDown = (e: any) => {
    if (value.length > 0 && e.key === " ") {
      setPreTypedWord(value);
      // value !== wordList[typingWordIndex].word &&
      //   setPreCursorPosition(cursorPosition);
      setTypingWordIndex((pre) => pre + 1);
      setValue("");
      // rect && setCursorPosition(rect.left);
    }
    const { cursorPositionIncrease, cursorPositionDecrease } =
      calculatePositionForCursor(wordList[typingWordIndex], value, "24px");
    if (value.length >= 0 && e.key === "Backspace") {
      // Back previous error word
      if (!value && preTypedWord !== wordList[typingWordIndex - 1].word) {
        setPreCursorPosition(cursorPosition);
        setValue(preTypedWord + preTypedWord.at(-1));
        setTypingWordIndex((pre) => pre - 1);
        setPreTypedWord(
          typingWordIndex > 1 ? wordList[typingWordIndex - 2].word : ""
        );
        // setCursorPosition(preCursorPosition);
      } else {
        value.length > 0 &&
          setCursorPosition((pre) => pre - cursorPositionDecrease);
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
          wordList[typingWordIndex].word.split("")[value.length + 1]
        );
      }
    }
  };

  const handleResetWordComponents = () => {
    setResetComponents(false);
    setValue("");
    setTypingWordIndex(0);
    setPreTypedWord("");
    setPreCursorPosition(0);
    setCursorWidth(16);
    setTimeout(() => {
      setResetComponents(true);
    }, 1);
    if (rect) {
      setCursorPosition(rect.left);
    }
    document.getElementById("typingKeyboardId")?.focus();
  };
  useAutoText({
    show,
    value,
    typingWordIndex,
    handleResetWordComponents,
    setCurrentText,
    setValue,
    setCursorPosition,
    setCursorWidth,
    setPreTypedWord,
    setTypingWordIndex,
  });
  useEffect(() => {
    setCurrentText(wordList[typingWordIndex].word.split("")[0]);
    if (rect) {
      // preCursorPosition
      //   ? setCursorPosition(preCursorPosition)
      //   : setCursorPosition(rect.left);
      setCursorPosition(rect.left);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rect]);

  return (
    <TextBoxBorderOverlay className="w-full" title="Text appearance">
      <TypingKeyboardInput
        id="typingKeyboardId"
        hiddenInput
        value={value}
        handleOnKeyDown={handleOnKeyDown}
        handleOnChange={handleOnChange}
      ></TypingKeyboardInput>
      {/* <button onClick={handleResetWordComponents}>reset text</button> */}
      {/* <p>{currentText}...</p> */}
      {/* {typingWordIndex > 0 && wordList[typingWordIndex - 1].word}
      {typingWordIndex} {preTypedWord} */}
      {/* {preCursorPosition} */}
      <div className="relative flex justify-center flex-wrap gap-4 transition-all">
        <TypingCursorNew
          isTyping
          showCursor={showTypingSetting}
          cssPosition="fixed"
          rect={rect}
          cursorPosition={cursorPosition}
          cursorWidth={cursorWidth}
          currentText={currentText}
          styles={typingSettingLocal?.cursorShape}
        ></TypingCursorNew>
        {resetComponents &&
          wordList.map((word, index) => (
            <TypingWordNew
              key={index}
              setRect={setRect}
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
            setRect={setRect}
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
        <TextAndContentOverlay>
          Cursor shape:
          {listCursorShape.map((item, index) => (
            <RelativeOverlay key={index}>
              <TypingCursorNew
                isTyping
                showCursor
                cssPosition="absolute"
                styles={item.styles}
                cursorPosition={0}
                cursorWidth={item.cursorWidth}
                cursorHeight={item.cursorHeight}
                onClick={item.onClick}
                className={item.className}
              ></TypingCursorNew>
            </RelativeOverlay>
          ))}
        </TextAndContentOverlay>
        <TextAndContentOverlay>
          Text lowercase:
          <button onClick={() => setTextIsLowercase(!textIsLowercase)}>{`${
            textIsLowercase ? "on" : "off"
          }`}</button>
        </TextAndContentOverlay>
      </div>
    </TextBoxBorderOverlay>
  );
};

export default TextAppearance;
