import Button from "@/components/button/Button";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import ProjectItem from "@/components/project/ProjectItem";
import { useCreateBoardStates } from "@/contexts/createBoardStates";
import { replaceAllTrim } from "@/utils/otherFs";
import React, { useState } from "react";

const HomeSidebarRecentDesign = () => {
  const [showRecentDesign, setShowRecentDesign] = useState(true);
  const { boards, setShowSetting, setPickedSetting } = useCreateBoardStates();
  const handleRecent = () => {
    setShowRecentDesign((pre) => !pre);
  };
  return (
    <>
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
                selectedItem={setPickedSetting}
                openSetting={() => setShowSetting(true)}
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
    </>
  );
};

export default HomeSidebarRecentDesign;
