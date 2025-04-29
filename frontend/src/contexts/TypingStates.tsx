"use client";
import {
  WordAmountType,
  WordTimeType,
} from "@/app/(home)/typing/modules/types";
import { useCountDown } from "@/hooks/useCountDown";
import { useRunningTime } from "@/hooks/useRunningTime";
import { createContext, useContext, useEffect, useState } from "react";

export type typingStylesType = "time" | "combine" | "words";

type defaltValuesType = {
  typingStyles: typingStylesType;
  wordAmount: WordAmountType;
  wordTime: WordTimeType;
  secondsOfTimeWords: number;
  setIsCountDown: (val: boolean) => void;
  resetCountDownIsInitial: () => void;
  countNextWord: number;
  hideOverlay: boolean;
  secondsOfManyWords: number;
  cursorIsTyping: boolean;
  setSecondsOfManyWords: (val: boolean) => void;
  setCursorIsTyping: (val: boolean) => void;
  resetRunningManyWords: () => void;
  showResults: boolean;
  setShowResults: (val: boolean) => void;
  setHideOverlay: (val: boolean) => void;
  setCountNextWord: (val: number) => void;
  setWordAmount: (val: WordAmountType) => void;
  setWordTime: (val: WordTimeType) => void;
  setTypingStyles: (val: typingStylesType) => void;
};

const defaultValues: defaltValuesType = {
  typingStyles: "words",
  wordAmount: 10,
  wordTime: 15,
  secondsOfTimeWords: 15,
  setIsCountDown: () => {},
  resetCountDownIsInitial: () => {},
  countNextWord: 0,
  hideOverlay: true,
  showResults: false,
  setHideOverlay: () => {},
  secondsOfManyWords: 0,
  cursorIsTyping: false,
  setCursorIsTyping: () => {},
  setSecondsOfManyWords: () => {},
  resetRunningManyWords: () => {},
  setShowResults: () => {},
  setCountNextWord: () => {},
  setWordAmount: () => {},
  setWordTime: () => {},
  setTypingStyles: () => {},
};

const TypingContext = createContext(defaultValues);

export const TypingProvider = ({ children }: { children: React.ReactNode }) => {
  const [typingStyles, setTypingStyles] = useState<typingStylesType>("words");
  const [wordAmount, setWordAmount] = useState<WordAmountType>(10);
  const [wordTime, setWordTime] = useState<WordTimeType>(15);
  const [countNextWord, setCountNextWord] = useState(0);
  const [hideOverlay, setHideOverlay] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [cursorIsTyping, setCursorIsTyping] = useState(false);
  const {
    seconds: secondsOfManyWords,
    setIsRunning: setSecondsOfManyWords,
    resetRunning: resetRunningManyWords,
  } = useRunningTime();
  const {
    seconds: secondsOfTimeWords,
    setIsCountDown,
    resetCountDownIsInitial,
  } = useCountDown(wordTime);
  useEffect(() => {
    setIsCountDown(false);
    resetCountDownIsInitial();
  }, [wordTime]);

  return (
    <TypingContext.Provider
      value={{
        wordTime,
        wordAmount,
        showResults,
        hideOverlay,
        typingStyles,
        countNextWord,
        cursorIsTyping,
        secondsOfManyWords,
        secondsOfTimeWords,
        setIsCountDown,
        resetCountDownIsInitial,
        setWordTime,
        setCursorIsTyping,
        setSecondsOfManyWords,
        resetRunningManyWords,
        setWordAmount,
        setCountNextWord,
        setShowResults,
        setTypingStyles,
        setHideOverlay,
      }}
    >
      {children}
    </TypingContext.Provider>
  );
};

export const useTyping = () => useContext(TypingContext);
