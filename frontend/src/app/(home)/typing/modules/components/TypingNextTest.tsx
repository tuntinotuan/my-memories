import React, { useEffect, useRef } from "react";
import { Tooltip } from "@nextui-org/tooltip";
import { useTyping } from "@/contexts/TypingStates";
import ArrowRightIcon from "@/components/icons/arrow/ArrowRightIcon";

type TypingNextTestProps = {
  onNextTest?: () => void;
  className?: string;
};

const TypingNextTest = ({ onNextTest, className }: TypingNextTestProps) => {
  const { typingStyles, typingFontsizeX, hideOverlay } = useTyping();
  const ref = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <div
      className={`flex justify-center z-10 bg-opacity-5 ${
        typingStyles !== "combine" ? "flex-1" : ""
      } ${
        typingStyles === "words" && typingFontsizeX <= 3 && hideOverlay
          ? "backdrop-blur-sm"
          : ""
      } ${typingFontsizeX > 3 ? "absolute top-20" : ""} ${className}`}
    >
      <Tooltip
        showArrow
        content="Next test"
        placement="top"
        radius="sm"
        delay={200}
        closeDelay={200}
        className="!px-2 !py-[2px]"
        shadow="sm"
      >
        <label
          tabIndex={0}
          ref={ref}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onNextTest && onNextTest();
            }
          }}
          className="text-typingTextNormal"
        >
          <ArrowRightIcon
            className="cursor-pointer"
            onClick={onNextTest}
            fontSize="large"
          ></ArrowRightIcon>
        </label>
      </Tooltip>
    </div>
  );
};

export default TypingNextTest;
