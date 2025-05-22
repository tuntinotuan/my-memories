import { useCreateBoardStates } from "@/contexts/createBoardStates";
import React from "react";

const HomeSidebarLoadingSkeleton = () => {
  const { loadingFetchBoards } = useCreateBoardStates();
  return (
    <>
      {loadingFetchBoards && (
        <div className="flex flex-col items-center gap-1">
          {Array(4)
            .fill(null)
            .map((item, index) => (
              <div
                key={index}
                className="w-full h-10 bg-gray-200 rounded-md animate-pulse"
              ></div>
            ))}
        </div>
      )}
    </>
  );
};

export default HomeSidebarLoadingSkeleton;
