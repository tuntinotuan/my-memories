import React from "react";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const DeleteIcon = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => {};
}) => {
  return (
    <div className={`cursor-pointer ${className}`} onClick={onClick}>
      <DeleteForeverOutlinedIcon fontSize="medium" />
    </div>
  );
};

export default DeleteIcon;
