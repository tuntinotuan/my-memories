import { projectList } from "@/api/board/mock.data";
import Link from "next/link";
import React from "react";
import ProjectImgOrGradient from "./ProjectImgOrGradient";
import ProjectCardGridItem from "./ProjectCardGridItem";

const ProjectCardGrid = () => {
  return (
    <div className="card-grid grid grid-cols-4 gap-6">
      {projectList.map((item, index) => (
        <ProjectCardGridItem
          title={item.title}
          img={item.img}
          key={index}
        ></ProjectCardGridItem>
      ))}
    </div>
  );
};

export default ProjectCardGrid;
