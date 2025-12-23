import FullScreenIcon from "@/components/icons/typing/FullScreenIcon";
import { useTyping } from "@/contexts/TypingStates";
import React from "react";

const TypingFullScreenBtn = () => {
  const { typingFullScreen, setTypingFullScreen, cursorIsTyping } = useTyping();
  return (
    <div
      className={`absolute top-2 right-2 p-[2px] hover:bg-typingBgControlMenu text-typingTextNormal rounded transition-all cursor-pointer ${
        cursorIsTyping ? "opacity-0" : "opacity-100"
      }`}
      onClick={() => setTypingFullScreen(!typingFullScreen)}
    >
      <FullScreenIcon></FullScreenIcon>
    </div>
  );
};

export default TypingFullScreenBtn;
