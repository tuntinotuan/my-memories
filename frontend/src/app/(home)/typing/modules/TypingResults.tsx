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
    <div className="mx-auto h-full flex flex-col justify-around  gap-2 text-typingTextNormal">
      <span className="text-3xl">wpm</span>
      <p className="text-6xl text-typingColorActive">{wpm}</p>
      <span className="text-3xl">acc</span>
      <p className="text-6xl text-typingColorActive">{`${Math.round(acc)}%`}</p>
      <span className="text-3xl">time seconds</span>
      <p className="text-6xl text-typingColorActive">{secondsOfManyWords}</p>
      {quantityCorrect} |{quantityWrong}
      <TypingRestart
        onRestart={() => {
          setShowResults(false);
          setHideOverlay(true);
          resetRunningManyWords();
          resetCountDownIsInitial();
          setIsCountDown(false);
        }}
      ></TypingRestart>
    </div>
  );
};
