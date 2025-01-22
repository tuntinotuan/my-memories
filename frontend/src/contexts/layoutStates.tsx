"use client";
import { useContext, useState, createContext } from "react";

type LayoutStatesType = {
  showMenuboard: boolean;
  handleShowMenuboard: () => void;
};

const layoutStatesDefaultValues: LayoutStatesType = {
  showMenuboard: false,
  handleShowMenuboard: () => {},
};

const LayoutStates = createContext(layoutStatesDefaultValues);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [showMenuboard, setShowMenuboard] = useState(false);
  const handleShowMenuboard = () => {
    setShowMenuboard(!showMenuboard);
  };
  return (
    <LayoutStates.Provider value={{ showMenuboard, handleShowMenuboard }}>
      {children}
    </LayoutStates.Provider>
  );
};
export const useLayoutStates = () => useContext(LayoutStates);
