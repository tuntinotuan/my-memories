import { useLayoutStates } from "@/contexts/layoutStates";
import Image from "next/image";
import React from "react";

const BoardChangeBackground = () => {
  const { setPageBoardSidebar } = useLayoutStates();
  return (
    <div className="flex items-cemter gap-2 mt-2">
      <div
        className="w-1/2 h-auto flex flex-col items-center gap-2"
        onClick={() => setPageBoardSidebar("unsplash")}
      >
        <Image
          src={"/photos.jpg"}
          alt="photos from unsplash"
          className="w-full rounded-lg cursor-pointer"
          width={150}
          height={90}
          unoptimized
        ></Image>
        <p>Photos</p>
      </div>
      <div
        className="w-1/2 flex flex-col items-center gap-2 shrink-0"
        onClick={() => setPageBoardSidebar("color")}
      >
        <div className="colors-element flex flex-col items-center justify-center gap-2 w-full h-[100px] bg-gradient-to-br from-[#0c66e3] to-[#09336f] rounded-lg cursor-pointer p-4">
          <div className="w-full h-6 bg-gradient-to-br from-[#e374bc] to-[#7731d8] rounded"></div>
          <div className="w-full h-6 bg-gradient-to-br from-[#e34935] to-[#f9a13d] rounded"></div>
        </div>
        <p>Colors</p>
      </div>
    </div>
  );
};

export default BoardChangeBackground;
