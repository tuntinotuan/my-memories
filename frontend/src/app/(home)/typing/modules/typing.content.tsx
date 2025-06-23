"use client";
import TypingRestart from "@/components/typing/TypingRestart";
import { useEffect, useState } from "react";
import { TypingOnlyAWord } from "./typing.only.a.word";
import { TypingManyWords } from "./typing.many.words";
import { useTyping } from "@/contexts/TypingStates";
import { typingWordsTypes } from "@/api/typing/typing.type";
import TypingViewAmountOrTime from "./components/TypingViewAmountOrTime";
import { useHydrate } from "../func/useHydrate";

export const TypingContent = ({ data }: { data: typingWordsTypes[] }) => {
  const {
    typingStyles,
    setHideOverlay,
    setShowResults,
    resetRunningManyWords,
    setSecondsOfManyWords,
    setIsCountDown,
    resetCountDownIsInitial,
  } = useTyping();
  const { hydrated, setHydrated } = useHydrate();
  if (!hydrated) return null; // or a skeleton/placeholder
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 overflow-hidden">
      <TypingViewAmountOrTime />
      {typingStyles === "time" && <TypingManyWords types="time" data={data} />}
      {typingStyles === "combine" && <TypingOnlyAWord data={data} />}
      {typingStyles === "words" && (
        <TypingManyWords types="words" data={data} />
      )}
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
    </div>
  );
};
