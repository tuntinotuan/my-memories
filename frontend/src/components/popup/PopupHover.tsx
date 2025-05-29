import React, { useEffect, useState } from "react";
import { Placement } from "../tooltip/MyTooltip";
import PortalOverlay from "../overlay/portal.overlay";
interface DOMRect {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
  toJSON(): any;
}
const PopupHover = ({
  size = "medium",
  children,
  rect,
  isHovered,
  placement = "top",
  arrowRounded = false,
}: {
  children: React.ReactNode;
  rect?: DOMRect;
  isHovered: boolean;
  placement?: Placement;
  size?: "small" | "medium" | "large";
  arrowRounded?: boolean;
}) => {
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  let newSize = "";
  useEffect(() => {
    if (!rect) return;
    const tooltipOffset = 15; // distance from the element
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    let style: React.CSSProperties = {
      position: "absolute",
    };

    switch (placement) {
      case "top":
        style = {
          top: rect.top + scrollY - tooltipOffset,
          left: rect.left + scrollX + rect.width / 2,
          transform: "translate(-50%, -100%)",
        };
        break;
      case "bottom":
        style = {
          top: rect.bottom + scrollY + tooltipOffset,
          left: rect.left + scrollX + rect.width / 2,
          transform: "translate(-50%, 0)",
        };
        break;
      case "left":
        style = {
          top: rect.top + scrollY + rect.height / 2,
          left: rect.left + scrollX - tooltipOffset,
          transform: "translate(-100%, -50%)",
        };
        break;
      case "right":
        style = {
          top: rect.top + scrollY + rect.height / 2,
          left: rect.right + scrollX + tooltipOffset,
          transform: "translate(0, -50%)",
        };
        break;
    }

    setTooltipStyle(style);
  }, [rect, placement]);

  switch (size) {
    case "small":
      newSize = "text-sm/4 px-2 py-1";
      break;
    case "medium":
      newSize = "text-lg/4 px-4 py-3";
      break;

    default:
      break;
  }

  return (
    <PortalOverlay>
      <div
        className={`fixed flex flex-col gap-[2px] bg-black text-white rounded transition-all z-50 ${newSize} ${
          isHovered
            ? "opacity-100 visible -translate-y-1"
            : "opacity-0 translate-y-0 invisible"
        }`}
        style={{
          ...tooltipStyle,
        }}
      >
        {children}
        <Arrow placement={placement} arrowRounded={arrowRounded}></Arrow>
      </div>
    </PortalOverlay>
  );
};

const Arrow = ({
  placement,
  arrowRounded,
}: {
  placement: Placement;
  arrowRounded: boolean;
}) => {
  let newStyles = "";
  switch (placement) {
    case "top":
      newStyles = "top-full left-1/2 -translate-x-1/2 -translate-y-[60%]";
      break;
    case "bottom":
      newStyles = "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2";
      break;
    case "left":
      newStyles = "bottom-1/2 left-full -translate-x-1/2 translate-y-1/2";
      break;
    case "right":
      newStyles = "bottom-1/2 right-full translate-x-1/2 translate-y-1/2";
      break;

    default:
      break;
  }
  return (
    <div
      className={`arrow absolute w-[10px] h-[10px] bg-inherit rotate-45 -z-10 ${newStyles} ${
        arrowRounded ? "rounded" : ""
      }`}
    ></div>
  );
};

export default PopupHover;
