"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useTyping } from "./TypingStates";

const defaultValues = {
  theme: "",
  setTheme: (val: string) => {},
  singleTheme: "",
  setSingleTheme: (val: string) => {},
  themPopup: false,
  setThemePopup: (val: boolean) => {},
};

const TypingThemeContext = createContext(defaultValues);

export const TypingThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<string>("");
  const [singleTheme, setSingleTheme] = useState<string>("");
  const [themPopup, setThemePopup] = useState(false);

  useEffect(() => {
    const keyTheme = localStorage.getItem("typing-theme");
    console.log("keyTheme", keyTheme);
    keyTheme ? setTheme(keyTheme) : setTheme("theme-deep");
  }, []);
  useEffect(() => {
    theme && localStorage.setItem("typing-theme", theme);
    document.body.className = `${
      singleTheme || theme
    } fixed inset-0 text-primaryBlack`;
  }, [theme, singleTheme]);
  return (
    <TypingThemeContext.Provider
      value={{
        theme,
        setTheme,
        themPopup,
        setThemePopup,
        singleTheme,
        setSingleTheme,
      }}
    >
      {children}
    </TypingThemeContext.Provider>
  );
};

export const useTypingTheme = () => useContext(TypingThemeContext);
