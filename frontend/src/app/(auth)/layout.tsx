import AuthHeader from "@/components/layout/auth.header";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <AuthHeader></AuthHeader>
      {children}
    </section>
  );
}
