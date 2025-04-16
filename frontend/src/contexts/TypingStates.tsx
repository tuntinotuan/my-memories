import { createContext, useContext } from "react";

const defaultValues = {};

const TypingContext = createContext(defaultValues);

export const TypingProvider = ({ children }: { children: React.ReactNode }) => {
  return <TypingContext.Provider value={{}}>{children}</TypingContext.Provider>;
};

export const useTyping = () => useContext(TypingContext);
