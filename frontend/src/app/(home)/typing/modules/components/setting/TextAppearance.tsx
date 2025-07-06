import TextBoxBorderOverlay from "@/components/overlay/text.box.border.overlay";
import React from "react";
import { typingWordsTypes } from "@/api/typing/typing.type";
import TypingWordNew from "../TypingWordNew";
import TypingCursorNew from "../TypingCursorNew";

const TextAppearance = () => {
  const wordList: typingWordsTypes[] = [
    {
      word: "I",
      meaning: "",
    },
    {
      word: "love",
      meaning: "",
    },
    {
      word: "you",
      meaning: "",
    },
    {
      word: "so",
      meaning: "",
    },
    {
      word: "much",
      meaning: "",
    },
  ];
  return (
    <TextBoxBorderOverlay className="w-full" title="Text appearance">
      <div className="flex flex-wrap justify-center gap-4 transition-all">
        {wordList.map((word, index) => (
          <TypingWordNew
            key={index}
            next={1}
            wordIndex={index}
            currentTyping={word}
            text={""}
            textSize="text-2xl"
            fontSize="24px"
          ></TypingWordNew>
        ))}
      </div>
      <div>
        <div className="flex ">
          Cursor shape:{" "}
          <div className="relative">
            <TypingCursorNew
              cursorPosition={0}
              cursorWidth={20}
            ></TypingCursorNew>
          </div>
        </div>
      </div>
    </TextBoxBorderOverlay>
  );
};

export default TextAppearance;
