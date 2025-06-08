import React from "react";
import cabybara from "@/components/icons/cabybara/images/cabybara-lie.png";
import CabybaraCore from "./cabybara.core";

const CabybaraLieIcon = ({
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
      alt="cabybara-lie"
      className={className}
    ></CabybaraCore>
  );
};

export default CabybaraLieIcon;
