"use client";
import React, { useRef, useState } from "react";
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
import DeleteIcon from "@/components/icons/DeleteIcon";
import { useOnClickOutside } from "usehooks-ts";

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
  } = useTyping();
  const [pickedItem, setPickedItem] = useState();
  const handleRecent = () => {
    setShowRecentDesign((pre) => !pre);
  };
  console.log("pickedItem", pickedItem);

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
        className="!w-full my-2"
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
                  handleDelete={handleDeleteTypingList}
                  selectedItem={setPickedItem}
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
      <Popup
        onClickDelete={handleDeleteTypingList}
        pickedItem={pickedItem}
        show={typingListSetting}
        onClose={() => setTypingListSetting(false)}
      ></Popup>
    </HomeSidebar>
  );
};

export const Popup = ({ onClickDelete, pickedItem, show, onClose }: any) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref, onClose);
  if (!pickedItem) return null;
  return show ? (
    <div
      ref={ref}
      className={`fixed w-[300px] h-auto bg-white shadow-popup-rect rounded-xl z-50 border border-gray-200`}
      style={{
        top: pickedItem.rect.top + window.scrollY + pickedItem.rect.height / 2,
        left: pickedItem.rect.right + window.scrollX,
        transform: "translate(0, -50%)",
      }}
    >
      <div className="flex flex-col border border-transparent border-b-gray-200 p-3">
        <p className="font-bold text-lg">{pickedItem.title}</p>
      </div>
      <div
        className="flex items-center gap-2 w-full text-primaryText hover:bg-gray-100 px-3 py-2 transition-all cursor-pointer"
        onClick={() => {
          onClickDelete(pickedItem.id);
          onClose();
        }}
      >
        <DeleteIcon></DeleteIcon>
        Delete
      </div>
    </div>
  ) : (
    <></>
  );
};

export default HomeSidebarForTyping;
