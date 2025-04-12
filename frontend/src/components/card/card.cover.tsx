import Image from "next/image";
import React from "react";

const CardCover = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-auto h-auto bg-primaryColor bg-opacity-10 rounded-xl border-2 border-gray-200 p-3 cursor-pointer transition-all hover:border-primaryColor group">
      {children}
    </div>
  );
};

export default CardCover;
