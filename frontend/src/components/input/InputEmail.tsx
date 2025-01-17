import React from "react";
import InputCreate from "@/components/input/InputCreate";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";

const InputEmail = () => {
  return (
    <InputCreate id="email" name="Email" type="email" tooltipContent="Email">
      <AlternateEmailRoundedIcon fontSize="inherit"></AlternateEmailRoundedIcon>
    </InputCreate>
  );
};

export default InputEmail;
