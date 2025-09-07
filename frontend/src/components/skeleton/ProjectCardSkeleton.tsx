import React from "react";

const ProjectCardSkeleton = () => {
  return (
    <div className="card-grid grid grid-cols-4 w-full gap-6 mb-5">
      {Array(4)
        .fill(null)
        .map((item, index) => (
          <div className="flex flex-col w-[220px] h-[222px] gap-2 rounded-lg">
            <div className="flex justify-center items-end w-full h-full px-4 pt-4 cursor-pointer hover:shadow-inner hover:scale-[1.01] transition-all bg-gray-400 rounded-lg animate-pulse">
              <div className="w-full h-full bg-gray-200 rounded-md animate-pulse"></div>
            </div>
            <div className="w-1/4 h-6 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="w-1/2 h-5 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
        ))}
    </div>
  );
};

export default ProjectCardSkeleton;
