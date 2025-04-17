import { shuffleArray } from "@/api/card/utils/f";
import { typingwords } from "@/api/typing/typing.data.structure";
import TypingRestart from "@/components/typing/TypingRestart";
import { getTextWidth } from "@/utils/stringFs";
import { useRef, useState } from "react";
import { TypingOnlyAWord } from "./TypingOnlyAWord";
import { TypingManyWords } from "./TypingManyWords";
import { typingWordsTypes } from "@/api/typing/typing.type";
import { useTyping } from "@/contexts/TypingStates";

export const TypingContent = () => {
  const { typingStyles } = useTyping();
  const [text, setText] = useState<string>("");
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const typingwordsRandom: typingWordsTypes[] = shuffleArray(
    typingwords,
    "short"
  );
  const [currentTyping, setCurrentTyping] = useState(typingwordsRandom[0]);
  const refCountIndexArray = useRef(1);
  const refNextWord = useRef(0);

  const handleChangeInput = (e: any) => {
    if (e.target.value === " ") return;
    setText(e.target.value.trim());
  };
  const handleOnKeyDown = (e: any) => {
    if (e.key === " " && text.length === currentTyping.word.length) {
      setCurrentTyping(typingwordsRandom[refCountIndexArray.current]);
      setCursorPosition(0);
      setText("");
      refNextWord.current = refNextWord.current + 1;
      if (typingwordsRandom[refCountIndexArray.current + 1] !== undefined) {
        refCountIndexArray.current = refCountIndexArray.current + 1;
      } else {
        refCountIndexArray.current = 1;
        setCurrentTyping(typingwordsRandom[0]);
      }
    }
    const textWidthIncrease = getTextWidth(
      currentTyping.word[text ? text.length : 0],
      "36px Arial"
    );
    const textWidthDecrease = getTextWidth(
      currentTyping.word[text ? text.length - 1 : 0],
      "36px Arial"
    );
    if (
      text.length < currentTyping.word.length &&
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey
    ) {
      e.key !== "Backspace" &&
        setCursorPosition(cursorPosition + textWidthIncrease + 1.5);
    }
    if (e.key === "Backspace" && text.length > 0)
      setCursorPosition(cursorPosition - textWidthDecrease - 1.5);
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 ">
      {/* <div className="flex items-center justify-between w-full">
        <p className="text-xl text-[#43FFAF]">0 / 17</p>
        <div></div>
      </div> */}
      {typingStyles === "combine" && (
        <TypingOnlyAWord
          currentTyping={currentTyping}
          text={text}
          onChange={handleChangeInput}
          onKeyDown={handleOnKeyDown}
          cursorPosition={cursorPosition}
        ></TypingOnlyAWord>
      )}
      {typingStyles === "words" && (
        <TypingManyWords words={typingwords}></TypingManyWords>
      )}
      <TypingRestart
        onRestart={() => {
          setCurrentTyping(typingwordsRandom[0]);
          setCursorPosition(0);
          setText("");
        }}
      ></TypingRestart>
    </div>
  );
};
