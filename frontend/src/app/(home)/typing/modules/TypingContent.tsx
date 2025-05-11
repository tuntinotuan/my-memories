"use client";
import TypingRestart from "@/components/typing/TypingRestart";
import { useEffect, useState } from "react";
import { TypingOnlyAWord } from "./TypingOnlyAWord";
import { TypingManyWords } from "./TypingManyWords";
import { useTyping } from "@/contexts/TypingStates";
import { typingWordsTypes } from "@/api/typing/typing.type";

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
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return null; // or a skeleton/placeholder
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 overflow-hidden">
      <ViewAmountOrTime />
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

const ViewAmountOrTime = () => {
  const { typingStyles, wordAmount, countNextWord, secondsOfTimeWords } =
    useTyping();
  return (
    <>
      {typingStyles !== "combine" && (
        <div className="flex items-end justify-between h-[20vh] bg-opacity-5 backdrop-blur-sm w-full z-10 p-2 rounded">
          <p className="text-xl text-typingColorActive bg-typingBgControlMenu transition-all rounded py-1 px-2">
            {typingStyles === "words"
              ? `${countNextWord}/${wordAmount}`
              : secondsOfTimeWords}
          </p>
        </div>
      )}
    </>
  );
};
