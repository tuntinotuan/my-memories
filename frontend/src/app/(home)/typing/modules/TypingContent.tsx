"use client";
import TypingRestart from "@/components/typing/TypingRestart";
import { useEffect, useState } from "react";
import { TypingOnlyAWord } from "./TypingOnlyAWord";
import { TypingManyWords } from "./TypingManyWords";
import { useTyping } from "@/contexts/TypingStates";
import { useTypingTheme } from "@/contexts/typingThemeStates";
import PopupTypingTheme from "@/components/popup/PopupTypingTheme";

export const TypingContent = () => {
  const { typingStyles, wordAmount, countNextWord } = useTyping();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null; // or a skeleton/placeholder
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 overflow-hidden">
      <PopupTypingTheme></PopupTypingTheme>
      {typingStyles !== "combine" && (
        <div className="flex items-end justify-between h-[20vh] bg-opacity-5 backdrop-blur-sm w-full z-10 p-2 rounded">
          <p className="text-xl text-typingColorActive bg-typingBgControlMenu transition-all rounded py-1 px-2">{`${countNextWord}/${wordAmount}`}</p>
          <div className="flex gap-1"></div>
        </div>
      )}
      {typingStyles === "time" && <p>This feature is under development</p>}
      {typingStyles === "combine" && <TypingOnlyAWord />}
      {typingStyles === "words" && <TypingManyWords />}
      <TypingRestart onRestart={() => {}}></TypingRestart>
    </div>
  );
};
