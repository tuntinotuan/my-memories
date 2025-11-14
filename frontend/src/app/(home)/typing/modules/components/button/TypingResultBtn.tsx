import { Tooltip } from "@nextui-org/tooltip";
import React, { useEffect, useRef } from "react";

const TypingResultBtn = ({
  onNextTest,
  icon,
}: {
  onNextTest: any;
  icon: React.ReactNode;
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
      content="Next test"
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
        {icon}
      </label>
    </Tooltip>
  );
};

export default TypingResultBtn;
