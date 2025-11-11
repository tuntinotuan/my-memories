import React from "react";
import LoopRoundedIcon from "@mui/icons-material/LoopRounded";

const RepeatIcon = ({
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
    <div className={`shrink-0 ${className}`} onClick={onClick} {...rest}>
      <LoopRoundedIcon fontSize={fontSize} />
    </div>
  );
};

export default RepeatIcon;
