import RepeatIcon from "@/components/icons/typing/RepeatIcon";
import React from "react";
import TypingResultBtn from "./TypingResultBtn";
import { useTyping } from "@/contexts/TypingStates";

const TypingBtnRepeatTest = () => {
  const {
    setShowResults,
    setHideOverlay,
    resetRunningManyWords,
    setIsCountDown,
    resetCountDownIsInitial,
    setCursorIsTyping,
    setResetTyping,
    setRepeatTest,
  } = useTyping();
  const handleClick = () => {
    setRepeatTest(true);
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
    <TypingResultBtn
      tooltipTitle="Repeat test"
      onClick={handleClick}
      tableIndex={0}
    >
      <RepeatIcon className="cursor-pointer" fontSize="small" />
    </TypingResultBtn>
  );
};

export default TypingBtnRepeatTest;
