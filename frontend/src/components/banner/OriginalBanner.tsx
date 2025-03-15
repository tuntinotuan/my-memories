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
    <div className="relative w-full">
      {/* "/banner-design-today.jpg" - example src string */}
      {/* "Design to day banner" - example alt string */}
      {/* 'What will you design to day? - example a title */}
      <Image
        src={src}
        alt={alt || "image alt"}
        width={1500}
        height={250}
        priority
        className="rounded-lg flex-1 shrink-0"
        style={{ height: "160px", objectFit: "cover" }}
        unoptimized
      ></Image>
      <p
        className={`text-[32px] text-white font-semibold w-full absolute ${newPosition}`}
      >
        {title}
      </p>
    </div>
  );
};

export default OriginalBanner;
