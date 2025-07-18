import { useTyping } from "@/contexts/TypingStates";
import React from "react";

const BoxCursorNew = ({ cursorPosition, cursorWidth }: any) => {
  const { cursorIsTyping } = useTyping();
  return (
    <div
      className={`absolute top-0 bottom-0 border border-typingColorActive h-full transition-all ${
        cursorIsTyping ? "" : "animate-careFlashSmooth666"
      }`}
      style={{ left: cursorPosition, width: cursorWidth }}
    ></div>
  );
};

export default BoxCursorNew;
