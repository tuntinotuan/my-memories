"use client";
import { Board } from "@/components/popup/PopupCreateboard";
import { useContext, useState, createContext } from "react";

type CreateBoardStatesType = {
  boards: Board[];
  singleBoard: Board;
  boardName: boolean;
  showCreateboard: boolean;
  handleOpenAndClosePopupCreateboard: () => void;
  handleSetBoardName: (value: boolean) => void;
  setBoards: (value: Board[]) => void;
  setSingleBoard: (value: Board) => void;
};

const createBoardStatesDefaultValues: CreateBoardStatesType = {
  boards: [],
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
  return (
    <CreateBoardStates.Provider
      value={{
        boardName,
        boards,
        singleBoard,
        setSingleBoard,
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
