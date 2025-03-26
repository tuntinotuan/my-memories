import React from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
const ArrowLeftIcon = ({ ...rest }: any) => {
  return (
    <div
      className={`w-7 h-7 flex items-center justify-center rounded-lg hover:bg-primaryHover transition-all cursor-pointer`}
    >
      <ArrowBackIosNewRoundedIcon {...rest} fontSize="inherit" />
    </div>
  );
};

export default ArrowLeftIcon;
