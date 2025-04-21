"use client";
import { WordAmountType } from "@/app/(home)/typing/modules/types";
import { createContext, useContext, useState } from "react";

export type typingStylesType = "time" | "combine" | "words";

type defaltValuesType = {
  typingStyles: typingStylesType;
  wordAmount: WordAmountType;
  countNextWord: number;
  setCountNextWord: (val: number) => void;
  setWordAmount: (val: WordAmountType) => void;
  setTypingStyles: (val: typingStylesType) => void;
};

const defaultValues: defaltValuesType = {
  typingStyles: "words",
  wordAmount: 10,
  countNextWord: 0,
  setCountNextWord: () => {},
  setWordAmount: () => {},
  setTypingStyles: () => {},
};

const TypingContext = createContext(defaultValues);

export const TypingProvider = ({ children }: { children: React.ReactNode }) => {
  const [typingStyles, setTypingStyles] = useState<typingStylesType>("words");
  const [wordAmount, setWordAmount] = useState<WordAmountType>(10);
  const [countNextWord, setCountNextWord] = useState(0);

  return (
    <TypingContext.Provider
      value={{
        wordAmount,
        setWordAmount,
        countNextWord,
        setCountNextWord,
        typingStyles,
        setTypingStyles,
      }}
    >
      {children}
    </TypingContext.Provider>
  );
};

export const useTyping = () => useContext(TypingContext);
