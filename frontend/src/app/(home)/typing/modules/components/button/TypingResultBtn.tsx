import ArrowRightIcon from "@/components/icons/arrow/ArrowRightIcon";
import { Tooltip } from "@nextui-org/tooltip";
import React, { useEffect, useRef } from "react";

const TypingResultBtn = ({ onNextTest }: { onNextTest: any }) => {
  const ref = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);
  return (
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
        onClick={onNextTest}
        className="text-typingTextNormal"
      >
        <ArrowRightIcon
          className="cursor-pointer"
          onClick={onNextTest}
          fontSize="large"
        ></ArrowRightIcon>
      </label>
    </Tooltip>
  );
};

export default TypingResultBtn;
