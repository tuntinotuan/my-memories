import { Tooltip } from "@nextui-org/tooltip";
import ClockIcon from "@/components/icons/ClockIcon";
import WordIcon from "@/components/icons/WordIcon";
import SplitscreenRoundedIcon from "@mui/icons-material/SplitscreenRounded";
import { typingStylesType, useTyping } from "@/contexts/TypingStates";
import React from "react";
import { WordAmountType, WordTimeType } from "./types";
import PaletteRoundedIcon from "@mui/icons-material/PaletteRounded";
import { useTypingTheme } from "@/contexts/typingThemeStates";
import PopupTypingTheme, {
  changeFor,
} from "@/components/popup/PopupTypingTheme";
import PopupCreateTypingList from "@/components/popup/PopupCreateTypingList";
import KeyboardOutlinedIcon from "@mui/icons-material/KeyboardOutlined";

export const TypingHeaderMenu = ({ changeFor }: { changeFor?: changeFor }) => {
  const { typingStyles, showPopupCreate, setShowPopupCreate } = useTyping();
  return (
    <div className="flex items-center flex-wrap gap-3 !w-auto mx-auto bg-typingBgControlMenu text-typingTextNormal rounded-lg px-5 py-2 z-20">
      <PopupCreateTypingList
        show={showPopupCreate}
        onClose={() => setShowPopupCreate(false)}
      ></PopupCreateTypingList>
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
        <h1 className="flex items-center gap-1 cursor-default">
          <KeyboardOutlinedIcon fontSize="small" />
          Typing
        </h1>
      </Tooltip>
      <SplitElement />
      <ListBtnTypingStyles />
      {typingStyles === "words" && (
        <>
          <SplitElement />
          <WordAmount />
        </>
      )}
      {typingStyles === "time" && (
        <>
          <SplitElement />
          <WordTime />
        </>
      )}
      <SplitElement />
      <BtnChangeTheme />
      <PopupTypingTheme changeFor={changeFor}></PopupTypingTheme>
    </div>
  );
};
const SplitElement = () => {
  return <div className="w-[6px] h-full bg-typingBg rounded-full"></div>;
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
            item === wordAmount
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
const WordTime = () => {
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
            ? "text-typingColorActive"
            : "hover:text-typingTextHover cursor-pointer"
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
const BtnChangeTheme = () => {
  const { setThemePopup } = useTypingTheme();
  return (
    <div
      className="flex gap-1 cursor-pointer hover:text-typingTextHover transition-all"
      onClick={() => setThemePopup(true)}
    >
      theme
      <PaletteRoundedIcon fontSize="inherit"></PaletteRoundedIcon>
    </div>
  );
};
