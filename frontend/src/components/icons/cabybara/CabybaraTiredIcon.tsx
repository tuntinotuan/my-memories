import Image from "next/image";
import React from "react";
import cabybara from "@/components/icons/cabybara/images/cabybara-tired.png";

const CabybaraTiredIcon = ({ className }: { className?: string }) => {
  return (
    <Image
      src={cabybara}
      alt="cabybara-tired"
      width={30}
      height={20}
      className={className}
    ></Image>
  );
};

export default CabybaraTiredIcon;
