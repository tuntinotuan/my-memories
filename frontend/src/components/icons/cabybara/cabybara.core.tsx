import Image, { StaticImageData } from "next/image";
import React from "react";

type CabybaraCoreProps = {
  src: StaticImageData;
  alt: string;
  className?: string;
};

const CabybaraCore = ({ src, alt, className }: CabybaraCoreProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={40}
      height={20}
      className={className}
    ></Image>
  );
};

export default CabybaraCore;
