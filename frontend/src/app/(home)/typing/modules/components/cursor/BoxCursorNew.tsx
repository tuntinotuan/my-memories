import PortalOverlay from "@/components/overlay/portal.overlay";
import { useLayoutStates } from "@/contexts/layoutStates";
import { useTyping } from "@/contexts/TypingStates";
import React from "react";

const BoxCursorNew = ({
  cssPosition,
  rect,
  cursorPosition,
  cursorWidth,
  cursorHeight,
  showCursor,
  isTyping,
  transitionY,
}: any) => {
  return (
    <PortalOverlay notUsePortal={cssPosition === "absolute"}>
      <div
        className={`${cssPosition} border border-typingColorActive h-full z-[999] ${
          isTyping ? "transition-all" : showCursor && "animate-careFlashSmooth"
        } ${showCursor ? "opacity-100" : "opacity-0"}`}
        style={{
          left: cursorPosition,
          top: rect ? rect.bottom - transitionY : 0,
          width: cursorWidth,
          height: cursorHeight || (rect ? rect.height : 0),
          transform: `translateY(-${rect ? rect.height : 0}px)`,
        }}
      ></div>
    </PortalOverlay>
  );
};

export default BoxCursorNew;
