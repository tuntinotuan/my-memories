import React from "react";

const BoardListSkeleton = () => {
  return Array(4)
    .fill(null)
    .map((item, index) => (
      <div
        key={index}
        className="flex flex-col w-[266px] gap-2 bg-white max-h-max shrink-0 text-primaryText rounded p-2 shadow-md border border-gray-200"
      >
        <div className="bg-gray-200 rounded w-1/3 h-6 animate-pulse"></div>
        <div className="bg-gray-200 rounded w-2/3 h-9 animate-pulse"></div>
        <div className="bg-gray-200 rounded w-1/2 h-9 animate-pulse"></div>
        <div className="bg-gray-200 rounded w-3/4 h-9 animate-pulse"></div>
        <div className="bg-gray-200 rounded w-1/4 h-9 animate-pulse"></div>
        <div className="bg-gray-200 rounded w-4/5 h-9 animate-pulse"></div>
        {Array(2)
          .fill(null)
          .map((item, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded w-full h-9 animate-pulse"
            ></div>
          ))}
      </div>
    ));
};

export default BoardListSkeleton;
