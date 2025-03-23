import Link from "next/link";
import React from "react";
import ProjectImgOrGradient from "./ProjectImgOrGradient";
import { ProjectCardItemProps } from "./types";

const ProjectCardGridItem = ({ title, img }: ProjectCardItemProps) => {
  return (
    <div className="flex flex-col w-[220px] h-[222px] gap-2">
      <Link
        href={`/project/${title}`}
        className="flex justify-center items-end w-full h-full bg-f2Color rounded-lg px-4 pt-4 cursor-pointer hover:shadow-inner hover:scale-[1.01] transition-all"
      >
        <ProjectImgOrGradient img={img}></ProjectImgOrGradient>
      </Link>
      <p className="text-sm font-bold truncate">{title}</p>
      <span className="text-xs text-primaryText cursor-pointer">
        Edited 4 days ago
      </span>
    </div>
  );
};

export default ProjectCardGridItem;
