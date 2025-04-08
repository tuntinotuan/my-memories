import HomeContentCover from "@/components/layout/home/home.content.cover";
import HomeMenuSidebar from "@/components/layout/home/home.menu.sidebar";
import HomeSidebar from "@/components/layout/home/home.sidebar";
import HomeSidebarCover from "@/components/layout/home/home.sidebar.cover";

export default function TrashLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <HomeMenuSidebar></HomeMenuSidebar>
      <HomeSidebarCover>
        <HomeSidebar></HomeSidebar>
        <HomeContentCover>{children}</HomeContentCover>
      </HomeSidebarCover>
    </>
  );
}
