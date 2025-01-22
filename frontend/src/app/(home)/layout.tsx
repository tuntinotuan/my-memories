import HomeMenuSidebar from "@/components/layout/home/home.menu.sidebar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full w-full bg-f2Color">
      <HomeMenuSidebar></HomeMenuSidebar>
      {children}
    </div>
  );
}
