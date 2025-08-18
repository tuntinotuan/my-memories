import PortalOverlay from "@/components/overlay/portal.overlay";
import { useLayoutStates } from "@/contexts/layoutStates";
import { useTyping } from "@/contexts/TypingStates";
import React from "react";

const LineCursorNew = ({
  cssPosition,
  rect,
  cursorPosition,
  showCursor,
  cursorHeight,
  isTyping,
  transitionY,
}: any) => {
  return (
    <PortalOverlay notUsePortal={cssPosition === "absolute"}>
      <div
        className={`${cssPosition} w-[2px] rounded h-full bg-typingColorActive  transition-all z-[999] ${
          isTyping ? "" : showCursor && "animate-careFlashSmooth"
        } ${showCursor ? "opacity-100" : "opacity-0"}`}
        style={{
          left: cursorPosition,
          top: rect ? rect.bottom - transitionY : 0,
          height: cursorHeight || (rect ? rect.height : 0),
          transform: `translateY(-${rect ? rect.height : 0}px)`,
        }}
      ></div>
    </PortalOverlay>
  );
};

export default LineCursorNew;
