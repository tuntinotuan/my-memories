import React from "react";
import PopupOverlay from "./popup.overlay";
import { TopControl } from "./PopupCreateboard";
import { useTypingTheme } from "@/contexts/typingThemeStates";

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
      <div className="flex items-center flex-wrap gap-2">
        {themeList.map((item, index) => (
          <div
            tabIndex={index}
            key={item}
            className={`${item} flex items-center gap-1 bg-typingBg rounded-full p-2 border-2 ${
              item === theme
                ? "border-primaryColor"
                : "border-gray-200 cursor-pointer"
            }`}
            onClick={() => {
              setTheme(item);
              setThemePopup(false);
            }}
          >
            <div className="w-4 h-4 rounded-full bg-typingColorActive"></div>
            <div className="w-4 h-4 rounded-full bg-typingTextNormal"></div>
            <div className="w-4 h-4 rounded-full bg-typingTextCorrect"></div>
          </div>
        ))}
      </div>
    </PopupOverlay>
  );
};

export default PopupTypingTheme;
