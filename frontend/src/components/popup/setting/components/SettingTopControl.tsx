import ArrowBackIcon from "@/components/icons/arrow/ArrowBackIcon";
import React from "react";

const SettingTopControl = ({
  onBackRootPage,
  pageName,
}: {
  pageName: string;
  onBackRootPage: () => void;
}) => {
  return (
    <div className="flex items-center gap-2 p-3">
      <div
        className="flex items-center justify-center p-1 rounded-lg hover:bg-primaryHover transition-all cursor-pointer"
        onClick={onBackRootPage}
      >
        <ArrowBackIcon></ArrowBackIcon>
      </div>
      <p className="font-bold text-lg">{pageName}</p>
    </div>
  );
};

export default SettingTopControl;
