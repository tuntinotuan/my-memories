import PortalOverlay from "@/components/overlay/portal.overlay";
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
  blockTextSize = "text-2xl",
}: any) => {
  const { fontFamily } = useTyping();
  return (
    <PortalOverlay notUsePortal={cssPosition === "absolute"}>
      <div
        className={`${cssPosition} flex items-center justify-center  text-typingTextCorrect bg-typingColorActive h-full z-[999] ${blockTextSize} ${
          isTyping
            ? "transition-typingCursor"
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
              className={`${fontFamily?.code} fixed z-[99999] flex items-center justify-center  transition-typingCursor text-typingTextCorrect`}
              style={{
                left: cursorPosition,
                top: rect ? rect.bottom - transitionY : 0,
                width: cursorWidth,
                height: cursorHeight || (rect ? rect.height : 0),
                transform: `${`translateY(-${rect ? rect.height : 0}px)`}`,
                fontSize: blockTextSize,
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
