import { useTyping } from "@/contexts/TypingStates";
import { WordAmountType } from "../../types";

export const WordAmount = () => {
  const listAmount: WordAmountType[] = [10, 25, 50, 100];
  const { wordAmount, setWordAmount, typingSettingLocal } = useTyping();
  return (
    <>
      {listAmount.map((item) => (
        <p
          key={item}
          className={`transition-all cursor-pointer ${
            item === typingSettingLocal?.wordAmount
              ? "text-typingColorActive"
              : "hover:text-typingTextHover"
          }`}
          onClick={() => setWordAmount(item)}
        >
          {item}
        </p>
      ))}
    </>
  );
};
