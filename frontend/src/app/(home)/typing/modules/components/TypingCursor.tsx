import React from "react";
import LineCursor from "./cursor/LineCursor";
import { CursorStyles } from "../types";
import BoxCursor from "./cursor/BoxCursor";

type TypingCursorProps = {
  value: string;
  id: string;
  onChange: (e: any) => void;
  onKeyDown: (e: any) => void;
  cursorPosition: number;
  styles?: CursorStyles;
  cursorWidth: any;
};

const TypingCursor = ({
  value,
  id,
  onChange,
  onKeyDown,
  cursorPosition,
  styles = "line",
  cursorWidth,
}: TypingCursorProps) => {
  return (
    <>
      {styles === "line" && (
        <LineCursor
          value={value}
          id={id}
          onChange={onChange}
          cursorPosition={cursorPosition}
          onKeyDown={onKeyDown}
        ></LineCursor>
      )}
      {styles === "box" && (
        <BoxCursor
          value={value}
          id={id}
          onChange={onChange}
          cursorPosition={cursorPosition}
          onKeyDown={onKeyDown}
          cursorWidth={cursorWidth}
        ></BoxCursor>
      )}
      {/* {styles === "underline" && (
        <UnderlineCursor
          value={value}
          id={id}
          onChange={onChange}
          cursorPosition={cursorPosition}
          onKeyDown={onKeyDown}
          cursorWidth={cursorWidth}
        ></UnderlineCursor>
      )} */}
    </>
  );
};

export default TypingCursor;
