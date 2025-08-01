"use client";
import { PageBoardSidebarType } from "@/components/layout/board/board.sidebar";
import { useContext, useState, createContext } from "react";

type LayoutStatesType = {
  showMenuboard: boolean;
  showHomeSidebar: boolean;
  pageBoardSidebar: PageBoardSidebarType;
  resetAllInputRequired: boolean;
  showTypingSetting: boolean;
  setShowTypingSetting: (val: boolean) => void;
  setResetAllInputRequired: (val: boolean) => void;
  handleShowMenuboard: () => void;
  handleShowHomeSidebar: () => void;
  setPageBoardSidebar: (page: PageBoardSidebarType) => void;
};

const layoutStatesDefaultValues: LayoutStatesType = {
  showMenuboard: false,
  showHomeSidebar: true,
  pageBoardSidebar: "menu",
  resetAllInputRequired: false,
  showTypingSetting: false,
  setShowTypingSetting: () => {},
  setResetAllInputRequired: () => {},
  handleShowMenuboard: () => {},
  handleShowHomeSidebar: () => {},
  setPageBoardSidebar: () => {},
};

const LayoutStates = createContext(layoutStatesDefaultValues);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [showMenuboard, setShowMenuboard] = useState(false);
  const [showHomeSidebar, setShowHomeSidebar] = useState(true);
  const [showTypingSetting, setShowTypingSetting] = useState(false);
  const [resetAllInputRequired, setResetAllInputRequired] = useState(false);
  const [pageBoardSidebar, setPageBoardSidebar] =
    useState<PageBoardSidebarType>("menu");
  const handleShowMenuboard = () => {
    setShowMenuboard(!showMenuboard);
    setPageBoardSidebar("menu");
  };
  const handleShowHomeSidebar = () => {
    setShowHomeSidebar(!showHomeSidebar);
  };
  return (
    <LayoutStates.Provider
      value={{
        showMenuboard,
        showHomeSidebar,
        resetAllInputRequired,
        showTypingSetting,
        setShowTypingSetting,
        setResetAllInputRequired,
        handleShowHomeSidebar,
        handleShowMenuboard,
        pageBoardSidebar,
        setPageBoardSidebar,
      }}
    >
      {children}
    </LayoutStates.Provider>
  );
};
export const useLayoutStates = () => useContext(LayoutStates);
