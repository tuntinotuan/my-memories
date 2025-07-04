import { useTyping } from "@/contexts/TypingStates";
import React from "react";

const UnderlineCursor = ({
  value,
  id,
  onChange,
  cursorPosition,
  onKeyDown,
  cursorWidth,
}: any) => {
  const { cursorIsTyping } = useTyping();
  return (
    <input
      value={value}
      className={`absolute -bottom-[6%] h-1 bg-typingColorActive text-transparent opacity-0 focus:opacity-100 transition-all ${
        cursorIsTyping ? "" : "focus:animate-careFlashSmooth"
      }`}
      id={id}
      onChange={onChange}
      style={{ left: cursorPosition, width: cursorWidth }}
      onKeyDown={onKeyDown}
    />
  );
};

export default UnderlineCursor;
