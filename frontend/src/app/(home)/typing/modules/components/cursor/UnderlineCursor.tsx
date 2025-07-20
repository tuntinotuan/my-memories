import PortalOverlay from "@/components/overlay/portal.overlay";
import { useTyping } from "@/contexts/TypingStates";
import React from "react";

const UnderlineCursor = ({ cursorPosition, cursorWidth, cursorTop }: any) => {
  const { cursorIsTyping } = useTyping();
  return (
    <PortalOverlay>
      <div
        className={`fixed -bottom-[6%] h-1 bg-typingColorActive transition-all z-[999] ${
          cursorIsTyping ? "" : "animate-careFlashSmooth666"
        }`}
        style={{ left: cursorPosition, top: cursorTop, width: cursorWidth }}
      ></div>
    </PortalOverlay>
  );
};

export default UnderlineCursor;
