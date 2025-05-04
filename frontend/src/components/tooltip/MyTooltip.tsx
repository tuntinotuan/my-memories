import { useHoverDelay } from "@/hooks/useHoverDelay";
import React from "react";
import PopupHover from "../popup/PopupHover";

type MyToolipProps = {
  children: React.ReactNode;
  contents: React.ReactNode;
};

const MyTooltip = ({ children, contents }: MyToolipProps) => {
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
        {contents}
      </PopupHover>
      <div ref={ref} className="cursor-default">
        {children}
      </div>
    </>
  );
};

export default MyTooltip;
