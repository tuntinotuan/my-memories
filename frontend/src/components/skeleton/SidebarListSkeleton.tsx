import React from "react";

const SidebarListSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-1">
      {Array(5)
        .fill(null)
        .map((item, index) => (
          <div key={index} className="flex items-center gap-2 w-full h-10 px-2">
            <div className="w-6 h-6 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-6 flex-1 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
        ))}
    </div>
  );
};

export default SidebarListSkeleton;
