import HomeContentCover from "@/components/layout/home/home.content.cover";
import HomeMenuSidebar from "@/components/layout/home/home.menu.sidebar";
import HomeSidebarCover from "@/components/layout/home/home.sidebar.cover";
import HomeSidebarForTyping from "@/components/layout/home/home.sidebar.for.typing";
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
        <HomeSidebarForTyping />
        <HomeContentCover>{children}</HomeContentCover>
      </HomeSidebarCover>
    </TypingProvider>
  );
}
