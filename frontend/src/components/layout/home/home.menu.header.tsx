import React, { useState } from "react";
import Button from "@/components/button/Button";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import Image from "next/image";
import { Tooltip } from "@nextui-org/tooltip";
import { scrollTypes } from "@/app/(home)/project/layout";
import SearchMenuHeader from "../../search/SearchMenuHeader";
import SettingIcon from "@/components/icons/SettingIcon";
import NotificationIcon from "@/components/icons/NotificationIcon";
import ToggleDarkMode from "@/components/toggle/ToggleDarkMode";
import { useLayoutStates } from "@/contexts/layoutStates";

const HomeMenuHeader = ({ scroll }: { scroll: scrollTypes }) => {
  const { darkMode, setDarkMode } = useLayoutStates();

  return (
    <div
      className={`flex items-center justify-end w-full h-[8vh] gap-2 py-2 bg-white bg-opacity-50 backdrop-blur-sm will-change-transform rounded-t-xl px-6 z-10 ${
        scroll?.scrollTop > 0 ? "shadow-lg" : ""
      }`}
    >
      <SearchMenuHeader
        placeholder="Search your content and Memories's"
        disable
        width={350}
      />
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
            <SettingIcon fontSize="small" className="cursor-wait" />
          </Button>
        </div>
      </Tooltip>
      <Button disable>
        <NotificationIcon fontSize="small" className="cursor-wait" />
      </Button>
      <ToggleDarkMode
        on={!darkMode}
        onClick={() => setDarkMode(!darkMode)}
      ></ToggleDarkMode>
      <Button className="py-1" disable>
        <Image
          src="/avatar-black-umbrella.jpg"
          alt="Avatar Icon"
          width={30}
          height={30}
          priority
          className="border border-secondaryColor rounded-full"
          unoptimized
        />
        <div className="text-xs flex flex-col items-start">
          <p>Personal</p>
          <span className="font-normal">Tuan Nguyen Van</span>
        </div>
        <ExpandMoreRoundedIcon></ExpandMoreRoundedIcon>
      </Button>
    </div>
  );
};

export default HomeMenuHeader;
