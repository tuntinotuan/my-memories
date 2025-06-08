import React from "react";
import cabybara from "@/components/icons/cabybara/images/cabybara-working.png";
import CabybaraCore from "./cabybara.core";

const CabybaraWorkingIcon = ({ className }: { className?: string }) => {
  return (
    <CabybaraCore
      src={cabybara}
      alt="cabybara-working"
      className={className}
    ></CabybaraCore>
  );
};

export default CabybaraWorkingIcon;
