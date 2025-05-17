import React from "react";
import PopupOverlay from "./popup.overlay";
import { TopControl } from "./PopupCreateboard";
import { useTypingTheme } from "@/contexts/typingThemeStates";
import ThemeItem from "../theme/ThemeItem";

const PopupTypingTheme = () => {
  const { theme, setTheme, themPopup, setThemePopup } = useTypingTheme();
  let themeList = [
    "theme-dark",
    "theme-green",
    "theme-light",
    "theme-blue",
    "theme-deep",
    "theme-a-blue",
    "theme-coal",
    "theme-gold",
    "theme-darkin",
    "theme-purple",
    "theme-beach",
    "theme-kelp",
    "theme-evon",
    "theme-land",
    "theme-purpler",
    "theme-army",
    "theme-diff",
    "theme-hp",
  ];
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
            currentTheme={theme}
            onClick={() => {
              setTheme(item);
              setThemePopup(false);
            }}
          ></ThemeItem>
        ))}
      </div>
    </PopupOverlay>
  );
};

export default PopupTypingTheme;
