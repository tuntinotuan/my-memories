"use client";
import { createContext, useContext, useState } from "react";

const defaultValues = {
  activeNormal: false,
  activeComeBack: false,
  title: "",
  activeSaved: false,
  setActiveSaved: (val: boolean) => {},
  setActiveNormal: (val: boolean) => {},
  setActiveComeBack: (val: boolean) => {},
  setTitle: (val: string) => {},
};

const NotifyContext = createContext(defaultValues);

export const NotifyProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeNormal, setActiveNormal] = useState(false);
  const [activeComeBack, setActiveComeBack] = useState(false);
  const [activeSaved, setActiveSaved] = useState(false);
  const [title, setTitle] = useState("Task is deleted");
  return (
    <NotifyContext.Provider
      value={{
        activeNormal,
        activeComeBack,
        activeSaved,
        setActiveSaved,
        setActiveNormal,
        setActiveComeBack,
        title,
        setTitle,
      }}
    >
      {children}
    </NotifyContext.Provider>
  );
};

export const useNotify = () => useContext(NotifyContext);
