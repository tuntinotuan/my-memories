import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

type OpenInANewTabProps = {
  size?: "small" | "inherit" | "large" | "medium";
};

const OpenInANewTabIcon = ({ size }: OpenInANewTabProps) => {
  return (
    <div>
      <OpenInNewIcon fontSize={size || "inherit"}></OpenInNewIcon>
    </div>
  );
};

export default OpenInANewTabIcon;
