import React from "react";
import cabybara from "@/components/icons/cabybara/images/cabybara-lover.png";
import CabybaraCore from "./cabybara.core";

const CabybaraLoverIcon = ({ className }: { className?: string }) => {
  return (
    <CabybaraCore
      src={cabybara}
      alt="cabybara-lover"
      className={className}
    ></CabybaraCore>
  );
};

export default CabybaraLoverIcon;
