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
  isTyping?: boolean;
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
  isTyping = false,
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
          isTyping={isTyping}
        ></LineCursorNew>
      )}
      {styles === "underline" && (
        <UnderlineCursor
          cssPosition={cssPosition}
          rect={rect}
          cursorPosition={cursorPosition}
          cursorWidth={cursorWidth}
          showCursor={showCursor}
          isTyping={isTyping}
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
          isTyping={isTyping}
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
          isTyping={isTyping}
        ></BlockCursor>
      )}
    </div>
  );
};

export default TypingCursorNew;
