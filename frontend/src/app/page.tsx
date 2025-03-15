import HomeMenuSidebar from "@/components/layout/home/home.menu.sidebar";
import { DragDropLists } from "./(home)/project/[slug]/page";
import HomeContentCover from "@/components/layout/home/home.content.cover";
import HomeSidebar from "@/components/layout/home/home.sidebar";
import HomeSidebarCover from "@/components/layout/home/home.sidebar.cover";
import OriginalBanner from "@/components/banner/OriginalBanner";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex h-full bg-f2Color">
      <HomeMenuSidebar></HomeMenuSidebar>
      <HomeSidebarCover>
        <HomeSidebar />
        <HomeContentCover className="flex-col gap-2 px-6">
          <OriginalBanner
            src="/banner-design-today.jpg"
            title="What will you design to day?"
            positionTitle="center"
          ></OriginalBanner>
          <DragDropLists></DragDropLists>
        </HomeContentCover>
      </HomeSidebarCover>
    </div>
  );
}
