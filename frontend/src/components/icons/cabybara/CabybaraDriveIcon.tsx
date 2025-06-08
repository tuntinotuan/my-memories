import React from "react";
import cabybara from "@/components/icons/cabybara/images/cabybara-drive.png";
import CabybaraCore from "./cabybara.core";

const CabybaraDriveIcon = ({ className }: { className?: string }) => {
  return (
    <CabybaraCore
      src={cabybara}
      alt="cabybara-drive"
      className={className}
    ></CabybaraCore>
  );
};

export default CabybaraDriveIcon;
