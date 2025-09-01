import PortalOverlay from "@/components/overlay/portal.overlay";
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
  blockTextSize = "text-2xl",
}: any) => {
  return (
    <PortalOverlay notUsePortal={cssPosition === "absolute"}>
      <div
        className={`${cssPosition} flex items-center justify-center  text-typingTextCorrect bg-typingColorActive h-full z-[999] ${blockTextSize} ${
          isTyping
            ? "transition-position"
            : showCursor && "animate-careFlashSmooth"
        } ${showCursor ? "opacity-100" : "opacity-0"}`}
        style={{
          left: cursorPosition,
          top: rect ? rect.bottom - transitionY : 0,
          width: cursorWidth,
          height: cursorHeight || (rect ? rect.height : 0),
          transform: `${`translateY(-${rect ? rect.height : 0}px)`}`,
        }}
      >
        {/* {currentText} */}
        {showCursor && (
          <PortalOverlay>
            <p
              className={`fixed z-[99999] flex items-center justify-center  transition-all text-typingTextCorrect ${blockTextSize}`}
              style={{
                left: cursorPosition,
                top: rect ? rect.bottom - transitionY : 0,
                width: cursorWidth,
                height: cursorHeight || (rect ? rect.height : 0),
                transform: `${`translateY(-${rect ? rect.height : 0}px)`}`,
              }}
            >
              {currentText}
            </p>
          </PortalOverlay>
        )}
      </div>
    </PortalOverlay>
  );
};

export default BlockCursor;
