import React from "react";
import { CursorStyles } from "../types";
import UnderlineCursor from "./cursor/UnderlineCursor";

type TypingCursorNewProps = {
  styles?: CursorStyles;
  cursorWidth: number;
  cursorPosition: number;
};

const TypingCursorNew = ({
  styles = "underline",
  cursorWidth,
  cursorPosition,
}: TypingCursorNewProps) => {
  return (
    <>
      {styles === "underline" && (
        <UnderlineCursor
          cursorPosition={cursorPosition}
          cursorWidth={cursorWidth}
        ></UnderlineCursor>
      )}
    </>
  );
};

export default TypingCursorNew;
