import { projectList } from "@/api/board/mock.data";
import React from "react";
import ProjectCardListItem from "./ProjectCardListItem";

const ProjectCardList = () => {
  return (
    <div className="card-list grid grid-flow-row">
      <div className="grid grid-cols-[50%_50%] gap-4 text-sm border border-transparent border-b-gray-200 p-4">
        <p>Name</p>
        <p>Edited</p>
      </div>
      {projectList.map((item, index) => (
        <ProjectCardListItem
          title={item.title}
          img={item.img}
          key={index}
        ></ProjectCardListItem>
      ))}
    </div>
  );
};

export default ProjectCardList;
