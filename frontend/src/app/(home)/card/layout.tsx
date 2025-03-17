import HomeMenu from "@/components/layout/home/home.menu.header";
import HomeMenuSidebar from "@/components/layout/home/home.menu.sidebar";

export default function CardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HomeMenuSidebar></HomeMenuSidebar>
      {children}
    </>
  );
}
