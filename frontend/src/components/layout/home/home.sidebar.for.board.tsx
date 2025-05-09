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
import { projectList } from "@/api/board/mock.data";
import { replaceAllTrim } from "@/utils/otherFs";

const HomeSidebarForBoard = () => {
  const [showRecentDesign, setShowRecentDesign] = useState(true);
  const [showExampleDesign, setShowExampleDesign] = useState(true);
  const { handleShowHomeSidebar } = useLayoutStates();
  const { boards, loadingFetchBoards, handleOpenAndClosePopupCreateboard } =
    useCreateBoardStates();
  const handleRecent = () => {
    setShowRecentDesign((pre) => !pre);
  };
  const handleExample = () => {
    setShowExampleDesign((pre) => !pre);
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
        {loadingFetchBoards && (
          <div className="flex flex-col items-center gap-1">
            {Array(4)
              .fill(null)
              .map((item, index) => (
                <div
                  key={index}
                  className="w-full h-10 bg-gray-200 rounded-md animate-pulse"
                ></div>
              ))}
          </div>
        )}
        {boards.length > 0 && (
          <Button
            className="group text-xs !gap-1 !py-[6px] !px-2 !rounded-[4px] mb-[14px] text-primaryText"
            hover="hover:bg-primaryHover"
            onClick={handleRecent}
          >
            <p>Recent designs</p>
            {showRecentDesign ? <ArrowDownIcon /> : <ArrowRightIcon />}
          </Button>
        )}
        {showRecentDesign && boards.length > 0 && (
          <>
            <div className="flex flex-col items-center gap-1 mb-8">
              {boards.map((item) => (
                <ProjectItem
                  key={item.id}
                  id={item.id}
                  img={item.img}
                  title={item.title}
                  href={`/project/${
                    replaceAllTrim(item.title) + "-id" + item.id
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
        <Button
          className="group text-xs !gap-1 !py-[6px] !px-2 !rounded-[4px] mb-[14px] text-primaryText"
          hover="hover:bg-primaryHover"
          onClick={handleExample}
        >
          <p>Example designs</p>
          {showExampleDesign ? <ArrowDownIcon /> : <ArrowRightIcon />}
        </Button>
        {showExampleDesign && (
          <>
            <div className="flex flex-col items-center gap-1 ">
              {projectList.map((item, index) => (
                <ProjectItem
                  key={index}
                  img={item.img}
                  title={item.title}
                  href={`/project/${replaceAllTrim(item.title)}`}
                ></ProjectItem>
              ))}
            </div>
            {projectList.length <= 6 && (
              <Button
                className="w-full hover:bg-primaryHover text-primaryColor"
                disable
              >
                See all
              </Button>
            )}
          </>
        )}
      </div>
    </HomeSidebar>
  );
};

export default HomeSidebarForBoard;
