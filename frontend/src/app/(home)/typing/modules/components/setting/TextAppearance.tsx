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
import BtnDropdown from "./BtnDropdown";
import Dropdown from "@/components/dropdown/Dropdown";
import { themeList } from "@/api/typing/typing.data.structure";
import ThemeItem from "@/components/theme/ThemeItem";
import { changeFor } from "@/components/popup/typing/PopupTypingTheme";
import { useTypingTheme } from "@/contexts/typingThemeStates";
import { Id } from "@/app/(home)/project/[slug]/modules/types";

const TextAppearance = ({ show, changeFor = "global" }: any) => {
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
    fontFamily,
    setWordList,
    singleTypingList,
  } = useTyping();
  const { showTypingSetting } = useLayoutStates();
  const {
    theme,
    setTheme,
    themPopup,
    setThemePopup,
    singleTheme,
    setSingleTheme,
  } = useTypingTheme();

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
  const updateSingleTheme = (id: Id, theme: string) => {
    const newSingleTheme = wordList.map((item: any) => {
      if (item.id !== id) return item;
      return { ...item, theme };
    });
    setSingleTheme(theme);
    setWordList(newSingleTheme);
  };

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
          <BtnDropdown />
        </TextAndContentOverlay>
        <TextAndContentOverlay>
          Themes:
          <Dropdown
            name={theme || "Choose your theme"}
            className="border border-transparent bg-typingBgControlMenu text-white"
            activeClassName="border-b-typingColorActive"
          >
            <div className="max-h-48 bg-typingBgControlMenu rounded-b-md overflow-y-auto [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-track]:bg-typingBg [&::-webkit-scrollbar-thumb]:bg-typingColorActive [&::-webkit-scrollbar-track]:rounded-sm [&::-webkit-scrollbar-thumb]:rounded-sm px-1">
              {themeList.map((item, index) => (
                <ThemeItem
                  key={index}
                  item={item}
                  index={index}
                  currentTheme={changeFor === "single" ? singleTheme : theme}
                  className="rounded-none"
                  onClick={() => {
                    if (changeFor === "global") {
                      setTheme(item);
                    }
                    if (changeFor === "single") {
                      updateSingleTheme(singleTypingList.id, item);
                    }
                    setThemePopup(false);
                  }}
                  onIconTick
                ></ThemeItem>
              ))}
            </div>
          </Dropdown>
        </TextAndContentOverlay>
      </div>
    </TextBoxBorderOverlay>
  );
};

export default TextAppearance;
