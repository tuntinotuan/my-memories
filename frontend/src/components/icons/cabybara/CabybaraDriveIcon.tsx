import Image from "next/image";
import React from "react";
import cabybara from "@/components/icons/cabybara/images/cabybara-drive.png";

const CabybaraDriveIcon = ({ className }: { className?: string }) => {
  return (
    <Image
      src={cabybara}
      alt="cabybara-drive"
      width={30}
      height={20}
      className={className}
    ></Image>
  );
};

export default CabybaraDriveIcon;
