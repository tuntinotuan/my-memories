import React from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
const ArrowLeftIcon = ({ ...rest }: any) => {
  return (
    <div className="cursor-pointer">
      <ArrowBackIosNewRoundedIcon {...rest} />
    </div>
  );
};

export default ArrowLeftIcon;
