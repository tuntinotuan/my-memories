import React, { useEffect, useRef, useState } from "react";
import AdsClickRoundedIcon from "@mui/icons-material/AdsClickRounded";

const TypingOverlayBlur = ({ htmlFor }: { htmlFor: string }) => {
  const [hide, setHide] = useState(false);
  const labelRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    labelRef.current?.focus();
  }, []);
  return (
    <label
      ref={labelRef}
      tabIndex={0}
      htmlFor={htmlFor}
      className={`absolute left-0 right-0 h-96 flex items-center justify-center gap-3 bg-[#262A33] bg-opacity-20 backdrop-blur-[9px] cursor-pointer transition-all focus:border-none ${
        hide ? "opacity-0 invisible" : "opacity-100 visible"
      }`}
      onClick={() => setHide(true)}
      onKeyDown={(e) => {
        console.log("overlay", e.key);
        document.getElementById(htmlFor)?.focus();
        setHide(true);
      }}
    >
      <AdsClickRoundedIcon />
      <p>Click here or press any key to focus</p>
    </label>
  );
};

export default TypingOverlayBlur;
