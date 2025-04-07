"use client";
import { createContext, useContext, useState } from "react";

const defaultValues = {
  activeNormal: false,
  activeComeBack: false,
  title: "",
  setActiveNormal: (val: boolean) => {},
  setActiveComeBack: (val: boolean) => {},
  setTitle: (val: string) => {},
};

const NotifyContext = createContext(defaultValues);

export const NotifyProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeNormal, setActiveNormal] = useState(false);
  const [activeComeBack, setActiveComeBack] = useState(false);
  const [title, setTitle] = useState("Task is deleted");
  return (
    <NotifyContext.Provider
      value={{
        activeNormal,
        activeComeBack,
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
