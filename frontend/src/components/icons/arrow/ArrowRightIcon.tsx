import React from "react";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

const ArrowRightIcon = ({
  className,
  fontSize = "inherit",
  onClick,
  ...rest
}: {
  className?: string;
  fontSize?: "small" | "medium" | "large" | "inherit";
  onClick?: () => void;
}) => {
  return (
    <div className={`cursor-move ${className}`} onClick={onClick} {...rest}>
      <KeyboardArrowRightRoundedIcon fontSize={fontSize} />
    </div>
  );
};

export default ArrowRightIcon;
