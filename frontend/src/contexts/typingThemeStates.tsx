"use client";
import { createContext, useContext, useEffect, useState } from "react";

const defaultValues = {
  theme: "",
  setTheme: (val: string) => {},
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

  const [themPopup, setThemePopup] = useState(false);
  useEffect(() => {
    const keyTheme = localStorage.getItem("typing-theme");
    console.log("keyTheme", keyTheme);
    keyTheme ? setTheme(keyTheme) : setTheme("theme-deep");
  }, []);
  useEffect(() => {
    theme && localStorage.setItem("typing-theme", theme);
    document.body.className = `${theme} fixed inset-0 text-primaryBlack`;
  }, [theme]);
  return (
    <TypingThemeContext.Provider
      value={{ theme, setTheme, themPopup, setThemePopup }}
    >
      {children}
    </TypingThemeContext.Provider>
  );
};

export const useTypingTheme = () => useContext(TypingThemeContext);
