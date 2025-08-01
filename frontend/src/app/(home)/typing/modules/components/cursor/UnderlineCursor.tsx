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
}: any) => {
  return (
    <PortalOverlay notUsePortal={cssPosition === "absolute"}>
      <div
        className={`${cssPosition} h-[2px] bg-typingColorActive transition-all z-[999] ${
          isTyping ? "" : showCursor && "animate-careFlashSmooth"
        } ${showCursor ? "opacity-100" : "opacity-0"}`}
        style={{
          left: cursorPosition,
          top: rect ? rect.bottom : 0,
          width: cursorWidth,
        }}
      ></div>
    </PortalOverlay>
  );
};

export default UnderlineCursor;
