import { SplitElement } from "@/app/(home)/typing/modules/components/header/SplitElement";
import React from "react";

const TypingPageSkeleton = () => {
  return (
    <div className="flex flex-col items-start w-full gap-2 px-4 pt-2 bg-typingBg text-black">
      <HeaderItems />
      <AmountOrTimeItems />
      <WordItems />=
    </div>
  );
};

const HeaderItems = () => {
  return (
    <div className="flex items-center flex-wrap gap-3 !w-auto mx-auto bg-typingBgControlMenu text-typingTextNormal rounded-lg px-5 py-2 z-20 shadow-lg">
      <div className="bg-gray-200 rounded w-[70px] h-6 animate-pulse"></div>
      <SplitElement />
      {Array(3)
        .fill(null)
        .map((item, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded w-[50px] h-6 animate-pulse"
          ></div>
        ))}
      <SplitElement />
      {Array(4)
        .fill(null)
        .map((item, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded w-[24px] h-6 animate-pulse"
          ></div>
        ))}
      <SplitElement />
      <div className="bg-gray-200 rounded w-[50px] h-6 animate-pulse"></div>
      <SplitElement />
      <div className="bg-gray-200 rounded w-[50px] h-6 animate-pulse"></div>
    </div>
  );
};

const AmountOrTimeItems = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 overflow-hidden">
      <div className="flex items-end justify-between h-[20vh] bg-opacity-5 backdrop-blur-sm w-full z-10 p-2 rounded">
        <div className="flex items-center gap-1 text-xl text-typingColorActive bg-typingBgControlMenu transition-all rounded py-1 px-2 shadow-lg">
          <div className="bg-gray-200 rounded w-[24px] h-6 animate-pulse"></div>
          /
          <div className="bg-gray-200 rounded w-[24px] h-6 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

const WordItems = () => {
  const wordWidth = [
    50, 100, 90, 70, 40, 90, 100, 50, 40, 50, 50, 70, 40, 70, 50, 90, 50, 50,
    70, 50, 70, 40, 70, 40, 50, 70, 90, 30, 70, 100, 50, 40, 50, 50, 70, 40, 70,
    50, 90, 50, 50, 70, 50, 70, 40, 100, 90, 70, 40, 90,
  ];
  return (
    <div
      className={`flex items-start h-[130px] w-full px-2 flex-wrap gap-4 transition-all`}
    >
      {wordWidth.map((item, index) => (
        <div
          key={index}
          className="bg-gray-200 rounded h-6 animate-pulse"
          style={{ width: item }}
        ></div>
      ))}
    </div>
  );
};
export default TypingPageSkeleton;
