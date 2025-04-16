import { shuffleArray } from "@/api/card/utils/f";
import { typingwords } from "@/api/typing/typing.data.structure";
import TypingRestart from "@/components/typing/TypingRestart";
import { useRef, useState } from "react";

export const TypingContent = () => {
  const [text, setText] = useState<string>("");
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const typingwordsRandom = shuffleArray(typingwords, "short");
  const [currentTyping, setCurrentTyping] = useState(typingwordsRandom[0]);
  const ref = useRef(1);

  console.log("currentTyping", currentTyping);

  function getTextWidth(text: string, font: string = "16px Arial"): number {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Failed to get canvas context");
    }

    context.font = font;
    return context.measureText(text).width;
  }

  const handleChangeInput = (e: any) => {
    if (e.target.value === " ") return;
    setText(e.target.value.trim());
  };
  const handleOnKeyDown = (e: any) => {
    if (e.key === " " && text.length === currentTyping.word.length) {
      setCurrentTyping(typingwordsRandom[ref.current]);
      setCursorPosition(0);
      setText("");
      if (typingwordsRandom[ref.current + 1] !== undefined) {
        ref.current = ref.current + 1;
      } else {
        ref.current = 1;
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
    if (text.length < currentTyping.word.length && e.key !== " ") {
      e.key !== "Backspace" &&
        setCursorPosition(cursorPosition + textWidthIncrease + 1.5);
    }
    if (e.key === "Backspace" && text.length > 0)
      setCursorPosition(cursorPosition - textWidthDecrease - 1.5);
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 ">
      <label
        htmlFor="typingCursor"
        className="relative flex items-center text-4xl text-[#526777] cursor-pointer"
      >
        {currentTyping.word.split("").map((item: string, index: number) => (
          <div
            key={index}
            className={`${
              currentTyping.word[index] === text.split("")[index]
                ? "text-white"
                : text.split("")[index] !== undefined
                ? "text-[#E9595A]"
                : ""
            }`}
          >
            {item}
          </div>
        ))}
        <input
          value={text}
          className="absolute top-0 bottom-0 w-[2px] rounded h-full bg-[#43FFAF] text-transparent opacity-0 focus:opacity-100 focus:animate-hideShow transition-all"
          id="typingCursor"
          onChange={handleChangeInput}
          style={{ left: cursorPosition }}
          onKeyDown={handleOnKeyDown}
        />
      </label>
      <span className="text-2xl">{currentTyping.meaning}</span>
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
