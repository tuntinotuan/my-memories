"use client";
import SettingIcon from "@/components/icons/SettingIcon";
import { Tooltip } from "@nextui-org/tooltip";
import { useRef, useState } from "react";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import TextFormatIcon from "@mui/icons-material/TextFormat";
import { typingwords } from "@/api/typing/typing.data.structure";
import { shuffleArray } from "@/api/card/utils/f";

export default function TypingPage() {
  return (
    <div className="flex flex-col w-full gap-2 px-4 pt-2 bg-[#262A33] text-white">
      <TypingHeaderMenu></TypingHeaderMenu>
      <TypingContent></TypingContent>
    </div>
  );
}

const TypingHeaderMenu = () => {
  return (
    <div className="flex items-center gap-3 !w-auto mx-auto bg-[#1F232C] text-[#526777] rounded-lg px-5 py-3">
      <Tooltip
        showArrow
        content="Practice with your typing skill and remember your keyword"
        placement="bottom"
        radius="sm"
        delay={200}
        closeDelay={200}
        className="!px-2 !py-[2px]"
        shadow="sm"
      >
        <h1 className="cursor-default">Typing</h1>
      </Tooltip>

      <div className="w-[6px] h-full bg-[#262A33] rounded-full"></div>
      <div className="flex items-center gap-1 hover:text-white transition-all cursor-pointer">
        <AccessTimeFilledRoundedIcon fontSize="inherit" />
        time
      </div>
      <div className="flex items-center gap-1 hover:text-white transition-all cursor-pointer">
        <TextFormatIcon fontSize="inherit" />
        words
      </div>
      <div className="w-[6px] h-full bg-[#262A33] rounded-full"></div>
      <p className="text-[#43FFAF] hover:text-white transition-all cursor-pointer">
        1
      </p>
      <p className="hover:text-white transition-all cursor-pointer">10</p>
      <p className="hover:text-white transition-all cursor-pointer">25</p>
      <p className="hover:text-white transition-all cursor-pointer">50</p>
      <p className="hover:text-white transition-all cursor-pointer">100</p>
      <div className="w-[6px] h-full bg-[#262A33] rounded-full"></div>
      <SettingIcon></SettingIcon>
    </div>
  );
};

const TypingContent = () => {
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
    setText(e.target.value);
  };
  const handleOnKeyDown = (e: any) => {
    if (e.key === " ") {
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
    </div>
  );
};
