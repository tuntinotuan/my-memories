import { useHoverGlobal } from "@/contexts/hoverGlobalStates";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useHover } from "usehooks-ts";

const EmptyTypingList = () => {
  const { setTypingEmptyListHover, typingEmptyListHover } = useHoverGlobal();
  const hoverRef = useRef<HTMLDivElement>(null);
  const isHovered = useHover(hoverRef);
  useEffect(() => {
    setTypingEmptyListHover(isHovered);
  }, [isHovered]);
  return (
    <div
      ref={hoverRef}
      className="h-full w-full flex flex-col items-center justify-center gap-2 text-xs text-center"
    >
      <Image
        src={"/cat-empty-paper.png"}
        alt="cat empty paper image"
        width={160}
        height={300}
        className="rounded mb-4"
        unoptimized
      ></Image>
      <h2 className="font-bold">{"You don't have any lists yet"}</h2>
      <p className="text-[10px]">
        {"Start creating resources by clicking on 'Create a typing list' below"}
      </p>
      <p>{`${typingEmptyListHover}`}</p>
    </div>
  );
};

export default EmptyTypingList;
