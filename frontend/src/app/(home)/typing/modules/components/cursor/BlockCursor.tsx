import PortalOverlay from "@/components/overlay/portal.overlay";
import { useLayoutStates } from "@/contexts/layoutStates";
import { useTyping } from "@/contexts/TypingStates";
import React from "react";

const BlockCursor = ({
  cssPosition,
  rect,
  cursorPosition,
  cursorWidth,
  cursorHeight,
  currentText,
  showCursor,
  isTyping,
  transitionY,
}: any) => {
  return (
    <PortalOverlay notUsePortal={cssPosition === "absolute"}>
      <div
        className={`${cssPosition} flex items-center justify-center text-2xl text-typingTextCorrect bg-typingColorActive h-full transition-all z-[999] ${
          isTyping ? "" : showCursor && "animate-careFlashSmooth"
        } ${showCursor ? "opacity-100" : "opacity-0"}`}
        style={{
          left: cursorPosition,
          top: rect ? rect.bottom : 0,
          width: cursorWidth,
          height: cursorHeight || (rect ? rect.height : 0),
          transform: `${
            transitionY > 0
              ? `translateY(-${transitionY + rect.height}px)`
              : `translateY(-${rect ? rect.height : 0}px)`
          }`,
        }}
      >
        {" "}
        {currentText}
        {/* <PortalOverlay>
          <p
            className="fixed z-[9999] flex items-center justify-center text-2xl text-typingTextCorrect"
            style={{
              left: cursorPosition,
              top: rect ? rect.bottom : 0,
              width: cursorWidth,
              height: cursorHeight || (rect ? rect.height : 0),
              transform: `translateY(-${rect ? rect.height : 0}px)`,
            }}
          >
            {currentText}
          </p>
        </PortalOverlay> */}
      </div>
    </PortalOverlay>
  );
};

export default BlockCursor;
