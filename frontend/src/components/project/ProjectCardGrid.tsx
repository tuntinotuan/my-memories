import { projectList } from "@/api/board/mock.data";
import React from "react";
import ProjectCardGridItem from "./ProjectCardGridItem";
import { useCreateBoardStates } from "@/contexts/createBoardStates";
import ProjectHaveAny from "./ProjectHaveAny";

const ProjectCardGrid = () => {
  const { boards } = useCreateBoardStates();
  return (
    <>
      {boards.length > 0 ? (
        <div className="card-grid grid grid-cols-4 w-full gap-6 mb-5">
          {boards.map((item) => (
            <ProjectCardGridItem
              title={item.title}
              img={item.img}
              key={item.id}
              id={item.id}
            ></ProjectCardGridItem>
          ))}
        </div>
      ) : (
        <ProjectHaveAny />
      )}
      <h1 className="text-2xl font-semibold">Example designs</h1>
      <div className="card-grid grid grid-cols-4 gap-6">
        {projectList.map((item, index) => (
          <ProjectCardGridItem
            title={item.title}
            img={item.img}
            key={index}
          ></ProjectCardGridItem>
        ))}
      </div>
    </>
  );
};

export default ProjectCardGrid;
