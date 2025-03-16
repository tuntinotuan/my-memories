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
import { Tooltip } from "@nextui-org/tooltip";
const HomeMenuSidebar = () => {
  const { showHomeSidebar } = useLayoutStates();
  const menuLists = [
    {
      iconNormal: <MenuRoundedIcon fontSize="medium" />,
      iconActive: <MenuRoundedIcon fontSize="medium" />,
      text: "",
      href: "",
    },
    {
      iconNormal: <HomeOutlinedIcon fontSize="inherit" />,
      iconActive: <HomeRoundedIcon fontSize="inherit" />,
      text: "Home",
      href: "/",
    },
    {
      iconNormal: <FolderOpenRoundedIcon fontSize="inherit" />,
      iconActive: <FolderRoundedIcon fontSize="inherit" />,
      text: "Projects",
      href: "/project/",
    },
    {
      iconNormal: <DashboardCustomizeOutlinedIcon fontSize="inherit" />,
      iconActive: <DashboardCustomizeRoundedIcon fontSize="inherit" />,
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
        className={`home-menu-items flex flex-col gap-1 items-center text-primaryColor cursor-pointer ${
          item.href ? "py-3 px-2" : "my-3 mx-2"
        }`}
        onClick={item.href ? () => {} : handleShowHomeSidebar}
      >
        <div
          className={`w-10 h-10 flex items-center justify-center text-3xl rounded-lg transition-all ${
            pathname === item.href
              ? "bg-primaryColor bg-opacity-10"
              : "hover:bg-primaryColor hover:bg-opacity-5"
          }`}
        >
          {pathname === item.href ? item.iconActive : item.iconNormal}
        </div>
        {item.text && (
          <p
            className={`min-w-[55px] text-[11px] text-center text-primaryColor tracking-wide ${
              pathname === item.href
                ? "font-semibold"
                : "font-normal contrast-50"
            }`}
          >
            {item.text}
          </p>
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
          <Tooltip
            showArrow
            content={showHomeSidebar ? "Close menu" : "Open menu"}
            placement="bottom-start"
            radius="sm"
            delay={100}
            closeDelay={100}
            className="!px-2 !py-[2px]"
            shadow="sm"
            key={index}
          >
            <div>
              <MainComponent item={item} />
            </div>
          </Tooltip>
        )
      )}
    </>
  );
};

export default HomeMenuSidebar;
