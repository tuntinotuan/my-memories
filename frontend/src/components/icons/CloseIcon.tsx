import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
type CloseIconProps = {
  className?: string;
  onClick?: () => void;
  fontSize?: "small" | "inherit" | "large" | "medium";
  border?: boolean;
};
const CloseIcon = ({
  className,
  fontSize = "inherit",
  border,
  ...rest
}: CloseIconProps) => {
  return (
    <div
      className={`w-7 h-7 flex items-center justify-center rounded-lg hover:bg-primaryHover transition-all cursor-pointer ${
        border ? "border border-gray-200" : ""
      } ${className}`}
      {...rest}
    >
      <CloseRoundedIcon fontSize={fontSize} />
    </div>
  );
};

export default CloseIcon;
