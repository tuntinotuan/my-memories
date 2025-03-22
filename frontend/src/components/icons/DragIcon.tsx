import React from "react";
import ControlCameraIcon from "@mui/icons-material/ControlCamera";

const DragIcon = ({ className, ...rest }: any) => {
  return (
    <div
      className={`flex items-center justify-center cursor-pointer ${className}`}
      {...rest}
    >
      <ControlCameraIcon fontSize="inherit" />
    </div>
  );
};

export default DragIcon;
