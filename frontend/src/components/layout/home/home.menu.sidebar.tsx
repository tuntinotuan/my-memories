"use client";
import React from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import { useLayoutStates } from "@/contexts/layoutStates";
const HomeMenuSidebar = () => {
  const { showHomeSidebar } = useLayoutStates();
  const menuLists = [
    {
      iconNormal: <MenuRoundedIcon fontSize="large" />,
      iconActive: <MenuRoundedIcon fontSize="large" />,
      text: "",
      href: "",
    },
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
      href: "/project/",
    },
    {
      iconNormal: <DashboardCustomizeOutlinedIcon fontSize="large" />,
      iconActive: <DashboardCustomizeRoundedIcon fontSize="large" />,
      text: "Card",
      href: "/card/",
    },
  ];
  return (
    <ul
      className={`h-auto ${
        showHomeSidebar ? "home-menu-ul border-r-d7Color" : ""
      }`}
    >
      <MenuListItems lists={menuLists}></MenuListItems>
    </ul>
  );
};

type MenuListItems = {
  lists: {
    iconNormal: React.ReactNode;
    iconActive: React.ReactNode;
    text: string;
    href: string;
  }[];
};

const MenuListItems = ({ lists }: MenuListItems) => {
  const pathname = usePathname();
  const { showHomeSidebar, handleShowHomeSidebar } = useLayoutStates();
  const MainComponent = ({ item }: any) => {
    return (
      <div
        className="home-menu-items flex flex-col gap-1 items-center text-primaryColor py-4 px-2 cursor-pointer"
        onClick={item.href ? () => {} : handleShowHomeSidebar}
      >
        <div
          className={`p-[3px] rounded-lg hover:bg-opacity-10 transition-all ${
            pathname === item.href
              ? "bg-primaryColor bg-opacity-10"
              : "hover:bg-primaryColor"
          }`}
        >
          {pathname === item.href ? item.iconActive : item.iconNormal}
        </div>
        {item.text && (
          <p className="text-[11px] tracking-widest">{item.text}</p>
        )}
      </div>
    );
  };
  return (
    <>
      {lists.map((item, index) =>
        item.href ? (
          <Link href={item.href} key={index}>
            <MainComponent item={item} />
          </Link>
        ) : (
          <MainComponent item={item} key={index} />
        )
      )}
    </>
  );
};

export default HomeMenuSidebar;
