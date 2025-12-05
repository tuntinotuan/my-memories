"use client";
import React from "react";
import BoardContainList from "./board.contain.list";
import { useCreateBoardStates } from "@/contexts/createBoardStates";
import BoardSidebar from "@/components/layout/board/board.sidebar";
import { useFetchSingleBoard } from "../func/fetchSingBoard";
import BoardMenu from "@/components/layout/board/board.menu";

const BoardMainPage = ({ params }: any) => {
  useFetchSingleBoard(params);
  return (
    <div className="flex w-full h-full overflow-auto">
      <LocalBody></LocalBody>
      <BoardSidebar />
    </div>
  );
};
const LocalBody = () => {
  const { singleBoard } = useCreateBoardStates();
  return (
    <div
      className={`overflow-hidden w-full h-full text-white bg-no-repeat bg-cover bg-center`}
      style={
        singleBoard.img.type === "imageUrl"
          ? { backgroundImage: `url(${singleBoard.img.url})` }
          : singleBoard.img.type === "linearGradient"
          ? {
              backgroundImage: `linear-gradient(to bottom right, ${singleBoard.img.from}, ${singleBoard.img.to})`,
            }
          : { background: singleBoard.img.code }
      }
    >
      <BoardMenu />
      <BoardContainList />
    </div>
  );
};
export default BoardMainPage;
