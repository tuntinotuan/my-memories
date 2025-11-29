import TypingMeaning from "../components/TypingMeaning";
import TypingOverlayBlur from "./typing.overlay.blur";
import { useEffect, useRef, useState } from "react";
import { shuffleArray } from "@/api/card/utils/f";
import { typingWordsTypes } from "@/api/typing/typing.type";
import TypingWordNew from "../components/TypingWordNew";
import TypingKeyboardInput from "../components/TypingKeyboard";
import TypingCursorNew from "../components/TypingCursorNew";
import { calculatePositionForCursor } from "../../func/wordOlderV1/calculatePositionForCursor";
import { useTyping } from "@/contexts/TypingStates";
import { useUpdateCursorPosition } from "../../func/wordV2/updateCursorPosition";
import { VN_REGEX } from "@/utils/RegexFs";
import { getTextWidth } from "@/utils/stringFs";

export const TypingOnlyAWordV2 = ({ data }: { data: typingWordsTypes[] }) => {
  const {
    setHideOverlay,
    setCursorIsTyping,
    cursorIsTyping,
    typingSettingLocal,
    hideOverlay,
    fontFamily,
    setIsVietNamese,
    typingFontsize,
    typingFontsizeX,
    wordGap,
  } = useTyping();

  const [value, setValue] = useState<string>("");
  const [cursorPosition, setCursorPosition] = useState<number>(0);

  const typingwordsRandom: typingWordsTypes[] = shuffleArray(data, "short");
  const newData = useRef(typingwordsRandom);
  const [currentTyping, setCurrentTyping] = useState<any>(newData.current[0]);

  const refNextWord = useRef(0);

  const [rect, setRect] = useState<DOMRect | null>(null);
  const [cursorWidth, setCursorWidth] = useState(20);
  const [currentText, setCurrentText] = useState("");

  const handleOnChange = (e: any) => {
    if (
      e.target.value === " " ||
      e.target.value.length === currentTyping.word.length + 1
    ) {
      return;
    }
    setValue(e.target.value.trim());
    setIsVietNamese(VN_REGEX.test(e.target.value));
  };
  const handleOnKeyDown = (e: any) => {
    setCursorIsTyping(true);

    // Value is => better than length 0 & spacing
    if (value.length > 0 && e.key === " ") {
      setCurrentTyping(newData.current[refNextWord.current + 1]);
      setValue("");
      refNextWord.current = refNextWord.current + 1;
    }

    // caculate cursor position & width
    const { cursorPositionIncrease, cursorPositionDecrease } =
      calculatePositionForCursor(
        currentTyping,
        value,
        `${typingFontsize * typingFontsizeX}px`,
        fontFamily
      );
    const cursorWidthIncrease =
      currentTyping.word.length === value.length + 1
        ? wordGap
        : getTextWidth(
            currentTyping?.word[value ? value.length + 1 : 1],
            `${typingFontsize * typingFontsizeX}px ${fontFamily?.name}`
          );
    const cursorWidthDecrease = getTextWidth(
      currentTyping?.word[value ? value.length - 1 : 1],
      `${typingFontsize * typingFontsizeX}px ${fontFamily?.name}`
    );

    // Value is => value >= 0 & "Backspace"
    if (value.length >= 0 && e.key === "Backspace") {
      if (value.length > 0) {
        setCursorPosition((pre: any) => pre - cursorPositionDecrease);
        setCursorWidth(cursorWidthDecrease);
      }
    }

    // Value is text: abcdegf...
    if (
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey &&
      e.key !== " "
    ) {
      if (e.key !== "Backspace" && value.length < currentTyping.word.length) {
        setCursorPosition(cursorPosition + cursorPositionIncrease);
        setCursorWidth(cursorWidthIncrease);
        setCurrentText(currentTyping.word.split("")[value.length + 1]);
      }
    }
  };

  useUpdateCursorPosition(
    currentTyping,
    rect,
    setCurrentText,
    setCursorPosition
  );

  useEffect(() => {
    setCursorWidth(
      getTextWidth(
        currentTyping.word[0],
        `${typingFontsize * typingFontsizeX}px ${fontFamily?.name}`
      )
    );
    setCurrentText(currentTyping.word.split("")[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rect, typingSettingLocal]);

  return (
    <>
      <TypingKeyboardInput
        id="typingKeyboardId"
        hiddenInput
        value={value}
        handleOnKeyDown={handleOnKeyDown}
        handleOnChange={handleOnChange}
        onBlur={() => {
          setHideOverlay(false);
          setCursorIsTyping(false);
        }}
      ></TypingKeyboardInput>
      <TypingCursorNew
        cssPosition="fixed"
        rect={rect}
        cursorPosition={cursorPosition}
        cursorWidth={cursorWidth}
        currentText={currentText}
        styles={typingSettingLocal?.cursorShape}
        showCursor={hideOverlay}
        isTyping={cursorIsTyping}
        transitionY={0}
        blockTextSize="text-4xl"
      ></TypingCursorNew>
      <div className="relative w-full flex flex-col items-center gap-2">
        <TypingWordNew
          setRect={setRect}
          typingWordIndex={refNextWord.current}
          wordIndex={refNextWord.current}
          currentTyping={currentTyping}
          text={value}
          defaultSize={24}
          setCursorPosition={setCursorPosition}
          textSizeX={typingFontsizeX}
        ></TypingWordNew>
        <TypingMeaning textSizeX={typingFontsizeX} defaultSize={16}>
          {currentTyping.meaning}
        </TypingMeaning>
        <TypingOverlayBlur htmlFor={`typingKeyboardId`}></TypingOverlayBlur>
      </div>
    </>
  );
};
