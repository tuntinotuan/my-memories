import Image from "next/image";
import React from "react";

const EmptyTypingList = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-2 text-xs text-center">
      <Image
        src={"/cat-empty-paper.png"}
        alt="cat empty paper image"
        width={160}
        height={300}
        className="rounded mb-4"
        unoptimized
      ></Image>
      <h2 className="font-bold">You don't have any lists yet</h2>
      <p className="text-[10px]">
        Start creating resources by clicking on 'Create a typing list' below
      </p>
    </div>
  );
};

export default EmptyTypingList;
