import { Tooltip } from "@nextui-org/tooltip";
import React, { useEffect, useRef } from "react";

const TypingResultBtn = ({
  onClick,
  children,
  tooltipTitle = "Next test",
  tableIndex = 0,
}: {
  onClick: any;
  children: React.ReactNode;
  tooltipTitle: string;
  tableIndex?: number;
}) => {
  const ref = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    if (ref.current && tooltipTitle === "Next test") {
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
        tabIndex={tableIndex}
        ref={ref}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onClick && onClick();
          }
        }}
        onClick={onClick}
        className="text-typingTextNormal bg-gray-100 bg-opacity-5 rounded-md p-2"
      >
        {children}
      </label>
    </Tooltip>
  );
};

export default TypingResultBtn;
