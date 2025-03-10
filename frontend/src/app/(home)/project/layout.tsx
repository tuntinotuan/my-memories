"use client";
import HomeMenu from "@/components/layout/home/home.menu.header";
import HomeSidebar from "@/components/layout/home/home.sidebar";
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
  const handleScroll = () => {
    if (ref.current) {
      const { scrollTop, scrollLeft } = ref.current;
      setScroll({ scrollTop, scrollLeft });
    }
  };
  return (
    <div className="flex w-full mt-2 mx-2">
      <HomeSidebar></HomeSidebar>
      <div className="relative bg-white rounded-t-xl shadow-xl w-full">
        <HomeMenu scroll={scroll}></HomeMenu>
        <div className="w-full h-full flex" ref={ref} onScroll={handleScroll}>
          {children}
        </div>
      </div>
    </div>
  );
}
