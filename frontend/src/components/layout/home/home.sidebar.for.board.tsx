"use client";
import React, { useState } from "react";
import HomeSidebar from "./home.sidebar";
import { useCreateBoardStates } from "@/contexts/createBoardStates";
import ButtonCreate from "@/components/button/ButtonCreate";
import PlusIcon from "@/components/icons/PlusIcon";
import CrownIcon from "@/components/icons/CrownIcon";
import HomeSidebarTop from "./home.sidebar.top";
import HomeSidebarExampleDesign from "./components/HomeSidebarExampleDesign";
import HomeSidebarRecentDesign from "./components/HomeSidebarRecentDesign";
import HomeSidebarLoadingSkeleton from "./components/HomeSidebarLoadingSkeleton";
import { PopupDotsSetting } from "@/components/popup/setting/PopupDotsSetting";
import OpenInANewTabIcon from "@/components/icons/OpenInANewTabIcon";
import { useTyping } from "@/contexts/TypingStates";
import DeleteIcon from "@/components/icons/DeleteIcon";
import { Id } from "@/app/(home)/project/[slug]/modules/types";
import SettingRootPage from "@/components/popup/setting/pages/SettingRootPage";

const HomeSidebarForBoard = () => {
  const {
    showSetting,
    setShowSetting,
    pickedSetting,
    handleOpenAndClosePopupCreateboard,
  } = useCreateBoardStates();

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
      <PopupDotsSetting
        show={showSetting}
        onClose={() => setShowSetting(false)}
        rect={pickedSetting.rect}
      >
        <BodySetting onClose={() => setShowSetting(false)} />
      </PopupDotsSetting>
    </HomeSidebar>
  );
};

const BodySetting = ({ onClose }: any) => {
  const { pickedSetting, boards, setBoards, setPickedSetting } =
    useCreateBoardStates();
  const listItem = [
    {
      icon: <OpenInANewTabIcon size="medium"></OpenInANewTabIcon>,
      title: "Open in a new tab",
      href: pickedSetting.href,
    },
    {
      icon: <DeleteIcon></DeleteIcon>,
      title: "Delete",
      onClick: () => {
        handleDeleteBoard(pickedSetting.id);
        onClose();
      },
    },
  ];
  const handleDeleteBoard = (id: Id) => {
    const newWordList = boards.filter((item: any) => item.id !== id);
    setBoards(newWordList);
  };
  const handleUpdateBoardName = (id: Id, title: string) => {
    const newBoards = boards.map((item: any) => {
      if (item.id !== id) return item;
      return { ...item, title };
    });
    setPickedSetting({ ...pickedSetting, title });
    setBoards(newBoards);
  };
  return (
    <>
      <SettingRootPage
        listControls={listItem}
        title={pickedSetting.title}
        id={pickedSetting.id}
        handleUpdateTitle={handleUpdateBoardName}
      ></SettingRootPage>
    </>
  );
};

export default HomeSidebarForBoard;
