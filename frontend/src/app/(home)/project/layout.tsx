import HomeContentCover from "@/components/layout/home/home.content.cover";
import HomeMenuSidebar from "@/components/layout/home/home.menu.sidebar";
import HomeSidebarCover from "@/components/layout/home/home.sidebar.cover";
import HomeSidebarForBoard from "@/components/layout/home/home.sidebar.for.board";
import { Metadata } from "next";
export type scrollTypes = {
  scrollTop: number;
  scrollLeft: number;
};

export const metadata: Metadata = {
  title: "Board",
  description: "Generated by create next app",
  icons: {
    icon: "/icons/memories-metadata-icon.png", // default favicon
    shortcut: "/icons/memories-metadata-icon.png", // browser shortcut icon
    apple: "/apple-touch-icon.png", // for iOS devices
  },
};

export default function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HomeMenuSidebar></HomeMenuSidebar>
      <HomeSidebarCover>
        <HomeSidebarForBoard />
        <HomeContentCover>{children}</HomeContentCover>
      </HomeSidebarCover>
    </>
  );
}
