import ButtonShowAndHiddenData from "@/components/button/ButtonShowAndHiddenData";
import ProjectItem from "@/components/project/ProjectItem";
import { useCreateBoardStates } from "@/contexts/createBoardStates";
import { replaceAllTrim } from "@/utils/otherFs";
import React from "react";

const HomeSidebarRecentDesign = () => {
  const { boards, setShowSetting, setPickedSetting } = useCreateBoardStates();

  return (
    <ButtonShowAndHiddenData list={boards} title="Recent designs">
      <div className="flex flex-col items-center gap-1">
        {boards.map((item) => (
          <ProjectItem
            key={item.id}
            id={item.id}
            img={item.img}
            title={item.title}
            selectedItem={setPickedSetting}
            openSetting={() => setShowSetting(true)}
            href={`/project/${replaceAllTrim(item.title) + "-id" + item.id}`}
          ></ProjectItem>
        ))}
      </div>
    </ButtonShowAndHiddenData>
  );
};

export default HomeSidebarRecentDesign;
