import MyTooltip from "@/components/tooltip/MyTooltip";
import TypingRestart from "@/app/(home)/typing/modules/components/TypingRestart";
import { useTyping } from "@/contexts/TypingStates";
import {
  typingCaculateResultWithWordAmount,
  typingCaculateResultWithWordTime,
} from "@/utils/typingFs";
import { useEffect, useRef } from "react";

export const TypingResults = () => {
  const {
    setShowResults,
    setHideOverlay,
    secondsOfManyWords,
    wordAmount,
    resetRunningManyWords,
    setIsCountDown,
    resetCountDownIsInitial,
    typingStyles,
    wordTime,
    setCursorIsTyping,
    setResetTyping,
  } = useTyping();
  const ref = useRef<HTMLParagraphElement>(null);
  const { wpm, acc, quantityCorrect, quantityWrong } =
    typingStyles === "words"
      ? typingCaculateResultWithWordAmount(
          secondsOfManyWords,
          wordAmount,
          document.getElementsByClassName("correct").length,
          document.getElementsByClassName("wrong").length
        )
      : typingCaculateResultWithWordTime(
          wordTime,
          document.getElementsByClassName("correct").length,
          document.getElementsByClassName("wrong").length
        );
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <div className="mx-auto h-full flex flex-col justify-center gap-2 text-typingTextNormal">
      {/* {`${wpm} ${acc} ${quantityCorrect} ${quantityWrong}`} */}
      <span className="text-3xl">wpm</span>
      <MyTooltip
        contents={
          <>
            <p>{`${wpm} wpm`}</p>
          </>
        }
      >
        <p ref={ref} tabIndex={0} className="text-6xl text-typingColorActive">
          {wpm}
        </p>
      </MyTooltip>
      <span className="text-3xl">acc</span>
      <MyTooltip
        contents={
          <>
            <p>{`${Math.round(acc * 100) / 100}%`}</p>
            <p>{`${quantityCorrect} correct`}</p>
            <p>{`${quantityWrong} incorrect`}</p>
          </>
        }
      >
        <p className="text-6xl text-typingColorActive">{`${Math.round(
          acc
        )}%`}</p>
      </MyTooltip>
      <TypingRestart
        onRestart={() => {
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
        }}
        className="flex-none"
      ></TypingRestart>
    </div>
  );
};
