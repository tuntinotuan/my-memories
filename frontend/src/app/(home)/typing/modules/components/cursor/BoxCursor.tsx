import { useTyping } from "@/contexts/TypingStates";
import React from "react";

const BoxCursor = ({
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
      className={`absolute top-0 bottom-0 border border-typingColorActive h-full text-transparent opacity-0 focus:opacity-100  transition-all ${
        cursorIsTyping ? "" : "focus:animate-careFlashSmooth"
      }`}
      id={id}
      onChange={onChange}
      style={{ left: cursorPosition, width: cursorWidth }}
      onKeyDown={onKeyDown}
    />
  );
};

export default BoxCursor;
