"use client";
import { useContext, useState, createContext } from "react";

type LayoutStatesType = {
  showMenuboard: boolean;
  showHomeSidebar: boolean;
  handleShowMenuboard: () => void;
  handleShowHomeSidebar: () => void;
};

const layoutStatesDefaultValues: LayoutStatesType = {
  showMenuboard: false,
  showHomeSidebar: true,
  handleShowMenuboard: () => {},
  handleShowHomeSidebar: () => {},
};

const LayoutStates = createContext(layoutStatesDefaultValues);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [showMenuboard, setShowMenuboard] = useState(true);
  const [showHomeSidebar, setShowHomeSidebar] = useState(true);
  const handleShowMenuboard = () => {
    setShowMenuboard(!showMenuboard);
  };
  const handleShowHomeSidebar = () => {
    setShowHomeSidebar(!showHomeSidebar);
  };
  return (
    <LayoutStates.Provider
      value={{
        showMenuboard,
        showHomeSidebar,
        handleShowHomeSidebar,
        handleShowMenuboard,
      }}
    >
      {children}
    </LayoutStates.Provider>
  );
};
export const useLayoutStates = () => useContext(LayoutStates);
