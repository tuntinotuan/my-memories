import { Tooltip } from "@nextui-org/tooltip";
import React from "react";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import { ListOrGrid } from "@/app/page";
import MyTooltip from "../tooltip/MyTooltip";

const ButtonGridOrListView = ({
  listOrGrid,
  handleViewListOrGrid,
}: {
  listOrGrid: ListOrGrid;
  handleViewListOrGrid: () => void;
}) => {
  return (
    // <Tooltip
    //   showArrow
    //   content={listOrGrid === "list" ? "View as Grid" : "View as List"}
    //   placement="bottom"
    //   radius="sm"
    //   delay={200}
    //   closeDelay={200}
    //   className="!px-2 !py-[2px] dark:text-white"
    //   shadow="sm"
    // >
    <MyTooltip
      contents={
        <p className="w-auto text-center">
          {listOrGrid === "list" ? "View as Grid" : "View as List"}
        </p>
      }
      size="small"
      arrowRounded
      className="flex"
      placement="bottom"
    >
      <div
        className="w-10 h-10 flex items-center justify-center text-primaryText dark:text-white
         border border-gray-300 dark:border-darkMode0A rounded-lg hover:bg-efColor dark:hover:bg-darkMode0A active:border-gray-400 active:bg-gray-300 active:shadow-inner cursor-pointer transition-all"
        onClick={handleViewListOrGrid}
      >
        {listOrGrid === "list" ? (
          <GridViewRoundedIcon />
        ) : (
          <FormatListBulletedRoundedIcon />
        )}
      </div>
    </MyTooltip>
  );
};

export default ButtonGridOrListView;
