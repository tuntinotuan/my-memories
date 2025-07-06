import { useTyping } from "@/contexts/TypingStates";
import React from "react";

const UnderlineCursor = ({ cursorPosition, cursorWidth }: any) => {
  const { cursorIsTyping } = useTyping();
  return (
    <div
      className={`absolute -bottom-[6%] h-1 bg-typingColorActive text-transparent opacity-0 focus:opacity-100 transition-all ${
        cursorIsTyping ? "" : "animate-careFlashSmooth"
      }`}
      style={{ left: cursorPosition, width: cursorWidth }}
    ></div>
  );
};

export default UnderlineCursor;
