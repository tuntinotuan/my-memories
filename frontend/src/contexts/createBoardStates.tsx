"use client";
import { useContext, useState, createContext } from "react";

type CreateBoardStatesType = {
  boardName: boolean;
  handleSetBoardName: (value: boolean) => void;
};

const createBoardStatesDefaultValues: CreateBoardStatesType = {
  boardName: false,
  handleSetBoardName: () => {},
};

const CreateBoardStates = createContext(createBoardStatesDefaultValues);

export const CreateBoardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [boardName, setBoardName] = useState(false);
  const handleSetBoardName = (value: boolean) => {
    console.log("click handleSetBoardName");
    setBoardName(value);
  };
  return (
    <CreateBoardStates.Provider value={{ boardName, handleSetBoardName }}>
      {children}
    </CreateBoardStates.Provider>
  );
};
export const useCreateBoardStates = () => useContext(CreateBoardStates);
