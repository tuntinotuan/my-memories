import Link from "next/link";
import React from "react";
import ProjectImgOrGradient from "./ProjectImgOrGradient";
import { ProjectCardItemProps } from "./types";
import { replaceAllTrim } from "@/utils/otherFs";

const ProjectCardListItem = ({ title, img, id }: ProjectCardItemProps) => {
  const newTitle = replaceAllTrim(title);
  return (
    <Link
      href={`/project/${id ? newTitle + "-id" + id : newTitle}`}
      className="grid grid-cols-[7%_43%_50%] items-center gap-2 w-full h-24 p-4 border border-transparent border-b-gray-200 hover:bg-f2Color transition-all cursor-pointer"
    >
      <ProjectImgOrGradient
        img={img}
        className="max-w-16 border border-gray-100 rounded-lg hover:scale-[1.01] transition-all"
      ></ProjectImgOrGradient>
      <p className="text-sm font-bold truncate">{title}</p>
      <p className="text-xs text-primaryText cursor-pointer">
        Edited 4 days ago
      </p>
    </Link>
  );
};

export default ProjectCardListItem;
