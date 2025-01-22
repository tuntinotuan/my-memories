import React from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

type NotificationIconProps = {
  className?: string;
  fontSize?: "small" | "inherit" | "large" | "medium";
};

const NotificationIcon = ({
  className,
  fontSize = "inherit",
  ...rest
}: NotificationIconProps) => {
  return (
    <NotificationsNoneOutlinedIcon
      fontSize={fontSize}
      className={`cursor-pointer ${className}`}
      {...rest}
    />
  );
};

export default NotificationIcon;
