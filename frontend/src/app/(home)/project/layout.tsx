"use client";
import HomeMenuHeader from "@/components/layout/home/home.menu.header";
import HomeSidebar from "@/components/layout/home/home.sidebar";
import { useLayoutStates } from "@/contexts/layoutStates";
import { useRef, useState } from "react";
export type scrollTypes = {
  scrollTop: number;
  scrollLeft: number;
};
export default function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ref = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState({} as scrollTypes);
  const { showHomeSidebar } = useLayoutStates();
  const handleScroll = () => {
    if (ref.current) {
      const { scrollTop, scrollLeft } = ref.current;
      setScroll({ scrollTop, scrollLeft });
    }
  };
  return (
    <div
      className={`flex w-full mt-2 mr-2 rounded-t-xl overflow-hidden ${
        showHomeSidebar ? "" : "shadow-2xl"
      }`}
    >
      <HomeSidebar></HomeSidebar>
      <div className="relative bg-white rounded-t-xl shadow-xl border border-gray-100 w-full overflow-hidden">
        <HomeMenuHeader scroll={scroll}></HomeMenuHeader>
        <div
          className="w-full h-[92%] flex overflow-auto"
          ref={ref}
          onScroll={handleScroll}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
