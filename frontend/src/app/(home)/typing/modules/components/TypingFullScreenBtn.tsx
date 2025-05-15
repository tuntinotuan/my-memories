import FullScreenIcon from "@/components/icons/FullScreenIcon";
import { useTyping } from "@/contexts/TypingStates";
import React from "react";

const TypingFullScreenBtn = () => {
  const { typingFullScreen, setTypingFullScreen } = useTyping();
  return (
    <div
      className="absolute top-2 right-2 p-[2px] hover:bg-typingBgControlMenu text-typingTextNormal rounded transition-all cursor-pointer"
      onClick={() => setTypingFullScreen(!typingFullScreen)}
    >
      <FullScreenIcon></FullScreenIcon>
    </div>
  );
};

export default TypingFullScreenBtn;
