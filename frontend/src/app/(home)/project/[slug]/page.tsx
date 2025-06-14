"use client";
import BoardMenu from "@/components/layout/board/board.menu";
import BoardSidebar from "@/components/layout/board/board.sidebar";
import { useEffect } from "react";
import { projectList } from "@/api/board/mock.data";
import { cutIdFromSlug, replaceAllTrim } from "@/utils/otherFs";
import { useCreateBoardStates } from "@/contexts/createBoardStates";
import BoardContainList from "./modules/board.contain.list";
import { useFetchSingleBoard } from "./func/fetchSingBoard";

export default function Page({ params }: any) {
  // const { boards, setSingleBoard } = useCreateBoardStates();
  // const newBoard = boards.find(
  //   (item) => item.id === Number(cutIdFromSlug(params.slug, "-id"))
  // );
  // const exampleBoard = projectList.find(
  //   (item) => replaceAllTrim(item.title) === params.slug
  // );
  // useEffect(() => {
  //   if (newBoard) {
  //     setSingleBoard(newBoard);
  //   } else {
  //     exampleBoard && setSingleBoard(exampleBoard);
  //   }
  // }, [newBoard, exampleBoard, setSingleBoard]);
  useFetchSingleBoard(params);
  return (
    <div className="flex w-full overflow-hidden">
      <LocalBody></LocalBody>
      <BoardSidebar />
    </div>
  );
}

function LocalBody() {
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
}
