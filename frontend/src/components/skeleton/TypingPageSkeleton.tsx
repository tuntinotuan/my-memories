import { SplitElement } from "@/app/(home)/typing/modules/components/header/SplitElement";
import React from "react";

const TypingPageSkeleton = () => {
  return (
    <div className="flex items-center flex-wrap gap-3 !w-auto mx-auto bg-typingBgControlMenu text-typingTextNormal rounded-lg px-5 py-2 z-20 shadow-lg">
      <div className="bg-gray-200 rounded w-[70px] h-6 animate-pulse"></div>
      <SplitElement />
      <div className="bg-gray-200 rounded w-[50px] h-6 animate-pulse"></div>
      <div className="bg-gray-200 rounded w-[50px] h-6 animate-pulse"></div>
      <div className="bg-gray-200 rounded w-[50px] h-6 animate-pulse"></div>
      <SplitElement />
      <div className="bg-gray-200 rounded w-[24px] h-6 animate-pulse"></div>
      <div className="bg-gray-200 rounded w-[24px] h-6 animate-pulse"></div>
      <div className="bg-gray-200 rounded w-[24px] h-6 animate-pulse"></div>
      <div className="bg-gray-200 rounded w-[24px] h-6 animate-pulse"></div>
      <SplitElement />
      <div className="bg-gray-200 rounded w-[50px] h-6 animate-pulse"></div>
      <SplitElement />
      <div className="bg-gray-200 rounded w-[50px] h-6 animate-pulse"></div>
    </div>
  );
};

export default TypingPageSkeleton;
