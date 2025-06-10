import React from "react";

const BoardListSkeleton = () => {
  return Array(4)
    .fill(null)
    .map((item, index) => (
      <div
        key={index}
        className="flex flex-col w-[266px] gap-2 bg-white h-auto shrink-0 text-primaryText rounded p-2 shadow-md border border-gray-200"
      >
        {Array(9)
          .fill(null)
          .map((item, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded w-full h-10 animate-pulse"
            ></div>
          ))}
      </div>
    ));
};

export default BoardListSkeleton;
