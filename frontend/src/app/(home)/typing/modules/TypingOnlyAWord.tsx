import TypingMeaning from "./components/TypingMeaning";
import TypingWord from "./components/TypingWord";
import TypingOverlayBlur from "./TypingOverlayBlur";

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
      <label>
        <TypingWord
          currentTyping={currentTyping}
          text={text}
          onChange={onChange}
          onKeyDown={onKeyDown}
          cursorPosition={cursorPosition}
        ></TypingWord>
      </label>
      <TypingMeaning>{currentTyping.meaning}</TypingMeaning>
      <TypingOverlayBlur htmlFor={"typingCursorId"}></TypingOverlayBlur>
    </>
  );
};
