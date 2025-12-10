"use client";
import NotifyComeBack from "@/components/notify/NotifyComeBack";
import NotifyNormal from "@/components/notify/NotifyNormal";
import NotifySaved from "@/components/notify/NotifySaved";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full w-full bg-efColor dark:bg-darkMode03 overflow-hidden">
      <NotifyNormal />
      <NotifyComeBack />
      <NotifySaved />
      {children}
    </div>
  );
}
