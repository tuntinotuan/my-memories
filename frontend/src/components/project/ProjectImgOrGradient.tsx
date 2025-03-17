import React from "react";
import { ProjectImgOrGradientProps } from "./types";

const ProjectImgOrGradient = ({
  img,
  className,
  width,
  height,
}: ProjectImgOrGradientProps) => {
  const extra = { width: width, height: height };
  const bgImageStyles =
    img.type === "imageUrl"
      ? { backgroundImage: `url(${img.url})` }
      : {
          backgroundImage: `linear-gradient(to bottom right, ${img.from}, ${img.to})`,
        };
  const styleInline = { ...bgImageStyles, ...extra };
  return (
    <div
      className={`w-full h-full rounded-md shrink-0 bg-cover bg-center bg-no-repeat ${className}`}
      style={styleInline}
    />
  );
};
export default ProjectImgOrGradient;
