import React from "react";
import InputCreate from "./InputCreate";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
const InputLink = () => {
  return (
    <InputCreate id="link" name="link" type="text" tooltipContent="Link">
      <InsertLinkOutlinedIcon fontSize="inherit"></InsertLinkOutlinedIcon>
    </InputCreate>
  );
};

export default InputLink;
