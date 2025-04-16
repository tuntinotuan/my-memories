import TypingCursor from "./components/TypingCursor";
import TypingMeaning from "./components/TypingMeaning";
import TypingWord from "./components/TypingWord";

type TypingOnlyAWordProps = {
  currentTyping: any;
  text: string;
  onChange: (e: any) => void;
  onKeyDown: (e: any) => void;
  cursorPosition: number;
};

export const TypingOnlyAWord = ({
  currentTyping,
  text,
  onChange,
  onKeyDown,
  cursorPosition,
}: TypingOnlyAWordProps) => {
  return (
    <>
      <TypingWord
        currentTyping={currentTyping}
        text={text}
        onChange={onChange}
        onKeyDown={onKeyDown}
        cursorPosition={cursorPosition}
      ></TypingWord>
      <TypingMeaning>{currentTyping.meaning}</TypingMeaning>
    </>
  );
};
