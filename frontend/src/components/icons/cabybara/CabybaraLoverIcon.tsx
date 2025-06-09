import React from "react";
import cabybara from "@/components/icons/cabybara/images/cabybara-lover.png";
import CabybaraCore from "./cabybara.core";

const CabybaraLoverIcon = ({
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
      alt="cabybara-lover"
      className={className}
    ></CabybaraCore>
  );
};

export default CabybaraLoverIcon;
