import React from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

type SettingIconProps = {
  className?: string;
  fontSize?: "small" | "inherit" | "large" | "medium";
};

const SettingIcon = ({
  className,
  fontSize = "inherit",
  ...rest
}: SettingIconProps) => {
  return (
    <SettingsOutlinedIcon
      fontSize={fontSize}
      className={`cursor-pointer ${className}`}
      {...rest}
    />
  );
};

export default SettingIcon;
