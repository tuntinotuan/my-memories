import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Placement } from "../tooltip/MyTooltip";
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
  children,
  rect,
  isHovered,
  placement = "top",
}: {
  children: React.ReactNode;
  rect?: DOMRect;
  isHovered: boolean;
  placement?: Placement;
}) => {
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (!rect) return;
    const tooltipOffset = 10; // distance from the element
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

  return (
    <Overlay>
      <div
        className={`fixed flex flex-col gap-[2px] bg-black text-white text-lg/4 px-4 py-3 rounded transition-all z-30 ${
          isHovered
            ? "opacity-100 visible -translate-y-1"
            : "opacity-0 translate-y-0 invisible"
        }`}
        style={{
          ...tooltipStyle,
        }}
      >
        {children}
        <Arrow></Arrow>
      </div>
    </Overlay>
  );
};

const Overlay = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  return mounted ? createPortal(children, document.body) : null;
};

const Arrow = () => {
  return (
    <div className="arrow absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] bg-inherit rotate-45 -z-10"></div>
  );
};

export default PopupHover;
