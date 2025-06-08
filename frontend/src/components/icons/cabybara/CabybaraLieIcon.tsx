import React from "react";
import cabybara from "@/components/icons/cabybara/images/cabybara-lie.png";
import CabybaraCore from "./cabybara.core";

const CabybaraLieIcon = ({ className }: { className?: string }) => {
  return (
    <CabybaraCore
      src={cabybara}
      alt="cabybara-lie"
      className={className}
    ></CabybaraCore>
  );
};

export default CabybaraLieIcon;
