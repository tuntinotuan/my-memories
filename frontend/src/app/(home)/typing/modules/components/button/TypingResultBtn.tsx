import { Tooltip } from "@nextui-org/tooltip";
import React, { useEffect, useRef } from "react";

const TypingResultBtn = ({
  onNextTest,
  children,
  tooltipTitle = "Next test",
}: {
  onNextTest: any;
  children: React.ReactNode;
  tooltipTitle: string;
}) => {
  const ref = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);
  return (
    <Tooltip
      showArrow
      content={tooltipTitle}
      placement="top"
      radius="sm"
      delay={200}
      closeDelay={200}
      className="cursor-pointer !px-2 !py-[2px]"
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
        {children}
      </label>
    </Tooltip>
  );
};

export default TypingResultBtn;
