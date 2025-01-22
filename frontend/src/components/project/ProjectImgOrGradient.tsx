import React from "react";
import { ProjectImgOrGradientProps } from "./types";

const ProjectImgOrGradient = ({ values }: ProjectImgOrGradientProps) => {
  return (
    <>
      <div
        className={`w-6 h-6 rounded-md shrink-0 bg-cover`}
        style={
          !values.from
            ? { backgroundImage: `url(${values.url})` }
            : {
                backgroundImage: `linear-gradient(to bottom right, ${values.from}, ${values.to})`,
              }
        }
      />
    </>
  );
};

export default ProjectImgOrGradient;
