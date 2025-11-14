import MyTooltip from "@/components/tooltip/MyTooltip";
import { useTyping } from "@/contexts/TypingStates";
import {
  typingCaculateResultWithWordAmount,
  typingCaculateResultWithWordTime,
} from "@/utils/typingFs";
import TypingNextTest from "../components/TypingNextTest";
import TypingBtnRepeatTest from "../components/button/TypingBtnRepeatTest";

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
        <p className="text-6xl text-typingColorActive">{wpm}</p>
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
      <div className="flex items-center gap-4">
        <TypingNextTest
          onNextTest={() => {
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
        ></TypingNextTest>
        <TypingBtnRepeatTest />
      </div>
    </div>
  );
};
