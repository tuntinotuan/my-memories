import { themeList } from "@/api/typing/typing.data.structure";
import { Id } from "@/app/(home)/project/[slug]/modules/types";
import Dropdown from "@/components/dropdown/Dropdown";
import ThemeItem from "@/components/theme/ThemeItem";
import { useNotify } from "@/contexts/notifyStates";
import { useTyping } from "@/contexts/TypingStates";
import { useTypingTheme } from "@/contexts/typingThemeStates";
import React, { useState } from "react";

const BtnThemeDropdown = ({ changeFor = "global" }: any) => {
  const {
    theme,
    setTheme,
    themPopup,
    setThemePopup,
    singleTheme,
    setSingleTheme,
    setEffectHoveredTheme,
  } = useTypingTheme();
  const { wordList, setWordList, singleTypingList } = useTyping();
  const [isActive, setIsActive] = useState(false);
  const { setActiveSaved, setTitle } = useNotify();

  const updateSingleTheme = (id: Id, theme: string) => {
    const newSingleTheme = wordList.map((item: any) => {
      if (item.id !== id) return item;
      return { ...item, theme };
    });
    setSingleTheme(theme);
    setWordList(newSingleTheme);
  };

  return (
    <Dropdown
      name={
        theme.charAt(0).toUpperCase() + theme.slice(1) || "Choose your theme"
      }
      otherNameBeside={<p>hello</p>}
      className="border border-transparent bg-typingBgControlMenu text-white"
      activeClassName="border-b-typingColorActive"
      isActive={isActive}
      setIsActive={setIsActive}
    >
      <div className="max-h-48 bg-typingBgControlMenu rounded-b-md overflow-y-auto [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-track]:bg-typingBg [&::-webkit-scrollbar-thumb]:bg-typingColorActive [&::-webkit-scrollbar-track]:rounded-sm [&::-webkit-scrollbar-thumb]:rounded-sm px-1">
        {themeList.map((item, index) => (
          <ThemeItem
            key={index}
            item={item}
            index={index}
            currentTheme={changeFor === "single" ? singleTheme : theme}
            className="rounded-none"
            onClick={() => {
              if (changeFor === "global") {
                setTheme(item);
              }
              if (changeFor === "single") {
                updateSingleTheme(singleTypingList.id, item);
              }
              setThemePopup(false);
              setIsActive(false);
              setActiveSaved(true);
              setTitle("Saved");
            }}
            onHovered={() => setEffectHoveredTheme(item)}
            offHovered={() => setEffectHoveredTheme("")}
            onIconTick
          ></ThemeItem>
        ))}
      </div>
    </Dropdown>
  );
};

export default BtnThemeDropdown;
