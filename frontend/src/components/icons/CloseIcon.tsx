import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
const CloseIcon = ({ ...rest }) => {
  return (
    <div className="cursor-pointer">
      <CloseRoundedIcon {...rest} />
    </div>
  );
};

export default CloseIcon;
