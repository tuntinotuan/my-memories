import MyTooltip from "@/components/tooltip/MyTooltip";
import { useTyping } from "@/contexts/TypingStates";
import {
  typingCaculateResultWithWordAmount,
  typingCaculateResultWithWordTime,
} from "@/utils/typingFs";
import TypingBtnRepeatTest from "../components/button/TypingBtnRepeatTest";
import TypingBtnNextTest from "../components/button/TypingBtnNextTest";

export const TypingResults = () => {
  const {
    secondsOfManyWords,
    wordAmount,
    typingStyles,
    wordTime,
    preTestList,
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
        <TypingBtnNextTest />
        <TypingBtnRepeatTest />
      </div>
      <label
        tabIndex={0}
        className="text-typingTextNormal bg-gray-100 bg-opacity-5 rounded-md p-2"
      >
        hello
      </label>
      <label
        tabIndex={0}
        className="text-typingTextNormal bg-gray-100 bg-opacity-5 rounded-md p-2"
      >
        hi
      </label>
      {/* <div className="flex gap-1">
        {preTestList.map((item, index) => (
          <p key={index}>{item.word}</p>
        ))}
      </div> */}
    </div>
  );
};
