"use client";
import TypingRestart from "@/components/typing/TypingRestart";
import { useEffect, useState } from "react";
import { TypingOnlyAWord } from "./TypingOnlyAWord";
import { TypingManyWords } from "./TypingManyWords";
import { useTyping } from "@/contexts/TypingStates";
import { useCountDown } from "@/hooks/useCountDown";
import { typingCaculateResultWithWordTime } from "@/utils/typingFs";

export const TypingContent = () => {
  const {
    typingStyles,
    wordAmount,
    countNextWord,
    setHideOverlay,
    setShowResults,
  } = useTyping();
  const { seconds, setIsRunning } = useCountDown();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return null; // or a skeleton/placeholder
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 overflow-hidden">
      {typingStyles !== "combine" && (
        <div className="flex items-end justify-between h-[20vh] bg-opacity-5 backdrop-blur-sm w-full z-10 p-2 rounded">
          <p className="text-xl text-typingColorActive bg-typingBgControlMenu transition-all rounded py-1 px-2">{`${countNextWord}/${wordAmount}`}</p>
          <div className="flex gap-1">
            {document.getElementsByClassName("correct").length} |
            {document.getElementsByClassName("wrong").length} | {seconds}
            <div onClick={() => setIsRunning((pre) => !pre)}>Run</div>
          </div>
        </div>
      )}
      {typingStyles === "time" && <p>This feature is under development</p>}
      {typingStyles === "combine" && <TypingOnlyAWord />}
      {typingStyles === "words" && <TypingManyWords />}
      <TypingRestart
        onRestart={() => {
          setHydrated(false);
          setShowResults(false);
          setTimeout(() => {
            setHydrated(true);
          }, 0);
          setHideOverlay(true);
        }}
      ></TypingRestart>
    </div>
  );
};
