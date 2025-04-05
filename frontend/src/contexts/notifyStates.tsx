"use client";

import { createContext, useContext, useState } from "react";

const defaultValues = {
  active: false,
  title: "",
  setActive: (val: boolean) => {},
  setTitle: (val: string) => {},
};

const NotifyContext = createContext(defaultValues);

export const NotifyProvider = ({ children }: { children: React.ReactNode }) => {
  const [active, setActive] = useState(false);
  const [title, setTitle] = useState("");
  return (
    <NotifyContext.Provider value={{ active, setActive, title, setTitle }}>
      {children}
    </NotifyContext.Provider>
  );
};

export const useNotify = () => useContext(NotifyContext);
