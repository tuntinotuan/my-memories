import PortalOverlay from "@/components/overlay/portal.overlay";
import { useLayoutStates } from "@/contexts/layoutStates";
import { useTyping } from "@/contexts/TypingStates";
import React from "react";

const UnderlineCursor = ({
  cssPosition,
  rect,
  cursorPosition,
  cursorWidth,
  showCursor,
  isTyping,
  transitionY,
}: any) => {
  return (
    <PortalOverlay notUsePortal={cssPosition === "absolute"}>
      <div
        className={`${cssPosition} h-[2px] bg-typingColorActive z-[999] ${
          isTyping
            ? "transition-typingCursor"
            : showCursor && "animate-careFlashSmooth"
        } ${showCursor ? "opacity-100" : "opacity-0"}`}
        style={{
          left: cursorPosition,
          top: rect ? rect.bottom - transitionY : 0,
          width: cursorWidth,
        }}
      ></div>
    </PortalOverlay>
  );
};

export default UnderlineCursor;
