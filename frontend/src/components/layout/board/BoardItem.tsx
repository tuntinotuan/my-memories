import { useLayoutStates } from "@/contexts/layoutStates";
import React from "react";
import { BoardSidebarProps } from "./type";

const BoardItem = ({ icon, title, disable }: BoardSidebarProps) => {
  const { setPageBoardSidebar } = useLayoutStates();
  return (
    <div
      className={`flex items-center gap-2 p-2 rounded-lg hover:bg-primaryHover dark:hover:bg-darkMode0A transition-all cursor-pointer ${
        disable ? "cursor-wait" : ""
      }`}
      onClick={!disable ? () => setPageBoardSidebar("background") : () => {}}
    >
      {icon}
      <p>{title}</p>
    </div>
  );
};

export default BoardItem;
