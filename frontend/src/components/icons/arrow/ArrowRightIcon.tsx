import React from "react";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

const ArrowRightIcon = ({ className, ...rest }: any) => {
  return (
    <div className={`cursor-move ${className}`} {...rest}>
      <KeyboardArrowRightRoundedIcon fontSize="inherit" />
    </div>
  );
};

export default ArrowRightIcon;
