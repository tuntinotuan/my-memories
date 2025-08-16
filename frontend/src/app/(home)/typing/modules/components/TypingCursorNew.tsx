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
  transitionY?: number;
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
  transitionY = 0,
}: TypingCursorNewProps) => {
  if (className)
    return (
      <div onClick={onClick} className={className}>
        <BodyLocal
          showCursor={showCursor}
          cssPosition={cssPosition}
          rect={rect}
          styles={styles}
          cursorWidth={cursorWidth}
          cursorHeight={cursorHeight}
          cursorPosition={cursorPosition}
          currentText={currentText}
          isTyping={isTyping}
          transitionY={transitionY}
        ></BodyLocal>
      </div>
    );
  return (
    <>
      <BodyLocal
        showCursor={showCursor}
        cssPosition={cssPosition}
        rect={rect}
        styles={styles}
        cursorWidth={cursorWidth}
        cursorHeight={cursorHeight}
        cursorPosition={cursorPosition}
        currentText={currentText}
        isTyping={isTyping}
        transitionY={transitionY}
      ></BodyLocal>
    </>
  );
};

const BodyLocal = ({
  showCursor = false,
  cssPosition,
  rect,
  styles = "underline",
  cursorWidth,
  cursorHeight,
  cursorPosition,
  currentText,
  isTyping = false,
  transitionY = 0,
}: any) => {
  return (
    <>
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
          transitionY={transitionY}
        ></BlockCursor>
      )}
    </>
  );
};

export default TypingCursorNew;
