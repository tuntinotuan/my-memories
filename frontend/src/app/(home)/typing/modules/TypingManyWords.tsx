import { typingWordsTypes } from "@/api/typing/typing.type";
import TypingWord from "./components/TypingWord";

type TypingManyWordsProps = {
  text: string;
  words: typingWordsTypes[];
  onChange: (e: any) => void;
  onKeyDown: (e: any) => void;
  cursorPosition: number;
};

export const TypingManyWords = ({
  text,
  words,
  onChange,
  onKeyDown,
  cursorPosition,
}: TypingManyWordsProps) => {
  console.log("words", words);
  return (
    <div className="flex flex-wrap gap-4">
      {words.map((word, index) => (
        <TypingWord
          key={index}
          currentTyping={word}
          text={text}
          onChange={onChange}
          onKeyDown={onKeyDown}
          cursorPosition={cursorPosition}
        ></TypingWord>
      ))}
    </div>
  );
};
