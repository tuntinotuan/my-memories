import HomeMenu from "@/components/layout/home.menu";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full w-full bg-f2Color">
      <HomeMenu></HomeMenu>
      {children}
    </div>
  );
}
