import ArrowBackIcon from "@/components/icons/arrow/ArrowBackIcon";
import React from "react";

const SettingTopControl = ({
  onBackRootPage,
  pageName,
  paddingClass = "p-3",
}: {
  pageName: string;
  onBackRootPage: () => void;
  paddingClass?: string;
}) => {
  return (
    <div className={`flex items-center gap-2 ${paddingClass}`}>
      <div
        className="flex items-center justify-center p-1 rounded-lg hover:bg-primaryHover dark:hover:bg-darkMode0A transition-all cursor-pointer"
        onClick={onBackRootPage}
      >
        <ArrowBackIcon></ArrowBackIcon>
      </div>
      <p className="font-bold text-lg">{pageName}</p>
    </div>
  );
};

export default SettingTopControl;
