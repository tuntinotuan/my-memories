import React from "react";

const TypingCreateButtonSkeleton = () => {
  return (
    <div className="flex items-center gap-2 bg-gray-200 rounded-md animate-pulse w-full my-2 p-2">
      <div className="w-full h-6 bg-gray-100 rounded-md animate-pulse"></div>
    </div>
  );
};

export default TypingCreateButtonSkeleton;
