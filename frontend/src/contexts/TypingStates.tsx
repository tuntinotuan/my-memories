"use client";
import { WordAmountType } from "@/app/(home)/typing/modules/types";
import { useCountDown } from "@/hooks/useCountDown";
import { createContext, useContext, useState } from "react";

export type typingStylesType = "time" | "combine" | "words";

type defaltValuesType = {
  typingStyles: typingStylesType;
  wordAmount: WordAmountType;
  countNextWord: number;
  hideOverlay: boolean;
  secondsOfManyWords: number;
  setSecondsOfManyWords: (val: boolean) => void;
  resetRunningManyWords: () => void;
  showResults: boolean;
  setShowResults: (val: boolean) => void;
  setHideOverlay: (val: boolean) => void;
  setCountNextWord: (val: number) => void;
  setWordAmount: (val: WordAmountType) => void;
  setTypingStyles: (val: typingStylesType) => void;
};

const defaultValues: defaltValuesType = {
  typingStyles: "words",
  wordAmount: 10,
  countNextWord: 0,
  hideOverlay: true,
  showResults: false,
  setHideOverlay: () => {},
  secondsOfManyWords: 0,
  setSecondsOfManyWords: () => {},
  resetRunningManyWords: () => {},
  setShowResults: () => {},
  setCountNextWord: () => {},
  setWordAmount: () => {},
  setTypingStyles: () => {},
};

const TypingContext = createContext(defaultValues);

export const TypingProvider = ({ children }: { children: React.ReactNode }) => {
  const [typingStyles, setTypingStyles] = useState<typingStylesType>("words");
  const [wordAmount, setWordAmount] = useState<WordAmountType>(10);
  const [countNextWord, setCountNextWord] = useState(0);
  const [hideOverlay, setHideOverlay] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const {
    seconds: secondsOfManyWords,
    setIsRunning: setSecondsOfManyWords,
    resetRunning: resetRunningManyWords,
  } = useCountDown();

  return (
    <TypingContext.Provider
      value={{
        wordAmount,
        secondsOfManyWords,
        setSecondsOfManyWords,
        resetRunningManyWords,
        setWordAmount,
        countNextWord,
        setCountNextWord,
        showResults,
        setShowResults,
        typingStyles,
        setTypingStyles,
        hideOverlay,
        setHideOverlay,
      }}
    >
      {children}
    </TypingContext.Provider>
  );
};

export const useTyping = () => useContext(TypingContext);
