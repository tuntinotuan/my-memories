import Image, { StaticImageData } from "next/image";
import React from "react";

type CabybaraCoreProps = {
  src: StaticImageData;
  alt: string;
  className?: string;
  width?: number;
};

const CabybaraCore = ({
  src,
  alt,
  className,
  width = 40,
}: CabybaraCoreProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={20}
      className={className}
    ></Image>
  );
};

export default CabybaraCore;
