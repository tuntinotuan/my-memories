import React from "react";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
const GreenTickIcon = ({
  className,
  fontSize = "inherit",
}: {
  className?: string;
  fontSize?: "small" | "inherit" | "large" | "medium";
}) => {
  return (
    <div className={className}>
      <DoneRoundedIcon fontSize={fontSize}></DoneRoundedIcon>
    </div>
  );
};

export default GreenTickIcon;
