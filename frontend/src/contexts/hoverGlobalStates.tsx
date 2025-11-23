"use client";
import { createContext, useContext, useState } from "react";

const defaultValues = {
  activeNormal: false,
  activeComeBack: false,
  title: "",
  activeSaved: false,
  typingEmptyListHover: false,
  setTypingEmptyListHover: (val: boolean) => {},
  setActiveSaved: (val: boolean) => {},
  setActiveNormal: (val: boolean) => {},
  setActiveComeBack: (val: boolean) => {},
  setTitle: (val: string) => {},
};

const HoverGlobalContext = createContext(defaultValues);

export const HoverGlobalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeNormal, setActiveNormal] = useState(false);
  const [activeComeBack, setActiveComeBack] = useState(false);
  const [activeSaved, setActiveSaved] = useState(false);
  const [title, setTitle] = useState("Task is deleted");

  const [typingEmptyListHover, setTypingEmptyListHover] = useState(false);

  return (
    <HoverGlobalContext.Provider
      value={{
        activeNormal,
        activeComeBack,
        activeSaved,
        typingEmptyListHover,
        setTypingEmptyListHover,
        setActiveSaved,
        setActiveNormal,
        setActiveComeBack,
        title,
        setTitle,
      }}
    >
      {children}
    </HoverGlobalContext.Provider>
  );
};

export const useHoverGlobal = () => useContext(HoverGlobalContext);
