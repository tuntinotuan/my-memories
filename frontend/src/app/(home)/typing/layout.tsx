"use client";
import HomeContentCover from "@/components/layout/home/home.content.cover";
import HomeMenuSidebar from "@/components/layout/home/home.menu.sidebar";
import HomeSidebarCover from "@/components/layout/home/home.sidebar.cover";
import HomeSidebarForTyping from "@/components/layout/home/home.sidebar.for.typing";
import { TypingProvider, useTyping } from "@/contexts/TypingStates";
import TypingCapsLockBtn from "./modules/components/TypingCapsLockBtn";
import TypingFullScreenBtn from "./modules/components/TypingFullScreenBtn";

export default function TypingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TypingProvider>
      <BodyLocal>{children}</BodyLocal>
    </TypingProvider>
  );
}

const BodyLocal = ({ children }: { children: React.ReactNode }) => {
  const { typingFullScreen } = useTyping();
  return (
    <>
      <HomeMenuSidebar />
      <HomeSidebarCover>
        <HomeSidebarForTyping />
        <HomeContentCover
          className={`${typingFullScreen ? "!fixed inset-0 h-screen" : ""}`}
        >
          <TypingCapsLockBtn />
          <TypingFullScreenBtn />
          {children}
        </HomeContentCover>
      </HomeSidebarCover>
    </>
  );
};
