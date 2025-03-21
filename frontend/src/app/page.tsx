"use client";
import HomeMenuSidebar from "@/components/layout/home/home.menu.sidebar";
import HomeContentCover from "@/components/layout/home/home.content.cover";
import HomeSidebar from "@/components/layout/home/home.sidebar";
import HomeSidebarCover from "@/components/layout/home/home.sidebar.cover";
import OriginalBanner from "@/components/banner/OriginalBanner";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import { useState } from "react";
import { Tooltip } from "@nextui-org/tooltip";
import ProjectCardList from "@/components/project/ProjectCardList";
import ProjectCardGrid from "@/components/project/ProjectCardGrid";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex h-full w-full bg-efColor overflow-hidden">
      <HomeMenuSidebar></HomeMenuSidebar>
      <HomeSidebarCover>
        <HomeSidebar />
        <HomeContentCover className="flex-col gap-2 px-6">
          <MainContent />
        </HomeContentCover>
      </HomeSidebarCover>
    </div>
  );
}

const MainContent = () => {
  const [listOrGrid, setListOrGrid] = useState<"list" | "grid">("grid");
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
        <Tooltip
          showArrow
          content={listOrGrid ? "View as Grid" : "View as List"}
          placement="bottom"
          radius="sm"
          delay={200}
          closeDelay={200}
          className="!px-2 !py-[2px]"
          shadow="sm"
        >
          <div
            className="w-10 h-10 flex items-center justify-center text-primaryText border border-gray-300 rounded-lg hover:bg-efColor active:border-gray-400 active:bg-gray-300 active:shadow-inner cursor-pointer transition-all"
            onClick={handleViewListOrGrid}
          >
            {listOrGrid ? (
              <GridViewRoundedIcon />
            ) : (
              <FormatListBulletedRoundedIcon />
            )}
          </div>
        </Tooltip>
      </div>
      {listOrGrid === "grid" && <ProjectCardGrid />}
      {listOrGrid === "list" && <ProjectCardList />}
      <h1 className="mt-10 font-bold">Test dndkit library</h1>
    </>
  );
};
