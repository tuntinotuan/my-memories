import React from "react";
import InputCreate from "./InputCreate";
import DragHandleOutlinedIcon from "@mui/icons-material/DragHandleOutlined";
const InputShortAnswer = () => {
  return (
    <InputCreate
      id="short-answer"
      name="text"
      type="text"
      tooltipContent="Short answer"
    >
      <DragHandleOutlinedIcon fontSize="inherit"></DragHandleOutlinedIcon>
    </InputCreate>
  );
};

export default InputShortAnswer;
