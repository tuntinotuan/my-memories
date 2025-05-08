import { useHoverDelay } from "@/hooks/useHoverDelay";
import React from "react";
import PopupHover from "../popup/PopupHover";
export type Placement = "top" | "bottom" | "left" | "right";
type MyToolipProps = {
  children: React.ReactNode;
  contents: React.ReactNode;
  placement?: Placement;
};

const MyTooltip = ({ children, contents, placement }: MyToolipProps) => {
  const { ref, isHovered } = useHoverDelay<HTMLDivElement>({
    enterDelay: 300,
    leaveDelay: 300,
  });
  return (
    <>
      <PopupHover
        rect={ref.current?.getBoundingClientRect()}
        isHovered={isHovered}
        placement={placement}
      >
        {contents}
      </PopupHover>
      <div ref={ref} className="w-fit cursor-default">
        {children}
      </div>
    </>
  );
};

export default MyTooltip;
