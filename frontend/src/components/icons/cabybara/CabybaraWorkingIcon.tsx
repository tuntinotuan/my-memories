import Image from "next/image";
import React from "react";
import cabybara from "@/components/icons/cabybara/images/cabybara-working.png";

const CabybaraWorkingIcon = ({ className }: { className?: string }) => {
  return (
    <Image
      src={cabybara}
      alt="cabybara-working"
      width={30}
      height={20}
      className={className}
    ></Image>
  );
};

export default CabybaraWorkingIcon;
