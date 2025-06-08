import React from "react";
import cabybara from "@/components/icons/cabybara/images/cabybara-tired.png";
import CabybaraCore from "./cabybara.core";

const CabybaraTiredIcon = ({ className }: { className?: string }) => {
  return (
    <CabybaraCore
      src={cabybara}
      alt="cabybara-tired"
      className={className}
    ></CabybaraCore>
  );
};

export default CabybaraTiredIcon;
