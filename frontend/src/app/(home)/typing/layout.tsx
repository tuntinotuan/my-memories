import HomeContentCover from "@/components/layout/home/home.content.cover";
import HomeMenuSidebar from "@/components/layout/home/home.menu.sidebar";
import HomeSidebar from "@/components/layout/home/home.sidebar";
import HomeSidebarCover from "@/components/layout/home/home.sidebar.cover";
import { TypingProvider } from "@/contexts/TypingStates";

export default function TypingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TypingProvider>
      <HomeMenuSidebar />
      <HomeSidebarCover>
        <HomeSidebar />
        <HomeContentCover>{children}</HomeContentCover>
      </HomeSidebarCover>
    </TypingProvider>
  );
}
