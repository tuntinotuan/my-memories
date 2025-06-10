"use client";
import { Board } from "@/components/popup/PopupCreateboard";
import { useContext, useState, createContext, useEffect } from "react";
import { settingType } from "./TypingStates";

type CreateBoardStatesType = {
  boards: Board[];
  singleBoard: Board;
  boardName: boolean;
  loadingFetchBoards: boolean;
  showCreateboard: boolean;
  showSetting: boolean;
  pickedSetting: settingType;
  loadingFetchLists: boolean;
  setLoadingFetchLists: (val: boolean) => void;
  setPickedSetting: ({ id, title, rect }: settingType) => void;
  setShowSetting: (value: boolean) => void;
  handleOpenAndClosePopupCreateboard: () => void;
  handleSetBoardName: (value: boolean) => void;
  setBoards: (value: Board[]) => void;
  setSingleBoard: (value: Board) => void;
};

const createBoardStatesDefaultValues: CreateBoardStatesType = {
  boards: [],
  loadingFetchBoards: false,
  singleBoard: {
    id: 1,
    title: "2",
    img: { type: "imageUrl", url: "", alt: "" },
  },
  boardName: false,
  showCreateboard: false,
  showSetting: false,
  loadingFetchLists: false,
  pickedSetting: { id: 0, title: "nothing", theme: "" },
  setLoadingFetchLists: () => {},
  setPickedSetting: () => {},
  setShowSetting: () => {},
  handleOpenAndClosePopupCreateboard: () => {},
  handleSetBoardName: () => {},
  setBoards: () => {},
  setSingleBoard: () => {},
};

const CreateBoardStates = createContext(createBoardStatesDefaultValues);

export const CreateBoardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showCreateboard, setShowCreateboard] = useState(false);
  const [boardName, setBoardName] = useState(false);
  const [boards, setBoards] = useState<Board[]>([]);
  const [loadingFetchBoards, setLoadingFetchBoards] = useState<boolean>(true);
  const [loadingFetchLists, setLoadingFetchLists] = useState<boolean>(true);
  const [singleBoard, setSingleBoard] = useState<Board>({
    id: 1,
    title: "2",
    img: { type: "imageUrl", url: "", alt: "" },
  });
  const [pickedSetting, setPickedSetting] = useState<settingType>({
    id: 0,
    title: "nothing",
    theme: "",
  });
  const [showSetting, setShowSetting] = useState(false);
  const handleSetBoardName = (value: boolean) => {
    setBoardName(value);
  };
  const handleOpenAndClosePopupCreateboard = () => {
    setShowCreateboard(!showCreateboard);
  };

  // get boards from localStorage
  useEffect(() => {
    async function fetchBoardsFromLocalStorage() {
      setLoadingFetchBoards(true);
      let board = null;
      try {
        const stored = localStorage.getItem("boards");
        if (stored) board = await JSON.parse(stored);
      } catch (error) {
        console.error("Invalid JSON:", error);
      }
      if (board !== null && board.length > 0) {
        setBoards(board);
      }
      setLoadingFetchBoards(false);
    }
    fetchBoardsFromLocalStorage();
  }, []);
  // save boards to localStorage after update board
  useEffect(() => {
    if (boards.length <= 0) return;
    localStorage.setItem("boards", JSON.stringify(boards));
  }, [boards]);
  return (
    <CreateBoardStates.Provider
      value={{
        boardName,
        boards,
        singleBoard,
        setSingleBoard,
        loadingFetchBoards,
        loadingFetchLists,
        setLoadingFetchLists,
        showSetting,
        setShowSetting,
        showCreateboard,
        pickedSetting,
        setPickedSetting,
        handleOpenAndClosePopupCreateboard,
        handleSetBoardName,
        setBoards,
      }}
    >
      {children}
    </CreateBoardStates.Provider>
  );
};
export const useCreateBoardStates = () => useContext(CreateBoardStates);
