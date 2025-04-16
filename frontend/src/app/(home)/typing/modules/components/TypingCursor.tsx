import React from "react";

type TypingCursorProps = {
  value: string;
  onChange: (e: any) => void;
  onKeyDown: (e: any) => void;
  cursorPosition: number;
};

const TypingCursor = ({
  value,
  onChange,
  onKeyDown,
  cursorPosition,
}: TypingCursorProps) => {
  return (
    <input
      value={value}
      className="absolute top-0 bottom-0 w-[2px] rounded h-full bg-[#43FFAF] text-transparent opacity-0 focus:opacity-100 focus:animate-hideShow transition-all"
      id="typingCursor"
      onChange={onChange}
      style={{ left: cursorPosition }}
      onKeyDown={onKeyDown}
    />
  );
};

export default TypingCursor;
