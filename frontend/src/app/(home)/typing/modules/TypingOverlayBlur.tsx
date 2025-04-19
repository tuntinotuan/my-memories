import React, { useState } from "react";
import AdsClickRoundedIcon from "@mui/icons-material/AdsClickRounded";

const TypingOverlayBlur = ({ htmlFor }: { htmlFor: string }) => {
  const [hide, setHide] = useState(false);
  return (
    <label
      htmlFor={htmlFor}
      className={`absolute left-0 right-0 h-96 flex items-center justify-center gap-3 bg-[#262A33] bg-opacity-20 backdrop-blur-md cursor-pointer transition-all ${
        hide ? "opacity-0 invisible" : "opacity-100 visible"
      }`}
      onClick={() => setHide(true)}
    >
      <AdsClickRoundedIcon />
      <p>Click here or press any key to focus</p>
    </label>
  );
};

export default TypingOverlayBlur;
