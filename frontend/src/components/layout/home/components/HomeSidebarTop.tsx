import CloseIcon from "@/components/icons/CloseIcon";
import HeaderLogo from "@/components/logo/header.logo";
import { useLayoutStates } from "@/contexts/layoutStates";
import { Tooltip } from "@nextui-org/tooltip";
import React from "react";

const HomeSidebarTop = () => {
  const { handleShowHomeSidebar } = useLayoutStates();
  return (
    <div className="flex items-center justify-between">
      <HeaderLogo></HeaderLogo>
      <Tooltip
        showArrow
        content="Close menu"
        placement="bottom"
        radius="sm"
        delay={200}
        closeDelay={200}
        className="!px-2 !py-[2px] dark:text-white"
        shadow="sm"
        classNames={{
          content: "bg-white text-black dark:bg-neutral-800 dark:text-black",
          arrow: "bg-white dark:before:bg-white",
          base: "dark:border-neutral-700",
        }}
      >
        <div>
          <CloseIcon
            onClick={() => handleShowHomeSidebar()}
            className="homesidebar-close-icon opacity-0 dark:bg-primaryColor dark:border-none "
            border
          ></CloseIcon>
        </div>
      </Tooltip>
    </div>
  );
};

export default HomeSidebarTop;
