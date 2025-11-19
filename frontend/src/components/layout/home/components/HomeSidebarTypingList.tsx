import ButtonShowAndHiddenData from "@/components/button/ButtonShowAndHiddenData";
import ProjectItem from "@/components/project/ProjectItem";
import { useTyping } from "@/contexts/TypingStates";
import { replaceAllTrim } from "@/utils/otherFs";
import Image from "next/image";
import React from "react";

const HomeSidebarTypingList = () => {
  const {
    wordList,
    setCurrentlyPickedSetting,
    setTypingListSetting,
    loadingTypingWordList,
  } = useTyping();

  return (
    <>
      <ButtonShowAndHiddenData list={wordList} title="Typing list">
        <div className="flex flex-col items-center gap-1 mb-8">
          {wordList.map((item: any) => (
            <ProjectItem
              key={item.id}
              id={item.id}
              title={item.name}
              theme={item.theme}
              openSetting={() => setTypingListSetting(true)}
              selectedItem={setCurrentlyPickedSetting}
              href={`/typing/${replaceAllTrim(item.name) + "-id" + item.id}`}
            ></ProjectItem>
          ))}
        </div>
      </ButtonShowAndHiddenData>
      {wordList.length <= 0 && !loadingTypingWordList && (
        <div className="h-full w-full flex flex-col items-center justify-center gap-2 text-xs text-center">
          <Image
            src={"/cat-empty-paper.jpg"}
            alt="cat empty paper image"
            width={160}
            height={300}
            className="rounded mb-4"
            unoptimized
          ></Image>
          <h2 className="font-bold">You don't have any lists yet</h2>
          <p className="text-[10px]">
            Start creating resources by clicking on 'Create a typing list' below
          </p>
        </div>
      )}
    </>
  );
};

export default HomeSidebarTypingList;
