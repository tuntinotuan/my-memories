import PortalOverlay from "@/components/overlay/portal.overlay";
import { useLayoutStates } from "@/contexts/layoutStates";
import { useTyping } from "@/contexts/TypingStates";
import React from "react";

const BoxCursorNew = ({ rect, cursorPosition, cursorWidth }: any) => {
  const { cursorIsTyping } = useTyping();
  const { showTypingSetting } = useLayoutStates();
  return (
    <PortalOverlay>
      <div
        className={`fixed border border-typingColorActive h-full transition-all z-[999] ${
          cursorIsTyping ? "" : "animate-careFlashSmooth666"
        } ${showTypingSetting ? "opacity-100" : "opacity-0"}`}
        style={{
          left: cursorPosition,
          top: rect ? rect.bottom : 0,
          width: cursorWidth,
          height: rect ? rect.height : 0,
          transform: `translateY(-${rect ? rect.height : 0}px)`,
        }}
      ></div>
    </PortalOverlay>
  );
};

export default BoxCursorNew;
