import React from "react";
import cabybara from "@/components/icons/cabybara/images/cabybara-working.png";
import CabybaraCore from "./cabybara.core";

const CabybaraWorkingIcon = ({
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
      alt="cabybara-working"
      className={className}
    ></CabybaraCore>
  );
};

export default CabybaraWorkingIcon;
