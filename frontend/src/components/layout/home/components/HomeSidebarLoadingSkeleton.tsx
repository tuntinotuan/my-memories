import SidebarListSkeleton from "@/components/skeleton/SidebarListSkeleton";
import { useCreateBoardStates } from "@/contexts/createBoardStates";
import React from "react";

const HomeSidebarLoadingSkeleton = () => {
  const { loadingFetchBoards } = useCreateBoardStates();
  return <>{loadingFetchBoards && <SidebarListSkeleton />}</>;
};

export default HomeSidebarLoadingSkeleton;
