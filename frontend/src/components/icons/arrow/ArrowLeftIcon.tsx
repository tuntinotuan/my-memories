import React from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
const ArrowLeftIcon = ({ className, ...rest }: any) => {
  return (
    <div
      className={`w-7 h-7 flex items-center justify-center rounded-lg hover:bg-primaryHover dark:hover:bg-darkMode0A transition-all cursor-pointer ${className}`}
      {...rest}
    >
      <ArrowBackIosNewRoundedIcon fontSize="inherit" />
    </div>
  );
};

export default ArrowLeftIcon;
