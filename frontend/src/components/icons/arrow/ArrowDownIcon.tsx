import React from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

const ArrowDownIcon = ({
  className,
  fontSize,
}: {
  className?: string;
  fontSize?: "small" | "medium" | "large";
}) => {
  return (
    <ExpandMoreRoundedIcon
      fontSize={fontSize}
      className={`opacity-0 group-hover:opacity-100 ${className}`}
    />
  );
};

export default ArrowDownIcon;
