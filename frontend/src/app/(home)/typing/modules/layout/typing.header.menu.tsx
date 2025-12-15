import { Tooltip } from "@nextui-org/tooltip";
import { useTyping } from "@/contexts/TypingStates";
import React from "react";
import PopupTypingTheme, {
  changeFor,
} from "@/components/popup/typing/PopupTypingTheme";
import PopupCreateTypingList from "@/components/popup/typing/PopupCreateTypingList";
import KeyboardIcon from "@/components/icons/typing/KeyboardIcon";
import { SplitElement } from "../components/header/SplitElement";
import { WordAmount } from "../components/header/WordAmount";
import { WordTime } from "../components/header/WordTime";
import { ListBtnTypingStyles } from "../components/header/ListBtnTypingStyles";
import { BtnChangeTheme } from "../components/header/BtnChangeTheme";
import SettingIcon from "@/components/icons/SettingIcon";
import { useLayoutStates } from "@/contexts/layoutStates";

export const TypingHeaderMenu = ({ changeFor }: { changeFor?: changeFor }) => {
  const {
    typingStyles,
    showPopupCreate,
    setShowPopupCreate,
    typingSettingLocal,
    setTypingStyles,
  } = useTyping();
  const { setShowTypingSetting } = useLayoutStates();
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
        className="!px-2 !py-[2px] dark:text-white"
        shadow="sm"
      >
        <h1 className="flex items-center gap-1 cursor-default">
          <KeyboardIcon />
          Typing
        </h1>
      </Tooltip>
      <SplitElement />
      <ListBtnTypingStyles />
      {typingSettingLocal?.typingStyles === "words" && (
        <>
          <SplitElement />
          <WordAmount />
        </>
      )}
      {typingSettingLocal?.typingStyles === "time" && (
        <>
          <SplitElement />
          <WordTime />
        </>
      )}
      <SplitElement />
      <BtnChangeTheme />
      <SplitElement />
      <SettingIcon
        fontSize="small"
        onClick={() => setShowTypingSetting(true)}
      />
      <PopupTypingTheme changeFor={changeFor}></PopupTypingTheme>
    </div>
  );
};
