import { useTyping } from "@/contexts/TypingStates";
import React from "react";

const TypingViewAmountOrTime = () => {
  const { typingStyles, wordAmount, countNextWord, secondsOfTimeWords } =
    useTyping();
  return (
    <>
      {typingStyles !== "combine" && (
        <div className="flex items-end justify-between h-[20vh] bg-opacity-5 backdrop-blur-sm w-full z-10 p-2 rounded">
          <p className="text-xl text-typingColorActive bg-typingBgControlMenu transition-all rounded py-1 px-2">
            {typingStyles === "words"
              ? `${countNextWord}/${wordAmount}`
              : secondsOfTimeWords}
          </p>
        </div>
      )}
    </>
  );
};

export default TypingViewAmountOrTime;
