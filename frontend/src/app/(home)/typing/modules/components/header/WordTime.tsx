import { useTyping } from "@/contexts/TypingStates";
import { WordTimeType } from "../../types";

export const WordTime = () => {
  const listTime: WordTimeType[] = [15, 30, 60, 120];
  const { wordTime, setWordTime } = useTyping();
  return (
    <>
      {listTime.map((item) => (
        <p
          key={item}
          className={`transition-all cursor-pointer ${
            item === wordTime
              ? "text-typingColorActive"
              : "hover:text-typingTextHover"
          }`}
          onClick={() => setWordTime(item)}
        >
          {item}
        </p>
      ))}
    </>
  );
};
