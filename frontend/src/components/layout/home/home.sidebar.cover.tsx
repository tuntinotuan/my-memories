"use client";
import { useLayoutStates } from "@/contexts/layoutStates";
import React from "react";

const HomeSidebarCover = ({ children }: { children: React.ReactNode }) => {
  const { showHomeSidebar } = useLayoutStates();
  return (
    <div
      className={`flex w-full  rounded-t-xl overflow-hidden ${
        showHomeSidebar
          ? "pt-2 pr-2"
          : "mt-2 mr-2 shadow-[0_0_10px_5px_rgba(0,0,0,0.1)]"
      }`}
    >
      {children}
    </div>
  );
};

export default HomeSidebarCover;
