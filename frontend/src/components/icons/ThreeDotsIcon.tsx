import React from "react";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
type ThreeDotsIcon = {
  className?: string;
  fontSize?: "small" | "inherit" | "large" | "medium";
};
const ThreeDotsIcon = ({ fontSize = "inherit", className }: ThreeDotsIcon) => {
  return (
    <div className={`cursor-pointer ${className}`}>
      <MoreHorizRoundedIcon fontSize={fontSize}></MoreHorizRoundedIcon>
    </div>
  );
};

export default ThreeDotsIcon;
