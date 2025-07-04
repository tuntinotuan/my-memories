import TypingMeaning from "../components/TypingMeaning";
import TypingWord from "../components/TypingWord";
import TypingOverlayBlur from "./typing.overlay.blur";
import { useEffect, useRef, useState } from "react";
import { shuffleArray } from "@/api/card/utils/f";
import { typingWordsTypes } from "@/api/typing/typing.type";
import { onlyHandleOnKeyDown } from "../../func/onlyAWord/onlyHandleOnKeyDown";
import { getTextWidth } from "@/utils/stringFs";

export const TypingOnlyAWord = ({ data }: { data: typingWordsTypes[] }) => {
  const [text, setText] = useState<string>("");
  const [cursorPosition, setCursorPosition] = useState<number>(0);

  const typingwordsRandom: typingWordsTypes[] = shuffleArray(data, "short");
  const [currentTyping, setCurrentTyping] = useState(typingwordsRandom[0]);

  const refCountIndexArray = useRef(1);
  const refNextWord = useRef(0);

  // const [cursorWidth, setCursorWidth] = useState(0);

  // useEffect(() => {
  //   const newWidth = getTextWidth(
  //     currentTyping.word[text ? text.length : 0],
  //     `36px monospace`
  //   );
  //   setCursorWidth(newWidth);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [text]);

  const handleChangeInput = (e: any) => {
    if (e.target.value === " ") return;
    setText(e.target.value.trim());
  };
  const { handleOnKeyDown } = onlyHandleOnKeyDown(
    text,
    setText,
    currentTyping,
    setCurrentTyping,
    setCursorPosition,
    cursorPosition,
    typingwordsRandom,
    refCountIndexArray,
    refNextWord
  );
  return (
    <>
      <label>
        <TypingWord
          currentTyping={currentTyping}
          text={text}
          onChange={handleChangeInput}
          onKeyDown={handleOnKeyDown}
          cursorPosition={cursorPosition}
          fontSize="36px"
          // cursorWidth={cursorWidth}
        ></TypingWord>
      </label>
      <TypingMeaning>{currentTyping.meaning}</TypingMeaning>
      <TypingOverlayBlur htmlFor={"typingCursorId"}></TypingOverlayBlur>
      {/* <label className="flex items-center gap-4 translate-x-1/2 overflow-hidden">
        {Array(5)
          .fill(null)
          .map((item, index) => (
            <TypingWord
              key={index}
              currentTyping={currentTyping}
              text={text}
              onChange={handleChangeInput}
              onKeyDown={handleOnKeyDown}
              cursorPosition={cursorPosition}
            ></TypingWord>
          ))}
      </label> */}
    </>
  );
};
