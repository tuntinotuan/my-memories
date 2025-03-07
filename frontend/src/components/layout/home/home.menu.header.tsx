import React from "react";
import Button from "@/components/button/Button";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import Image from "next/image";
import { Tooltip } from "@nextui-org/tooltip";
import { scrollTypes } from "@/app/(home)/project/layout";
import SearchMenuHeader from "../../search/SearchMenuHeader";
import SettingIcon from "@/components/icons/SettingIcon";
import NotificationIcon from "@/components/icons/NotificationIcon";

const HomeMenuHeader = ({ scroll }: { scroll: scrollTypes }) => {
  return (
    <div
      className={`flex items-center justify-end w-full gap-2 sticky top-0 left-0 right-0 py-2 bg-white rounded-t-xl px-6 ${
        scroll?.scrollTop > 0 ? "shadow-lg" : ""
      }`}
    >
      <SearchMenuHeader />
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
            <SettingIcon fontSize="small" />
          </Button>
        </div>
      </Tooltip>
      <Button disable>
        <NotificationIcon fontSize="small" />
      </Button>
      <Button className="py-1" disable>
        <Image
          src="/avatar.jpg"
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
