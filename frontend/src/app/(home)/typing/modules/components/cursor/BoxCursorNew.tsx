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
}: any) => {
  return (
    <PortalOverlay notUsePortal={cssPosition === "absolute"}>
      <div
        className={`${cssPosition} border border-typingColorActive h-full transition-all z-[999] ${
          isTyping ? "" : showCursor && "animate-careFlashSmooth"
        } ${showCursor ? "opacity-100" : "opacity-0"}`}
        style={{
          left: cursorPosition,
          top: rect ? rect.bottom : 0,
          width: cursorWidth,
          height: cursorHeight || (rect ? rect.height : 0),
          transform: `translateY(-${rect ? rect.height : 0}px)`,
        }}
      ></div>
    </PortalOverlay>
  );
};

export default BoxCursorNew;
