import CreateHeader from "@/components/layout/create.header";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <CreateHeader></CreateHeader>
      {children}
    </section>
  );
}
