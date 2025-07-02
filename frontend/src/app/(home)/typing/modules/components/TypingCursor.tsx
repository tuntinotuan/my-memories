import React from "react";
import LineCursor from "./cursor/LineCursor";

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
  return (
    <LineCursor
      value={value}
      id={id}
      onChange={onChange}
      cursorPosition={cursorPosition}
      onKeyDown={onKeyDown}
    ></LineCursor>
  );
};

export default TypingCursor;
