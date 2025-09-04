"use client";
import React, { useState } from "react";
import HomeSidebar from "./home.sidebar";
import ButtonCreate from "@/components/button/ButtonCreate";
import PlusIcon from "@/components/icons/PlusIcon";
import CrownIcon from "@/components/icons/CrownIcon";
import { useTyping } from "@/contexts/TypingStates";
import { Id } from "@/app/(home)/project/[slug]/modules/types";
import { PopupDotsSetting } from "@/components/popup/setting/PopupDotsSetting";
import OpenInANewTabIcon from "@/components/icons/OpenInANewTabIcon";
import ThemeItem from "@/components/theme/ThemeItem";
import DeleteIcon from "@/components/icons/DeleteIcon";
import SettingRootPage from "@/components/popup/setting/pages/SettingRootPage";
import { SettingChangeThemePage } from "@/components/popup/setting/pages/SettingChangeThemePage";
import HomeSidebarTop from "./components/HomeSidebarTop";
import HomeSidebarTypingList from "./components/HomeSidebarTypingList";
import SidebarListSkeleton from "@/components/skeleton/SidebarListSkeleton";

const HomeSidebarForTyping = () => {
  const {
    setShowPopupCreate,
    typingListSetting,
    setTypingListSetting,
    currentlyPickedSetting,
    loadingTypingWordList,
  } = useTyping();

  return (
    <HomeSidebar>
      <div className="pt-4 px-4">
        <HomeSidebarTop />
        <ButtonCreate
          className="bg-typingBg !text-typingTextNormal !w-full my-2"
          styles="primary"
          onClick={() => setShowPopupCreate(true)}
        >
          <PlusIcon />
          Create a typing list
        </ButtonCreate>
        <ButtonCreate className="!w-full" styles="secondary" disable>
          <CrownIcon />
          Try Pro for 30 days
        </ButtonCreate>
      </div>
      <div className="overflow-auto max-h-[65vh] px-4 [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-track]:bg-primaryHover [&::-webkit-scrollbar-thumb]:bg-primaryText [&::-webkit-scrollbar-track]:rounded-sm [&::-webkit-scrollbar-thumb]:rounded-sm mt-3">
        {loadingTypingWordList && <SidebarListSkeleton />}
        <HomeSidebarTypingList />
      </div>
      <PopupDotsSetting
        show={typingListSetting}
        onClose={() => setTypingListSetting(false)}
        rect={currentlyPickedSetting.rect}
      >
        <BodyTypingSetting onClose={() => setTypingListSetting(false)} />
      </PopupDotsSetting>
    </HomeSidebar>
  );
};

const BodyTypingSetting = ({ onClose }: any) => {
  const {
    wordList,
    setWordList,
    currentlyPickedSetting,
    setCurrentlyPickedSetting,
    setTypingListSetting,
  } = useTyping();
  const [currentPage, setCurrentPage] = useState<"root" | "theme">("root");
  const listItem = [
    {
      icon: <OpenInANewTabIcon size="medium"></OpenInANewTabIcon>,
      title: "Open in a new tab",
      href: currentlyPickedSetting.href,
    },
    {
      icon: (
        <ThemeItem
          item={currentlyPickedSetting.theme}
          currentTheme=""
          size={9}
        ></ThemeItem>
      ),
      title: "Change theme",
      onClick: () => {
        setCurrentPage("theme");
      },
    },
    {
      icon: <DeleteIcon></DeleteIcon>,
      title: "Delete",
      onClick: () => {
        handleDeleteTypingList(currentlyPickedSetting.id);
        setTypingListSetting(false);
      },
    },
  ];
  const handleDeleteTypingList = (id: Id) => {
    const newWordList = wordList.filter((item: any) => item.id !== id);
    setWordList(newWordList);
  };

  const handleUpdateTypingListName = (id: Id, title: string) => {
    const newTasks = wordList.map((item: any) => {
      if (item.id !== id) return item;
      return { ...item, name: title };
    });
    setCurrentlyPickedSetting({ ...currentlyPickedSetting, title });
    setWordList(newTasks);
  };
  return (
    <>
      {currentPage === "root" && (
        <SettingRootPage
          listControls={listItem}
          id={currentlyPickedSetting.id}
          title={currentlyPickedSetting.title}
          handleUpdateTitle={handleUpdateTypingListName}
        ></SettingRootPage>
      )}
      {currentPage === "theme" && (
        <SettingChangeThemePage
          onBackRootPage={() => setCurrentPage("root")}
          onClose={onClose}
        ></SettingChangeThemePage>
      )}
    </>
  );
};

export default HomeSidebarForTyping;
