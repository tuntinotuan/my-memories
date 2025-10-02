import { FontSizeTypes } from "@/api/typing/typing.type";
import React from "react";

const BtnFontsize = ({
  children,
  onClick,
  typingFontsizeX,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  typingFontsizeX?: FontSizeTypes;
}) => {
  return (
    <div
      className={`bg-typingBgControlMenu p-2 rounded hover:scale-105 hover:bg-typingColorActive text-typingColorActive cursor-pointer transition-all ${
        typingFontsizeX === children ? "bg-typingColorActive" : ""
      }`}
      onClick={onClick}
    >
      <div className="brightness-75">x{children}</div>
    </div>
  );
};

export default BtnFontsize;
