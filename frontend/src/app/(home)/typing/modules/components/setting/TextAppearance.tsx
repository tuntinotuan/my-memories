import React, { useEffect, useState } from "react";
import {
  FontSizeTypes,
  isFraction,
  makeFraction,
  typingWordsTypes,
} from "@/api/typing/typing.type";
import { useTyping } from "@/contexts/TypingStates";
import { CursorStyles } from "../../types";
import { useAutoText } from "../../../func/setting/useAutoText";
import { useLayoutStates } from "@/contexts/layoutStates";
import { calculatePositionForCursor } from "../../../func/wordOlderV1/calculatePositionForCursor";
import TextBoxBorderOverlay from "@/components/overlay/text.box.border.overlay";
import TypingWordNew from "../TypingWordNew";
import TypingCursorNew from "../TypingCursorNew";
import RelativeOverlay from "@/components/overlay/relative.overlay";
import TypingKeyboardInput from "../TypingKeyboard";
import TextAndContentOverlay from "./TextAndContentOverlay";
import RadioFull from "@/components/radio/RadioFull";
import BtnFontsize from "./BtnFontsize";
import { useUpdateWordGap } from "../../../func/setting/useUpdateWordGap";
import { useUpdateSettingCursorPosition } from "../../../func/setting/useUpdateSettingCursorPosition";
import { useNotify } from "@/contexts/notifyStates";

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
  const {
    rect,
    setRect,
    setCursorShape,
    typingSettingLocal,
    textIsLowercase,
    setTextIsLowercase,
    typingFontsize,
    wordGap,
    typingFontsizeX,
    setTypingFontsizeX,
  } = useTyping();
  const { setActiveSaved, setTitle } = useNotify();
  const [value, setValue] = useState("");
  const [typingWordIndex, setTypingWordIndex] = useState(0);
  const [resetComponents, setResetComponents] = useState(true);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [cursorWidth, setCursorWidth] = useState(14);
  const [currentText, setCurrentText] = useState("");
  const [fontsizeValue, setFontsizeValue] =
    useState<FontSizeTypes>(typingFontsizeX);

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
      setTypingWordIndex((pre) => pre + 1);
      setValue("");
    }
    const { cursorPositionIncrease } = calculatePositionForCursor(
      wordList[typingWordIndex],
      value,
      "24px"
    );
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
    setTypingWordIndex,
    textIsLowercase,
    wordGap,
    typingFontsize,
    typingFontsizeX,
  });

  useUpdateSettingCursorPosition({
    setCurrentText,
    wordList,
    typingWordIndex,
    rect,
    setCursorPosition,
  });

  useEffect(() => {
    setCursorWidth(14); // first cursor width
  }, []);

  const fontSizeList: FontSizeTypes[] = [
    makeFraction(0.5),
    makeFraction(1),
    makeFraction(2),
    makeFraction(3),
    makeFraction(4),
  ];

  useUpdateWordGap();

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
      {typingWordIndex} */}
      <div
        className="relative flex justify-center flex-wrap transition-all"
        style={{ gap: wordGap }}
      >
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
              setCursorPosition={setCursorPosition}
              textSizeX={typingFontsizeX}
            ></TypingWordNew>
          ))}
        {!resetComponents && (
          <TypingWordNew
            setRect={setRect}
            typingWordIndex={typingWordIndex}
            wordIndex={0}
            currentTyping={{ word: "a", meaning: "" }}
            text={value}
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
          <RadioFull
            onClick={() => setTextIsLowercase(!textIsLowercase)}
            status={textIsLowercase}
          />
        </TextAndContentOverlay>
        <TextAndContentOverlay gap={6}>
          Font size:
          {fontSizeList.map((item) => (
            <BtnFontsize
              key={item}
              typingFontsizeX={typingFontsizeX}
              onClick={() => {
                setTypingFontsizeX(item);
                setFontsizeValue(makeFraction(item));
              }}
            >
              {item}
            </BtnFontsize>
          ))}
          <input
            type="number"
            defaultValue={typingFontsizeX}
            value={fontsizeValue}
            className={`bg-typingBgControlMenu p-2 rounded focus:scale-105 focus:bg-typingColorActive cursor-pointer transition-all ${
              isFraction(typingFontsizeX) && typingFontsizeX !== 0.5
                ? "bg-typingColorActive"
                : ""
            }`}
            onChange={(e) => {
              // if (fontsizeValue !== typingFontsizeX) {
              setFontsizeValue(makeFraction(e.target.valueAsNumber));
              // }
            }}
            onBlur={() => {
              if (fontsizeValue !== typingFontsizeX) {
                setTypingFontsizeX(makeFraction(fontsizeValue));
                setActiveSaved(true);
                setTitle("Saved");
              } else {
                setFontsizeValue(typingFontsizeX);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setTypingFontsizeX(makeFraction(fontsizeValue));
                setActiveSaved(true);
                setTitle("Saved");
              }
            }}
          />
          {/* <button
            onClick={() => {
              setActiveSaved(true);
              setTitle("Saved");
            }}
          >
            click
          </button> */}
        </TextAndContentOverlay>
      </div>
    </TextBoxBorderOverlay>
  );
};

export default TextAppearance;
