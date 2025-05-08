import React from "react";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
type ThreeDotsIconProps = {
  className?: string;
  disabled?: boolean;
  fontSize?: "small" | "inherit" | "large" | "medium";
  onClick?: () => void;
};
const ThreeDotsIcon = ({
  fontSize = "inherit",
  className,
  disabled,
  onClick,
}: ThreeDotsIconProps) => {
  return (
    <div
      className={`flex items-center justify-center cursor-pointer ${
        disabled ? "cursor-wait" : ""
      } ${className}`}
      onClick={onClick}
    >
      <MoreHorizRoundedIcon fontSize={fontSize}></MoreHorizRoundedIcon>
    </div>
  );
};

export default ThreeDotsIcon;
