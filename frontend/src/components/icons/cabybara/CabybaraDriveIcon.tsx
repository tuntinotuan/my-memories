import React from "react";
import cabybara from "@/components/icons/cabybara/images/cabybara-drive.png";
import CabybaraCore from "./cabybara.core";

const CabybaraDriveIcon = ({
  className,
  cabyWidth,
}: {
  className?: string;
  cabyWidth?: number;
}) => {
  return (
    <CabybaraCore
      src={cabybara}
      width={cabyWidth}
      alt="cabybara-drive"
      className={className}
    ></CabybaraCore>
  );
};

export default CabybaraDriveIcon;
