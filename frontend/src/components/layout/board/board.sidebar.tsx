"use client"; // Required for Client Components
import CloseIcon from "@/components/icons/CloseIcon";
import React from "react";
import { useLayoutStates } from "@/contexts/layoutStates";
import ArrowLeftIcon from "@/components/icons/arrow/ArrowLeftIcon";
import BoardMenu from "@/components/board/BoardMenu";
import BoardColor from "@/components/board/BoardColor";
import BoardChangeBackground from "@/components/board/BoardChangeBackground";
import BoardPhotoFromUnsplash from "@/components/board/BoardPhotoFromUnsplash";

export type PageBoardSidebarType = "menu" | "background" | "unsplash" | "color";

type PageProps = {
  page: PageBoardSidebarType;
};
const BoardSidebar = () => {
  const { showMenuboard, handleShowMenuboard } = useLayoutStates();
  const { pageBoardSidebar } = useLayoutStates();
  return (
    <div
      className={`relative shadow-md text-sm transition-all shrink-0 overflow-hidden pb-10 ${
        showMenuboard
          ? "h-full w-[300px] border border-gray-200 dark:border-darkMode0A opacity-100 px-2 py-3 "
          : "w-0 h-0 overflow-hidden translate-x-[300px]"
      }`}
    >
      <BoardTopControl handleShowMenuboard={handleShowMenuboard} />
      <Body page={pageBoardSidebar} />
    </div>
  );
};

const BoardTopControl = ({ handleShowMenuboard }: any) => {
  const { pageBoardSidebar, setPageBoardSidebar } = useLayoutStates();
  let newTopTitle = "";
  let newBack: PageBoardSidebarType = "menu";
  switch (pageBoardSidebar) {
    case "menu":
      newTopTitle = "Menu";
      break;
    case "background":
      newTopTitle = "Change background";
      break;
    case "unsplash":
      newTopTitle = "Photos from Unsplash";
      break;
    case "color":
      newTopTitle = "Colors";
      break;
    default:
      break;
  }
  switch (pageBoardSidebar) {
    case "background":
      newBack = "menu";
      break;
    case "color":
    case "unsplash":
      newBack = "background";
      break;

    default:
      break;
  }
  return (
    <div className="flex items-center justify-center pb-3">
      <ArrowLeftIcon
        className={`absolute transition-all ${
          pageBoardSidebar !== "menu" ? "left-2" : "-left-5"
        } `}
        onClick={() => setPageBoardSidebar(newBack)}
      ></ArrowLeftIcon>
      <p className="font-bold">{newTopTitle}</p>
      <CloseIcon
        className="absolute right-2"
        onClick={handleShowMenuboard}
      ></CloseIcon>
    </div>
  );
};
const Body = ({ page }: PageProps) => {
  return (
    <div className="h-full overflow-auto border border-transparent border-y-gray-200 dark:border-y-darkMode0A pb-2">
      {page === "menu" && <BoardMenu />}
      {page === "background" && <BoardChangeBackground />}
      {page === "unsplash" && <BoardPhotoFromUnsplash />}
      {page === "color" && <BoardColor />}
    </div>
  );
};

export default BoardSidebar;
