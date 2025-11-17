import RepeatIcon from "@/components/icons/typing/RepeatIcon";
import React from "react";
import TypingResultBtn from "./TypingResultBtn";

const TypingBtnRepeatTest = () => {
  return (
    <TypingResultBtn
      tooltipTitle="Repeat test"
      onClick={() => {}}
      tableIndex={1}
    >
      <RepeatIcon className="cursor-pointer" fontSize="small" />
    </TypingResultBtn>
  );
};

export default TypingBtnRepeatTest;
