import React from "react";
import { CssPosition, CursorStyles } from "../types";
import UnderlineCursor from "./cursor/UnderlineCursor";
import BoxCursorNew from "./cursor/BoxCursorNew";
import LineCursorNew from "./cursor/LineCursorNew";
import BlockCursor from "./cursor/BlockCursor";

type TypingCursorNewProps = {
  cssPosition: CssPosition;
  styles?: CursorStyles;
  cursorWidth: number;
  cursorPosition: number;
  rect?: DOMRect | null;
  cursorHeight?: number;
  onClick?: () => void;
  className?: string;
  currentText?: string;
  showCursor?: boolean;
};

const TypingCursorNew = ({
  showCursor = false,
  cssPosition,
  rect,
  styles = "underline",
  cursorWidth,
  cursorHeight,
  cursorPosition,
  onClick,
  className,
  currentText,
}: TypingCursorNewProps) => {
  return (
    <div onClick={onClick} className={className}>
      {styles === "line" && (
        <LineCursorNew
          cssPosition={cssPosition}
          rect={rect}
          cursorPosition={cursorPosition}
          cursorWidth={cursorWidth}
          cursorHeight={cursorHeight}
          showCursor={showCursor}
        ></LineCursorNew>
      )}
      {styles === "underline" && (
        <UnderlineCursor
          cssPosition={cssPosition}
          rect={rect}
          cursorPosition={cursorPosition}
          cursorWidth={cursorWidth}
          showCursor={showCursor}
        ></UnderlineCursor>
      )}
      {styles === "box" && (
        <BoxCursorNew
          cssPosition={cssPosition}
          rect={rect}
          cursorPosition={cursorPosition}
          cursorWidth={cursorWidth}
          cursorHeight={cursorHeight}
          showCursor={showCursor}
        ></BoxCursorNew>
      )}
      {styles === "block" && (
        <BlockCursor
          cssPosition={cssPosition}
          rect={rect}
          cursorPosition={cursorPosition}
          cursorWidth={cursorWidth}
          cursorHeight={cursorHeight}
          currentText={currentText}
          showCursor={showCursor}
        ></BlockCursor>
      )}
    </div>
  );
};

export default TypingCursorNew;
