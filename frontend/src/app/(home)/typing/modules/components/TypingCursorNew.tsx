import React from "react";
import { CursorStyles } from "../types";
import UnderlineCursor from "./cursor/UnderlineCursor";
import BoxCursorNew from "./cursor/BoxCursorNew";

type TypingCursorNewProps = {
  styles?: CursorStyles;
  cursorWidth: number;
  cursorPosition: number;
  rect?: DOMRect | null;
};

const TypingCursorNew = ({
  rect,
  styles = "underline",
  cursorWidth,
  cursorPosition,
}: TypingCursorNewProps) => {
  return (
    <>
      {styles === "underline" && (
        <UnderlineCursor
          rect={rect}
          cursorPosition={cursorPosition}
          cursorWidth={cursorWidth}
        ></UnderlineCursor>
      )}
      {styles === "box" && (
        <BoxCursorNew
          rect={rect}
          cursorPosition={cursorPosition}
          cursorWidth={cursorWidth}
        ></BoxCursorNew>
      )}
    </>
  );
};

export default TypingCursorNew;
