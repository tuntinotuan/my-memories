import TextBoxBorderOverlay from "@/components/overlay/text.box.border.overlay";
import React from "react";
import TypingCursor from "../TypingCursor";
import { typingWordsTypes } from "@/api/typing/typing.type";
import TypingWordNew from "../TypingWordNew";

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
            <TypingCursor
              value={"a"}
              id={""}
              onChange={() => {}}
              onKeyDown={() => {}}
              cursorPosition={0}
              cursorWidth={20}
            ></TypingCursor>
          </div>
        </div>
      </div>
    </TextBoxBorderOverlay>
  );
};

export default TextAppearance;
