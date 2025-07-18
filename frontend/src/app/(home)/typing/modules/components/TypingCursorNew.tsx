import React from "react";
import { CursorStyles } from "../types";
import UnderlineCursor from "./cursor/UnderlineCursor";
import BoxCursorNew from "./cursor/BoxCursorNew";

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
      {styles === "box" && (
        <BoxCursorNew
          cursorPosition={cursorPosition}
          cursorWidth={cursorWidth}
        ></BoxCursorNew>
      )}
    </>
  );
};

export default TypingCursorNew;
