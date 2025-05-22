"use client";
import React from "react";
import HomeSidebar from "./home.sidebar";
import { useCreateBoardStates } from "@/contexts/createBoardStates";
import ButtonCreate from "@/components/button/ButtonCreate";
import PlusIcon from "@/components/icons/PlusIcon";
import CrownIcon from "@/components/icons/CrownIcon";
import HomeSidebarTop from "./home.sidebar.top";
import HomeSidebarExampleDesign from "./components/HomeSidebarExampleDesign";
import HomeSidebarRecentDesign from "./components/HomeSidebarRecentDesign";
import HomeSidebarLoadingSkeleton from "./components/HomeSidebarLoadingSkeleton";

const HomeSidebarForBoard = () => {
  const { handleOpenAndClosePopupCreateboard } = useCreateBoardStates();
  return (
    <HomeSidebar>
      <HomeSidebarTop />
      <ButtonCreate
        className="!w-full my-2"
        styles="primary"
        onClick={handleOpenAndClosePopupCreateboard}
      >
        <PlusIcon />
        Create a project
      </ButtonCreate>
      <ButtonCreate className="!w-full" styles="secondary" disable>
        <CrownIcon />
        Try Pro for 30 days
      </ButtonCreate>
      <div className="overflow-auto max-h-[65vh] px-1 [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-track]:bg-primaryHover [&::-webkit-scrollbar-thumb]:bg-primaryText [&::-webkit-scrollbar-track]:rounded-sm [&::-webkit-scrollbar-thumb]:rounded-sm mt-3">
        <HomeSidebarLoadingSkeleton />
        <HomeSidebarRecentDesign />
        <HomeSidebarExampleDesign />
      </div>
    </HomeSidebar>
  );
};

export default HomeSidebarForBoard;
