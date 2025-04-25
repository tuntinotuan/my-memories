import React, { useState } from "react";
import PopupOverlay from "./popup.overlay";
import { TopControl } from "./PopupCreateboard";
import { useTypingTheme } from "@/contexts/typingThemeStates";

const PopupTypingTheme = () => {
  const { theme, setTheme } = useTypingTheme();
  const [show, setShow] = useState(true);
  let themeList = ["theme-dark", "theme-green", ""];
  return (
    <PopupOverlay
      show={show}
      selector="myportal"
      width={400}
      onClick={() => setShow(false)}
    >
      <TopControl title="Typing change theme" onClose={() => setShow(false)} />
      <div className="flex items-center gap-2">
        {themeList.map((item) => (
          <div
            key={item}
            className={`${item} flex items-center gap-1 bg-typingBg rounded-full p-2 cursor-pointer`}
            onClick={() => {
              setTheme(item);
              setShow(false);
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
