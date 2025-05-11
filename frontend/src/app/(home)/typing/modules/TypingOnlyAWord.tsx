import { getTextWidth } from "@/utils/stringFs";
import TypingMeaning from "./components/TypingMeaning";
import TypingWord from "./components/TypingWord";
import TypingOverlayBlur from "./TypingOverlayBlur";
import { useRef, useState } from "react";
import { shuffleArray } from "@/api/card/utils/f";
import { typingWordsTypes } from "@/api/typing/typing.type";

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
  const handleOnKeyDown = (e: any) => {
    if (e.key === " " && text.length >= currentTyping.word.length) {
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
      "36px monospace"
    );
    const textWidthDecrease = getTextWidth(
      currentTyping.word[text ? text.length - 1 : 0],
      "36px monospace"
    );
    if (
      text.length < currentTyping.word.length &&
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey &&
      e.key !== " "
    ) {
      e.key !== "Backspace" &&
        setCursorPosition(cursorPosition + textWidthIncrease);
    }
    if (e.key === "Backspace" && text.length > 0)
      setCursorPosition(cursorPosition - textWidthDecrease);
  };
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
    </>
  );
};
