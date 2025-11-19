import ButtonShowAndHiddenData from "@/components/button/ButtonShowAndHiddenData";
import EmptyTypingList from "@/components/empty/EmptyTypingList";
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
      {wordList.length <= 0 && !loadingTypingWordList && <EmptyTypingList />}
    </>
  );
};

export default HomeSidebarTypingList;
