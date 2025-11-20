import KeyboardIcon from "@/components/icons/typing/KeyboardIcon";
import { useTyping } from "@/contexts/TypingStates";
import React from "react";

const TypingDetectVietnameseBtn = () => {
  const { isVietNamese } = useTyping();
  return (
    <div
      className={`absolute top-[20%] right-2 flex items-center gap-1 bg-typingColorActive p-2 rounded-lg z-50 text-xs ${
        isVietNamese ? "visible backdrop-blur-sm" : "invisible"
      }`}
    >
      <KeyboardIcon />
      Vietnamese
    </div>
  );
};

export default TypingDetectVietnameseBtn;
