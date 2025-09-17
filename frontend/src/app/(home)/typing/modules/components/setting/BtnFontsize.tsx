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
      className={`bg-typingBgControlMenu p-2 rounded hover:scale-105 hover:bg-typingColorActive cursor-pointer transition-all ${
        typingFontsizeX === children ? "bg-typingColorActive" : ""
      }`}
      onClick={onClick}
    >
      x{children}
    </div>
  );
};

export default BtnFontsize;
