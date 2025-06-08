import Image from "next/image";
import React from "react";
import cabybara from "@/components/icons/cabybara/images/cabybara-lie.png";

const CabybaraLieIcon = ({ className }: { className?: string }) => {
  return (
    <Image
      src={cabybara}
      alt="cabybara-lie"
      width={30}
      height={20}
      className={className}
    ></Image>
  );
};

export default CabybaraLieIcon;
