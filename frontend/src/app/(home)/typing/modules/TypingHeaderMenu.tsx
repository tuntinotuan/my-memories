import SettingIcon from "@/components/icons/SettingIcon";
import { Tooltip } from "@nextui-org/tooltip";
import ClockIcon from "@/components/icons/ClockIcon";
import WordIcon from "@/components/icons/WordIcon";
import SplitscreenRoundedIcon from "@mui/icons-material/SplitscreenRounded";
import { typingStylesType, useTyping } from "@/contexts/typingStates";
import React from "react";
import { WordAmountType } from "./types";

export const TypingHeaderMenu = () => {
  const { typingStyles } = useTyping();
  return (
    <div className="flex items-center gap-3 !w-auto mx-auto bg-[#1F232C] text-[#526777] rounded-lg px-5 py-3">
      <Tooltip
        showArrow
        content="Practice with your typing skill and remember your keyword"
        placement="bottom"
        radius="sm"
        delay={200}
        closeDelay={200}
        className="!px-2 !py-[2px]"
        shadow="sm"
      >
        <h1 className="cursor-default">Typing</h1>
      </Tooltip>
      <SplitElement />
      <ListBtnTypingStyles />
      {typingStyles === "words" && (
        <>
          <SplitElement />
          <WordAmount />
        </>
      )}
      <SettingIcon></SettingIcon>
    </div>
  );
};
const SplitElement = () => {
  return <div className="w-[6px] h-full bg-[#262A33] rounded-full"></div>;
};
const WordAmount = () => {
  const listAmount: WordAmountType[] = [10, 25, 50, 100];
  const { wordAmount, setWordAmount } = useTyping();
  return (
    <>
      {listAmount.map((item) => (
        <p
          key={item}
          className={`transition-all cursor-pointer ${
            item === wordAmount ? "text-[#43FFAF]" : "hover:text-white"
          }`}
          onClick={() => setWordAmount(item)}
        >
          {item}
        </p>
      ))}
    </>
  );
};
const BtnTypingStyles = ({
  icon,
  children,
  onClick,
  className,
  tooltipText,
  style,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
  style: typingStylesType;
  tooltipText?: string;
  className?: string;
}) => {
  const { typingStyles } = useTyping();
  const Main = () => {
    return (
      <div
        className={`flex items-center gap-1 transition-all cursor-default ${
          typingStyles === style
            ? "text-[#43FFAF]"
            : "hover:text-white cursor-pointer"
        } ${className}`}
        onClick={onClick}
      >
        {icon}
        {children}
      </div>
    );
  };
  if (tooltipText)
    return (
      <Tooltip
        showArrow
        content={tooltipText}
        placement="bottom"
        radius="sm"
        delay={500}
        closeDelay={200}
        className="!px-2 !py-[2px]"
        shadow="sm"
      >
        <div>
          <Main />
        </div>
      </Tooltip>
    );
  return <Main />;
};
const ListBtnTypingStyles = () => {
  const { setTypingStyles } = useTyping();
  const listBtn: {
    text: string;
    icon: React.ReactNode;
    style: typingStylesType;
    onClick: () => void;
    tooltipText?: string;
  }[] = [
    {
      text: "time",
      icon: <ClockIcon />,
      style: "time",
      onClick: () => setTypingStyles("time"),
    },
    {
      text: "combine",
      icon: <SplitscreenRoundedIcon fontSize="inherit" />,
      style: "combine",
      onClick: () => setTypingStyles("combine"),
      tooltipText: "Keyword above & meaning below",
    },
    {
      text: "words",
      icon: <WordIcon />,
      style: "words",
      onClick: () => setTypingStyles("words"),
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
