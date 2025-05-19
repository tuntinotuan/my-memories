import React, { useEffect } from "react";
import PopupOverlay from "./popup.overlay";
import { TopControl } from "./PopupCreateboard";
import { useTypingTheme } from "@/contexts/typingThemeStates";
import ThemeItem from "../theme/ThemeItem";
import { useTyping } from "@/contexts/TypingStates";
import { Id } from "@/app/(home)/project/[slug]/modules/types";
import { themeList } from "@/api/typing/typing.data.structure";
export type changeFor = "global" | "single";

type PopupTypingThemeProps = {
  changeFor?: changeFor;
};

const PopupTypingTheme = ({ changeFor = "global" }: PopupTypingThemeProps) => {
  const {
    theme,
    setTheme,
    themPopup,
    setThemePopup,
    singleTheme,
    setSingleTheme,
  } = useTypingTheme();
  const { wordList, setWordList, singleTypingList } = useTyping();

  const updateSingleTheme = (id: Id, theme: string) => {
    const newSingleTheme = wordList.map((item: any) => {
      if (item.id !== id) return item;
      return { ...item, theme };
    });
    setSingleTheme(theme);
    setWordList(newSingleTheme);
  };

  useEffect(() => {
    const themeActiveClass = document.getElementById("current-theme-active");
    themeActiveClass?.focus();
  }, [themPopup]);

  return (
    <PopupOverlay
      show={themPopup}
      width={300}
      onClick={() => setThemePopup(false)}
    >
      <TopControl
        title="Typing change theme"
        onClose={() => setThemePopup(false)}
      />
      <div className="flex items-center justify-center flex-wrap gap-2">
        {themeList.map((item, index) => (
          <ThemeItem
            key={index}
            item={item}
            index={index}
            currentTheme={changeFor === "single" ? singleTheme : theme}
            onClick={() => {
              if (changeFor === "global") {
                setTheme(item);
              }
              if (changeFor === "single") {
                updateSingleTheme(singleTypingList.id, item);
              }
              setThemePopup(false);
            }}
          ></ThemeItem>
        ))}
      </div>
    </PopupOverlay>
  );
};

export default PopupTypingTheme;
