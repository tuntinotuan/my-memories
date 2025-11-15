import React from "react";
import TypingResultBtn from "./TypingResultBtn";
import ArrowRightIcon from "@/components/icons/arrow/ArrowRightIcon";

const TypingBtnNextTest = ({ onClick }: { onClick: () => any }) => {
  return (
    <TypingResultBtn tooltipTitle="Next test" onClick={onClick}>
      <ArrowRightIcon
        className="cursor-pointer"
        onClick={onClick}
        fontSize="large"
      ></ArrowRightIcon>
    </TypingResultBtn>
  );
};

export default TypingBtnNextTest;
