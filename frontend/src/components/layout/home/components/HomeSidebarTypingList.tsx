import Button from "@/components/button/Button";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import ProjectItem from "@/components/project/ProjectItem";
import { useCreateBoardStates } from "@/contexts/createBoardStates";
import { useTyping } from "@/contexts/TypingStates";
import { replaceAllTrim } from "@/utils/otherFs";
import React, { useState } from "react";

const HomeSidebarTypingList = () => {
  const [showRecentDesign, setShowRecentDesign] = useState(true);
  const { boards } = useCreateBoardStates();
  const { wordList, setCurrentlyPickedSetting } = useTyping();
  const handleRecent = () => {
    setShowRecentDesign((pre) => !pre);
  };
  return (
    <>
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
                selectedItem={setCurrentlyPickedSetting}
                href={`/typing/${replaceAllTrim(item.name) + "-id" + item.id}`}
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
    </>
  );
};

export default HomeSidebarTypingList;
