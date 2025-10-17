import ClockIcon from "@/components/icons/typing/ClockIcon";
import CombineIcon from "@/components/icons/typing/CombineIcon";
import WordIcon from "@/components/icons/typing/WordIcon";
import { useTyping } from "@/contexts/TypingStates";
import { BtnTypingStyles } from "./BtnTypingStyles";
import { ListBtnTypes } from "../../types";

export const ListBtnTypingStyles = () => {
  const { setTypingStyles } = useTyping();
  const listBtn: ListBtnTypes = [
    {
      text: "time",
      icon: <ClockIcon />,
      style: "time",
      onClick: () => {
        setTypingStyles("time"),
          document.activeElement instanceof HTMLElement &&
            document.activeElement.blur();
        document.getElementById("typingKeyboardId")?.blur();
      },
    },
    {
      text: "combine",
      icon: <CombineIcon />,
      style: "combine",
      onClick: () => {
        setTypingStyles("combine"),
          document.activeElement instanceof HTMLElement &&
            document.activeElement.blur();
        document.getElementById("typingKeyboardId")?.blur();
      },
      tooltipText: "Keyword above & meaning below",
    },
    {
      text: "words",
      icon: <WordIcon />,
      style: "words",
      onClick: () => {
        setTypingStyles("words"),
          document.activeElement instanceof HTMLElement &&
            document.activeElement.blur();
        document.getElementById("typingKeyboardId")?.blur();
      },
    },
  ];
  return (
    <>
      {listBtn.map((btn) => (
        <BtnTypingStyles
          key={btn.text}
          icon={btn.icon}
          style={btn.style}
          onClick={btn.onClick}
          tooltipText={btn.tooltipText}
        >
          {btn.text}
        </BtnTypingStyles>
      ))}
    </>
  );
};
