import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/_reset-css.css";
import "./globals.css";
import { LayoutProvider } from "@/contexts/layoutStates";
import { CreateBoardProvider } from "@/contexts/createBoardStates";
import { NotifyProvider } from "@/contexts/notifyStates";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`fixed inset-0 text-primaryBlack ${inter.className}`}>
        <CreateBoardProvider>
          <LayoutProvider>
            <NotifyProvider>
              <div id="myportal" />
              {children}
            </NotifyProvider>
          </LayoutProvider>
        </CreateBoardProvider>
      </body>
    </html>
  );
}
