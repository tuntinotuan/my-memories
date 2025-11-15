import RepeatIcon from "@/components/icons/typing/RepeatIcon";
import { Tooltip } from "@nextui-org/tooltip";
import React from "react";
import TypingResultBtn from "./TypingResultBtn";

const TypingBtnRepeatTest = () => {
  return (
    <TypingResultBtn tooltipTitle="Repeat test" onNextTest={() => {}}>
      <RepeatIcon className="cursor-pointer" fontSize="small" />
    </TypingResultBtn>
    // <Tooltip
    //   showArrow
    //   content="Repeat test"
    //   placement="top"
    //   radius="sm"
    //   delay={200}
    //   closeDelay={200}
    //   className="!px-2 !py-[2px]"
    //   shadow="sm"
    // >
    //   <label tabIndex={0} className="text-typingTextNormal">
    //     <RepeatIcon className="cursor-pointer" fontSize="small"></RepeatIcon>
    //   </label>
    // </Tooltip>
  );
};

export default TypingBtnRepeatTest;
