import React, { useState } from "react";
import {
  FontSizeTypes,
  makeFraction,
  typingWordsTypes,
} from "@/api/typing/typing.type";
import { useTyping } from "@/contexts/TypingStates";
import { CursorStyles } from "../../types";
import { useAutoText } from "../../../func/setting/useAutoText";
import { useLayoutStates } from "@/contexts/layoutStates";
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
import { useUpdateFirstTime } from "../../../func/setting/useUpdateFirstTime";
import InputChangeFontsize from "./InputChangeFontsize";
import BtnFontFamilyDropdown from "./BtnFontFamilyDropdown";
import { useTypingTheme } from "@/contexts/typingThemeStates";
import { Id } from "@/app/(home)/project/[slug]/modules/types";
import BtnThemeDropdown from "./BtnThemeDropdown";

const TextAppearance = ({ show }: any) => {
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
    effectHoveredFontFamily,
  } = useTyping();
  const { showTypingSetting } = useLayoutStates();

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
  const cursorShapeList: {
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
      className: `flex items-center justify-center hover:animate-bounce p-3 transition-all cursor-pointer ${
        typingSettingLocal?.cursorShape === "line" ? "animate-bounce" : ""
      }`,
    },
    {
      styles: "underline",
      cursorWidth: 16,
      onClick: () => setCursorShape("underline"),
      className: `flex items-center justify-center hover:animate-bounce p-3 transition-all cursor-pointer ${
        typingSettingLocal?.cursorShape === "underline" ? "animate-bounce" : ""
      }`,
    },
    {
      styles: "box",
      cursorWidth: 16,
      cursorHeight: 25,
      onClick: () => setCursorShape("box"),
      className: `flex items-center justify-center hover:animate-bounce p-3 transition-all cursor-pointer ${
        typingSettingLocal?.cursorShape === "box" ? "animate-bounce" : ""
      }`,
    },
    {
      styles: "block",
      cursorWidth: 16,
      cursorHeight: 25,
      onClick: () => setCursorShape("block"),
      className: `flex items-center justify-center hover:animate-bounce p-3 transition-all cursor-pointer ${
        typingSettingLocal?.cursorShape === "block" ? "animate-bounce" : ""
      }`,
    },
  ];
  const fontSizeList: FontSizeTypes[] = [
    makeFraction(0.5),
    makeFraction(1),
    makeFraction(2),
    makeFraction(3),
    makeFraction(4),
  ];

  const [value, setValue] = useState("");
  const [typingWordIndex, setTypingWordIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [cursorWidth, setCursorWidth] = useState(14);
  const [currentText, setCurrentText] = useState("");
  const [resetComponents, setResetComponents] = useState(true);

  const [fontsizeValue, setFontsizeValue] = useState<number>(typingFontsizeX);

  const handleOnChange = (e: any) => {
    if (e.target.value === " ") return;
    setValue(e.target.value);
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
    handleResetWordComponents,
    typingWordIndex,
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
    setCursorWidth,
  });

  useUpdateWordGap();
  useUpdateFirstTime(setFontsizeValue);

  return (
    <TextBoxBorderOverlay className="w-full" title="Text appearance">
      <TypingKeyboardInput
        id="typingKeyboardId"
        hiddenInput
        value={value}
        handleOnChange={handleOnChange}
      ></TypingKeyboardInput>
      {/* <p>{currentText}...</p> */}
      {/* {typingWordIndex > 0 && wordList[typingWordIndex - 1].word}
      {typingWordIndex} */}
      <div
        className={`${effectHoveredFontFamily} relative flex justify-center transition-all mx-10`}
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
      <div className="max-h-[300px] overflow-y-auto">
        <TextAndContentOverlay>
          Cursor shape:
          {cursorShapeList.map((item, index) => (
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
          <InputChangeFontsize
            fontsizeValue={fontsizeValue}
            setFontsizeValue={setFontsizeValue}
          />
        </TextAndContentOverlay>
        <TextAndContentOverlay>
          Font family:
          <BtnFontFamilyDropdown />
        </TextAndContentOverlay>
        <TextAndContentOverlay>
          Themes:
          <BtnThemeDropdown />
        </TextAndContentOverlay>
      </div>
    </TextBoxBorderOverlay>
  );
};

export default TextAppearance;
