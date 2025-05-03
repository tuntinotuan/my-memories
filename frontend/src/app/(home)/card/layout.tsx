import HomeContentCover from "@/components/layout/home/home.content.cover";
import HomeMenuSidebar from "@/components/layout/home/home.menu.sidebar";
import HomeSidebarCover from "@/components/layout/home/home.sidebar.cover";
import HomeSidebarForBoard from "@/components/layout/home/home.sidebar.for.board";

export default function CardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HomeMenuSidebar />
      <HomeSidebarCover>
        <HomeSidebarForBoard />
        <HomeContentCover>{children}</HomeContentCover>
      </HomeSidebarCover>
    </>
  );
}
