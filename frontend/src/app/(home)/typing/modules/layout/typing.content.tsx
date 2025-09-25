"use client";
import TypingRestart from "@/app/(home)/typing/modules/components/TypingRestart";
import { TypingOnlyAWord } from "./typing.only.a.word";
import { TypingManyWords } from "./typing.many.words";
import { useTyping } from "@/contexts/TypingStates";
import { typingWordsTypes } from "@/api/typing/typing.type";
import TypingViewAmountOrTime from "../components/TypingViewAmountOrTime";
import { useHydrate } from "../../func/useHydrate";
import { TypingManyWordsV2 } from "./typing.many.words.v2";
import { TypingOnlyAWordV2 } from "./typing.only.a.word.v2";
import TypingPageSkeleton from "@/components/skeleton/TypingPageSkeleton";

export const TypingContent = ({ data }: { data: typingWordsTypes[] }) => {
  const {
    setHideOverlay,
    setShowResults,
    resetRunningManyWords,
    setSecondsOfManyWords,
    setIsCountDown,
    resetCountDownIsInitial,
    typingSettingLocal,
  } = useTyping();
  const { hydrated, setHydrated } = useHydrate();
  if (!hydrated) return <TypingPageSkeleton />; // or a skeleton/placeholder
  return (
    <div
      className={`w-full h-full flex flex-col items-center gap-4 overflow-hidden ${
        typingSettingLocal?.typingStyles === "combine"
          ? "justify-center"
          : "justify-start"
      }`}
    >
      <TypingViewAmountOrTime />
      {typingSettingLocal?.typingStyles === "time" && (
        <TypingManyWordsV2 types="time" data={data} />
      )}
      {typingSettingLocal?.typingStyles === "combine" && (
        <TypingOnlyAWordV2 data={data} />
      )}
      {typingSettingLocal?.typingStyles === "words" && (
        <TypingManyWordsV2 types="words" data={data} />
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
