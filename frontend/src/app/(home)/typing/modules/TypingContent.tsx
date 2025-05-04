"use client";
import TypingRestart from "@/components/typing/TypingRestart";
import { useEffect, useState } from "react";
import { TypingOnlyAWord } from "./TypingOnlyAWord";
import { TypingManyWords } from "./TypingManyWords";
import { useTyping } from "@/contexts/TypingStates";
import PopupHover from "@/components/popup/PopupHover";
import MyTooltip from "@/components/tooltip/MyTooltip";

export const TypingContent = () => {
  const {
    typingStyles,
    wordAmount,
    countNextWord,
    setHideOverlay,
    setShowResults,
    secondsOfManyWords,
    resetRunningManyWords,
    setSecondsOfManyWords,
    secondsOfTimeWords,
    setIsCountDown,
    resetCountDownIsInitial,
  } = useTyping();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return null; // or a skeleton/placeholder
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 overflow-hidden">
      {typingStyles !== "combine" && (
        <div className="flex items-end justify-between h-[20vh] bg-opacity-5 backdrop-blur-sm w-full z-10 p-2 rounded">
          <p className="text-xl text-typingColorActive bg-typingBgControlMenu transition-all rounded py-1 px-2">
            {typingStyles === "words"
              ? `${countNextWord}/${wordAmount}`
              : secondsOfTimeWords}
          </p>
        </div>
      )}
      {typingStyles === "time" && <TypingManyWords types="time" />}
      {typingStyles === "combine" && <TypingOnlyAWord />}
      {typingStyles === "words" && <TypingManyWords types="words" />}
      <TypingRestart
        onRestart={() => {
          setHydrated(false);
          setShowResults(false);
          setTimeout(() => {
            setHydrated(true);
          }, 0);
          setHideOverlay(true);
          resetRunningManyWords();
          setSecondsOfManyWords(false);
          resetCountDownIsInitial();
          setIsCountDown(false);
        }}
      ></TypingRestart>
      {/* <PopupHover>
        <p>8.88 wpm</p>
      </PopupHover> */}
      {/* <PopupHover>
        <p>15.52%</p>
        <p>9 correct</p>
        <p>49 incorrect</p>
      </PopupHover> */}
      <MyTooltip>my hover</MyTooltip>
    </div>
  );
};
