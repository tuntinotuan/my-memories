"use client";
import { useLayoutStates } from "@/contexts/layoutStates";
import React from "react";

const HomeSidebarCover = ({ children }: { children: React.ReactNode }) => {
  const { showHomeSidebar } = useLayoutStates();
  // const showHomeSidebar = false;
  return (
    <div
      className={`flex w-full mt-2 mr-2 rounded-t-xl overflow-hidden ${
        showHomeSidebar ? "" : "shadow-2xl"
      }`}
    >
      {children}
    </div>
  );
};

export default HomeSidebarCover;
