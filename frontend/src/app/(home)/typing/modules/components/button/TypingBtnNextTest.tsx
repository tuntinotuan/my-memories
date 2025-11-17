import React from "react";
import TypingResultBtn from "./TypingResultBtn";
import ArrowRightIcon from "@/components/icons/arrow/ArrowRightIcon";
import { useTyping } from "@/contexts/TypingStates";

const TypingBtnNextTest = () => {
  const {
    setShowResults,
    setHideOverlay,
    resetRunningManyWords,
    setIsCountDown,
    resetCountDownIsInitial,
    setCursorIsTyping,
    setResetTyping,
  } = useTyping();
  const handleOnClick = () => {
    setResetTyping(false);
    setTimeout(() => {
      setResetTyping(true);
    }, 0);
    setShowResults(false);
    setHideOverlay(true);
    resetRunningManyWords();
    resetCountDownIsInitial();
    setIsCountDown(false);
    setCursorIsTyping(false);
  };
  return (
    <TypingResultBtn tooltipTitle="Next test" onClick={handleOnClick}>
      <ArrowRightIcon
        className="cursor-pointer"
        onClick={handleOnClick}
        fontSize="small"
      ></ArrowRightIcon>
    </TypingResultBtn>
  );
};

export default TypingBtnNextTest;
