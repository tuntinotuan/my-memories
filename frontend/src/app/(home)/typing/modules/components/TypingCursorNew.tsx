import React from "react";
import { CssPosition, CursorStyles } from "../types";
import UnderlineCursor from "./cursor/UnderlineCursor";
import BoxCursorNew from "./cursor/BoxCursorNew";

type TypingCursorNewProps = {
  cssPosition: CssPosition;
  styles?: CursorStyles;
  cursorWidth: number;
  cursorPosition: number;
  rect?: DOMRect | null;
  cursorHeight?: number;
  onClick?: () => void;
};

const TypingCursorNew = ({
  cssPosition,
  rect,
  styles = "underline",
  cursorWidth,
  cursorHeight,
  cursorPosition,
  onClick,
}: TypingCursorNewProps) => {
  return (
    <div onClick={onClick}>
      {styles === "underline" && (
        <UnderlineCursor
          cssPosition={cssPosition}
          rect={rect}
          cursorPosition={cursorPosition}
          cursorWidth={cursorWidth}
        ></UnderlineCursor>
      )}
      {styles === "box" && (
        <BoxCursorNew
          cssPosition={cssPosition}
          rect={rect}
          cursorPosition={cursorPosition}
          cursorWidth={cursorWidth}
          cursorHeight={cursorHeight}
        ></BoxCursorNew>
      )}
    </div>
  );
};

export default TypingCursorNew;
