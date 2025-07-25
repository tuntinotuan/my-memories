import PortalOverlay from "@/components/overlay/portal.overlay";
import { useLayoutStates } from "@/contexts/layoutStates";
import { useTyping } from "@/contexts/TypingStates";
import React from "react";

const UnderlineCursor = ({
  cssPosition,
  rect,
  cursorPosition,
  cursorWidth,
}: any) => {
  const { cursorIsTyping } = useTyping();
  const { showTypingSetting } = useLayoutStates();
  return (
    <PortalOverlay notUsePortal={cssPosition === "absolute"}>
      <div
        className={`${cssPosition} h-[2px] bg-typingColorActive transition-all z-[999] ${
          cursorIsTyping ? "" : "animate-careFlashSmooth666"
        } ${showTypingSetting ? "opacity-100" : "opacity-0"}`}
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
