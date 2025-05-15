"use client";
import React, { useRef, useState } from "react";
import HomeMenuHeader from "./home.menu.header";
import { scrollTypes } from "@/app/(home)/project/layout";
type HomeContentCoverProps = {
  children: React.ReactNode;
  className?: string;
};
const HomeContentCover = ({ children, className }: HomeContentCoverProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState({} as scrollTypes);
  const handleScroll = () => {
    if (ref.current) {
      const { scrollTop, scrollLeft } = ref.current;
      setScroll({ scrollTop, scrollLeft });
    }
  };
  return (
    <div className="relative bg-white rounded-t-xl shadow-[0_0_12px_2px_rgba(0,0,0,0.2)] border border-gray-300 w-full overflow-hidden">
      <HomeMenuHeader scroll={scroll}></HomeMenuHeader>
      <div
        className={`relative w-full h-[92%] flex overflow-x-hidden ${className}`}
        ref={ref}
        onScroll={handleScroll}
      >
        {children}
      </div>
    </div>
  );
};

export default HomeContentCover;
