"use client";
import NotifyComeBack from "@/components/notify/NotifyComeBack";
import NotifyNormal from "@/components/notify/NotifyNormal";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full w-full bg-efColor overflow-hidden">
      <NotifyNormal />
      <NotifyComeBack />
      {children}
    </div>
  );
}
