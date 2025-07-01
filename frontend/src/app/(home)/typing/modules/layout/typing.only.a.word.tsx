import { getTextWidth } from "@/utils/stringFs";
import TypingMeaning from "../components/TypingMeaning";
import TypingWord from "../components/TypingWord";
import TypingOverlayBlur from "./typing.overlay.blur";
import { useRef, useState } from "react";
import { shuffleArray } from "@/api/card/utils/f";
import { typingWordsTypes } from "@/api/typing/typing.type";
import { onlyHandleOnKeyDown } from "../../func/onlyAWord/onlyHandleOnKeyDown";

export const TypingOnlyAWord = ({ data }: { data: typingWordsTypes[] }) => {
  const [text, setText] = useState<string>("");
  const [cursorPosition, setCursorPosition] = useState<number>(0);

  const typingwordsRandom: typingWordsTypes[] = shuffleArray(data, "short");

  const [currentTyping, setCurrentTyping] = useState(typingwordsRandom[0]);
  const refCountIndexArray = useRef(1);
  const refNextWord = useRef(0);

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
