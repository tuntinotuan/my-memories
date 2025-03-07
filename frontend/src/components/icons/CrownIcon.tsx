import Image from "next/image";
import React from "react";

const CrownIcon = () => {
  return (
    <Image
      src="/crown.png"
      alt="Crown Icon"
      width={20}
      height={30}
      priority
      unoptimized
    />
  );
};

export default CrownIcon;
