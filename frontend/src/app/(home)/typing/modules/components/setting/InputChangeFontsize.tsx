import CloseIcon from "@/components/icons/CloseIcon";
import React, { useState } from "react";
import { isFraction, makeFraction } from "@/api/typing/typing.type";
import { useTyping } from "@/contexts/TypingStates";
import { useNotify } from "@/contexts/notifyStates";
import GreenTickIcon from "@/components/icons/GreenTickIcon";

const InputChangeFontsize = ({ fontsizeValue, setFontsizeValue }: any) => {
  const { typingSettingLocal, setTypingFontsizeX, typingFontsizeX } =
    useTyping();
  const { setActiveSaved, setTitle } = useNotify();
  const [showInputIcon, setShowInputIcon] = useState(false);
  function numberIsPass(num: number): boolean {
    return num >= 0.5 && num <= 4;
  }

  const handleUpdateTypingFontsizeX = () => {
    if (
      fontsizeValue !== typingSettingLocal?.fontsize &&
      fontsizeValue >= 0.5 &&
      fontsizeValue <= 4
    ) {
      setTypingFontsizeX(makeFraction(fontsizeValue));
      setActiveSaved(true);
      setTitle("Saved");
    } else {
      setFontsizeValue(typingFontsizeX);
    }
  };
  return (
    <div
      className={`relative bg-typingBgControlMenu rounded focus:scale-105 cursor-pointer transition-all ${
        isFraction(typingFontsizeX) && typingFontsizeX !== 0.5
          ? "bg-typingColorActive"
          : ""
      }`}
    >
      <input
        type="number"
        defaultValue={typingSettingLocal?.fontsize}
        value={fontsizeValue}
        onFocus={() => setShowInputIcon(true)}
        className={`p-2 brightness-75 border border-transparent focus:border focus:border-typingColorActive transition-all rounded`}
        onChange={(e) => {
          setFontsizeValue(e.target.valueAsNumber);
        }}
        onBlur={() => {
          handleUpdateTypingFontsizeX();
          setShowInputIcon(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleUpdateTypingFontsizeX();
          }
        }}
      />
      <div
        className={`absolute top-1/2 right-0 -translate-x-1/3 -translate-y-1/2 ${
          showInputIcon ? "opacity-100" : "opacity-0"
        }`}
      >
        {numberIsPass(fontsizeValue) ? (
          <GreenTickIcon
            className=" text-green-500"
            fontSize="small"
          ></GreenTickIcon>
        ) : (
          <CloseIcon
            className="text-red-500 w-auto h-auto"
            fontSize="small"
          ></CloseIcon>
        )}
      </div>
    </div>
  );
};

export default InputChangeFontsize;
