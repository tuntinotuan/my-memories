"use client";
import { shuffleArray } from "@/api/card/utils/f";
import { typingwords } from "@/api/typing/typing.data.structure";
import TypingRestart from "@/components/typing/TypingRestart";
import { getTextWidth } from "@/utils/stringFs";
import { useEffect, useRef, useState } from "react";
import { TypingOnlyAWord } from "./TypingOnlyAWord";
import { TypingManyWords } from "./TypingManyWords";
import { typingWordsTypes } from "@/api/typing/typing.type";
import { useTyping } from "@/contexts/TypingStates";

export const TypingContent = () => {
  const { typingStyles } = useTyping();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null; // or a skeleton/placeholder
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 ">
      {/* <div className="flex items-center justify-between w-full">
        <p className="text-xl text-[#43FFAF]">0 / 17</p>
        <div></div>
      </div> */}
      {typingStyles === "time" && <p>This feature is under development</p>}
      {typingStyles === "combine" && <TypingOnlyAWord></TypingOnlyAWord>}
      {typingStyles === "words" && <TypingManyWords />}
      <TypingRestart onRestart={() => {}}></TypingRestart>
    </div>
  );
};
