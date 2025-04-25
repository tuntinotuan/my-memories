import React, { useEffect, useRef } from "react";
import AdsClickRoundedIcon from "@mui/icons-material/AdsClickRounded";
import { useTyping } from "@/contexts/TypingStates";

const TypingOverlayBlur = ({ htmlFor }: { htmlFor: string }) => {
  const { hideOverlay, setHideOverlay } = useTyping();
  const labelRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    labelRef.current?.focus();
  }, []);
  return (
    <label
      ref={labelRef}
      tabIndex={0}
      htmlFor={htmlFor}
      className={`absolute left-0 right-0 bottom-0 h-96 flex items-start justify-center gap-3 text-typingTextNormal bg-opacity-20 backdrop-blur-[9px] cursor-pointer transition-all focus:border-none z-20 pt-16 ${
        hideOverlay ? "opacity-0 invisible" : "opacity-100 visible"
      }`}
      onClick={() => setHideOverlay(true)}
      onKeyDown={(e) => {
        console.log("overlay", e.key);
        document.getElementById(htmlFor)?.focus();
        setHideOverlay(true);
      }}
    >
      <AdsClickRoundedIcon />
      <p>Click here or press any key to focus</p>
    </label>
  );
};

export default TypingOverlayBlur;
