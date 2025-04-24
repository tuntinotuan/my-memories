"use client";
import { createContext, useContext, useEffect, useState } from "react";

const defaultValues = { theme: "", setTheme: (val: string) => {} };

const TypingThemeContext = createContext(defaultValues);

export const TypingThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState("theme-green");

  useEffect(() => {
    document.body.className = `${theme} fixed inset-0 text-primaryBlack`;
    // document.body.classList.add(theme);
    // return () => {
    //   document.body.classList.remove(theme);
    // };
  }, [theme]);
  return (
    <TypingThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </TypingThemeContext.Provider>
  );
};

export const useTypingTheme = () => useContext(TypingThemeContext);
