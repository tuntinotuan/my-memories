"use client";
import ProjectSidebar from "@/components/layout/project.sidebar";
import Button from "@/components/button/Button";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import Image from "next/image";
import { Tooltip } from "@nextui-org/tooltip";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useRef, useState } from "react";
type scrollTypes = {
  scrollTop: number;
  scrollLeft: number;
};
export default function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ref = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState({} as scrollTypes);
  const handleScroll = () => {
    if (ref.current) {
      const { scrollTop, scrollLeft } = ref.current;
      setScroll({ scrollTop, scrollLeft });
    }
  };
  return (
    <div className="flex w-full mt-2 mx-2">
      <ProjectSidebar></ProjectSidebar>
      <div className="relative bg-white rounded-t-xl shadow-xl w-full">
        <div
          className={`flex items-center justify-end w-full gap-2 sticky top-0 left-0 right-0 py-2 bg-white rounded-t-xl px-6 ${
            scroll.scrollTop > 0 ? "shadow-lg" : ""
          }`}
        >
          <label
            htmlFor="searchInputId"
            className={`flex items-center gap-2 border border-gray-200 rounded-lg px-2 py-1 text-sm hover:border-gray-500 transition-all cursor-text w-[450px]`}
          >
            <SearchRoundedIcon
              fontSize="large"
              className="text-gray-500 hover:border-gray-500"
            ></SearchRoundedIcon>
            <input
              type="search"
              id="searchInputId"
              placeholder="Search your content and Canvas's"
              className="w-full placeholder:font-light placeholder:text-gray-500"
            ></input>
          </label>
          {/* {scroll.scrollTop} | {scroll.scrollLeft} */}
          <Tooltip
            showArrow
            content="Settings"
            placement="bottom"
            radius="sm"
            delay={200}
            closeDelay={200}
            className="!px-2 !py-[2px]"
            shadow="sm"
          >
            <div>
              <Button disable>
                <SettingsOutlinedIcon></SettingsOutlinedIcon>
              </Button>
            </div>
          </Tooltip>
          <Button disable>
            <NotificationsNoneOutlinedIcon></NotificationsNoneOutlinedIcon>
          </Button>
          <Button className="py-1" disable>
            <Image
              src="/avatar.jpg"
              alt="Avatar Icon"
              width={30}
              height={30}
              priority
              className="border border-secondaryColor rounded-full"
            />
            <div className="text-xs flex flex-col items-start">
              <p>Personal</p>
              <span className="font-normal">Tuan Nguyen Van</span>
            </div>
            <ExpandMoreRoundedIcon></ExpandMoreRoundedIcon>
          </Button>
        </div>
        <div
          className="w-full h-full overflow-auto"
          ref={ref}
          onScroll={handleScroll}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
