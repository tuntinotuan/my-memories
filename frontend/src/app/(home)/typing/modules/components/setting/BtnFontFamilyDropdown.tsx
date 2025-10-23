import Dropdown from "@/components/dropdown/Dropdown";
import GreenTickIcon from "@/components/icons/GreenTickIcon";
import { useTyping } from "@/contexts/TypingStates";
import React from "react";

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
  const { fontFamily, setFontFamily } = useTyping();
  return (
    <Dropdown
      name={fontFamily?.name || "Choose your fontsize"}
      className="border border-transparent bg-typingBgControlMenu text-white"
      activeClassName="border-b-typingColorActive"
    >
      <div className="max-h-48 bg-typingBgControlMenu rounded-b-md overflow-y-auto [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-track]:bg-typingBg [&::-webkit-scrollbar-thumb]:bg-typingColorActive [&::-webkit-scrollbar-track]:rounded-sm [&::-webkit-scrollbar-thumb]:rounded-sm">
        {fontFamilyList.map((item) => (
          <div
            key={item.name}
            className={`${
              item.code
            } flex items-center justify-between p-2 hover:bg-typingColorActive transition-all last:rounded-b-md ${
              fontFamily?.name === item.name ? "bg-typingBg font-bold" : ""
            }`}
            onClick={() => setFontFamily(item)}
          >
            <p className="brightness-75">{item.name}</p>
            {fontFamily?.name === item.name && (
              <GreenTickIcon
                className=" text-green-500"
                fontSize="inherit"
              ></GreenTickIcon>
            )}
          </div>
        ))}
      </div>
    </Dropdown>
  );
};

export default BtnFontFamilyDropdown;
