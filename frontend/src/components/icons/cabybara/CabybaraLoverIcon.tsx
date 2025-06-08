import Image from "next/image";
import React from "react";
import cabybara from "@/components/icons/cabybara/images/cabybara-lover.png";

const CabybaraLoverIcon = ({ className }: { className?: string }) => {
  return (
    <Image
      src={cabybara}
      alt="cabybara-lover"
      width={30}
      height={20}
      className={className}
    ></Image>
  );
};

export default CabybaraLoverIcon;
