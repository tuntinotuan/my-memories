import { useTyping } from "@/contexts/TypingStates";
import React from "react";

type TypingCursorProps = {
  value: string;
  id: string;
  onChange: (e: any) => void;
  onKeyDown: (e: any) => void;
  cursorPosition: number;
};

const TypingCursor = ({
  value,
  id,
  onChange,
  onKeyDown,
  cursorPosition,
}: TypingCursorProps) => {
  const { cursorIsTyping } = useTyping();
  return (
    <input
      value={value}
      className={`absolute top-0 bottom-0 w-[2px] rounded h-full bg-typingColorActive text-transparent opacity-0 focus:opacity-100  transition-all ${
        cursorIsTyping ? "" : "focus:animate-hideShow"
      }`}
      id={id}
      onChange={onChange}
      style={{ left: cursorPosition }}
      onKeyDown={onKeyDown}
    />
  );
};

export default TypingCursor;
