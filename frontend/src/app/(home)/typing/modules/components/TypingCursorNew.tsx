import React from "react";
import { CursorStyles } from "../types";
import UnderlineCursor from "./cursor/UnderlineCursor";

type TypingCursorNewProps = {
  value: string;
  id: string;
  onChange: (e: any) => void;
  onKeyDown: (e: any) => void;
  cursorPosition: number;
  styles?: CursorStyles;
  cursorWidth: any;
};

const TypingCursorNew = ({
  value,
  id,
  onChange,
  onKeyDown,
  cursorPosition,
  styles = "underline",
  cursorWidth,
}: TypingCursorNewProps) => {
  return (
    <>
      {styles === "underline" && (
        <UnderlineCursor
          value={value}
          id={id}
          onChange={onChange}
          cursorPosition={cursorPosition}
          onKeyDown={onKeyDown}
          cursorWidth={cursorWidth}
        ></UnderlineCursor>
      )}
    </>
  );
};

export default TypingCursorNew;
