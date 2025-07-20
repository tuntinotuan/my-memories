import { useTyping } from "@/contexts/TypingStates";
import React from "react";

const UnderlineCursor = ({ cursorPosition, cursorWidth }: any) => {
  const { cursorIsTyping } = useTyping();
  return (
    <div
      className={`fixed -bottom-[6%] h-1 bg-typingColorActive transition-all ${
        cursorIsTyping ? "" : "animate-careFlashSmooth666"
      }`}
      style={{ left: cursorPosition, width: cursorWidth }}
    ></div>
  );
};

export default UnderlineCursor;
