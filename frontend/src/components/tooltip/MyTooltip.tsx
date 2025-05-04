import { useHoverDelay } from "@/hooks/useHoverDelay";
import React from "react";
import PopupHover from "../popup/PopupHover";

type MyToolipProps = {
  children: React.ReactNode;
};

const MyTooltip = ({ children }: MyToolipProps) => {
  const { ref, isHovered } = useHoverDelay<HTMLDivElement>({
    enterDelay: 300,
    leaveDelay: 300,
  });
  return (
    <>
      <PopupHover
        rect={ref.current?.getBoundingClientRect()}
        isHovered={isHovered}
      >
        <p>15.52%</p>
        <p>9 correct</p>
        <p>49 incorrect</p>
      </PopupHover>
      <div ref={ref} className="cursor-default">
        {children}
      </div>
    </>
  );
};

export default MyTooltip;
