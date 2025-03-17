export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full w-full bg-efColor overflow-hidden">
      {children}
    </div>
  );
}
