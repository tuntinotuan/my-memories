"use client";
import { Board } from "@/components/popup/PopupCreateboard";
import { useContext, useState, createContext, useEffect } from "react";

type CreateBoardStatesType = {
  boards: Board[];
  singleBoard: Board;
  boardName: boolean;
  loadingFetchBoards: boolean;
  showCreateboard: boolean;
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
  const [singleBoard, setSingleBoard] = useState<Board>({
    id: 1,
    title: "2",
    img: { type: "imageUrl", url: "", alt: "" },
  });
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
        showCreateboard,
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
