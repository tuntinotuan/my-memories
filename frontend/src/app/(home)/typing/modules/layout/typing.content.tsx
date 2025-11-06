"use client";
import TypingRestart from "@/app/(home)/typing/modules/components/TypingRestart";
import { useTyping } from "@/contexts/TypingStates";
import { typingWordsTypes } from "@/api/typing/typing.type";
import TypingViewAmountOrTime from "../components/TypingViewAmountOrTime";
import { useHydrate } from "../../func/useHydrate";
import { TypingManyWordsV2 } from "./typing.many.words.v2";
import { TypingOnlyAWordV2 } from "./typing.only.a.word.v2";

export const TypingContent = ({
  data,
  show = true,
}: {
  data: typingWordsTypes[];
  show?: boolean;
}) => {
  const {
    setHideOverlay,
    setShowResults,
    resetRunningManyWords,
    setSecondsOfManyWords,
    setIsCountDown,
    resetCountDownIsInitial,
    typingSettingLocal,
    setCursorIsTyping,
    resetTyping,
    setResetTyping,
  } = useTyping();
  // const { hydrated, setHydrated } = useHydrate();
  if (!resetTyping) return null; // or a skeleton/placeholder
  //  ${show ? "visible backdrop-blur-sm" : "invisible"}
  return (
    <div
      className={`w-full h-full flex flex-col items-center gap-4 overflow-hidden ${
        typingSettingLocal?.typingStyles === "combine"
          ? "justify-center"
          : "justify-start"
      } ${show ? "visible opacity-100" : "opacity-0 invisible fixed"}`}
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
          setResetTyping(false);
          setTimeout(() => {
            setResetTyping(true);
          }, 0);
          setShowResults(false);
          setHideOverlay(true);
          resetRunningManyWords();
          setSecondsOfManyWords(false);
          resetCountDownIsInitial();
          setIsCountDown(false);
          setCursorIsTyping(false);
        }}
      ></TypingRestart>
    </div>
  );
};
