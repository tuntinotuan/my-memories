import { useHoverDelay } from "@/hooks/useHoverDelay";
import React from "react";
import PopupHover from "../popup/PopupHover";
export type Placement = "top" | "bottom" | "left" | "right";
type MyToolipProps = {
  children: React.ReactNode;
  contents: React.ReactNode;
  placement?: Placement;
  className?: string;
  size?: "small" | "medium" | "large";
  arrowRounded?: boolean;
  enterDelay?: number;
  leaveDelay?: number;
};

const MyTooltip = ({
  children,
  contents,
  placement,
  className,
  size,
  arrowRounded,
  enterDelay = 300,
  leaveDelay = 300,
}: MyToolipProps) => {
  const { ref, isHovered } = useHoverDelay<HTMLDivElement>({
    enterDelay: enterDelay,
    leaveDelay: leaveDelay,
  });
  return (
    <>
      <PopupHover
        rect={ref.current?.getBoundingClientRect()}
        isHovered={isHovered}
        placement={placement}
        size={size}
        arrowRounded={arrowRounded}
      >
        {contents}
      </PopupHover>
      <div ref={ref} className={`w-fit cursor-default ${className}`}>
        {children}
      </div>
    </>
  );
};

export default MyTooltip;
