import { projectList } from "@/api/board/mock.data";
import ButtonShowAndHiddenData from "@/components/button/ButtonShowAndHiddenData";
import ProjectItem from "@/components/project/ProjectItem";
import { replaceAllTrim } from "@/utils/otherFs";
import React from "react";

const HomeSidebarExampleDesign = () => {
  return (
    <ButtonShowAndHiddenData list={projectList} title="Example designs">
      <div className="flex flex-col items-center gap-1">
        {projectList.map((item, index) => (
          <ProjectItem
            key={index}
            img={item.img}
            title={item.title}
            href={`/project/${replaceAllTrim(item.title)}`}
            hiddenSettingButton
          ></ProjectItem>
        ))}
      </div>
    </ButtonShowAndHiddenData>
  );
};

export default HomeSidebarExampleDesign;
