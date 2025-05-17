"use client";
import React, { useState } from "react";
import HomeSidebar from "./home.sidebar";
import Button from "@/components/button/Button";
import ProjectItem from "@/components/project/ProjectItem";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import { Tooltip } from "@nextui-org/tooltip";
import HeaderLogo from "@/components/logo/header.logo";
import { useCreateBoardStates } from "@/contexts/createBoardStates";
import { useLayoutStates } from "@/contexts/layoutStates";
import ButtonCreate from "@/components/button/ButtonCreate";
import PlusIcon from "@/components/icons/PlusIcon";
import CrownIcon from "@/components/icons/CrownIcon";
import { useTyping } from "@/contexts/TypingStates";
import { Id } from "@/app/(home)/project/[slug]/modules/types";
import { replaceAllTrim } from "@/utils/otherFs";
import { PopupDotsSetting } from "@/components/popup/PopupDotsSetting";

const HomeSidebarForTyping = () => {
  const [showRecentDesign, setShowRecentDesign] = useState(true);
  const { handleShowHomeSidebar } = useLayoutStates();
  const { boards } = useCreateBoardStates();
  const {
    wordList,
    setWordList,
    setShowPopupCreate,
    typingListSetting,
    setTypingListSetting,
    currentlyPickedSetting,
    setCurrentlyPickedSetting,
  } = useTyping();
  const handleRecent = () => {
    setShowRecentDesign((pre) => !pre);
  };

  const handleDeleteTypingList = (id: Id) => {
    const newWordList = wordList.filter((item: any) => item.id !== id);
    setWordList(newWordList);
  };
  return (
    <HomeSidebar>
      <div className="flex items-center justify-between">
        <HeaderLogo></HeaderLogo>
        <Tooltip
          showArrow
          content="Close menu"
          placement="bottom"
          radius="sm"
          delay={200}
          closeDelay={200}
          className="!px-2 !py-[2px]"
          shadow="sm"
        >
          <div>
            <CloseIcon
              onClick={() => handleShowHomeSidebar()}
              className="homesidebar-close-icon opacity-0"
              border
            ></CloseIcon>
          </div>
        </Tooltip>
      </div>
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
      <div className="overflow-auto max-h-[65vh] px-1 [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-track]:bg-primaryHover [&::-webkit-scrollbar-thumb]:bg-primaryText [&::-webkit-scrollbar-track]:rounded-sm [&::-webkit-scrollbar-thumb]:rounded-sm mt-3">
        {wordList.length > 0 && (
          <Button
            className="group text-xs !gap-1 !py-[6px] !px-2 !rounded-[4px] mb-[14px] text-primaryText"
            hover="hover:bg-primaryHover"
            onClick={handleRecent}
          >
            <p>Typing list</p>
            {showRecentDesign ? <ArrowDownIcon /> : <ArrowRightIcon />}
          </Button>
        )}
        {showRecentDesign && wordList.length > 0 && (
          <>
            <div className="flex flex-col items-center gap-1 mb-8">
              {wordList.map((item: any) => (
                <ProjectItem
                  key={item.id}
                  id={item.id}
                  title={item.name}
                  theme={item.theme}
                  handleDelete={handleDeleteTypingList}
                  selectedItem={setCurrentlyPickedSetting}
                  href={`/typing/${
                    replaceAllTrim(item.name) + "-id" + item.id
                  }`}
                ></ProjectItem>
              ))}
            </div>
            {boards.length > 4 && (
              <Button
                className="w-full hover:bg-primaryHover text-primaryColor"
                disable
              >
                See all
              </Button>
            )}
          </>
        )}
        {wordList.length <= 0 && (
          <div className="h-full w-full flex items-center justify-center text-xs">
            Nothing here...
          </div>
        )}
      </div>
      <PopupDotsSetting
        onClickDelete={handleDeleteTypingList}
        pickedItem={currentlyPickedSetting}
        show={typingListSetting}
        onClose={() => setTypingListSetting(false)}
      ></PopupDotsSetting>
    </HomeSidebar>
  );
};

export default HomeSidebarForTyping;
