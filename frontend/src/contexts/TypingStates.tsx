"use client";
import { createContext, useContext, useState } from "react";

export type typingStylesType = "time" | "combine" | "words";

type defaltValuesType = {
  typingStyles: typingStylesType;
  setTypingStyles: (val: typingStylesType) => void;
};

const defaultValues: defaltValuesType = {
  typingStyles: "combine",
  setTypingStyles: () => {},
};

const TypingContext = createContext(defaultValues);

export const TypingProvider = ({ children }: { children: React.ReactNode }) => {
  const [typingStyles, setTypingStyles] = useState<typingStylesType>("combine");
  return (
    <TypingContext.Provider value={{ typingStyles, setTypingStyles }}>
      {children}
    </TypingContext.Provider>
  );
};

export const useTyping = () => useContext(TypingContext);
