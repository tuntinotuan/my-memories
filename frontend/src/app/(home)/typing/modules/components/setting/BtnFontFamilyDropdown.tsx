import Dropdown from "@/components/dropdown/Dropdown";
import GreenTickIcon from "@/components/icons/GreenTickIcon";
import { useNotify } from "@/contexts/notifyStates";
import { useTyping } from "@/contexts/TypingStates";
import React, { useState } from "react";

const BtnFontFamilyDropdown = () => {
  const fontFamilyList = [
    { name: "Roboto", code: "font-roboto" },
    { name: "Roboto Mono", code: "font-robotoMono" },
    { name: "DM Mono", code: "font-dmMono" },
    { name: "Ubuntu", code: "font-ubuntu" },
    { name: "Coming Soon", code: "font-comingSoon" },
    { name: "Pacifico", code: "font-pacifico" },
    { name: "Borel", code: "font-borel" },
    { name: "Oxygen", code: "font-oxygen" },
    { name: "Lalezar", code: "font-lalezar" },
    { name: "Lato", code: "font-lato" },
    { name: "JetBrains Mono", code: "font-jetBrainsMono" },
    { name: "Itim", code: "font-itim" },
    { name: "Inconsolata", code: "font-inconsolata" },
    { name: "Rubik Bubbles", code: "font-rubikBubbles" },
    { name: "IBM Plex Sans", code: "font-iBMPlexSans" },
    { name: "IBM Plex Mono", code: "font-iBMPlexMono" },
    { name: "Geist Mono", code: "font-geistMono" },
    { name: "Geist", code: "font-geist" },
    { name: "Fira Code", code: "font-firaCode" },
    { name: "Courier Prime", code: "font-courierPrime" },
  ];
  const { fontFamily } = useTyping();
  const [isActive, setIsActive] = useState(false);
  return (
    <Dropdown
      name={fontFamily?.name || "Choose your fontsize"}
      className="border border-transparent bg-typingBgControlMenu text-white"
      activeClassName="border-b-typingColorActive"
      isActive={isActive}
      setIsActive={setIsActive}
    >
      <div className="max-h-48 bg-typingBgControlMenu rounded-b-md overflow-y-auto [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-track]:bg-typingBg [&::-webkit-scrollbar-thumb]:bg-typingColorActive [&::-webkit-scrollbar-track]:rounded-sm [&::-webkit-scrollbar-thumb]:rounded-sm">
        {fontFamilyList.map((item, index) => (
          <FontFamilyItem
            key={index}
            font={item}
            setIsActive={setIsActive}
          ></FontFamilyItem>
        ))}
      </div>
    </Dropdown>
  );
};

const FontFamilyItem = ({
  font,
  setIsActive,
}: {
  font: { name: string; code: string };
  setIsActive: any;
}) => {
  const { setEffectHoveredFontFamily, fontFamily, setFontFamily } = useTyping();
  useTyping();
  const { setActiveSaved, setTitle } = useNotify();
  return (
    <div
      key={font.name}
      className={`${
        font.code
      } flex items-center justify-between p-2 hover:bg-typingColorActive transition-all last:rounded-b-md ${
        fontFamily?.name === font.name ? "bg-typingBg font-bold" : ""
      }`}
      onClick={() => {
        setFontFamily(font);
        setActiveSaved(true);
        setTitle("Saved");
        setIsActive(false);
      }}
      onMouseEnter={() => setEffectHoveredFontFamily(font.code)}
      onMouseLeave={() => setEffectHoveredFontFamily("")}
    >
      <p className="brightness-75">{font.name}</p>
      {fontFamily?.name === font.name && (
        <GreenTickIcon
          className=" text-green-500"
          fontSize="inherit"
        ></GreenTickIcon>
      )}
    </div>
  );
};

export default BtnFontFamilyDropdown;
