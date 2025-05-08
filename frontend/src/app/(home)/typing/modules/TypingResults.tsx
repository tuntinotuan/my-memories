import MyTooltip from "@/components/tooltip/MyTooltip";
import TypingRestart from "@/components/typing/TypingRestart";
import { useTyping } from "@/contexts/TypingStates";
import {
  typingCaculateResultWithWordAmount,
  typingCaculateResultWithWordTime,
} from "@/utils/typingFs";

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
      <TypingRestart
        onRestart={() => {
          setShowResults(false);
          setHideOverlay(true);
          resetRunningManyWords();
          resetCountDownIsInitial();
          setIsCountDown(false);
        }}
        className="flex-none"
      ></TypingRestart>
    </div>
  );
};
