"use client";
import HomeMenuSidebar from "@/components/layout/home/home.menu.sidebar";
import HomeContentCover from "@/components/layout/home/home.content.cover";
import HomeSidebarCover from "@/components/layout/home/home.sidebar.cover";
import OriginalBanner from "@/components/banner/OriginalBanner";
import { useState } from "react";
import ProjectCardList from "@/components/project/ProjectCardList";
import ProjectCardGrid from "@/components/project/ProjectCardGrid";
import NotifyNormal from "@/components/notify/NotifyNormal";
import NotifyComeBack from "@/components/notify/NotifyComeBack";
import ButtonGridOrListView from "@/components/button/ButtonGridOrListView";
import HomeSidebarForBoard from "@/components/layout/home/home.sidebar.for.board";
import NotifySaved from "@/components/notify/NotifySaved";
import { useLayoutStates } from "@/contexts/layoutStates";
export const dynamic = "force-dynamic";

export default function Home() {
  const { darkMode } = useLayoutStates();
  return (
    // ${darkMode ? "dark" : ""}
    <div className={``}>
      <div
        className={`flex h-full w-full bg-efColor dark:bg-darkMode03 overflow-hidden`}
      >
        <NotifyNormal />
        <NotifyComeBack />
        <NotifySaved />
        <HomeMenuSidebar></HomeMenuSidebar>
        <HomeSidebarCover>
          <HomeSidebarForBoard />
          <HomeContentCover className="flex flex-col gap-2 px-6 pb-6">
            <MainContent />
          </HomeContentCover>
        </HomeSidebarCover>
      </div>
    </div>
  );
}

export type ListOrGrid = "list" | "grid";

const MainContent = () => {
  const [listOrGrid, setListOrGrid] = useState<ListOrGrid>("grid");
  const handleViewListOrGrid = () => {
    listOrGrid === "list" ? setListOrGrid("grid") : setListOrGrid("list");
  };
  return (
    <>
      <OriginalBanner
        src="/banner-design-today.jpg"
        title="What will you design to day?"
        positionTitle="center"
      ></OriginalBanner>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Recent designs</h1>
        <ButtonGridOrListView
          listOrGrid={listOrGrid}
          handleViewListOrGrid={handleViewListOrGrid}
        ></ButtonGridOrListView>
      </div>
      {listOrGrid === "grid" && <ProjectCardGrid />}
      {listOrGrid === "list" && <ProjectCardList />}
    </>
  );
};
