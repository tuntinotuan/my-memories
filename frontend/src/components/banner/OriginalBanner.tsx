import Image from "next/image";
import React from "react";
type OriginalBannerProps = {
  src: string;
  title: string;
  alt?: string;
  positionTitle: "center" | "bLeft" | "bRight";
};
const OriginalBanner = ({
  src,
  title,
  alt,
  positionTitle,
}: OriginalBannerProps) => {
  let newPosition = "";
  switch (positionTitle) {
    case "center":
      newPosition =
        "top-1/2 left-1/2 text-center -translate-x-1/2 -translate-y-1/2";
      break;
    case "bLeft":
      newPosition = "left-[3%] bottom-[20%]";
      break;
    case "bRight":
      newPosition = "";
      break;
    default:
      break;
  }
  return (
    <div
      className="relative w-full rounded-lg bg-no-repeat bg-cover bg-center shrink-0"
      style={{
        backgroundImage: `url(${src})`,
        height: 160,
      }}
    >
      <p
        className={`text-[32px] text-white font-semibold w-full absolute ${newPosition}`}
      >
        {title}
      </p>
    </div>
  );
};

export default OriginalBanner;
