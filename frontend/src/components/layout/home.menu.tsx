"use client";
import React from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
const HomeMenu = () => {
  const menuLists = [
    {
      iconNormal: <HomeOutlinedIcon fontSize="large" />,
      iconActive: <HomeRoundedIcon fontSize="large" />,
      text: "Home",
      href: "/",
    },
    {
      iconNormal: <FolderOpenRoundedIcon fontSize="large" />,
      iconActive: <FolderRoundedIcon fontSize="large" />,
      text: "Projects",
      href: "/project",
    },
    {
      iconNormal: <DashboardCustomizeOutlinedIcon fontSize="large" />,
      iconActive: <DashboardCustomizeRoundedIcon fontSize="large" />,
      text: "Card",
      href: "/card",
    },
  ];
  return (
    <ul className="home-menu-ul h-auto border-r-d7Color">
      <MenuItem lists={menuLists}></MenuItem>
    </ul>
  );
};

type MenuItem = {
  lists: {
    iconNormal: React.ReactNode;
    iconActive: React.ReactNode;
    text: string;
    href: string;
  }[];
};

const MenuItem = ({ lists }: MenuItem) => {
  const pathname = usePathname();
  return (
    <>
      {lists.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className="home-menu-items flex flex-col gap-0 items-center text-primaryColor py-4 px-2"
        >
          <div
            className={`p-1 rounded-lg hover:bg-opacity-10 transition-all ${
              pathname === item.href
                ? "bg-primaryColor bg-opacity-10"
                : "hover:bg-primaryColor"
            }`}
          >
            {pathname === item.href ? item.iconActive : item.iconNormal}
          </div>
          <p className="text-[11px] tracking-widest">{item.text}</p>
        </Link>
      ))}
    </>
  );
};

export default HomeMenu;
