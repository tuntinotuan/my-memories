import { Tooltip } from "@nextui-org/tooltip";
import React from "react";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import { ListOrGrid } from "@/app/page";

const ButtonGridOrListView = ({
  listOrGrid,
  handleViewListOrGrid,
}: {
  listOrGrid: ListOrGrid;
  handleViewListOrGrid: () => void;
}) => {
  return (
    <Tooltip
      showArrow
      content={listOrGrid === "list" ? "View as Grid" : "View as List"}
      placement="bottom"
      radius="sm"
      delay={200}
      closeDelay={200}
      className="!px-2 !py-[2px]"
      shadow="sm"
    >
      <div
        className="w-10 h-10 flex items-center justify-center text-primaryText border border-gray-300 rounded-lg hover:bg-efColor active:border-gray-400 active:bg-gray-300 active:shadow-inner cursor-pointer transition-all"
        onClick={handleViewListOrGrid}
      >
        {listOrGrid === "list" ? (
          <GridViewRoundedIcon />
        ) : (
          <FormatListBulletedRoundedIcon />
        )}
      </div>
    </Tooltip>
  );
};

export default ButtonGridOrListView;
